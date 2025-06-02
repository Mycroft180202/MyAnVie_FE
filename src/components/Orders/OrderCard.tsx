import React from 'react';
import { Box, Card, CardContent, Typography, Chip, Grid } from '@mui/material';
import { Order } from '../../types/order';

const statusColors = {
  pending: '#FFA726',
  processing: '#42A5F5',
  shipped: '#66BB6A',
  delivered: '#4CAF50',
  cancelled: '#EF5350',
};

const statusTranslations = {
  pending: 'Chờ xử lý',
  processing: 'Đang xử lý',
  shipped: 'Đang vận chuyển',
  delivered: 'Đã giao hàng',
  cancelled: 'Đã hủy',
};

interface OrderCardProps {
  order: Order;
  onClick?: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onClick }) => {
  const formattedDate = new Date(order.orderDate).toLocaleDateString('vi-VN');
  
  return (
    <Card 
      sx={{ 
        cursor: 'pointer',
        '&:hover': { boxShadow: 3 },
        mb: 2 
      }}
      onClick={onClick}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Mã đơn hàng: {order.id}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Ngày đặt: {formattedDate}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box>
              <Chip
                label={statusTranslations[order.status]}
                sx={{
                  bgcolor: statusColors[order.status],
                  color: 'white',
                  mb: 1
                }}
              />
              <Typography variant="h6" sx={{ color: '#950B0B', textAlign: 'right' }}>
                {order.totalAmount.toLocaleString('vi-VN')}₫
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Địa chỉ: {order.shippingAddress.address}, {order.shippingAddress.city}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrderCard;