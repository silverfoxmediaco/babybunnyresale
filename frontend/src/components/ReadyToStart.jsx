// File: frontend/src/components/ReadyToStart.jsx
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import '../styles/ReadyToStart.css';

const ReadyToStart = () => {
  const navigate = useNavigate();

  return (
    <Box className="ready-to-start-section">
      <Container maxWidth="md">
        <Typography variant="h3" className="ready-to-start-title">
          Ready to Start Saving?
        </Typography>
        <Typography variant="h6" className="ready-to-start-subtitle">
          Join thousands of parents buying and selling baby items the smart way
        </Typography>
        <Button
          variant="contained"
          size="large"
          className="ready-to-start-button"
          endIcon={<ArrowForward />}
          onClick={() => navigate('/register')}
        >
          Create Free Account
        </Button>
      </Container>
    </Box>
  );
};

export default ReadyToStart;