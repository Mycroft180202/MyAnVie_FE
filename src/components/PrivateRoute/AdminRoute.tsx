import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { Box, CircularProgress } from '@mui/material'; 

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if(isLoading){
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    )
  }

  if (user?.role !== 1) { // Kiểm tra Admin
    toast.error('Bạn không có quyền truy cập trang này!');
    return <Navigate to="/" replace />; // Chuyển về trang chủ nếu không phải admin
  }

  return <>{children}</>;
};

export default AdminRoute;