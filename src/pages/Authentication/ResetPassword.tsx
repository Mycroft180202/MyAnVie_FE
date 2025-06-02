import { useState, FormEvent } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ImageSlider from '../../components/Authentication/ImageSlider';
import { useAuth } from '../../context/AuthContext';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const code = searchParams.get('code');
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmNewPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email || !code) {
      toast.error('Thông tin đặt lại mật khẩu không hợp lệ!');
      return;
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error('Mật khẩu xác nhận không khớp!');
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword({
        email,
        code,
        newPassword: formData.newPassword,
        confirmNewPassword: formData.confirmNewPassword
      });
      toast.success('Đặt lại mật khẩu thành công!');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message || 'Không thể đặt lại mật khẩu. Vui lòng thử lại!');
    } finally {
      setIsLoading(false);
    }
  };

  if (!email || !code) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">
          Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      sx={{
        minHeight: '85vh',
        width: '100%',
        mx: 'auto',
        maxWidth: '1400px',
        borderRadius: 2,
        overflow: 'hidden',
        bgcolor: 'white',
        boxShadow: 3,
        mb: 10,
        mt: 3,
      }}
    >
      {/* Left: Image slideshow */}
      <Box flex={1} sx={{ display: { xs: 'none', md: 'block' } }}>
        <ImageSlider />
      </Box>

      {/* Right: Reset Password form */}
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ p: { xs: 2, md: 4 } }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            width: '100%',
            maxWidth: 400,
            borderRadius: 2,
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            gutterBottom
            color="error"
            fontWeight="bold"
            textAlign="center"
          >
            Đặt lại mật khẩu
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="Mật khẩu mới"
              type={showPassword ? 'text' : 'password'}
              id="newPassword"
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              disabled={isLoading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmNewPassword"
              label="Xác nhận mật khẩu mới"
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={(e) => setFormData({ ...formData, confirmNewPassword: e.target.value })}
              disabled={isLoading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="error"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default ResetPassword;