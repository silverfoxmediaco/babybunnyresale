// File: frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Browse from './pages/Browse';

// Layout component that wraps all pages with Header and Footer
const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
          <Layout>
            <Routes>
              {/* Home Page */}
              <Route path="/" element={<Home />} />
              
              {/* Browse Page - Now using the actual Browse component */}
              <Route path="/browse" element={<Browse />} />
              
              {/* Other routes - placeholder for now */}
              <Route path="/auctions" element={<Box sx={{ p: 4 }}>Auctions Page - Coming Soon</Box>} />
              <Route path="/sell" element={<Box sx={{ p: 4 }}>Sell Page - Coming Soon</Box>} />
              <Route path="/login" element={<Box sx={{ p: 4 }}>Login Page - Coming Soon</Box>} />
              <Route path="/register" element={<Box sx={{ p: 4 }}>Register Page - Coming Soon</Box>} />
              <Route path="/dashboard" element={<Box sx={{ p: 4 }}>Dashboard Page - Coming Soon</Box>} />
              
              {/* 404 Page */}
              <Route path="*" element={
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <h1>404 - Page Not Found</h1>
                  <p>The page you're looking for doesn't exist.</p>
                </Box>
              } />
            </Routes>
          </Layout>
        </SocketProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;