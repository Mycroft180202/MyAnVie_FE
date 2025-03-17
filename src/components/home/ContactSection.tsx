import { Container, Grid, Box, Typography, TextField, Button } from '@mui/material';
import SectionTitle from '../shared/SectionTitle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const ContactSection = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Container>
        <SectionTitle
          title="Liên hệ với chúng tôi"
          subtitle="Hãy để lại thông tin, chúng tôi sẽ liên hệ với bạn sớm nhất"
          centered
        />
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Thông tin liên hệ
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOnIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Typography>Hòa Lạc, Hà Nội, Việt Nam</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PhoneIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Typography>(+84) 123-456-789</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EmailIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Typography>myanvieoffical@myanvie.com</Typography>
              </Box>
            </Box>
            <Box
              component="img"
              src="/images/contact-image.jpg"
              alt="Contact"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: 3
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box component="form" noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Họ và tên"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    required
                    type="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tiêu đề"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nội dung"
                    multiline
                    rows={4}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ mt: 2 }}
                  >
                    Gửi tin nhắn
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactSection;
