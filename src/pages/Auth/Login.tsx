import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Link,
  Box,
  Alert,
} from '@mui/material';
import AuthLayout from '../../components/auth/AuthLayout';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setError('Email hoặc mật khẩu không chính xác');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
        Đăng nhập
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
          {error}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Mật khẩu"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isLoading}
        >
          {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
        </Button>
        <Box sx={{ textAlign: 'center' }}>
          <Link component={RouterLink} to="/register" variant="body2">
            Chưa có tài khoản? Đăng ký ngay
          </Link>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default Login;
