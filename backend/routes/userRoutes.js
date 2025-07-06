// File: backend/routes/userRoutes.js (refactored)
const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserProfile,
  getUserAuctions,
  getDashboardStats,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/error');

// Public routes
router.get('/:id', asyncHandler(getUserProfile));
router.get('/:id/auctions', asyncHandler(getUserAuctions));

// Protected routes
router.use(protect); // All routes below this will require authentication

router.get('/dashboard/stats', asyncHandler(getDashboardStats));

// Admin only routes
router.use(admin); // All routes below this will require admin role

router.get('/', asyncHandler(getUsers));
router.put('/:id', asyncHandler(updateUser));
router.delete('/:id', asyncHandler(deleteUser));

module.exports = router;