import { Container, Typography, Paper, Box } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Thông tin tài khoản
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1" gutterBottom>
            <strong>Họ và tên:</strong> {user?.fullName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Email:</strong> {user?.email}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;
