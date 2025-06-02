import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  Divider,
} from '@mui/material';

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  onCheckout?: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  shipping,
  total,
  onCheckout,
}) => {
  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        border: '1px solid #E0E0E0',
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        Tổng đơn hàng
      </Typography>

      <Stack spacing={2} sx={{ mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography color="text.secondary">Tạm tính:</Typography>
          <Typography fontWeight={500}>
            {subtotal.toLocaleString('vi-VN')}đ
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography color="text.secondary">Phí vận chuyển:</Typography>
          <Typography fontWeight={500}>
            {shipping.toLocaleString('vi-VN')}đ
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Tổng cộng:</Typography>
          <Typography variant="h6" color="error" fontWeight={600}>
            {total.toLocaleString('vi-VN')}đ
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="error"
          size="large"
          fullWidth
          onClick={handleCheckout}
          sx={{
            mt: 3,
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          Thanh toán
        </Button>
      </Stack>
    </Paper>
  );
};

export default CartSummary;