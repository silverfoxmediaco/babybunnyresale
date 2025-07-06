// File: backend/models/Bid.js
const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  auction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auction',
    required: [true, 'Auction is required']
  },
  bidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Bidder is required']
  },
  amount: {
    type: Number,
    required: [true, 'Bid amount is required'],
    min: [1, 'Bid must be at least $1']
  },
  maxBid: {
    type: Number,
    min: [1, 'Max bid must be at least $1']
  },
  isAutoBid: {
    type: Boolean,
    default: false
  },
  isWinning: {
    type: Boolean,
    default: false
  },
  outbidNotified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes
bidSchema.index({ auction: 1, bidder: 1 });
bidSchema.index({ auction: 1, amount: -1 });
bidSchema.index({ bidder: 1, createdAt: -1 });

// Ensure bidder can't bid on their own auction
bidSchema.pre('save', async function(next) {
  if (this.isNew) {
    const auction = await mongoose.model('Auction').findById(this.auction);
    if (auction && auction.seller.toString() === this.bidder.toString()) {
      const error = new Error('You cannot bid on your own auction');
      error.statusCode = 400;
      return next(error);
    }
  }
  next();
});

// Update auction's current bid after successful bid
bidSchema.post('save', async function() {
  const Auction = mongoose.model('Auction');
  await Auction.findByIdAndUpdate(this.auction, {
    currentBid: this.amount
  });
});

const Bid = mongoose.model('Bid', bidSchema);

module.exports = Bid;