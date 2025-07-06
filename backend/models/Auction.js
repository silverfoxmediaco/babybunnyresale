// File: backend/models/Auction.js
const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Seller is required']
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    publicId: String // For Cloudinary or S3 deletion
  }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required']
  },
  condition: {
    type: String,
    enum: ['Like New', 'Excellent', 'Very Good', 'Good', 'Fair'],
    required: [true, 'Condition is required']
  },
  brand: {
    type: String,
    trim: true
  },
  ageRange: {
    type: String,
    enum: ['0-3 months', '3-6 months', '6-12 months', '1-2 years', '2-3 years', '3-5 years', '5+ years']
  },
  startingBid: {
    type: Number,
    required: [true, 'Starting bid is required'],
    min: [1, 'Starting bid must be at least $1']
  },
  currentBid: {
    type: Number,
    default: 0
  },
  bidIncrement: {
    type: Number,
    default: 1,
    min: [1, 'Bid increment must be at least $1']
  },
  buyNowPrice: {
    type: Number,
    required: [true, 'Buy now price is required'],
    validate: {
      validator: function(value) {
        return value > this.startingBid;
      },
      message: 'Buy now price must be greater than starting bid'
    }
  },
  reservePrice: {
    type: Number,
    select: false // Hidden from buyers
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date,
    required: [true, 'End time is required'],
    validate: {
      validator: function(value) {
        return value > this.startTime;
      },
      message: 'End time must be after start time'
    }
  },
  shipping: {
    cost: {
      type: Number,
      default: 0
    },
    method: {
      type: String,
      enum: ['standard', 'express', 'local_pickup'],
      default: 'standard'
    },
    freeShipping: {
      type: Boolean,
      default: false
    }
  },
  location: {
    city: String,
    state: String,
    zipCode: String
  },
  views: {
    type: Number,
    default: 0
  },
  watchers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isHot: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'sold', 'ended', 'cancelled'],
    default: 'active'
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  soldPrice: {
    type: Number
  },
  soldType: {
    type: String,
    enum: ['auction', 'buyNow']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
auctionSchema.index({ seller: 1, status: 1 });
auctionSchema.index({ category: 1, status: 1 });
auctionSchema.index({ endTime: 1, status: 1 });
auctionSchema.index({ title: 'text', description: 'text' });

// Virtual for time left
auctionSchema.virtual('timeLeft').get(function() {
  const now = new Date();
  const end = new Date(this.endTime);
  const diff = end - now;
  
  if (diff <= 0) return 'Ended';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
});

// Virtual for bid count
auctionSchema.virtual('bidCount', {
  ref: 'Bid',
  localField: '_id',
  foreignField: 'auction',
  count: true
});

// Virtual for shipping display
auctionSchema.virtual('shippingDisplay').get(function() {
  if (this.shipping.freeShipping) return 'Free';
  return this.shipping.cost === 0 ? 'Free' : `$${this.shipping.cost}`;
});

// Method to check if auction has ended
auctionSchema.methods.hasEnded = function() {
  return new Date() > this.endTime;
};

// Method to check if reserve is met
auctionSchema.methods.isReserveMet = function() {
  return !this.reservePrice || this.currentBid >= this.reservePrice;
};

// Pre-save middleware to auto-update status
auctionSchema.pre('save', function(next) {
  if (this.hasEnded() && this.status === 'active') {
    this.status = 'ended';
  }
  next();
});

const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;