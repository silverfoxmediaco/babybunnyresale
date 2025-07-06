// File: backend/routes/categoryRoutes.js (refactored)
const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  seedCategories
} = require('../controllers/categoryController');
const { protect, admin } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/error');

// Public routes
router.get('/', asyncHandler(getCategories));
router.get('/:id', asyncHandler(getCategory));

// Protected routes - Admin only
router.use(protect); // All routes below this will require authentication
router.use(admin);   // All routes below this will require admin role

router.post('/', asyncHandler(createCategory));
router.put('/:id', asyncHandler(updateCategory));
router.delete('/:id', asyncHandler(deleteCategory));
router.post('/seed', asyncHandler(seedCategories));

module.exports = router;