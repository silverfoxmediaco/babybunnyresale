// File: frontend/src/components/cards/AuctionCard.jsx
import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
  Chip,
  IconButton,
  Avatar,
  Rating,
} from '@mui/material';
import {
  Timer,
  Favorite,
  FavoriteBorder,
  LocalShipping,
  Verified,
  Gavel,
  TrendingUp,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { auctionAPI } from '../../services/api';
import logo from '../../assets/images/babybunnyresaletrans.png';
import '../../styles/AuctionCard.css';

const AuctionCard = ({ auction, onFavoriteToggle }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(
    auction.watchers?.includes(user?._id) || false
  );
  const [loading, setLoading] = useState(false);

  const handleFavoriteToggle = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      const response = await auctionAPI.watch(auction._id);
      setIsFavorite(response.data.watching);
      if (onFavoriteToggle) {
        onFavoriteToggle(auction._id, response.data.watching);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      // For mock data, just toggle the state
      setIsFavorite(!isFavorite);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/checkout/buy-now/${auction._id}`);
  };

  const handlePlaceBid = () => {
    navigate(`/auction/${auction._id}`);
  };

  // Calculate time left
  const getTimeLeft = () => {
    if (auction.timeLeft) return auction.timeLeft; // Use provided timeLeft for mock data
    
    const now = new Date();
    const endTime = new Date(auction.endTime);
    const diff = endTime - now;

    if (diff <= 0) return 'Ended';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <Card className="auction-card">
      {/* Image Section */}
      <Box className="auction-card-image-wrapper">
        <CardMedia
          component="div"
          className="auction-card-image"
          sx={{
            backgroundColor: '#f5f5f5',
            backgroundImage: auction.images?.[0]?.url 
              ? `url(${auction.images[0].url})` 
              : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={handlePlaceBid}
        >
          {!auction.images?.[0]?.url && (
            <img 
              src={logo} 
              alt={auction.title}
              style={{ opacity: 0.2, width: '60%' }}
            />
          )}
        </CardMedia>

        {/* Badges */}
        <Box className="auction-card-badges">
          {auction.isHot && (
            <Chip 
              label="HOT" 
              size="small" 
              icon={<TrendingUp />}
              className="auction-badge-hot"
            />
          )}
          <Chip 
            label={auction.condition} 
            size="small"
            className="auction-badge-condition"
          />
        </Box>

        {/* Favorite Button */}
        <IconButton 
          className="auction-favorite-button"
          onClick={handleFavoriteToggle}
          disabled={loading}
          size="small"
        >
          {isFavorite ? 
            <Favorite className="auction-favorite-active" /> : 
            <FavoriteBorder />
          }
        </IconButton>

        {/* Timer */}
        <Box className="auction-timer-badge">
          <Timer fontSize="small" />
          <Typography variant="caption">
            {getTimeLeft()}
          </Typography>
        </Box>
      </Box>

      {/* Content Section */}
      <CardContent className="auction-card-content">
        <Typography variant="h6" className="auction-card-title">
          {auction.title}
        </Typography>

        {/* Seller Info */}
        <Box className="auction-seller-info">
          <Avatar sx={{ width: 24, height: 24 }}>
            {auction.seller?.name?.charAt(0) || 'S'}
          </Avatar>
          <Typography variant="caption">
            {auction.seller?.name || 'Seller'}
          </Typography>
          {auction.seller?.isVerified && (
            <Verified className="auction-verified-icon" />
          )}
          <Rating 
            value={auction.seller?.rating || 0} 
            size="small" 
            readOnly 
            precision={0.1}
          />
        </Box>

        {/* Price Info */}
        <Box className="auction-price-section">
          <Box>
            <Typography variant="caption" color="textSecondary">
              Current Bid
            </Typography>
            <Typography variant="h5" className="auction-current-bid">
              ${auction.currentBid || auction.startingBid}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {auction.bidCount || 0} bids
            </Typography>
          </Box>
          <Box textAlign="right">
            <Typography variant="body2" className="auction-buy-now-price">
              Buy Now: ${auction.buyNowPrice}
            </Typography>
          </Box>
        </Box>

        {/* Shipping Info */}
        <Box className="auction-shipping-info">
          <LocalShipping fontSize="small" />
          <Typography variant="caption">
            {auction.shipping?.freeShipping || auction.shippingDisplay === 'Free' 
              ? 'Free Shipping' 
              : `Shipping: $${auction.shipping?.cost || 0}`}
          </Typography>
        </Box>
      </CardContent>

      {/* Actions */}
      <CardActions className="auction-card-actions">
        <Button 
          fullWidth 
          variant="outlined"
          onClick={handleBuyNow}
          className="auction-buy-button"
        >
          Buy Now
        </Button>
        <Button 
          fullWidth 
          variant="contained"
          startIcon={<Gavel />}
          onClick={handlePlaceBid}
          className="auction-bid-button"
        >
          Place Bid
        </Button>
      </CardActions>
    </Card>
  );
};

export default AuctionCard;