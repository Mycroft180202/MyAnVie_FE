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
  Drawer,
} from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [policyAnchorEl, setPolicyAnchorEl] = useState<null | HTMLElement>(null);
  const [shopAnchorEl, setShopAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
      const headerOffset = 80;
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
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 300);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
      <Container maxWidth={false} sx={{ px: { xs: 1, sm: 2 } }}>
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: { xs: 56, sm: 64 } }}>
          {/* Logo và Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 4 }, justifyContent: 'flex-start' }}>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                component="img"
                src="/images/logo/logo.svg"
                alt="MyAnVie Logo"
                sx={{
                  height: { xs: 32, sm: 40 },
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
                  color: '#950B0B',
                  fontWeight: 'bold',
                  letterSpacing: '0.1em',
                  fontSize: { xs: 18, sm: 24 },
                }}
              >
                MYANVIE
              </Typography>
            </Box>

            {/* Menu cho desktop */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
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

          {/* Nút menu mobile */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton onClick={handleDrawerToggle} color="inherit" edge="end">
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Icons và Đăng nhập */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
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
      {/* Drawer cho mobile menu */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
        }}
      >
        <Box sx={{ width: 240, p: 2 }}>
          {/* Menu dọc cho mobile */}
          <Button fullWidth onClick={handleHomeClick} sx={{ justifyContent: 'flex-start', color: isActive('/') ? '#950B0B' : '#2c2c2c' }}>Trang chủ</Button>
          <Button fullWidth component={RouterLink} to="/about" onClick={handleDrawerToggle} sx={{ justifyContent: 'flex-start', color: isActive('/about') ? '#950B0B' : '#2c2c2c' }}>Về chúng tôi</Button>
          <Button fullWidth onClick={handleShopClick} sx={{ justifyContent: 'flex-start', color: isActive('/category') ? '#950B0B' : '#2c2c2c' }}>Cửa hàng</Button>
          <Box sx={{ pl: 2 }}>
            <Button fullWidth component={RouterLink} to="/category/pottery" onClick={handleDrawerToggle} sx={{ justifyContent: 'flex-start', color: isActive('/category/pottery') ? '#950B0B' : '#2c2c2c' }}>Gốm</Button>
            <Button fullWidth component={RouterLink} to="/category/silk" onClick={handleDrawerToggle} sx={{ justifyContent: 'flex-start', color: isActive('/category/silk') ? '#950B0B' : '#2c2c2c' }}>Lụa</Button>
            <Button fullWidth component={RouterLink} to="/category/bamboo" onClick={handleDrawerToggle} sx={{ justifyContent: 'flex-start', color: isActive('/category/bamboo') ? '#950B0B' : '#2c2c2c' }}>Mây tre đan</Button>
          </Box>
          <Button fullWidth component={RouterLink} to="/news" onClick={handleDrawerToggle} sx={{ justifyContent: 'flex-start', color: isActive('/news') ? '#950B0B' : '#2c2c2c' }}>Tin tức</Button>
          <Button fullWidth onClick={handlePolicyClick} sx={{ justifyContent: 'flex-start', color: '#2c2c2c' }}>Chính sách</Button>
          <Button fullWidth onClick={() => handleSectionClick('contact')} sx={{ justifyContent: 'flex-start', color: isActive('/contact') ? '#950B0B' : '#2c2c2c' }}>Liên hệ</Button>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
