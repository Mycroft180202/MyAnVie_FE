import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MyAnVie
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Trang chủ
          </Button>
          {user ? (
            <>
              <Button color="inherit" component={RouterLink} to="/profile">
                Hồ sơ
              </Button>
              {user.role === 'ADMIN' && (
                <Button color="inherit" component={RouterLink} to="/admin">
                  Quản trị
                </Button>
              )}
              <Button color="inherit" onClick={logout}>
                Đăng xuất
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                Đăng nhập
              </Button>
              <Button color="inherit" component={RouterLink} to="/register">
                Đăng ký
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 