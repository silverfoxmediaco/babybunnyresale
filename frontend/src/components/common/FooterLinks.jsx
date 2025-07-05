// File: frontend/src/components/common/FootLinks.jsx
import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../styles/FooterLinks.css';

const FootLinks = () => {
  const navigate = useNavigate();

  const footerSections = [
    {
      title: 'Shop',
      links: [
        { label: 'Browse All', path: '/browse' },
        { label: 'Active Auctions', path: '/auctions' },
        { label: 'Ending Soon', path: '/auctions?sort=ending-soon' },
        { label: 'New Arrivals', path: '/browse?sort=newest' },
        { label: 'Categories', path: '/categories' },
      ],
    },
    {
      title: 'Sell',
      links: [
        { label: 'Start Selling', path: '/sell' },
        { label: 'Seller Guide', path: '/seller-guide' },
        { label: 'Pricing Guide', path: '/pricing-guide' },
        { label: 'Shipping Tips', path: '/shipping-tips' },
      ],
    },
    {
      title: 'Help & Support',
      links: [
        { label: 'Help Center', path: '/help' },
        { label: 'Contact Us', path: '/contact' },
        { label: 'FAQ', path: '/faq' },
        { label: 'Safety Tips', path: '/safety' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', path: '/about' },
        { label: 'How It Works', path: '/how-it-works' },
        { label: 'Blog', path: '/blog' },
        { label: 'Press', path: '/press' },
      ],
    },
  ];

  const handleLinkClick = (path) => {
    navigate(path);
  };

  return (
    <Box className="footer-links-container">
      <Grid container spacing={2} className="footer-links-grid">
        {footerSections.map((section) => (
          <Grid item xs={6} sm={6} md={3} key={section.title} className="footer-links-column">
            <Box>
              <Typography variant="h6" className="footer-section-title">
                {section.title}
              </Typography>
              <Box className="footer-links">
                {section.links.map((link) => (
                  <Link
                    key={link.label}
                    className="footer-link"
                    onClick={() => handleLinkClick(link.path)}
                    underline="none"
                  >
                    {link.label}
                  </Link>
                ))}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FootLinks;