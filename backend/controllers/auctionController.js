// File: backend/controllers/auctionController.js
const Auction = require('../models/Auction');
const Bid = require('../models/Bid');
const { ErrorResponse } = require('../middleware/error');

// @desc    Get all active auctions with filters
// @route   GET /api/auctions
// @access  Public
exports.getAuctions = async (req, res, next) => {
  const {
    category,
    condition,
    minPrice,
    maxPrice,
    search,
    sort = '-createdAt',
    page = 1,
    limit = 12
  } = req.query;

  // Build query
  const query = { status: 'active' };

  if (category) query.category = category;
  if (condition) query.condition = condition;
  if (minPrice || maxPrice) {
    query.currentBid = {};
    if (minPrice) query.currentBid.$gte = Number(minPrice);
    if (maxPrice) query.currentBid.$lte = Number(maxPrice);
  }
  if (search) {
    query.$text = { $search: search };
  }

  // Execute query with pagination
  const auctions = await Auction.find(query)
    .populate('seller', 'name rating isVerified avatar')
    .populate('category', 'name icon')
    .sort(sort)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .lean();

  // Get total count
  const count = await Auction.countDocuments(query);

  // Add bid count to each auction
  const auctionsWithBidCount = await Promise.all(
    auctions.map(async (auction) => {
      const bidCount = await Bid.countDocuments({ auction: auction._id });
      return { ...auction, bidCount };
    })
  );

  res.status(200).json({
    success: true,
    count: auctionsWithBidCount.length,
    totalPages: Math.ceil(count / limit),
    currentPage: Number(page),
    data: auctionsWithBidCount
  });
};

// @desc    Get featured auctions
// @route   GET /api/auctions/featured
// @access  Public
exports.getFeaturedAuctions = async (req, res, next) => {
  const auctions = await Auction.find({
    status: 'active',
    isFeatured: true
  })
    .populate('seller', 'name rating isVerified avatar')
    .populate('category', 'name icon')
    .sort('-createdAt')
    .limit(4)
    .lean();

  const auctionsWithBidCount = await Promise.all(
    auctions.map(async (auction) => {
      const bidCount = await Bid.countDocuments({ auction: auction._id });
      return { ...auction, bidCount };
    })
  );

  res.status(200).json({
    success: true,
    count: auctionsWithBidCount.length,
    data: auctionsWithBidCount
  });
};

// @desc    Get single auction
// @route   GET /api/auctions/:id
// @access  Public
exports.getAuction = async (req, res, next) => {
  const auction = await Auction.findById(req.params.id)
    .populate('seller', 'name rating isVerified avatar phoneNumber')
    .populate('category', 'name icon')
    .populate('watchers', 'name');

  if (!auction) {
    return next(new ErrorResponse('Auction not found', 404));
  }

  // Increment views
  auction.views += 1;
  await auction.save();

  // Get bid history
  const bids = await Bid.find({ auction: req.params.id })
    .populate('bidder', 'name avatar')
    .sort('-createdAt')
    .limit(10);

  const bidCount = await Bid.countDocuments({ auction: req.params.id });

  res.status(200).json({
    success: true,
    data: {
      auction,
      bids,
      bidCount
    }
  });
};

// @desc    Create auction
// @route   POST /api/auctions
// @access  Private
exports.createAuction = async (req, res, next) => {
  // Add seller
  req.body.seller = req.user.id;

  // Add images if uploaded
  if (req.uploadedImages && req.uploadedImages.length > 0) {
    req.body.images = req.uploadedImages;
  } else {
    return next(new ErrorResponse('Please upload at least one image', 400));
  }

  const auction = await Auction.create(req.body);

  res.status(201).json({
    success: true,
    data: auction
  });
};

// @desc    Update auction
// @route   PUT /api/auctions/:id
// @access  Private
exports.updateAuction = async (req, res, next) => {
  let auction = await Auction.findById(req.params.id);

  if (!auction) {
    return next(new ErrorResponse('Auction not found', 404));
  }

  // Make sure user is auction owner
  if (auction.seller.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized to update this auction', 401));
  }

  // Check if auction has bids
  const bidCount = await Bid.countDocuments({ auction: req.params.id });
  if (bidCount > 0) {
    return next(new ErrorResponse('Cannot update auction with existing bids', 400));
  }

  auction = await Auction.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: auction
  });
};

// @desc    Delete auction
// @route   DELETE /api/auctions/:id
// @access  Private
exports.deleteAuction = async (req, res, next) => {
  const auction = await Auction.findById(req.params.id);

  if (!auction) {
    return next(new ErrorResponse('Auction not found', 404));
  }

  // Make sure user is auction owner
  if (auction.seller.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized to delete this auction', 401));
  }

  // Check if auction has bids
  const bidCount = await Bid.countDocuments({ auction: req.params.id });
  if (bidCount > 0) {
    return next(new ErrorResponse('Cannot delete auction with existing bids', 400));
  }

  await auction.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
};

// @desc    Toggle watch/favorite auction
// @route   POST /api/auctions/:id/watch
// @access  Private
exports.watchAuction = async (req, res, next) => {
  const auction = await Auction.findById(req.params.id);

  if (!auction) {
    return next(new ErrorResponse('Auction not found', 404));
  }

  const index = auction.watchers.indexOf(req.user.id);
  
  if (index > -1) {
    auction.watchers.splice(index, 1);
  } else {
    auction.watchers.push(req.user.id);
  }

  await auction.save();
  
  res.status(200).json({
    success: true,
    watching: index === -1,
    watcherCount: auction.watchers.length
  });
};

// @desc    Buy now
// @route   POST /api/auctions/:id/buy-now
// @access  Private
exports.buyNow = async (req, res, next) => {
  const auction = await Auction.findById(req.params.id);

  if (!auction) {
    return next(new ErrorResponse('Auction not found', 404));
  }

  if (auction.status !== 'active') {
    return next(new ErrorResponse('Auction is not active', 400));
  }

  if (auction.seller.toString() === req.user.id) {
    return next(new ErrorResponse('Cannot buy your own item', 400));
  }

  // Update auction
  auction.status = 'sold';
  auction.winner = req.user.id;
  auction.soldPrice = auction.buyNowPrice;
  auction.soldType = 'buyNow';
  await auction.save();

  // TODO: Create order and process payment
  // TODO: Send notification to seller

  res.status(200).json({
    success: true,
    message: 'Item purchased successfully',
    data: auction
  });
};