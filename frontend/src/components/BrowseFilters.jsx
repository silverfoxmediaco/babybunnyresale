// File: frontend/src/components/BrowseFilters.jsx
import React from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Paper,
  InputAdornment,
  Typography,
} from '@mui/material';
import { Search, FilterList } from '@mui/icons-material';
import '../styles/BrowseFilters.css';

const BrowseFilters = ({ 
  filters, 
  categories, 
  onFilterChange, 
  onClearFilters, 
  activeFilterCount 
}) => {
  const sortOptions = [
    { value: '-createdAt', label: 'Newest First' },
    { value: 'createdAt', label: 'Oldest First' },
    { value: 'currentBid', label: 'Price: Low to High' },
    { value: '-currentBid', label: 'Price: High to Low' },
    { value: 'endTime', label: 'Ending Soon' },
    { value: '-views', label: 'Most Popular' },
  ];

  const conditionOptions = [
    'Like New',
    'Excellent',
    'Very Good',
    'Good',
    'Fair',
  ];

  return (
    <Paper className="browse-filters-container" elevation={0}>
      <div className="browse-filters-grid">
        {/* Search Bar - Full Width */}
        <div className="browse-filter-search-wrapper">
          <TextField
            fullWidth
            placeholder="Search for strollers, toys, clothes..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="browse-filter-search"
            size="medium"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search className="search-icon" />
                </InputAdornment>
              ),
            }}
          />
        </div>

        {/* Category Dropdown */}
        <div className="browse-filter-item">
          <FormControl fullWidth className="browse-filter-dropdown" size="medium">
            <InputLabel>Category</InputLabel>
            <Select
              value={filters.category}
              label="Category"
              onChange={(e) => onFilterChange('category', e.target.value)}
            >
              <MenuItem value="">
                <span className="menu-item-all">All Categories</span>
              </MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  <span className="category-menu-item">
                    <span className="category-icon">{cat.icon}</span>
                    <span className="category-name">{cat.name}</span>
                  </span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Condition Dropdown */}
        <div className="browse-filter-item">
          <FormControl fullWidth className="browse-filter-dropdown" size="medium">
            <InputLabel>Condition</InputLabel>
            <Select
              value={filters.condition}
              label="Condition"
              onChange={(e) => onFilterChange('condition', e.target.value)}
            >
              <MenuItem value="">
                <span className="menu-item-all">Any Condition</span>
              </MenuItem>
              {conditionOptions.map((condition) => (
                <MenuItem key={condition} value={condition}>
                  {condition}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Price Range - Min */}
        <div className="browse-filter-item">
          <TextField
            fullWidth
            type="number"
            label="Min Price"
            value={filters.minPrice}
            onChange={(e) => onFilterChange('minPrice', e.target.value)}
            className="browse-filter-price"
            size="medium"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
        </div>
        
        {/* Price Range - Max */}
        <div className="browse-filter-item">
          <TextField
            fullWidth
            type="number"
            label="Max Price"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange('maxPrice', e.target.value)}
            className="browse-filter-price"
            size="medium"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
        </div>

        {/* Sort Dropdown */}
        <div className="browse-filter-item">
          <FormControl fullWidth className="browse-filter-dropdown" size="medium">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={filters.sort}
              label="Sort By"
              onChange={(e) => onFilterChange('sort', e.target.value)}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      {/* Active Filters Bar */}
      {activeFilterCount > 0 && (
        <Box className="browse-filters-active">
          <FilterList className="active-filters-icon" />
          <Typography variant="body2" className="active-filters-count">
            {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active
          </Typography>
          <Chip
            label="Clear All"
            size="small"
            onClick={onClearFilters}
            className="clear-filters-chip"
          />
        </Box>
      )}
    </Paper>
  );
};

export default BrowseFilters;