import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Alert,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { userService, UpdateUserData, PasswordChangeRequest, VerificationRequest } from '../../services/userService';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    address: user?.address || '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [openOTPDialog, setOpenOTPDialog] = useState(false);
  const [passwordData, setPasswordData] = useState<PasswordChangeRequest>({
    oldPassword: '',
    newPassword: '',
  });
  const [otpData, setOtpData] = useState<VerificationRequest>({
    email: user?.email || '',
    otp: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        address: user.address || '',
      });
      setOtpData(prev => ({ ...prev, email: user.email || '' }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOtpData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const updatedUser = await userService.updateProfile({
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: formData.address
      });
      setUser(updatedUser);
      setSuccess('Cập nhật thông tin thành công!');
      toast.success('Cập nhật thông tin thành công!');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật thông tin');
      toast.error('Cập nhật thông tin thất bại!');
    }
  };

  const handlePasswordSubmit = async () => {
    try {
      await userService.changePassword(passwordData);
      setOpenPasswordDialog(false);
      setOpenOTPDialog(true);
      toast.success('Vui lòng kiểm tra email để xác nhận đổi mật khẩu!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi gửi yêu cầu đổi mật khẩu');
    }
  };

  const handleOTPSubmit = async () => {
    try {
      await userService.verifyPasswordChange(otpData);
      setOpenOTPDialog(false);
      setPasswordData({ oldPassword: '', newPassword: '' });
      setOtpData(prev => ({ ...prev, otp: '' }));
      toast.success('Đổi mật khẩu thành công!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi xác nhận đổi mật khẩu');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Thông tin cá nhân
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Họ và tên"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Địa chỉ"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Cập nhật thông tin
                </Button>
              </Grid>
            </Grid>
          </form>

          <Divider sx={{ my: 4 }} />

          <Box>
            <Typography variant="h6" gutterBottom>
              Đổi mật khẩu
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setOpenPasswordDialog(true)}
            >
              Đổi mật khẩu
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Dialog đổi mật khẩu */}
      <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)}>
        <DialogTitle>Đổi mật khẩu</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Mật khẩu hiện tại"
              type="password"
              name="oldPassword"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Mật khẩu mới"
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordDialog(false)}>Hủy</Button>
          <Button onClick={handlePasswordSubmit} variant="contained" color="primary">
            Gửi yêu cầu
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog xác nhận OTP */}
      <Dialog open={openOTPDialog} onClose={() => setOpenOTPDialog(false)}>
        <DialogTitle>Xác nhận đổi mật khẩu</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Typography variant="body2" gutterBottom>
              Vui lòng nhập mã OTP đã được gửi đến email của bạn
            </Typography>
            <TextField
              fullWidth
              label="Mã OTP"
              name="otp"
              value={otpData.otp}
              onChange={handleOTPChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenOTPDialog(false)}>Hủy</Button>
          <Button onClick={handleOTPSubmit} variant="contained" color="primary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile; 