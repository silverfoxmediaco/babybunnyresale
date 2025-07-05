// File: frontend/src/components/common/Subscribe.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { Send } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/babybunnyresaletrans.png';
import '../../styles/Subscribe.css';

const Subscribe = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <Box className="subscribe-container">
      {/* Left Column - Logo */}
      <Box className="subscribe-logo-section">
        <Box 
          className="subscribe-logo-wrapper"
          onClick={() => navigate('/')}
        >
          <img 
            src={logo} 
            alt="Baby Bunny Resale" 
            className="subscribe-logo"
          />
        </Box>
      </Box>

      {/* Right Column - Newsletter */}
      <Box className="subscribe-content">
        {/* Tagline */}
        <Typography variant="body2" className="subscribe-tagline">
          Your trusted marketplace for quality pre-loved baby and children's items. 
          Join thousands of parents saving money and reducing waste!
        </Typography>

        {/* Newsletter */}
        <Box className="subscribe-newsletter">
          <Typography variant="h6" className="subscribe-newsletter-title">
            Get the best deals in your inbox
          </Typography>
          <form onSubmit={handleSubmit} className="subscribe-newsletter-form">
            <TextField
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              size="small"
              className="subscribe-newsletter-input"
              InputProps={{
                className: "subscribe-newsletter-input-field",
              }}
            />
            <Button
              type="submit"
              variant="contained"
              className="subscribe-newsletter-button"
              endIcon={<Send />}
            >
              Subscribe
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Subscribe;