// File: backend/controllers/userController.js
const User = require('../models/User');
const Auction = require('../models/Auction');
const { ErrorResponse } = require('../middleware/error');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = async (req, res, next) => {
  const users = await User.find({}).select('-password');
  
  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
};

// @desc    Get user profile
// @route   GET /api/users/:id
// @access  Public
exports.getUserProfile = async (req, res, next) => {
  const user = await User.findById(req.params.id)
    .select('name avatar rating totalRatings isVerified createdAt');

  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }

  // Get user's active auctions
  const auctions = await Auction.find({ 
    seller: req.params.id,
    status: 'active' 
  })
    .populate('category', 'name icon')
    .sort('-createdAt')
    .limit(10);

  res.status(200).json({
    success: true,
    data: {
      user,
      auctions,
      averageRating: user.averageRating
    }
  });
};

// @desc    Get user's auctions
// @route   GET /api/users/:id/auctions
// @access  Public
exports.getUserAuctions = async (req, res, next) => {
  const { status = 'active', page = 1, limit = 12 } = req.query;

  const query = {
    seller: req.params.id,
    ...(status !== 'all' && { status })
  };

  const auctions = await Auction.find(query)
    .populate('category', 'name icon')
    .sort('-createdAt')
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Auction.countDocuments(query);

  res.status(200).json({
    success: true,
    auctions,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit),
    total
  });
};

// @desc    Get user's dashboard stats
// @route   GET /api/users/dashboard/stats
// @access  Private
exports.getDashboardStats = async (req, res, next) => {
  const userId = req.user._id;

  // Get auction stats
  const [activeAuctions, soldAuctions, totalViews] = await Promise.all([
    Auction.countDocuments({ seller: userId, status: 'active' }),
    Auction.countDocuments({ seller: userId, status: 'sold' }),
    Auction.aggregate([
      { $match: { seller: userId } },
      { $group: { _id: null, total: { $sum: '$views' } } }
    ])
  ]);

  // Get earnings
  const earnings = await Auction.aggregate([
    { $match: { seller: userId, status: 'sold' } },
    { $group: { _id: null, total: { $sum: '$soldPrice' } } }
  ]);

  res.status(200).json({
    success: true,
    data: {
      activeAuctions,
      soldAuctions,
      totalViews: totalViews[0]?.total || 0,
      totalEarnings: earnings[0]?.total || 0
    }
  });
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
exports.updateUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  ).select('-password');

  res.status(200).json({
    success: true,
    data: updatedUser
  });
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }

  // Check if user has active auctions
  const activeAuctions = await Auction.countDocuments({
    seller: req.params.id,
    status: 'active'
  });

  if (activeAuctions > 0) {
    return next(new ErrorResponse('Cannot delete user with active auctions', 400));
  }

  await user.remove();
  
  res.status(200).json({
    success: true,
    data: {}
  });
};