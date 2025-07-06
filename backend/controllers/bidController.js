// File: backend/controllers/bidController.js
const Bid = require('../models/Bid');
const Auction = require('../models/Auction');
const { ErrorResponse } = require('../middleware/error');

// @desc    Place a bid on an auction
// @route   POST /api/bids
// @access  Private
exports.placeBid = async (req, res, next) => {
  const { auctionId, amount, maxBid } = req.body;

  // Get auction
  const auction = await Auction.findById(auctionId);
  
  if (!auction) {
    return next(new ErrorResponse('Auction not found', 404));
  }

  // Validate auction status
  if (auction.status !== 'active') {
    return next(new ErrorResponse('Auction is not active', 400));
  }

  if (auction.hasEnded()) {
    return next(new ErrorResponse('Auction has ended', 400));
  }

  // Validate bid amount
  const minimumBid = auction.currentBid > 0 
    ? auction.currentBid + auction.bidIncrement 
    : auction.startingBid;

  if (amount < minimumBid) {
    return next(new ErrorResponse(`Bid must be at least $${minimumBid}`, 400));
  }

  // Check if bidder is the seller
  if (auction.seller.toString() === req.user._id.toString()) {
    return next(new ErrorResponse('You cannot bid on your own auction', 400));
  }

  // Create bid
  const bid = await Bid.create({
    auction: auctionId,
    bidder: req.user._id,
    amount,
    maxBid,
    isAutoBid: !!maxBid
  });

  // Update previous winning bid
  await Bid.updateMany(
    { auction: auctionId, _id: { $ne: bid._id } },
    { isWinning: false }
  );

  // Mark this bid as winning
  bid.isWinning = true;
  await bid.save();

  // Update auction current bid
  auction.currentBid = amount;
  await auction.save();

  // Emit socket event for real-time updates
  const io = req.app.get('io');
  io.to(`auction_${auctionId}`).emit('newBid', {
    auctionId,
    amount,
    bidder: {
      _id: req.user._id,
      name: req.user.name
    },
    timestamp: new Date()
  });

  // TODO: Send outbid notification to previous bidder

  res.status(201).json({
    success: true,
    bid,
    message: 'Bid placed successfully'
  });
};

// @desc    Get bid history for an auction
// @route   GET /api/bids/auction/:auctionId
// @access  Public
exports.getAuctionBids = async (req, res, next) => {
  const bids = await Bid.find({ auction: req.params.auctionId })
    .populate('bidder', 'name avatar')
    .sort('-createdAt')
    .limit(20);

  res.status(200).json({
    success: true,
    count: bids.length,
    data: bids
  });
};

// @desc    Get user's bid history
// @route   GET /api/bids/my-bids
// @access  Private
exports.getMyBids = async (req, res, next) => {
  const { status = 'all', page = 1, limit = 10 } = req.query;

  const query = { bidder: req.user._id };

  // Get unique auction IDs for the user's bids
  const auctionIds = await Bid.distinct('auction', query);

  // Get auctions with user's highest bid
  const auctions = await Auction.find({ 
    _id: { $in: auctionIds },
    ...(status !== 'all' && { status })
  })
    .populate('seller', 'name rating')
    .populate('category', 'name icon')
    .sort('-endTime')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .lean();

  // Get user's highest bid for each auction
  const auctionsWithBids = await Promise.all(
    auctions.map(async (auction) => {
      const highestBid = await Bid.findOne({
        auction: auction._id,
        bidder: req.user._id
      }).sort('-amount');

      const totalBids = await Bid.countDocuments({ 
        auction: auction._id 
      });

      return {
        ...auction,
        myHighestBid: highestBid.amount,
        isWinning: highestBid.isWinning,
        totalBids
      };
    })
  );

  const total = await Auction.countDocuments({
    _id: { $in: auctionIds },
    ...(status !== 'all' && { status })
  });

  res.status(200).json({
    success: true,
    auctions: auctionsWithBids,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
    total
  });
};

// @desc    Get user's winning bids
// @route   GET /api/bids/winning
// @access  Private
exports.getWinningBids = async (req, res, next) => {
  const winningBids = await Bid.find({
    bidder: req.user._id,
    isWinning: true
  }).populate({
    path: 'auction',
    match: { status: 'active' },
    populate: {
      path: 'seller category',
      select: 'name rating icon'
    }
  });

  // Filter out null auctions (ended or cancelled)
  const activeBids = winningBids.filter(bid => bid.auction);

  res.status(200).json({
    success: true,
    count: activeBids.length,
    data: activeBids
  });
};