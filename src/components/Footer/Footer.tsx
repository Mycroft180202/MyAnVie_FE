import React from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Grid,
  Link
} from '@mui/material';
import {
  footerContainer,
  logoStyle,
  sectionTitle,
  contactItem,
  socialIcon,
  subscribeField,
  footerDivider
} from './Footer.styles';
import Button from '../Button/Button';
import phoneIcon from '../../assets/images/icon/phone-icon.svg';
import emailIcon from '../../assets/images/icon/email-icon.svg';
import locationIcon from '../../assets/images/icon/location-icon.svg';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={footerContainer}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box component="img" src="/images/logo/logo.svg" alt="MyAnVie Logo" sx={logoStyle} />
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }}>
            MYANVIE
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={sectionTitle}>
              THÔNG TIN LIÊN HỆ
            </Typography>
            <Box sx={contactItem}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box component="img" src={phoneIcon} alt="Phone" sx={{ width: 24, height: 24 }} />
                <Typography>0886330503</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box component="img" src={emailIcon} alt="Email" sx={{ width: 24, height: 24 }} />
                <Typography>myanvieofical@gmail.com</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box component="img" src={locationIcon} alt="Location" sx={{ width: 24, height: 24 }} />
                <Typography>Hòa Lạc, Thạch Thất, Hà Nội</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                <Link href="https://facebook.com" target="_blank">
                  <Box component="img" src="/images/logo/facebook.svg" alt="Facebook" sx={socialIcon} />
                </Link>
                <Link href="#" target="_blank">
                  <Box component="img" src="/images/logo/tiktok.svg" alt="TikTok" sx={socialIcon} />
                </Link>
                <Link href="https://youtube.com" target="_blank">
                  <Box component="img" src="/images/logo/youtube.svg" alt="Youtube" sx={socialIcon} />
                </Link>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={sectionTitle}>DANH MỤC SẢN PHẨM</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography>Gốm</Typography>
              <Typography>Lụa</Typography>
              <Typography>Mây tre đan</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={sectionTitle}>CHÍNH SÁCH</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography>Chính sách đổi trả</Typography>
              <Typography>Chính sách vận chuyển</Typography>
              <Typography>Chính sách bảo hành</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={sectionTitle}>ĐĂNG KÝ NHẬN THÔNG TIN SẢN PHẨM</Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <TextField placeholder="Email" size="small" sx={subscribeField} />
              <Button>Đăng ký</Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Box component="img" src="/images/logo/bct.svg" alt="Bộ Công Thương" sx={{ height: 45 }} />
              <Box component="img" src="/images/logo/norton.svg" alt="Norton" sx={{ height: 45 }} />
              <Box component="img" src="/images/logo/dmca.svg" alt="DMCA" sx={{ height: 45 }} />
            </Box>
          </Grid>
        </Grid>

        <Typography align="center" sx={footerDivider}>
          Copyright © 2025 MYANVIE - NhậtPro123
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
