import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '@fontsource/lobster';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 3,
        mt: 'auto',
        width: '100%',
        backgroundColor: '#cd7474ff',
       
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {/* Left side: brand + text */}
          <Box>
            <Typography variant="h6" sx={{  fontFamily: 'Lobster, cursive', fontWeight: 700, color: '#fff' }}>
              CollabHub
            </Typography>
            <Typography variant="body2" sx={{  color: 'rgba(255,255,255,0.8)' }}>
              © {new Date().getFullYear()}  CollabHub. All rights reserved.
            </Typography>
          </Box>

          {/* Right side: social icons */}
          <Box>
            <IconButton
              aria-label="Instagram"
              href="https://www.instagram.com"
              target="_blank"
              sx={{ color: '#fff' }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              aria-label="Facebook"
              href="https://www.facebook.com"
              target="_blank"
              sx={{ color: '#fff' }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              aria-label="LinkedIn"
              href="https://www.linkedin.com"
              target="_blank"
              sx={{ color: '#fff' }}
            >
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
