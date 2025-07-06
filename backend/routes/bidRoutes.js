// File: backend/routes/bidRoutes.js (refactored)
const express = require('express');
const router = express.Router();
const {
  placeBid,
  getAuctionBids,
  getMyBids,
  getWinningBids
} = require('../controllers/bidController');
const { protect } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/error');

// Public routes
router.get('/auction/:auctionId', asyncHandler(getAuctionBids));

// Protected routes
router.use(protect); // All routes below this will require authentication

router.post('/', asyncHandler(placeBid));
router.get('/my-bids', asyncHandler(getMyBids));
router.get('/winning', asyncHandler(getWinningBids));

module.exports = router;