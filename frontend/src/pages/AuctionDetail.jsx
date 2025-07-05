// File: frontend/src/pages/AuctionDetail.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  Chip,
  Avatar,
  Rating,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Tabs,
  Tab,
  Alert,
  Skeleton,
  Card,
  CardContent,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Share,
  Verified,
  LocalShipping,
  Security,
  Timer,
  Gavel,
  TrendingUp,
  LocationOn,
  Category,
  CheckCircle,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSocket } from '../contexts/SocketContext';
import { auctionAPI, bidAPI } from '../services/api';

const AuctionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { joinAuction, leaveAuction, onNewBid } = useSocket();

  const [auction, setAuction] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState('');
  const [bidding, setBidding] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    fetchAuctionDetails();
    
    // Join auction room for real-time updates
    if (id) {
      joinAuction(id);
    }

    // Listen for new bids
    const unsubscribe = onNewBid((data) => {
      if (data.auctionId === id) {
        handleNewBid(data);
      }
    });

    return () => {
      if (id) {
        leaveAuction(id);
      }
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [id]);

  const fetchAuctionDetails = async () => {
    try {
      setLoading(true);
      const response = await auctionAPI.getOne(id);
      const { auction, bids, bidCount } = response.data.data;
      
      setAuction({ ...auction, bidCount });
      setBids(bids);
      setIsFavorite(auction.watchers?.includes(user?._id) || false);
      
      // Set minimum bid amount
      const minBid = auction.currentBid > 0 
        ? auction.currentBid + auction.bidIncrement 
        : auction.startingBid;
      setBidAmount(minBid.toString());
    } catch (error) {
      console.error('Error fetching auction:', error);
      setError('Failed to load auction details');
    } finally {
      setLoading(false);
    }
  };

  const handleNewBid = (bidData) => {
    // Update auction current bid
    setAuction(prev => ({
      ...prev,
      currentBid: bidData.amount,
      bidCount: (prev.bidCount || 0) + 1,
    }));

    // Add new bid to list
    setBids(prev => [{
      _id: Date.now(),
      amount: bidData.amount,
      bidder: bidData.bidder,
      createdAt: bidData.timestamp,
    }, ...prev]);

    // Update minimum bid
    const newMinBid = bidData.amount + (auction?.bidIncrement || 1);
    setBidAmount(newMinBid.toString());
  };

  const handlePlaceBid = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setBidding(true);
      setError('');
      setSuccess('');

      const response = await bidAPI.placeBid({
        auctionId: id,
        amount: parseFloat(bidAmount),
      });

      setSuccess('Bid placed successfully!');
      
      // Update will come through socket
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to place bid');
    } finally {
      setBidding(false);
    }
  };

  const handleBuyNow = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const response = await auctionAPI.buyNow(id);
      navigate(`/checkout/buy-now/${id}`);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to process buy now');
    }
  };

  const handleFavoriteToggle = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const response = await auctionAPI.watch(id);
      setIsFavorite(response.data.watching);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const getTimeLeft = () => {
    if (!auction) return '';
    
    const now = new Date();
    const endTime = new Date(auction.endTime);
    const diff = endTime - now;

    if (diff <= 0) return 'Ended';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" height={500} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" />
            <Skeleton variant="rectangular" height={300} sx={{ mt: 2 }} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (!auction) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Auction not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Images Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            {/* Main Image */}
            <Box
              sx={{
                width: '100%',
                height: 500,
                backgroundColor: 'grey.100',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
                borderRadius: 1,
                overflow: 'hidden',
              }}
            >
              {auction.images?.[selectedImage]?.url ? (
                <img
                  src={auction.images[selectedImage].url}
                  alt={auction.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              ) : (
                <Typography color="text.secondary">No image available</Typography>
              )}
            </Box>

            {/* Thumbnail Images */}
            {auction.images?.length > 1 && (
              <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto' }}>
                {auction.images.map((image, index) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    sx={{
                      width: 80,
                      height: 80,
                      cursor: 'pointer',
                      border: selectedImage === index ? 2 : 1,
                      borderColor: selectedImage === index ? 'primary.main' : 'divider',
                      borderRadius: 1,
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={image.url}
                      alt={`${auction.title} ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Details Section */}
        <Grid item xs={12} md={6}>
          {/* Title and Actions */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" fontWeight={600} gutterBottom>
                {auction.title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                {auction.isHot && (
                  <Chip 
                    label="HOT ITEM" 
                    icon={<TrendingUp />}
                    color="error"
                    size="small"
                  />
                )}
                <Chip 
                  label={auction.condition} 
                  color="primary"
                  size="small"
                />
                <Chip 
                  label={auction.category?.name || 'General'} 
                  icon={<Category />}
                  size="small"
                />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton onClick={handleFavoriteToggle}>
                {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
              </IconButton>
              <IconButton>
                <Share />
              </IconButton>
            </Box>
          </Box>

          {/* Seller Info */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ width: 48, height: 48 }}>
                {auction.seller?.name?.charAt(0) || 'S'}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="subtitle1" fontWeight={500}>
                    {auction.seller?.name}
                  </Typography>
                  {auction.seller?.isVerified && (
                    <Verified sx={{ fontSize: 18, color: 'primary.main' }} />
                  )}
                </Box>
                <Rating 
                  value={auction.seller?.rating || 0} 
                  size="small" 
                  readOnly 
                  precision={0.1}
                />
              </Box>
              <Button variant="outlined" size="small">
                View Profile
              </Button>
            </Box>
          </Paper>

          {/* Price and Bidding */}
          <Paper sx={{ p: 3, mb: 3 }}>
            {/* Timer */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1, 
              mb: 3,
              p: 2,
              backgroundColor: 'warning.light',
              borderRadius: 1,
            }}>
              <Timer />
              <Typography variant="h6">
                {getTimeLeft() === 'Ended' ? 'Auction Ended' : `Ends in ${getTimeLeft()}`}
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Current Bid
                </Typography>
                <Typography variant="h4" fontWeight={700} color="primary">
                  ${auction.currentBid || auction.startingBid}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {auction.bidCount || 0} bids
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Buy It Now
                </Typography>
                <Typography variant="h4" fontWeight={700}>
                  ${auction.buyNowPrice}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 1 }}
                  onClick={handleBuyNow}
                  disabled={auction.status !== 'active'}
                >
                  Buy Now
                </Button>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Bid Form */}
            {auction.status === 'active' && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Place Your Bid
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Bid Amount"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    InputProps={{
                      startAdornment: '$',
                    }}
                    helperText={`Minimum bid: $${auction.currentBid > 0 
                      ? auction.currentBid + auction.bidIncrement 
                      : auction.startingBid}`}
                  />
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<Gavel />}
                    onClick={handlePlaceBid}
                    disabled={bidding || !bidAmount}
                    sx={{ minWidth: 150 }}
                  >
                    {bidding ? 'Placing...' : 'Place Bid'}
                  </Button>
                </Box>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
              </Box>
            )}
          </Paper>

          {/* Shipping Info */}
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LocalShipping color="primary" />
              <Box>
                <Typography variant="subtitle1" fontWeight={500}>
                  {auction.shipping?.freeShipping ? 'Free Shipping' : `Shipping: $${auction.shipping?.cost || 0}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {auction.shipping?.method === 'local_pickup' 
                    ? `Local pickup available in ${auction.location?.city || 'seller location'}`
                    : 'Standard shipping available'}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Tabs Section */}
      <Box sx={{ mt: 4 }}>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
          <Tab label="Description" />
          <Tab label={`Bid History (${bids.length})`} />
          <Tab label="Shipping & Returns" />
        </Tabs>

        {/* Description Tab */}
        {tabValue === 0 && (
          <Box sx={{ py: 3 }}>
            <Typography variant="body1" paragraph>
              {auction.description}
            </Typography>
            
            {auction.brand && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Brand
                </Typography>
                <Typography>{auction.brand}</Typography>
              </Box>
            )}
            
            {auction.ageRange && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Age Range
                </Typography>
                <Typography>{auction.ageRange}</Typography>
              </Box>
            )}
          </Box>
        )}

        {/* Bid History Tab */}
        {tabValue === 1 && (
          <Box sx={{ py: 3 }}>
            {bids.length === 0 ? (
              <Typography color="text.secondary">No bids yet. Be the first!</Typography>
            ) : (
              <List>
                {bids.map((bid, index) => (
                  <ListItem key={bid._id} divider={index < bids.length - 1}>
                    <ListItemAvatar>
                      <Avatar>
                        {bid.bidder?.name?.charAt(0) || 'B'}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`$${bid.amount}`}
                      secondary={`${bid.bidder?.name || 'Anonymous'} • ${new Date(bid.createdAt).toLocaleString()}`}
                    />
                    {index === 0 && (
                      <Chip label="Winning" color="success" size="small" />
                    )}
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        )}

        {/* Shipping Tab */}
        {tabValue === 2 && (
          <Box sx={{ py: 3 }}>
            <Typography variant="h6" gutterBottom>
              Shipping Information
            </Typography>
            <Typography paragraph>
              This item ships from {auction.location?.city || 'seller location'}.
              {auction.shipping?.freeShipping 
                ? ' Free shipping is included.'
                : ` Shipping cost: $${auction.shipping?.cost || 0}.`}
            </Typography>
            
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Return Policy
            </Typography>
            <Typography paragraph>
              All sales are final. Please review the item description and photos carefully 
              before bidding. Contact the seller with any questions before placing a bid.
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
              <Security color="primary" />
              <Typography variant="body2">
                Your purchase is protected by our buyer protection program
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default AuctionDetail;