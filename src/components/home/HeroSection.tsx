import { Box, Container, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const HeroSection = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/images/hero-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        py: { xs: 10, md: 15 },
        mb: 8
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 600 }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              mb: 3,
              fontWeight: 'bold',
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Tinh hoa nghề thủ công Việt Nam
          </Typography>
          <Typography
            variant="h5"
            sx={{ mb: 4, fontWeight: 'normal' }}
          >
            Khám phá bộ sưu tập độc đáo các sản phẩm thủ công mỹ nghệ truyền thống
          </Typography>
          <Button
            component={RouterLink}
            to="/products"
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark',
              }
            }}
          >
            Khám phá ngay
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
