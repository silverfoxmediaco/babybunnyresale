// File: frontend/src/pages/Browse.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  Pagination,
  Skeleton,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import AuctionCard from '../components/cards/AuctionCard';
import BrowseFilters from '../components/BrowseFilters';
import { auctionAPI, categoryAPI } from '../services/api';
import { mockAuctions, mockCategories, filterMockAuctions } from '../components/MockData';
import '../styles/Browse.css';

const Browse = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [auctions, setAuctions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    condition: searchParams.get('condition') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: searchParams.get('sort') || '-createdAt',
    page: parseInt(searchParams.get('page')) || 1,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchAuctions();
  }, [filters]);

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAll();
      // Check if response has data
      if (response.data && response.data.data && response.data.data.length > 0) {
        setCategories(response.data.data);
      } else {
        // Use mock data if API returns empty
        console.log('API returned no categories, using mock data');
        setCategories(mockCategories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories(mockCategories);
    }
  };

  const fetchAuctions = async () => {
    try {
      setLoading(true);
      
      const params = {
        page: filters.page,
        limit: 12,
      };
      if (filters.search) params.search = filters.search;
      if (filters.category) params.category = filters.category;
      if (filters.condition) params.condition = filters.condition;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;
      if (filters.sort) params.sort = filters.sort;

      const response = await auctionAPI.getAll(params);
      
      // Check if response has data
      if (response.data && response.data.data && response.data.data.length > 0) {
        setAuctions(response.data.data);
        setTotalPages(response.data.totalPages || 1);
      } else {
        // Use mock data if API returns empty
        console.log('API returned no auctions, using mock data');
        const filtered = filterMockAuctions(filters);
        const startIndex = (filters.page - 1) * 12;
        const endIndex = startIndex + 12;
        setAuctions(filtered.slice(startIndex, endIndex));
        setTotalPages(Math.ceil(filtered.length / 12));
      }
    } catch (error) {
      console.error('Error fetching auctions:', error);
      // Use mock data on error
      const filtered = filterMockAuctions(filters);
      const startIndex = (filters.page - 1) * 12;
      const endIndex = startIndex + 12;
      setAuctions(filtered.slice(startIndex, endIndex));
      setTotalPages(Math.ceil(filtered.length / 12));
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (name, value) => {
    const newFilters = { ...filters, [name]: value, page: 1 };
    setFilters(newFilters);
    const newParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, val]) => {
      if (val && val !== '' && !(key === 'page' && val === 1)) {
        newParams.set(key, val);
      }
    });
    setSearchParams(newParams);
  };

  const handlePageChange = (event, value) => {
    handleFilterChange('page', value);
    window.scrollTo(0, 0);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      category: '',
      condition: '',
      minPrice: '',
      maxPrice: '',
      sort: '-createdAt',
      page: 1,
    };
    setFilters(clearedFilters);
    setSearchParams(new URLSearchParams());
  };

  const activeFilterCount = Object.entries(filters).filter(
    ([key, value]) => value && key !== 'sort' && key !== 'page'
  ).length;

  return (
    <Container maxWidth="xl" className="browse-container">
      <Box className="browse-header">
        <Typography variant="h3" className="browse-title">
          Browse Auctions
        </Typography>
        <Typography variant="body1" className="browse-subtitle">
          Find amazing deals on quality baby and children's items
        </Typography>
      </Box>

      {/* BrowseFilters Component */}
      <BrowseFilters
        filters={filters}
        categories={categories}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        activeFilterCount={activeFilterCount}
      />

      {/* Results */}
      {loading ? (
        <Grid container spacing={3} className="browse-loading-grid" justifyContent="center">
          {[...Array(12)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Skeleton variant="rectangular" className="browse-skeleton-card" />
            </Grid>
          ))}
        </Grid>
      ) : auctions.length === 0 ? (
        <Box className="browse-empty-state">
          <Search className="browse-empty-icon" />
          <Typography variant="h5" className="browse-empty-title">
            No auctions found
          </Typography>
          <Typography variant="body1" className="browse-empty-message">
            Try adjusting your filters or search terms to find what you're looking for.
          </Typography>
          <Box className="browse-empty-actions">
            <button onClick={clearFilters} className="browse-empty-button-primary">
              Clear Filters
            </button>
          </Box>
        </Box>
      ) : (
        <Box className="browse-results-container">
          <Typography variant="body2" className="browse-results-count">
            Showing {auctions.length} of {totalPages * 12} auctions
          </Typography>
          <Grid container spacing={3} className="browse-auction-grid" justifyContent="center">
            {auctions.map((auction) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={auction._id}>
                <AuctionCard auction={auction} />
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box className="browse-pagination-container">
              <Pagination
                count={totalPages}
                page={filters.page}
                onChange={handlePageChange}
                color="primary"
                size="large"
                className="browse-pagination"
              />
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
};

export default Browse;