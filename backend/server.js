// File: backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const auctionRoutes = require('./routes/auctionRoutes');
const bidRoutes = require('./routes/bidRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');

// Import error middleware
const { errorHandler, notFound } = require('./middleware/error');

// Create Express app
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
  }
});

// Make io accessible in routes
app.set('io', io);

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Baby Bunny Resale API is running!',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/auctions', auctionRoutes);
app.use('/api/bids', bidRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);

// Serve frontend static files (Vite build)
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Fallback: serve index.html for unknown frontend routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Socket.io for real-time auction updates
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('join_auction', (auctionId) => {
    socket.join(`auction_${auctionId}`);
    console.log(`Socket ${socket.id} joined auction ${auctionId}`);
  });

  socket.on('leave_auction', (auctionId) => {
    socket.leave(`auction_${auctionId}`);
    console.log(`Socket ${socket.id} left auction ${auctionId}`);
  });

  socket.on('place_bid', async (data) => {
    try {
      io.to(`auction_${data.auctionId}`).emit('new_bid', {
        auctionId: data.auctionId,
        amount: data.amount,
        bidder: data.bidder,
        timestamp: new Date()
      });
    } catch (error) {
      socket.emit('bid_error', { message: error.message });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// 404 handler (after all routes)
app.use(notFound);

// Global error handler (last middleware)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
