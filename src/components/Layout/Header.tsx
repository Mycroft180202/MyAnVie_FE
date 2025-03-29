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
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

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
      // Đợi cho trang chủ load xong rồi mới scroll
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    }
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: 'white',
        boxShadow: 1,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              component="img"
              src="/images/logo/myanvie-logo.png"
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
                color: 'primary.main',
                fontWeight: 'bold',
              }}
            >
              MYANVIE
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Danh mục</InputLabel>
              <Select
                label="Danh mục"
                onChange={handleCategoryChange}
                defaultValue=""
              >
                {categories.map((category) => (
                  <MenuItem key={category.path} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button color="primary" onClick={() => handleSectionClick('about')}>
              About
            </Button>
            <Button color="primary" onClick={() => handleSectionClick('contact')}>
              Contact
            </Button>
            <Button
              component={RouterLink}
              to="/news"
              color="primary"
            >
              News
            </Button>

            {isAuthenticated ? (
              <>
                {user?.role === 'ADMIN' && (
                  <Button
                    component={RouterLink}
                    to="/admin"
                    color="primary"
                    variant="outlined"
                  >
                    Admin Dashboard
                  </Button>
                )}
                <IconButton color="primary" component={RouterLink} to="/cart">
                  <ShoppingCartIcon />
                </IconButton>
                <IconButton
                  onClick={handleMenuOpen}
                  color="primary"
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
                  color="primary"
                >
                  Đăng nhập
                </Button>
                <Button
                  component={RouterLink}
                  to="/register"
                  color="primary"
                >
                  Đăng ký
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
