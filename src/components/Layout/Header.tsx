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
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
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
              MyAnVie
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            {categories.map((category) => (
              <Button
                key={category.path}
                component={RouterLink}
                to={category.path}
                color="inherit"
              >
                {category.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isAuthenticated ? (
              <>
                <IconButton onClick={handleMenuOpen}>
                  <Avatar
                    src={user?.avatar}
                    alt={user?.fullName}
                    sx={{ width: 32, height: 32 }}
                  >
                    {user?.fullName?.charAt(0)}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem
                    component={RouterLink}
                    to="/profile"
                    onClick={handleMenuClose}
                  >
                    Tài khoản của tôi
                  </MenuItem>
                  <MenuItem
                    component={RouterLink}
                    to="/orders"
                    onClick={handleMenuClose}
                  >
                    Đơn hàng
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="outlined"
                  color="primary"
                >
                  Đăng nhập
                </Button>
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="contained"
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
