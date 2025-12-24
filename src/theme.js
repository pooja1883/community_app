// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#2563eb' },       // Indigo-like
    secondary: { main: '#10b981' },     // Emerald-like
    background: { default: '#bcd1e6ff' }, // Soft gray
  },
  typography: {
    fontFamily: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Arial'].join(', '),
    h2: { fontWeight: 700, letterSpacing: 0.5 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
});

export default theme;
