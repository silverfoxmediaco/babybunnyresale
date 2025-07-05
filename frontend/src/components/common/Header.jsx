// File: frontend/src/components/common/Header.jsx
import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  ShoppingCart,
  Favorite,
  Add,
  Notifications,
  Gavel,
  Store,
  Dashboard,
  Settings,
  Logout,
  Search,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/babybunnyresaletrans.png';
import hamburgerMenu from '../../assets/images/hamburgermenu.png';
import closingX from '../../assets/images/closingx.png';
import '../../styles/Header.css';

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  
  const navigate = useNavigate();

  // Mock user data
  const isAuthenticated = false;
  const user = {
    name: 'John Doe',
    avatar: null,
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const navigationItems = [
    { label: 'Browse', path: '/browse', icon: <Search /> },
    { label: 'Auctions', path: '/auctions', icon: <Gavel /> },
    { label: 'Sell', path: '/sell', icon: <Store /> },
  ];

  const userMenuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <Dashboard /> },
    { label: 'My Listings', path: '/my-listings', icon: <Store /> },
    { label: 'Watchlist', path: '/watchlist', icon: <Favorite /> },
    { label: 'Settings', path: '/settings', icon: <Settings /> },
  ];

  return (
    <AppBar 
      position="sticky" 
      className={`header-container ${scrolled ? 'header-scrolled' : ''}`}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters className="header-toolbar-mobile">
          {/* Logo and Brand */}
          <Box 
            className="header-logo-wrapper"
            onClick={() => navigate('/')}
          >
            <img
              src={logo}
              alt="Baby Bunny Resale"
              className="header-logo"
            />
          </Box>

          {/* Desktop Navigation */}
          <Box className="header-nav">
            {navigationItems.map((item) => (
              <Button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="header-nav-button"
                startIcon={item.icon}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Right Side Actions */}
          <Box className="header-actions">
            {isAuthenticated ? (
              <>
                <Tooltip title="Notifications">
                  <IconButton
                    className="header-icon-button"
                    onClick={handleNotificationClick}
                  >
                    <Badge 
                      badgeContent={3} 
                      color="error"
                      className="header-badge"
                    >
                      <Notifications />
                    </Badge>
                  </IconButton>
                </Tooltip>

                <Tooltip title="Cart">
                  <IconButton
                    className="header-icon-button"
                    onClick={() => navigate('/cart')}
                  >
                    <Badge 
                      badgeContent={2} 
                      color="secondary"
                      className="header-badge"
                    >
                      <ShoppingCart />
                    </Badge>
                  </IconButton>
                </Tooltip>

                <Tooltip title="Account">
                  <IconButton onClick={handleOpenUserMenu}>
                    <Avatar
                      alt={user.name}
                      src={user.avatar}
                      className="header-avatar"
                    >
                      {user.name.charAt(0)}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  onClick={() => navigate('/login')}
                  className="header-sign-in-button header-desktop-only"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => navigate('/register')}
                  className="header-cta-button header-desktop-only"
                  startIcon={<Add />}
                >
                  Get Started
                </Button>
              </>
            )}
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            className="header-mobile-menu-button"
            onClick={handleDrawerToggle}
            aria-label="menu"
          >
            <img 
              src={hamburgerMenu} 
              alt="Menu" 
              className="header-menu-icon"
            />
          </IconButton>

          {/* User Menu */}
          <Menu
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            className="header-dropdown-menu"
          >
            {userMenuItems.map((item) => (
              <MenuItem
                key={item.label}
                onClick={() => {
                  navigate(item.path);
                  handleCloseUserMenu();
                }}
                className="header-menu-item"
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Typography>{item.label}</Typography>
              </MenuItem>
            ))}
            <Divider />
            <MenuItem 
              onClick={() => console.log('Logout')}
              className="header-menu-item"
            >
              <ListItemIcon><Logout /></ListItemIcon>
              <Typography>Logout</Typography>
            </MenuItem>
          </Menu>

          {/* Notification Menu */}
          <Menu
            anchorEl={notificationAnchor}
            open={Boolean(notificationAnchor)}
            onClose={handleNotificationClose}
            className="header-dropdown-menu"
          >
            <Box className="header-notifications">
              <Typography variant="h6" sx={{ p: 2, pb: 1 }}>
                Notifications
              </Typography>
              <Divider />
              <Box className="header-notification-item unread">
                <Typography variant="body2">
                  You've been outbid on "Graco Travel System"
                </Typography>
              </Box>
              <Box className="header-notification-item">
                <Typography variant="body2">
                  Your item "Baby Bundle" has a new bid!
                </Typography>
              </Box>
              <Box className="header-notification-item">
                <Typography variant="body2">
                  Auction ending soon: "Wooden Activity Cube"
                </Typography>
              </Box>
            </Box>
          </Menu>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        className="header-mobile-drawer"
      >
        <Box className="header-mobile-drawer-header">
          <Typography variant="h6">Menu</Typography>
          <IconButton onClick={handleDrawerToggle} className="header-close-button">
            <img 
              src={closingX} 
              alt="Close" 
              className="header-close-icon"
            />
          </IconButton>
        </Box>
        <List>
          {!isAuthenticated && (
            <>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate('/login');
                    handleDrawerToggle();
                  }}
                  className="header-mobile-nav-item"
                >
                  <ListItemText primary="Sign In" />
                </ListItemButton>
              </ListItem>
              <Divider sx={{ my: 1 }} />
            </>
          )}
          {navigationItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  handleDrawerToggle();
                }}
                className="header-mobile-nav-item"
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
          {isAuthenticated && (
            <>
              <Divider sx={{ my: 1 }} />
              {userMenuItems.map((item) => (
                <ListItem key={item.label} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(item.path);
                      handleDrawerToggle();
                    }}
                    className="header-mobile-nav-item"
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}
              <ListItem disablePadding>
                <ListItemButton 
                  onClick={() => console.log('Logout')}
                  className="header-mobile-nav-item"
                >
                  <ListItemIcon><Logout /></ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;