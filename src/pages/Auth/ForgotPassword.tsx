import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Alert,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import ImageSlider from '../../components/Layout/ImageSlider';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Implement password reset API call
      setIsSubmitted(true);
      toast.success('Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn!');
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại sau!');
    }
  };

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

      {/* Right: Forgot Password form */}
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
            Quên mật khẩu
          </Typography>

          {!isSubmitted ? (
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Nhập email của bạn và chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu.
              </Typography>

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="error"
                sx={{ mt: 3, mb: 2 }}
              >
                Gửi yêu cầu
              </Button>
            </Box>
          ) : (
            <Alert severity="success" sx={{ mt: 2 }}>
              Vui lòng kiểm tra email của bạn để được hướng dẫn đặt lại mật khẩu.
            </Alert>
          )}

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Link component={RouterLink} to="/login" variant="body2">
              Quay lại đăng nhập
            </Link>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default ForgotPassword;