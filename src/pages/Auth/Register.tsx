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

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('fullName') as string;

    try {
      await register({ email, password, fullName });
      navigate('/');
    } catch (err) {
      setError('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
        Đăng ký
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
          id="fullName"
          label="Họ và tên"
          name="fullName"
          autoComplete="name"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Mật khẩu"
          type="password"
          id="password"
          autoComplete="new-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isLoading}
        >
          {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
        </Button>
        <Box sx={{ textAlign: 'center' }}>
          <Link component={RouterLink} to="/login" variant="body2">
            Đã có tài khoản? Đăng nhập
          </Link>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default Register;
