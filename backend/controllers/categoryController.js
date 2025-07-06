// File: backend/controllers/categoryController.js
const Category = require('../models/Category');
const { ErrorResponse } = require('../middleware/error');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
exports.getCategories = async (req, res, next) => {
  const categories = await Category.find({ isActive: true })
    .sort('order')
    .populate('itemCount');

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories
  });
};

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
exports.getCategory = async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  
  if (!category) {
    return next(new ErrorResponse('Category not found', 404));
  }

  res.status(200).json({
    success: true,
    data: category
  });
};

// @desc    Create category
// @route   POST /api/categories
// @access  Private/Admin
exports.createCategory = async (req, res, next) => {
  const category = await Category.create(req.body);
  
  res.status(201).json({
    success: true,
    data: category
  });
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
exports.updateCategory = async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!category) {
    return next(new ErrorResponse('Category not found', 404));
  }

  res.status(200).json({
    success: true,
    data: category
  });
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
exports.deleteCategory = async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorResponse('Category not found', 404));
  }

  await category.remove();
  
  res.status(200).json({
    success: true,
    data: {}
  });
};

// @desc    Seed initial categories
// @route   POST /api/categories/seed
// @access  Private/Admin
exports.seedCategories = async (req, res, next) => {
  const categories = [
    { name: 'Clothing', icon: '👕', order: 1 },
    { name: 'Toys', icon: '🧸', order: 2 },
    { name: 'Strollers', icon: '🏃', order: 3 },
    { name: 'Nursery', icon: '🏠', order: 4 },
    { name: 'Feeding', icon: '🍼', order: 5 },
    { name: 'Safety', icon: '🛡️', order: 6 },
    { name: 'Books', icon: '📚', order: 7 },
    { name: 'Outdoor', icon: '🌳', order: 8 },
  ];

  await Category.deleteMany({});
  const createdCategories = await Category.insertMany(categories);

  res.status(201).json({
    success: true,
    message: 'Categories seeded successfully',
    count: createdCategories.length,
    data: createdCategories
  });
};