import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  Inventory as InventoryIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 300;

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
    { text: 'Sản phẩm', icon: <InventoryIcon />, path: '/admin/products' },
    { text: 'Đơn hàng', icon: <ShoppingCartIcon />, path: '/admin/orders' },
    { text: 'Người dùng', icon: <PeopleIcon />, path: '/admin/users' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        bgcolor: '#950b0b',
        color: 'white',
        minHeight: '64px !important'
      }}>
        <Typography variant="h6" noWrap sx={{ 
          fontFamily: 'Hoaico2',
          fontSize: '1.5rem',
          letterSpacing: '0.1em'
        }}>
          MyAnVie Admin
        </Typography>
      </Toolbar>
      
      <List sx={{ 
        flex: 1, 
        px: 2, 
        py: 2
      }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              borderRadius: 1,
              mb: 1,
              '&.Mui-selected': {
                bgcolor: '#ffeaea',
                color: '#950b0b',
                '&:hover': {
                  bgcolor: '#ffe0e0',
                },
                '& .MuiListItemIcon-root': {
                  color: '#950b0b',
                }
              },
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemIcon sx={{ 
              minWidth: 40,
              color: location.pathname === item.path ? '#950b0b' : 'rgba(0, 0, 0, 0.54)'
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              sx={{
                '& .MuiTypography-root': {
                  fontWeight: location.pathname === item.path ? 600 : 400
                }
              }}
            />
          </ListItem>
        ))}
      </List>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleHomeClick}
          startIcon={<HomeIcon />}
          sx={{
            mb: 1,
            bgcolor: '#950b0b',
            '&:hover': {
              bgcolor: '#7a0909'
            }
          }}
        >
          Về Trang Chủ
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={handleLogout}
          startIcon={<LogoutIcon />}
          sx={{
            color: '#950b0b',
            borderColor: '#950b0b',
            '&:hover': {
              borderColor: '#7a0909',
              bgcolor: '#ffeaea'
            }
          }}
        >
          Đăng Xuất
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ ml: '200px',mr:'-200px', bgcolor: '#f5f5f0' }}>
      <AppBar
        position="absolute"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          bgcolor: '#950b0b',
        }}  
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            noWrap 
            component="div" 
            sx={{ 
              flex: 1,
              fontSize: '1.2rem',
              fontWeight: 500
            }}
          >
            {menuItems.find(item => item.path === location.pathname)?.text || 'Dashboard'}
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{      
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              bgcolor: 'white'
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              bgcolor: 'white',
              borderRight: '1px solid rgba(0, 0, 0, 0.12)'
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;