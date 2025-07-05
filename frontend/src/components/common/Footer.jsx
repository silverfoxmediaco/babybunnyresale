// File: frontend/src/components/common/Footer.jsx
import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  Chip,
} from '@mui/material';
import {
  Facebook,
  Instagram,
  Twitter,
  YouTube,
  Email,
  Phone,
  Favorite,
  Security,
  LocalShipping,
  Gavel,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Subscribe from './Subscribe';
import FootLinks from './FooterLinks';
import '../../styles/Footer.css';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Facebook />, url: 'https://facebook.com/babybunnyresale', label: 'Facebook' },
    { icon: <Instagram />, url: 'https://instagram.com/babybunnyresale', label: 'Instagram' },
    { icon: <Twitter />, url: 'https://twitter.com/babybunnyresale', label: 'Twitter' },
    { icon: <YouTube />, url: 'https://youtube.com/babybunnyresale', label: 'YouTube' },
  ];

  const features = [
    { icon: <Security />, label: 'Secure Payments' },
    { icon: <LocalShipping />, label: 'Easy Shipping' },
    { icon: <Gavel />, label: 'Fair Auctions' },
    { icon: <Favorite />, label: 'Parent Approved' },
  ];

  return (
    <Box component="footer" className="footer-container">
      {/* Features Bar */}
      <Box className="footer-features">
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Box className="footer-feature-item">
                  <Box className="footer-feature-icon">
                    {feature.icon}
                  </Box>
                  <Typography variant="body2" className="footer-feature-text">
                    {feature.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Subscribe Section */}
      <Container maxWidth="lg">
        <Subscribe />
      </Container>

      {/* Footer Links Section */}
      <Container maxWidth="lg">
        <FootLinks />
      </Container>

      {/* Social Links */}
      <Container maxWidth="lg">
        <Box className="footer-social-section">
          <Box className="footer-social-links">
            {socialLinks.map((social, index) => (
              <IconButton
                key={index}
                className="footer-social-icon"
                onClick={() => window.open(social.url, '_blank')}
                aria-label={social.label}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Container>

      <Container maxWidth="lg">
        <Divider className="footer-divider" />

        {/* Bottom Section */}
<Box className="footer-bottom">
  <Box className="footer-bottom-content">
    {/* Copyright and Legal Links */}
    <Box className="footer-bottom-legal">
      <Typography variant="body2" className="footer-copyright">
        © {currentYear} Baby Bunny Resale. All rights reserved.
      </Typography>
      <Box className="footer-legal-links">
        <Link
          className="footer-legal-link"
          onClick={() => navigate('/privacy')}
          underline="none"
        >
          Privacy Policy
        </Link>
        <span className="footer-separator">•</span>
        <Link
          className="footer-legal-link"
          onClick={() => navigate('/terms')}
          underline="none"
        >
          Terms of Service
        </Link>
        <span className="footer-separator">•</span>
        <Link
          className="footer-legal-link"
          onClick={() => navigate('/cookies')}
          underline="none"
        >
          Cookie Policy
        </Link>
      </Box>
    </Box>
    
    {/* Contact Info */}
    <Box className="footer-contact-info">
      <Chip
        icon={<Email />}
        label="support@babybunnyresale.com"
        className="footer-contact-chip"
        onClick={() => window.location.href = 'mailto:support@babybunnyresale.com'}
      />
      <Chip
        icon={<Phone />}
        label="1-800-BUNNY"
        className="footer-contact-chip"
        onClick={() => window.location.href = 'tel:1-800-28669'}
      />
    </Box>
  </Box>
</Box>

        {/* Made with Love */}
        <Box className="footer-made-with-love">
          <Typography variant="caption">
            Made with <Favorite className="footer-heart-icon" /> for parents, by parents
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;