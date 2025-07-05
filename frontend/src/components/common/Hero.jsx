// File: frontend/src/components/common/Hero.jsx
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Stack,
} from '@mui/material';
import {
  ArrowForward,
  Search,
  EmojiEvents,
  Gavel,
  Star,
  TrendingUp,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import '../../styles/Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Happy Parents', value: '10K+', icon: <EmojiEvents /> },
    { label: 'Items Sold', value: '50K+', icon: <Gavel /> },
    { label: 'Money Saved', value: '$2M+', icon: <Star /> },
    { label: 'Active Listings', value: '5K+', icon: <TrendingUp /> },
  ];

  return (
    <Box className="home-hero">
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={8} lg={6}>
            <Box className="home-hero-content">
              <Typography variant="h1" className="home-hero-title">
                Hop into Better Deals for Your
                <span className="home-hero-highlight"> Little Ones</span>
              </Typography>
              <Typography variant="h6" className="home-hero-subtitle">
                Buy and sell gently used baby & children's items through fun, 
                fast auctions. Save money while giving items a second life!
              </Typography>
              
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} className="home-hero-buttons">
                <Button
                  variant="contained"
                  size="large"
                  className="home-hero-cta-primary"
                  endIcon={<Search />}
                  onClick={() => navigate('/browse')}
                >
                  Start Shopping
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  className="home-hero-cta-secondary"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate('/sell')}
                >
                  List Your Items
                </Button>
              </Stack>

              {/* Quick Stats */}
              <Grid container spacing={2} className="home-hero-stats" justifyContent="center">
                {stats.map((stat, index) => (
                  <Grid item xs={6} sm={6} md={3} key={index}>
                    <Box className="home-stat-item">
                      <Box className="home-stat-icon">{stat.icon}</Box>
                      <Typography variant="h5" className="home-stat-value">
                        {stat.value}
                      </Typography>
                      <Typography variant="caption" className="home-stat-label">
                        {stat.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;