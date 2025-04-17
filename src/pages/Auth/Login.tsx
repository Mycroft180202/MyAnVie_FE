import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton,
  Paper,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';
import ImageSlider from '../../components/Layout/ImageSlider';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ identifier: email, password });
      toast.success('Đăng nhập thành công!');
      navigate('/');
    } catch (error) {
      toast.error('Email hoặc mật khẩu không chính xác!');
    }
  };

  return (
    <Box
      display="flex"
      sx={{
        minHeight: '85vh', // Chiếm toàn bộ chiều cao của container cha (main)
        width: '100%',
        mx: 'auto',
        maxWidth: '1400px', // Giới hạn chiều rộng tối đa
        borderRadius: 2,
        overflow: 'hidden',
        bgcolor: 'white', // Thêm nền trắng cho toàn bộ phần Login
        boxShadow: 3, // Thêm bóng nhẹ
        mb: 10, // Thêm khoảng cách phía dưới để cách footer
        mt: 3, // Thêm khoảng cách phía trên để cách header
      }}
    >
      {/* Left: Image slideshow */}
      <Box flex={1} sx={{ display: { xs: 'none', md: 'block' } }}>
        <ImageSlider />
      </Box>

      {/* Right: Login form */}
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
            Đăng nhập
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email / Tên đăng nhập"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

            <Box textAlign="right">
              <Link component={RouterLink} to="/forgot-password" variant="body2" color="primary">
                Quên mật khẩu?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="error"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng nhập
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Link component={RouterLink} to="/register" variant="body2">
                Chưa có tài khoản? <b>Đăng ký</b>
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;