import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const categories = [
    { name: 'Đồ gốm', path: '/category/pottery' },
    { name: 'Mây tre đan', path: '/category/bamboo' },
    { name: 'Lụa', path: '/category/silk' },
    { name: 'Nón lá', path: '/category/conical-hat' },
  ];

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
    handleMenuClose();
  };

  const handleCategoryChange = (event: any) => {
    const selectedCategory = categories.find(cat => cat.name === event.target.value);
    if (selectedCategory) {
      navigate(selectedCategory.path);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSectionClick = (sectionId: string) => {
    if (location.pathname === '/') {
      scrollToSection(sectionId);
    } else {
      navigate('/');
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    }
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        bgcolor: '#ffffff',
        boxShadow: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo và Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                component="img"
                src="/images/logo/logo.svg"
                alt="MyAnVie Logo"
                sx={{
                  height: 40,
                  width: 'auto',
                }}
              />
              <Typography
                variant="h6"
                component={RouterLink}
                to="/"
                sx={{
                  textDecoration: 'none',
                  color: '#950B0B',  // Màu đỏ đậm cho chữ MYANVIE
                  fontWeight: 'bold',
                }}
              >
                MYANVIE
              </Typography>
            </Box>

            {/* Menu */}
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              <Button 
                color="inherit" 
                onClick={() => handleSectionClick('home')} 
                sx={{ 
                  color: '#2c2c2c',
                  '&:hover': {
                    color: '#950B0B',
                  }
                }}
              >
                Trang chủ
              </Button>
              <Button 
                color="inherit" 
                onClick={() => handleSectionClick('about')} 
                sx={{ 
                  color: '#2c2c2c',
                  '&:hover': {
                    color: '#950B0B',
                  }
                }}
              >
                Về chúng tôi
              </Button>
              <Button 
                color="inherit" 
                onClick={() => handleSectionClick('store')} 
                sx={{ 
                  color: '#2c2c2c',
                  '&:hover': {
                    color: '#950B0B',
                  }
                }}
              >
                Cửa hàng
              </Button>
              <Button 
                color="inherit" 
                onClick={() => handleSectionClick('news')} 
                sx={{ 
                  color: '#2c2c2c',
                  '&:hover': {
                    color: '#950B0B',
                  }
                }}
              >
                Tin tức
              </Button>
              <Button 
                color="inherit" 
                onClick={() => handleSectionClick('policy')} 
                sx={{ 
                  color: '#2c2c2c',
                  '&:hover': {
                    color: '#950B0B',
                  }
                }}
              >
                Chính sách
              </Button>
              <Button 
                color="inherit" 
                onClick={() => handleSectionClick('contact')} 
                sx={{ 
                  color: '#2c2c2c',
                  '&:hover': {
                    color: '#950B0B',
                  }
                }}
              >
                Liên hệ
              </Button>
            </Box>
          </Box>

          {/* Icons và Đăng nhập */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {/* Tìm kiếm và Giỏ hàng */}
            <IconButton 
              color="inherit" 
              sx={{ 
                color: '#2c2c2c',
                '&:hover': {
                  color: '#950B0B',
                }
              }}
            >
              <ShoppingCartIcon />
            </IconButton>

            {/* Ngôn ngữ */}
            <IconButton 
              color="inherit" 
              sx={{ 
                color: '#2c2c2c',
                '&:hover': {
                  color: '#950B0B',
                }
              }}
            >
              <SearchIcon />
            </IconButton>

            {/* Đăng nhập/Đăng ký */}
            {isAuthenticated ? (
              <>
                <IconButton 
                  onClick={handleMenuOpen} 
                  color="inherit"
                  sx={{ 
                    color: '#2c2c2c',
                    '&:hover': {
                      color: '#950B0B',
                    }
                  }}
                >
                  <Avatar sx={{ width: 32, height: 32 }} />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    component={RouterLink}
                    to="/profile"
                    onClick={handleMenuClose}
                  >
                    Hồ sơ
                  </MenuItem>
                  {user?.role === 'ADMIN' && (
                    <MenuItem
                      component={RouterLink}
                      to="/admin"
                      onClick={handleMenuClose}
                    >
                      Quản trị
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="contained"
                  sx={{
                    bgcolor: '#950B0B',
                    '&:hover': {
                      bgcolor: '#7A0909',
                    }
                  }}
                >
                  Đăng nhập
                </Button>
                <Box
                  component="img"
                  src="/images/logo/VNFlag.svg"
                  alt="Việt Nam Flag"
                  sx={{
                    height: 24,
                    width: 'auto',
                    marginLeft: 1,
                    cursor: 'pointer'
                  }}
                />
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
