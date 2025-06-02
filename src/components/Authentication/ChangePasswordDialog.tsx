import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';
import { userService } from '../../services/userService';
import { useAuth } from '../../context/AuthContext';

interface ChangePasswordDialogProps {
  open: boolean;
  onClose: () => void;
}

const ChangePasswordDialog = ({ open, onClose }: ChangePasswordDialogProps) => {
  const { user } = useAuth();
  const [step, setStep] = useState<'initial' | 'verification'>('initial');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [verificationData, setVerificationData] = useState({
    code: '',
    newPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleRequestVerification = async () => {
    if (!currentPassword) {
      toast.error('Vui lòng nhập mật khẩu hiện tại!');
      return;
    }

    setIsLoading(true);
    try {
      await userService.sendPasswordChangeVerification(currentPassword);
      setStep('verification');
      toast.success('Mã xác thực đã được gửi đến email của bạn!');
    } catch (error: any) {
      toast.error(error.message || 'Có lỗi xảy ra. Vui lòng thử lại sau!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyAndChange = async () => {
    if (!verificationData.code) {
      toast.error('Vui lòng nhập mã xác thực!');
      return;
    }

    if (!verificationData.newPassword) {
      toast.error('Vui lòng nhập mật khẩu mới!');
      return;
    }

    if (verificationData.newPassword.length < 6) {
      toast.error('Mật khẩu mới phải có ít nhất 6 ký tự!');
      return;
    }

    setIsLoading(true);
    try {
      await userService.verifyAndChangePassword(
        verificationData.code,
        verificationData.newPassword
      );
      toast.success('Đổi mật khẩu thành công!');
      handleClose();
    } catch (error: any) {
      toast.error(error.message || 'Có lỗi xảy ra. Vui lòng thử lại sau!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setStep('initial');
    setCurrentPassword('');
    setVerificationData({ code: '', newPassword: '' });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        {step === 'initial' ? 'Xác nhận mật khẩu' : 'Đổi mật khẩu'}
      </DialogTitle>
      <DialogContent>
        {step === 'initial' ? (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Email"
              value={user?.email}
              disabled
              margin="normal"
            />
            <TextField
              fullWidth
              label="Mật khẩu hiện tại"
              type={showPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        ) : (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Mã xác thực"
              value={verificationData.code}
              onChange={(e) => setVerificationData({ ...verificationData, code: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Mật khẩu mới"
              type={showNewPassword ? 'text' : 'password'}
              value={verificationData.newPassword}
              onChange={(e) => setVerificationData({ ...verificationData, newPassword: e.target.value })}
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        {step === 'initial' ? (
          <Button
            onClick={handleRequestVerification}
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? 'Đang xử lý...' : 'Tiếp tục'}
          </Button>
        ) : (
          <Button
            onClick={handleVerifyAndChange}
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordDialog;