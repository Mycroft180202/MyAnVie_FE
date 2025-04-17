import React from 'react';
import { Box, Container, Typography, TextField, Button, Grid, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: '#FFFFFF',
        py: 4,
        mt: 'auto'
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box
            component="img"
            src="/images/logo/logo.svg"
            alt="MyAnVie Logo"
            sx={{
              height: 100,
              width: 'auto',
              mb: 1
            }}
          />
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }}>
            MYANVIE
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {/* Thông tin liên hệ */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              THÔNG TIN LIÊN HỆ
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography>
                <Box component="span" sx={{ fontWeight: 'bold' }}>📞</Box> 0886330503
              </Typography>
              <Typography>
                <Box component="span" sx={{ fontWeight: 'bold' }}>✉️</Box> myanvieofical@gmail.com
              </Typography>
              <Typography>
                <Box component="span" sx={{ fontWeight: 'bold' }}>📍</Box> Hòa Lạc, Thạch Thất, Hà Nội
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                <Link href="https://facebook.com" target="_blank" sx={{ color: '#950B0B' }}>
                <Box
                    component="img"
                    src="/images/logo/facebook.svg"
                    alt="Facebook"
                    sx={{ width: 24, height: 24 }}
                  />
                </Link>
                <Link href="#" target="_blank" sx={{ color: '#950B0B' }}>
                  <Box
                    component="img"
                    src="/images/logo/tiktok.svg"
                    alt="TikTok"
                    sx={{ width: 24, height: 24 }}
                  />
                </Link>
                <Link href="https://youtube.com" target="_blank" sx={{ color: '#950B0B' }}>
                <Box
                    component="img"
                    src="/images/logo/youtube.svg"
                    alt="Youtube"
                    sx={{ width: 24, height: 24 }}
                  />
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Danh mục sản phẩm */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              DANH MỤC SẢN PHẨM
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography>Gốm</Typography>
              <Typography>Lụa</Typography>
              <Typography>Mây tre đan</Typography>
            </Box>
          </Grid>

          {/* Chính sách */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              CHÍNH SÁCH
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography>Chính sách đổi trả</Typography>
              <Typography>Chính sách vận chuyển</Typography>
              <Typography>Chính sách bảo hành</Typography>
            </Box>
          </Grid>

          {/* Đăng ký nhận thông tin */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              ĐĂNG KÝ NHẬN THÔNG TIN SẢN PHẨM
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
                <TextField
                  placeholder="Email"
                  size="small"
                  sx={{
                    bgcolor: 'white',
                    width: '100%',
                    maxWidth: 400, // Điều chỉnh chiều rộng tối đa của TextField
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#950B0B', // Màu border của TextField
                      },
                      '&:hover fieldset': {
                        borderColor: '#950B0B', // Màu border khi hover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#950B0B', // Màu border khi TextField được focus
                      },
                    },
                    '& .MuiInputBase-input': {
                      fontSize: '14px', // Kích thước font chữ cho TextField
                      padding: '10px', // Padding trong TextField
                    },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#950B0B', // Màu nền nút
                    color: 'white',
                    width: '200px',
                    '&:hover': {
                      bgcolor: '#7A0909', // Màu nền khi hover
                    },
                    '& .MuiButton-label': {
                      fontSize: '10px', // Kích thước chữ cho Button
                      fontWeight: 'bold', // Đậm chữ
                    },
                    padding: '10px 20px', // Điều chỉnh padding cho nút
                  }}
                >
                  Đăng ký
                </Button>
              </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Box
                component="img"
                src="/images/logo/bct.svg"
                alt="Bộ Công Thương"
                sx={{ height: 45 }}
              />
              <Box
                component="img"
                src="/images/logo/norton.svg"
                alt="Norton"
                sx={{ height: 45 }}
              />
              <Box
                component="img"
                src="/images/logo/dmca.svg"
                alt="DMCA"
                sx={{ height: 45 }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Typography 
          align="center" 
          sx={{ 
            mt: 4, 
            pt: 2, 
            borderTop: '1px solid rgba(0, 0, 0, 0.1)',
            fontSize: '0.875rem'
          }}
        >
          Copyright © 2025 MYANVIE - NhậtPro123
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
