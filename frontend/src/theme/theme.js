// File: frontend/src/theme/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F27026',
    },
    secondary: {
      main: '#39C3C9',
    },
  },
  typography: {
    fontFamily: '"Open Sans", "Lato", -apple-system, BlinkMacSystemFont, sans-serif',
    h1: {
      fontFamily: '"Poppins", "Quicksand", sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Poppins", "Quicksand", sans-serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Poppins", "Quicksand", sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Poppins", "Quicksand", sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Poppins", "Quicksand", sans-serif',
      fontWeight: 500,
    },
    h6: {
      fontFamily: '"Poppins", "Quicksand", sans-serif',
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  // Global transitions/animations
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
  // Remove ALL component style overrides
  components: {}
});

export default theme;