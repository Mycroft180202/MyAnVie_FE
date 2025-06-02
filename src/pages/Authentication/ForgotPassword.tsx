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
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ImageSlider from '../../components/Authentication/ImageSlider'; // Đường dẫn này có thể cần điều chỉnh
import { authService } from '../../services/authService'; // Đường dẫn này có thể cần điều chỉnh
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../../context/AuthContext';

const ForgotPassword = () => {
  const { requestPasswordReset, verifyResetCode, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<'email' | 'verify' | 'reset'>('email'); // Thêm step 'verify'
  const [email, setEmail] = useState('');
  
  // State cho bước nhập mã và mật khẩu mới
  const [resetForm, setResetForm] = useState({
    code: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleResetFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResetForm(prev => ({
      ...prev,
      [name]: name === 'code' ? value.trim() : value, // Trim code, không trim password
    }));
  };

  const handleRequestCode = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await requestPasswordReset({ email }); // Gọi hàm từ context
      setStep('verify');
      toast.success(response.message || 'Yêu cầu đã được gửi.');
    } catch (error: any) {
      toast.error(error.message || 'Có lỗi xảy ra.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: FormEvent) => {
    e.preventDefault();
    // ... validation ...
    setIsLoading(true);
    try {
      const response = await verifyResetCode({ email, code: resetForm.code.trim() }); // Gọi hàm từ context
      setStep('reset');
      toast.success(response.message || 'Mã hợp lệ.');
    } catch (error: any) {
      toast.error(error.message || 'Mã không hợp lệ.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await resetPassword({ // Gọi hàm từ context
        email,
        code: resetForm.code,
        newPassword: resetForm.newPassword,
        confirmNewPassword: resetForm.confirmNewPassword,
      });
      toast.success(response.message || 'Mật khẩu đã được đặt lại!');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message || 'Không thể đặt lại mật khẩu.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormStep = () => {
    if (step === 'email') {
      return (
        <Box component="form" onSubmit={handleRequestCode}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Nhập email của bạn và chúng tôi sẽ gửi mã xác thực để đặt lại mật khẩu.
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
            onChange={handleEmailChange}
            disabled={isLoading}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="error"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? 'Đang gửi...' : 'Gửi yêu cầu'}
          </Button>
        </Box>
      );
    }

    if (step === 'verify') {
      return (
        <Box component="form" onSubmit={handleVerifyCode}>
           <Typography variant="body2" sx={{ mb: 2 }}>
            Một mã xác thực gồm 6 chữ số đã được gửi đến <strong>{email}</strong>. Vui lòng kiểm tra email (cả thư mục Spam/Junk) và nhập mã vào đây.
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="code"
            label="Mã xác thực (6 chữ số)"
            name="code"
            value={resetForm.code}
            onChange={handleResetFormChange}
            disabled={isLoading}
            inputProps={{ maxLength: 6 }}
            error={!resetForm.code || resetForm.code.length !== 6}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="error"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading || !resetForm.code || resetForm.code.length !== 6}
          >
            {isLoading ? 'Đang xác thực...' : 'Xác thực mã'}
          </Button>
        </Box>
      );
    }

    if (step === 'reset') {
      return (
        <Box component="form" onSubmit={handleResetPassword}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Mã xác thực hợp lệ. Vui lòng đặt mật khẩu mới cho tài khoản <strong>{email}</strong>.
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="Mật khẩu mới"
            type={showNewPassword ? 'text' : 'password'}
            id="newPassword"
            value={resetForm.newPassword}
            onChange={handleResetFormChange}
            disabled={isLoading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                    {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
            type={showConfirmNewPassword ? 'text' : 'password'}
            id="confirmNewPassword"
            value={resetForm.confirmNewPassword}
            onChange={handleResetFormChange}
            disabled={isLoading}
            error={resetForm.newPassword !== resetForm.confirmNewPassword && resetForm.confirmNewPassword !== ''}
            helperText={
                resetForm.newPassword !== resetForm.confirmNewPassword && resetForm.confirmNewPassword !== ''
                ? 'Mật khẩu xác nhận không khớp.'
                : ''
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)} edge="end">
                    {showConfirmNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
            {isLoading ? 'Đang đặt lại...' : 'Đặt lại mật khẩu'}
          </Button>
        </Box>
      );
    }
    return null;
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

      {/* Right: Form */}
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
            {step === 'email' ? 'Quên mật khẩu' : 'Đặt lại mật khẩu'}
          </Typography>

          {renderFormStep()}

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