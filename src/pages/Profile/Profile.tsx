import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  Container,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { userService } from '../../services/userService';
import PersonIcon from '@mui/icons-material/Person'; // Thêm icon mặc định
import ChangePasswordDialog from '../../components/Authentication/ChangePasswordDialog';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    fullName: user?.fullName || '',
    address: user?.address || '',
    // dateOfBirth: user?.dateOfBirth || '', // Thêm nếu bạn muốn cho phép cập nhật dateOfBirth
  });

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        fullName: user.fullName || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updateData = {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        // dateOfBirth: formData.dateOfBirth, // Thêm nếu có
      };

      const updatedUser = await userService.updateProfile(updateData);
      toast.success('Cập nhật thông tin thành công!');
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.message || 'Có lỗi xảy ra khi cập nhật thông tin');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper 
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              mr: 2,
              bgcolor: 'error.main' // Màu nền cho Avatar nếu không có ảnh
            }}
          >
            {user?.fullName ? user.fullName.charAt(0).toUpperCase() : <PersonIcon sx={{ fontSize: 60 }} />}
          </Avatar>
          <Box>
            <Typography variant="h5" gutterBottom>
              Hồ sơ của tôi
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Quản lý thông tin hồ sơ để bảo mật tài khoản
            </Typography>
          </Box>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Số điện thoại"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Họ và tên"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Địa chỉ"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
                multiline
                rows={2}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
            {!isEditing ? (
              <>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setIsEditing(true)}
                >
                  Sửa hồ sơ
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setIsPasswordDialogOpen(true)}
                >
                  Đổi mật khẩu
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setIsEditing(false)}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="error"
                >
                  Lưu thay đổi
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Paper>

      <ChangePasswordDialog
        open={isPasswordDialogOpen}
        onClose={() => setIsPasswordDialogOpen(false)}
      />
    </Container>
  );
};

export default Profile;