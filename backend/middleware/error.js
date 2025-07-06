// File: backend/middleware/error.js

// Custom error class
class ErrorResponse extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  // Error handler middleware
  const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
  
    // Log to console for dev
    console.log(err);
  
    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
      const message = 'Resource not found';
      error = new ErrorResponse(message, 404);
    }
  
    // Mongoose duplicate key
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      const message = `${field} already exists`;
      error = new ErrorResponse(message, 400);
    }
  
    // Mongoose validation error
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map(val => val.message).join(', ');
      error = new ErrorResponse(message, 400);
    }
  
    // JWT errors
    if (err.name === 'JsonWebTokenError') {
      const message = 'Invalid token';
      error = new ErrorResponse(message, 401);
    }
  
    // JWT expired error
    if (err.name === 'TokenExpiredError') {
      const message = 'Token expired';
      error = new ErrorResponse(message, 401);
    }
  
    // Multer file upload errors
    if (err.name === 'MulterError') {
      let message = 'File upload error';
      if (err.code === 'LIMIT_FILE_SIZE') {
        message = 'File size too large. Maximum size is 5MB';
      } else if (err.code === 'LIMIT_FILE_COUNT') {
        message = 'Too many files. Maximum is 8 images';
      } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        message = 'Unexpected file field';
      }
      error = new ErrorResponse(message, 400);
    }
  
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Server Error',
      ...(process.env.NODE_ENV === 'development' && { 
        stack: err.stack,
        error: err 
      })
    });
  };
  
  // Not found middleware
  const notFound = (req, res, next) => {
    const error = new ErrorResponse(`Not found - ${req.originalUrl}`, 404);
    next(error);
  };
  
  // Async handler to avoid try-catch blocks
  const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
  
  module.exports = {
    errorHandler,
    notFound,
    asyncHandler,
    ErrorResponse
  };