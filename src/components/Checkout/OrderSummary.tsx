import React from 'react';
import { CartState } from '../../store/slices/cartSlice';
import {
  Paper,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  CircularProgress // Thêm CircularProgress cho trạng thái loading của nút
} from '@mui/material';
// import Image from 'next/image'; // Dòng này sẽ bị xóa vì đây không phải dự án Next.js

interface OrderSummaryProps {
  cart: CartState;
  onPlaceOrder: () => Promise<void>;
  isLoading: boolean;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ cart, onPlaceOrder, isLoading }) => {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Đơn hàng của bạn
      </Typography>
      <List sx={{ mb: 2 }}>
        {cart.items.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ mb: 2, alignItems: 'flex-start' }}>
            <ListItemIcon sx={{ minWidth: 'unset', mr: 2 }}>
              <Box
                component="img"
                src={item.imageUrl}
                alt={item.name}
                sx={{
                  width: 80,
                  height: 80,
                  objectFit: 'cover',
                  borderRadius: 1,
                  border: '1px solid #e0e0e0',
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {item.name}
                </Typography>
              }
              secondary={
                <React.Fragment>
                  <Typography variant="body2" color="text.secondary">
                    Số lượng: {item.quantity}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
        <Typography variant="subtitle1" color="text.secondary">Tổng cộng:</Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {cart.total.toLocaleString('vi-VN')}đ
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right', mb: 2 }}>
        Phí vận chuyển sẽ được tính sau
      </Typography>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={onPlaceOrder}
        disabled={isLoading || cart.items.length === 0}
        sx={{ py: 1.5, textTransform: 'none' }}
        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
      >
        {isLoading ? 'Đang xử lý...' : 'Đặt hàng'}
      </Button>
    </Paper>
  );
};