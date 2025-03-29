import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    phoneNumber: user?.phoneNumber || '',
    address: user?.address || '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await api.put('/users/me', formData);
      setUser(response.data);
      setSuccess('Cập nhật thông tin thành công');
    } catch (err) {
      setError('Có lỗi xảy ra khi cập nhật thông tin');
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Mật khẩu mới không khớp');
      return;
    }

    try {
      await api.post('/users/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setSuccess('Mã xác thực đã được gửi đến email của bạn');
      setShowVerification(true);
      setOpenPasswordDialog(false);
    } catch (err) {
      setError('Có lỗi xảy ra khi thay đổi mật khẩu');
    }
  };

  const handleVerifyCode = async () => {
    try {
      await api.post('/users/verify-password-change', {
        code: verificationCode,
      });
      setSuccess('Đổi mật khẩu thành công');
      setShowVerification(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (err) {
      setError('Mã xác thực không hợp lệ');
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Thông tin cá nhân
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              value={user?.email || ''}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Họ tên"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Số điện thoại"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Địa chỉ"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleUpdateProfile}
              sx={{ mr: 2 }}
            >
              Cập nhật thông tin
            </Button>
            <Button
              variant="outlined"
              onClick={() => setOpenPasswordDialog(true)}
            >
              Đổi mật khẩu
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Dialog đổi mật khẩu */}
      <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)}>
        <DialogTitle>Đổi mật khẩu</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            type="password"
            label="Mật khẩu hiện tại"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            type="password"
            label="Mật khẩu mới"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            type="password"
            label="Xác nhận mật khẩu mới"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordDialog(false)}>Hủy</Button>
          <Button onClick={handleChangePassword} variant="contained">
            Gửi mã xác thực
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog xác thực mã */}
      <Dialog open={showVerification} onClose={() => setShowVerification(false)}>
        <DialogTitle>Xác thực mã</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nhập mã xác thực"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowVerification(false)}>Hủy</Button>
          <Button onClick={handleVerifyCode} variant="contained">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
