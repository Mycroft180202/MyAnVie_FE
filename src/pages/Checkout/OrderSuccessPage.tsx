import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const OrderSuccessPage = () => {
  return (
    <Container maxWidth="sm" sx={{ my: 8 }}>
      <Paper elevation={0} sx={{ p: 4, textAlign: 'center', border: '1px solid #E0E0E0', borderRadius: 2 }}>
        <CheckCircleOutlineIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
        
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Đặt hàng thành công!
        </Typography>
        
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ gửi email xác nhận đơn hàng và thông tin vận chuyển cho bạn.
        </Typography>

        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            component={RouterLink}
            to="/orders"
            variant="outlined"
            color="primary"
            sx={{ textTransform: 'none' }}
          >
            Xem đơn hàng
          </Button>
          
          <Button
            component={RouterLink}
            to="/shop/lụa"
            variant="contained"
            color="error"
            sx={{ textTransform: 'none' }}
          >
            Tiếp tục mua sắm
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderSuccessPage;