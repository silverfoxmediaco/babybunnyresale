// File: frontend/src/components/common/ShopByCat.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../styles/ShopByCat.css';

const ShopByCat = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // This can be replaced with an API call
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
  }, []);

  return (
    <Container maxWidth="lg" className="home-categories-section">
      <Typography variant="h3" className="home-section-title">
        Shop by Category
      </Typography>
      <Typography variant="body1" className="home-section-subtitle">
        Find exactly what you need for your little one
      </Typography>
      
      <Grid container spacing={2} justifyContent="center">
        {categories.map((category) => (
          <Grid item xs={6} sm={4} md={3} lg={1.5} key={category.id}>
            <Paper 
              className="home-category-card"
              onClick={() => navigate(`/browse?category=${category.name.toLowerCase()}`)}
            >
              <Typography variant="h2" className="home-category-icon">
                {category.icon}
              </Typography>
              <Typography variant="subtitle2" className="home-category-name">
                {category.name}
              </Typography>
              <Typography variant="caption" className="home-category-count">
                {category.count} items
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ShopByCat;