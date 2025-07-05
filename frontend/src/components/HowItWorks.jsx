// File: frontend/src/components/HowItWorks.jsx
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import {
  CameraAlt,
  TrendingUp,
  LocalShipping,
  ArrowForward,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import '../styles/HowItWorks.css';

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: 1,
      icon: <CameraAlt />,
      title: 'List Your Items',
      description: 'Take photos, set your price, and list your gently used baby items in minutes',
      color: '#F27026',
    },
    {
      number: 2,
      icon: <TrendingUp />,
      title: 'Watch Bids Roll In',
      description: 'Parents bid on your items, driving up the price in our fun auction format',
      color: '#39C3C9',
    },
    {
      number: 3,
      icon: <LocalShipping />,
      title: 'Ship & Get Paid',
      description: 'Once sold, ship to the buyer and receive secure payment directly to your account',
      color: '#F3B796',
    },
  ];

  return (
    <Box className="how-it-works-section">
      <Container maxWidth="lg">
        <Box className="how-it-works-header">
          <Typography variant="h3" className="how-it-works-title">
            How Baby Bunny Resale Works
          </Typography>
          <Typography variant="body1" className="how-it-works-subtitle">
            Start selling in just 3 simple steps
          </Typography>
        </Box>

        <Grid container spacing={4} className="how-it-works-steps">
          {steps.map((step, index) => (
            <Grid item xs={12} md={4} key={step.number}>
              <Box className="how-it-works-step">
                <Box 
                  className="how-it-works-step-icon-wrapper"
                  sx={{ backgroundColor: `${step.color}20` }}
                >
                  <Box className="how-it-works-step-icon" sx={{ color: step.color }}>
                    {step.icon}
                  </Box>
                </Box>
                <Box className="how-it-works-step-number">
                  {step.number}
                </Box>
                <Typography variant="h5" className="how-it-works-step-title">
                  {step.title}
                </Typography>
                <Typography variant="body2" className="how-it-works-step-description">
                  {step.description}
                </Typography>
                {index < steps.length - 1 && (
                  <Box className="how-it-works-connector">
                    <ArrowForward />
                  </Box>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box className="how-it-works-cta">
          <Button
            variant="contained"
            size="large"
            className="how-it-works-cta-button"
            onClick={() => navigate('/sell')}
            endIcon={<ArrowForward />}
          >
            Start Selling Today
          </Button>
          <Typography variant="body2" className="how-it-works-cta-text">
            Join thousands of parents already using Baby Bunny Resale
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorks;