// src/pages/Authentication/Register.tsx
import { useState, FormEvent } from 'react'; // Thêm FormEvent
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  InputAdornment,
  IconButton,
  Grid,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Đảm bảo đường dẫn đúng
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';
import ImageSlider from '../../components/Authentication/ImageSlider'; // Đảm bảo đường dẫn đúng
import { RegisterData } from '../../types/auth'; // Import RegisterData type

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '', 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useAuth(); // Lấy hàm register từ AuthContext
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Thêm state isLoading

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => { // Sử dụng FormEvent
    e.preventDefault();
    setIsLoading(true); // Bắt đầu loading

    if (formData.password !== formData.confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp!');
      setIsLoading(false); // Dừng loading
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự!');
      setIsLoading(false);
      return;
    }

    // Chuẩn bị dữ liệu gửi đi, khớp với RegisterData và RegisterDto của backend
    const dataToSend: RegisterData = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      phoneNumber: formData.phoneNumber || '', // Gửi undefined nếu rỗng
      address: formData.address || '',       // Gửi undefined nếu rỗng
      dateOfBirth: formData.dateOfBirth || '', // Đảm bảo luôn là string
    };

    try {
      await register(dataToSend); // Gọi hàm register từ context
      toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
      navigate('/login');
    } catch (error: any) {
      // Các message lỗi này nên khớp với những gì authService.register ném ra
      toast.error(error.message || 'Đăng ký thất bại! Vui lòng kiểm tra lại thông tin.');
    } finally {
      setIsLoading(false); // Dừng loading
    }
  };

  // Phần JSX của bạn giữ nguyên, đảm bảo các TextField có 'name' tương ứng
  // với các key trong state 'formData' (ví dụ: name="fullName", name="email", ...)
  // và có input cho 'confirmPassword'.

  return (
    <Box
      display="flex"
      sx={{
        minHeight: '80vh', 
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

      {/* Right: Register form */}
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
            fontFamily={'Hoaico2'} // Đảm bảo font này được load
            letterSpacing={3}
            gutterBottom
            color="error" 
            fontWeight="bold"
            textAlign="center"
          >
            Đăng ký tài khoản
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <Grid container spacing={2}>
              {/* Bỏ TextField cho username nếu không dùng */}
              {/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Tên đăng nhập"
                  name="username" 
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="fullName"
                  label="Họ và tên"
                  name="fullName"
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mật khẩu"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Xác nhận mật khẩu"
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                  error={formData.password !== formData.confirmPassword && formData.confirmPassword !== ''}
                  helperText={
                    formData.password !== formData.confirmPassword && formData.confirmPassword !== ''
                      ? 'Mật khẩu xác nhận không khớp.'
                      : ''
                  }
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="dateOfBirth"
                  label="Ngày sinh"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  disabled={isLoading}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  // required // Để tùy chọn
                  fullWidth
                  id="phoneNumber"
                  label="Số điện thoại (Tùy chọn)"
                  name="phoneNumber"
                  autoComplete="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  // required // Để tùy chọn
                  fullWidth
                  id="address"
                  label="Địa chỉ (Tùy chọn)"
                  name="address"
                  autoComplete="street-address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </Grid>
              {/* Bạn có thể thêm trường DateOfBirth ở đây nếu muốn */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="error"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link component={RouterLink} to="/login" variant="body2">
                Đã có tài khoản? <b>Đăng nhập</b>
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Register;