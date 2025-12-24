import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function Hero() {
  return (
    <Box
      sx={{
        bgcolor: '#dfe8f0ff',
        py: { xs: 6, sm: 8, md: 12 },   // responsive vertical padding
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        {/* Headline */}
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            letterSpacing: 1,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' }, // responsive font sizes
          }}
        >
          Where Connections Spark and Communities Thrive
        </Typography>

        {/* Subheadline */}
        <Typography
          variant="h6"
          color="text.secondary"
          gutterBottom
          sx={{
            maxWidth: 700,
            mx: 'auto',
            fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' }, // responsive subheadline
          }}
        >
          Join thousands of people discovering groups near them, building friendships, and creating
          meaningful experiences. Whether you’re into tech, fitness, arts, or social causes —
          CollabHub helps you connect and thrive.
        </Typography>

        {/* Call-to-action buttons */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}   // stack vertically on mobile
          spacing={2}
          justifyContent="center"
          sx={{ mt: 4 }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              borderRadius: '30px',
              px: { xs: 3, sm: 4 },
              py: { xs: 1, sm: 1.5 },
              textTransform: 'none',
              fontWeight: 600,
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            Explore Communities
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderRadius: '30px',
              px: { xs: 3, sm: 4 },
              py: { xs: 1, sm: 1.5 },
              textTransform: 'none',
              fontWeight: 600,
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            Create a Group
          </Button>
        </Stack>

        {/* Supporting text */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 4,
            fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' }, // responsive supporting text
          }}
        >
          Trusted by communities worldwide — from local meetups to global networks.
        </Typography>
      </Container>
    </Box>
  );
}
