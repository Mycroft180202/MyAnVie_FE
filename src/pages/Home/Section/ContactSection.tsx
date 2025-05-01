import { Box, Typography, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import { useState } from 'react';
import '../Styles/ContactSection.css';

const socialIcons = [
  '/images/logo/facebook.svg',
  '/images/logo/tiktok.svg',
  '/images/logo/youtube.svg',
  '/images/logo/facebook.svg',
  '/images/logo/tiktok.svg',
  '/images/logo/youtube.svg',
  '/images/logo/facebook.svg',
  '/images/logo/tiktok.svg',
  '/images/logo/youtube.svg',
  '/images/logo/facebook.svg',
  '/images/logo/tiktok.svg',
  '/images/logo/youtube.svg',
  '/images/logo/facebook.svg',
  '/images/logo/tiktok.svg',
  '/images/logo/youtube.svg',
];

const ContactSection = () => {
    const [subscribe, setSubscribe] = useState(false);
  
    return (
      <Box
        id="contact"
        sx={{
          py: 10,
          background: '#f5f5dc',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: '#5B0101',
            fontFamily: 'Hoaico2',
            mb: 5,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Liên hệ với chúng tôi
        </Typography>
  
        {/* Form */}
        <Box
          component="form"
          sx={{
            maxWidth: 600,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            px: 2,
          }}
        >
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <TextField
              fullWidth
              placeholder="Email"
              variant="outlined"
              size="small"
              sx={{ backgroundColor: '#fff' }}
            />
            <TextField
              fullWidth
              placeholder="SĐT"
              variant="outlined"
              size="small"
              sx={{ backgroundColor: '#fff' }}
            />
          </Box>
          <TextField
            fullWidth
            placeholder="Nội dung liên hệ"
            multiline
            rows={4}
            variant="outlined"
            sx={{ backgroundColor: '#fff' }}
          />
  
          <FormControlLabel
            control={
              <Checkbox
                checked={subscribe}
                onChange={(e) => setSubscribe(e.target.checked)}
                sx={{
                  color: '#5B0101',
                  borderRadius: '50%',
                  '&.Mui-checked': {
                    color: '#950B0B',
                  },
                  '& .MuiSvgIcon-root': {
                    borderRadius: '50%',
                  },
                }}
              />
            }
            label="Nhận thông báo về sản phẩm mới qua email"
            sx={{ alignItems: 'center', mt: 1, ml: 1 }}
          />
  
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#950B0B',
              color: '#fff',
              px: 4,
              py: 1,
              borderRadius: '20px',
              fontWeight: 500,
              textTransform: 'none',
              alignSelf: 'center',
              '&:hover': {
                backgroundColor: '#750909',
              },
            }}
          >
            Liên hệ ngay
          </Button>
        </Box>
  
        {/* Auto-scrolling social icons */}
        <Box className="social-marquee">
        <Box className="social-track">
          {[...socialIcons, ...socialIcons].map((src, index) => (
            <Box key={index} className="social-icon">
              <img src={src} alt="icon" />
            </Box>
          ))}
        </Box>
      </Box>
      </Box>
    );
  };
  
  export default ContactSection;