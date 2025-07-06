// File: backend/routes/authRoutes.js (refactored)
const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  getMe,
  updateDetails,
  updatePassword,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/error');

// Public routes
router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));
router.post('/forgotpassword', asyncHandler(forgotPassword));
router.put('/resetpassword/:resettoken', asyncHandler(resetPassword));

// Protected routes
router.use(protect); // All routes below this will require authentication

router.get('/logout', asyncHandler(logout));
router.get('/me', asyncHandler(getMe));
router.put('/updatedetails', asyncHandler(updateDetails));
router.put('/updatepassword', asyncHandler(updatePassword));

module.exports = router;