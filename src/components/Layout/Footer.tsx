import { Box, Container, Grid, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              MyAnVie
            </Typography>
            <Typography variant="body2">
              Nơi hội tụ tinh hoa nghề thủ công Việt Nam
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Liên hệ
            </Typography>
            <Typography variant="body2">
              Email: myanvieoffical@myanvie.com
              <br />
              Điện thoại: (+84) 123-456-789
              <br />
              Địa chỉ: Hòa Lạc, Hà Nội, Việt Nam
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Theo dõi chúng tôi
            </Typography>
            <Link href="#" color="inherit" sx={{ mr: 2 }}>
              Facebook
            </Link>
            <Link href="#" color="inherit" sx={{ mr: 2 }}>
              Instagram
            </Link>
            <Link href="#" color="inherit">
              Twitter
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
