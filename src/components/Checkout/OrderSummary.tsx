import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Stack,
  Button,
} from '@mui/material';

interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface OrderSummaryProps {
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  onPlaceOrder: () => void;
  isLoading?: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  shipping,
  total,
  onPlaceOrder,
  isLoading = false,
}) => {
  return (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid #E0E0E0', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        Đơn hàng của bạn
      </Typography>

      <Stack spacing={2} sx={{ mt: 3 }}>
        {items.map((item) => (
          <Box key={item.id} sx={{ display: 'flex', gap: 2 }}>
            <Box
              component="img"
              src={item.image}
              alt={item.name}
              sx={{
                width: 80,
                height: 80,
                objectFit: 'cover',
                borderRadius: 1,
              }}
            />
            <Box flex={1}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Số lượng: {item.quantity}
              </Typography>
              <Typography variant="body2" color="error" sx={{ fontWeight: 500 }}>
                {item.price.toLocaleString('vi-VN')}đ
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Stack spacing={2}>
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

        <Divider />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Tổng cộng:</Typography>
          <Typography variant="h6" color="error" fontWeight={600}>
            {total.toLocaleString('vi-VN')}đ
          </Typography>
        </Box>
      </Stack>

      <Button
        fullWidth
        variant="contained"
        color="error"
        size="large"
        onClick={onPlaceOrder}
        disabled={isLoading}
        sx={{
          mt: 3,
          textTransform: 'none',
          fontWeight: 600,
          py: 1.5,
        }}
      >
        {isLoading ? 'Đang xử lý...' : 'Đặt hàng'}
      </Button>
    </Paper>
  );
};

export default OrderSummary;