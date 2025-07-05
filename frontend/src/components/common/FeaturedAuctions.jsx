// File: frontend/src/components/common/FeaturedAuctions.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  IconButton,
  Avatar,
  Rating,
  Skeleton,
} from '@mui/material';
import {
  ArrowForward,
  Timer,
  TrendingUp,
  Favorite,
  FavoriteBorder,
  LocalShipping,
  Verified,
  Gavel,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/babybunnyresaletrans.png';
import '../../styles/FeaturedAuctions.css';

const FeaturedAuctions = () => {
  const navigate = useNavigate();
  const [featuredAuctions, setFeaturedAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    // Simulate API call - replace with actual API
    setTimeout(() => {
      setFeaturedAuctions([
        {
          id: 1,
          title: 'Graco Travel System',
          currentBid: 145,
          buyNowPrice: 250,
          bids: 12,
          timeLeft: '2h 15m',
          image: null,
          condition: 'Like New',
          seller: { name: 'Sarah M.', rating: 4.8, verified: true },
          shipping: 'Free',
          hot: true,
        },
        {
          id: 2,
          title: 'Baby Bundle 0-6 Months',
          currentBid: 89,
          buyNowPrice: 150,
          bids: 24,
          timeLeft: '4h 30m',
          image: null,
          condition: 'Excellent',
          seller: { name: 'Mike T.', rating: 4.9, verified: true },
          shipping: '$12',
          hot: true,
        },
        {
          id: 3,
          title: 'Wooden Activity Cube',
          currentBid: 25,
          buyNowPrice: 60,
          bids: 3,
          timeLeft: '6h 45m',
          image: null,
          condition: 'Very Good',
          seller: { name: 'Lisa K.', rating: 4.7, verified: false },
          shipping: '$8',
          hot: false,
        },
        {
          id: 4,
          title: 'Ergobaby Carrier',
          currentBid: 65,
          buyNowPrice: 120,
          bids: 8,
          timeLeft: '1d 2h',
          image: null,
          condition: 'Good',
          seller: { name: 'John D.', rating: 4.6, verified: true },
          shipping: 'Free',
          hot: false,
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const toggleFavorite = (id) => {
    setFavoriteItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleBuyNow = (auctionId) => {
    // Handle buy now action - navigate to checkout or add to cart
    console.log('Buy now clicked for auction:', auctionId);
    navigate(`/checkout/buy-now/${auctionId}`);
  };

  return (
    <Box className="home-featured-section">
      <Container maxWidth="lg">
        <Box className="home-section-header">
          <Box>
            <Typography variant="h3" className="home-section-title">
              Hot Auctions Ending Soon 🔥
            </Typography>
            <Typography variant="body1" className="home-section-subtitle">
              Don't miss out on these amazing deals!
            </Typography>
          </Box>
          <Button
            variant="text"
            endIcon={<ArrowForward />}
            onClick={() => navigate('/auctions')}
            className="home-view-all-button"
          >
            View All Auctions
          </Button>
        </Box>

        <Grid container spacing={3} justifyContent="center">
          {loading ? (
            // Loading skeletons
            [1, 2, 3, 4].map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item}>
                <Card className="home-auction-card">
                  <Skeleton variant="rectangular" height={200} />
                  <CardContent>
                    <Skeleton variant="text" />
                    <Skeleton variant="text" width="60%" />
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            featuredAuctions.map((auction) => (
              <Grid item xs={12} sm={6} md={3} key={auction.id}>
                <Card className="home-auction-card">
                  <Box className="home-auction-image-wrapper">
                    <CardMedia
                      component="div"
                      className="home-auction-image"
                      sx={{
                        backgroundColor: '#f5f5f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img 
                        src={logo} 
                        alt={auction.title}
                        style={{ opacity: 0.2, width: '60%' }}
                      />
                    </CardMedia>
                    
                    {/* Badges */}
                    <Box className="home-auction-badges">
                      {auction.hot && (
                        <Chip 
                          label="HOT" 
                          size="small" 
                          className="home-badge-hot"
                          icon={<TrendingUp />}
                        />
                      )}
                      <Chip 
                        label={auction.condition} 
                        size="small" 
                        className="home-badge-condition"
                      />
                    </Box>

                    {/* Favorite Button */}
                    <IconButton 
                      className="home-favorite-button"
                      onClick={() => toggleFavorite(auction.id)}
                    >
                      {favoriteItems.includes(auction.id) ? 
                        <Favorite className="home-favorite-active" /> : 
                        <FavoriteBorder />
                      }
                    </IconButton>

                    {/* Timer */}
                    <Box className="home-auction-timer">
                      <Timer fontSize="small" />
                      <Typography variant="caption">{auction.timeLeft}</Typography>
                    </Box>
                  </Box>

                  <CardContent className="home-auction-content">
                    <Typography variant="h6" className="home-auction-title">
                      {auction.title}
                    </Typography>

                    {/* Seller Info */}
                    <Box className="home-seller-info">
                      <Avatar sx={{ width: 24, height: 24 }}>
                        {auction.seller.name.charAt(0)}
                      </Avatar>
                      <Typography variant="caption">
                        {auction.seller.name}
                      </Typography>
                      {auction.seller.verified && (
                        <Verified className="home-verified-icon" />
                      )}
                      <Rating 
                        value={auction.seller.rating} 
                        size="small" 
                        readOnly 
                        precision={0.1}
                      />
                    </Box>

                    {/* Price Info */}
                    <Box className="home-price-section">
                      <Box>
                        <Typography variant="caption" color="textSecondary">
                          Current Bid
                        </Typography>
                        <Typography variant="h5" className="home-current-bid">
                          ${auction.currentBid}
                        </Typography>
                      </Box>
                      <Box textAlign="right">
                        <Typography variant="caption" color="textSecondary">
                          {auction.bids} bids
                        </Typography>
                        <Typography variant="body2" className="home-buy-now">
                          Buy Now: ${auction.buyNowPrice}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Shipping */}
                    <Box className="home-shipping-info">
                      <LocalShipping fontSize="small" />
                      <Typography variant="caption">
                        {auction.shipping === 'Free' ? 'Free Shipping' : `Shipping: ${auction.shipping}`}
                      </Typography>
                    </Box>
                  </CardContent>

                  <CardActions className="home-auction-actions">
                    <Button 
                      fullWidth 
                      variant="outlined" 
                      className="home-buy-now-button"
                      onClick={() => handleBuyNow(auction.id)}
                    >
                      Buy Now ${auction.buyNowPrice}
                    </Button>
                    <Button 
                      fullWidth 
                      variant="contained" 
                      className="home-bid-button"
                      startIcon={<Gavel />}
                      onClick={() => navigate(`/auction/${auction.id}`)}
                    >
                      Place Bid
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturedAuctions;