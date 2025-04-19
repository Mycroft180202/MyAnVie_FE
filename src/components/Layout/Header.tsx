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
  Popover,
} from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [policyAnchorEl, setPolicyAnchorEl] = useState<null | HTMLElement>(null);
  const [shopAnchorEl, setShopAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Xác định trang hiện tại
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePolicyClick = (event: React.MouseEvent<HTMLElement>) => {
    setPolicyAnchorEl(event.currentTarget);
  };

  const handlePolicyClose = () => {
    setPolicyAnchorEl(null);
  };

  const handleShopClick = (event: React.MouseEvent<HTMLElement>) => {
    setShopAnchorEl(event.currentTarget);
  };

  const handleShopClose = () => {
    setShopAnchorEl(null);
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Chiều cao của header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      scrollToTop();
    } else {
      navigate('/');
    }
  };

  const handleSectionClick = (sectionId: string) => {
    if (location.pathname === '/') {
      scrollToSection(sectionId);
    } else {
      navigate('/');
      // Tăng timeout một chút để đảm bảo trang đã load xong
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 300);
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
      <Container maxWidth={false} sx={{ px: 2 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo và Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-start' }}>
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
                  fontFamily: 'Hoaico2',
                  textDecoration: 'none',
                  color: '#950B0B',  // Màu đỏ đậm cho chữ MYANVIE
                  fontWeight: 'bold',
                  letterSpacing: '0.1em', // Thêm khoảng cách giữa các chữ cái
                }}
              >
                MYANVIE
              </Typography>
            </Box>

            {/* Menu */}
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
              <Button 
                onClick={handleHomeClick}
                sx={{ 
                  color: isActive('/') ? '#950B0B' : '#2c2c2c',
                  fontFamily: 'Roboto',
                  '&:hover': {
                    color: '#950B0B',
                  }
                }}
              >
                Trang chủ
              </Button>
              <Button 
                component={RouterLink}
                to="/about"
                sx={{ 
                  color: isActive('/about') ? '#950B0B' : '#2c2c2c',
                  fontFamily: 'Roboto',
                  '&:hover': {
                    color: '#950B0B',
                  }
                }}
              >
                Về chúng tôi
              </Button>
              <Button 
                onClick={handleShopClick}
                sx={{ 
                  color: isActive('/category') ? '#950B0B' : '#2c2c2c',
                  fontFamily: 'Roboto',
                  '&:hover': {
                    color: '#950B0B',
                  }
                }}
              >
                Cửa hàng
              </Button>
              <Popover
                open={Boolean(shopAnchorEl)}
                anchorEl={shopAnchorEl}
                onClose={handleShopClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                sx={{
                  '& .MuiPaper-root': {
                    mt: 1,
                    minWidth: 180,
                  }
                }}
              >
                <MenuItem 
                  component={RouterLink} 
                  to="/category/pottery" 
                  onClick={handleShopClose}
                  sx={{ 
                    color: isActive('/category/pottery') ? '#950B0B' : '#2c2c2c',
                    '&:hover': { color: '#950B0B' } 
                  }}
                >
                  Gốm
                </MenuItem>
                <MenuItem 
                  component={RouterLink} 
                  to="/category/silk" 
                  onClick={handleShopClose}
                  sx={{ 
                    color: isActive('/category/silk') ? '#950B0B' : '#2c2c2c',
                    '&:hover': { color: '#950B0B' } 
                  }}
                >
                  Lụa
                </MenuItem>
                <MenuItem 
                  component={RouterLink} 
                  to="/category/bamboo" 
                  onClick={handleShopClose}
                  sx={{ 
                    color: isActive('/category/bamboo') ? '#950B0B' : '#2c2c2c',
                    '&:hover': { color: '#950B0B' } 
                  }}
                >
                  Mây tre đan
                </MenuItem>
              </Popover>

              <Button 
                component={RouterLink}
                to="/news"
                sx={{ 
                  color: isActive('/news') ? '#950B0B' : '#2c2c2c',
                  fontFamily: 'Roboto',
                  '&:hover': {
                    color: '#950B0B',
                  }
                }}
              >
                Tin tức
              </Button>
              <Button 
                onClick={handlePolicyClick}
                sx={{ 
                  color: '#2c2c2c',
                  fontFamily: 'Roboto',
                  '&:hover': {
                    color: '#950B0B',
                  }
                }}
              >
                Chính sách
              </Button>
              <Popover
                open={Boolean(policyAnchorEl)}
                anchorEl={policyAnchorEl}
                onClose={handlePolicyClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                sx={{
                  '& .MuiPaper-root': {
                    mt: 1,
                    minWidth: 180,
                  }
                }}
              >
                <MenuItem 
                  onClick={handlePolicyClose}
                  sx={{ '&:hover': { color: '#950B0B' } }}
                >
                  Chính sách đổi trả
                </MenuItem>
                <MenuItem 
                  onClick={handlePolicyClose}
                  sx={{ '&:hover': { color: '#950B0B' } }}
                >
                  Chính sách vận chuyển
                </MenuItem>
                <MenuItem 
                  onClick={handlePolicyClose}
                  sx={{ '&:hover': { color: '#950B0B' } }}
                >
                  Chính sách bảo hành
                </MenuItem>
              </Popover>

              <Button 
                onClick={() => handleSectionClick('contact')}
                sx={{ 
                  color: isActive('/contact') ? '#950B0B' : '#2c2c2c',
                  fontFamily: 'Roboto',
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
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
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
                    sx={{ 
                      color: isActive('/profile') ? '#950B0B' : '#2c2c2c',
                      '&:hover': { color: '#950B0B' } 
                    }}
                  >
                    Hồ sơ
                  </MenuItem>
                  {user?.role === 'ADMIN' && (
                    <MenuItem
                      component={RouterLink}
                      to="/admin"
                      onClick={handleMenuClose}
                      sx={{ 
                        color: isActive('/admin') ? '#950B0B' : '#2c2c2c',
                        '&:hover': { color: '#950B0B' } 
                      }}
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
                    bgcolor: isActive('/login') ? '#7A0909' : '#950B0B',
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
