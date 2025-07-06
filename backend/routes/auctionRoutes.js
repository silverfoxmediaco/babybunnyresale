// File: backend/routes/auctionRoutes.js (refactored)
const express = require('express');
const router = express.Router();
const {
  getAuctions,
  getFeaturedAuctions,
  getAuction,
  createAuction,
  updateAuction,
  deleteAuction,
  watchAuction,
  buyNow
} = require('../controllers/auctionController');
const { protect } = require('../middleware/auth');
const { uploadImages, uploadToCloudinary } = require('../middleware/upload');
const { asyncHandler } = require('../middleware/error');

// Public routes
router.get('/', asyncHandler(getAuctions));
router.get('/featured', asyncHandler(getFeaturedAuctions));
router.get('/:id', asyncHandler(getAuction));

// Protected routes
router.use(protect); // All routes below this will require authentication

router.post('/', uploadImages, uploadToCloudinary, asyncHandler(createAuction));
router.put('/:id', asyncHandler(updateAuction));
router.delete('/:id', asyncHandler(deleteAuction));
router.post('/:id/watch', asyncHandler(watchAuction));
router.post('/:id/buy-now', asyncHandler(buyNow));

module.exports = router;