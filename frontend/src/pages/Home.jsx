// File: frontend/src/pages/Home.jsx
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
  Paper,
  Stack,
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
  Category,
  Search,
  Gavel,
  EmojiEvents,
  Star,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/common/Hero';
import ShopByCat from '../components/common/ShopByCat';
import FeaturedAuctions from '../components/common/FeaturedAuctions';
import HowItWorks from '../components/HowItWorks';
import BunnyVideo from '../components/common/BunnyVideo';
import ReadyToStart from '../components/ReadyToStart';
import '../styles/Home.css';

// Import images
import logo from '../assets/images/babybunnyresaletrans.png';

const Home = () => {
  const navigate = useNavigate();
  const [featuredAuctions, setFeaturedAuctions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoriteItems, setFavoriteItems] = useState([]);

  // Mock data - replace with API calls
  useEffect(() => {
    // Simulate API call
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

      setCategories([
        { id: 1, name: 'Clothing', icon: '👕', count: 1234 },
        { id: 2, name: 'Toys', icon: '🧸', count: 856 },
        { id: 3, name: 'Strollers', icon: '🏃', count: 342 },
        { id: 4, name: 'Nursery', icon: '🏠', count: 567 },
        { id: 5, name: 'Feeding', icon: '🍼', count: 423 },
        { id: 6, name: 'Safety', icon: '🛡️', count: 289 },
        { id: 7, name: 'Books', icon: '📚', count: 654 },
        { id: 8, name: 'Outdoor', icon: '🌳', count: 198 },
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

  const stats = [
    { label: 'Happy Parents', value: '10K+', icon: <EmojiEvents /> },
    { label: 'Items Sold', value: '50K+', icon: <Gavel /> },
    { label: 'Money Saved', value: '$2M+', icon: <Star /> },
    { label: 'Active Listings', value: '5K+', icon: <TrendingUp /> },
  ];

  return (
    <Box className="home-container">
      {/* Video Section */}
      <BunnyVideo />
      <Hero />
      <ShopByCat />
      <FeaturedAuctions />
      <HowItWorks />
      <ReadyToStart />
    </Box>
  );
};

export default Home;