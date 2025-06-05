// src/components/Orders/OrderCard.tsx
import React from 'react';
import { Box, Card, CardContent, Typography, Chip, Grid } from '@mui/material';
import { Order, OrderStatus } from '../../types/order'; // Import Order và OrderStatus enum

// Định nghĩa màu sắc và bản dịch cho từng trạng thái dựa trên enum OrderStatus
// Key của các object này sẽ là tên của enum member (ví dụ: "Pending", "Processing")
const statusDetails: Record<string, { translation: string; color: string }> = {
  [OrderStatus.Pending]: { translation: 'Chờ xử lý', color: '#FFA726' },       // Orange
  [OrderStatus.Processing]: { translation: 'Đang xử lý', color: '#42A5F5' },  // Blue
  [OrderStatus.Shipped]: { translation: 'Đang vận chuyển', color: '#66BB6A' },// Light Green
  [OrderStatus.Delivered]: { translation: 'Đã giao hàng', color: '#4CAF50' },  // Green
  [OrderStatus.Cancelled]: { translation: 'Đã hủy', color: '#EF5350' },      // Red
  [OrderStatus.Returned]: { translation: 'Đã trả hàng', color: '#AB47BC' }     // Purple
};

interface OrderCardProps {
  order: Order;
  onClick?: (orderId: string) => void; // Thay đổi để truyền orderId nếu cần
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onClick }) => {
  const formattedDate = new Date(order.orderDate).toLocaleDateString('vi-VN', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  // Lấy thông tin hiển thị cho trạng thái hiện tại của đơn hàng
  // OrderStatus[order.status] sẽ trả về tên string của enum member, ví dụ "Pending"
  const currentStatusKey = OrderStatus[order.status] as keyof typeof statusDetails;
  const currentStatusInfo = statusDetails[currentStatusKey] || { translation: 'Không rõ', color: '#9E9E9E' };

  const handleCardClick = () => {
    if (onClick) {
      onClick(order.id); // Truyền order.id khi click
    }
  };
  
  return (
    <Card 
      sx={{ 
        cursor: onClick ? 'pointer' : 'default', // Chỉ đặt cursor pointer nếu có onClick handler
        '&:hover': { 
          boxShadow: onClick ? 3 : 1 // Chỉ thay đổi boxShadow nếu có onClick
        }, 
        mb: 2,
        border: '1px solid #e0e0e0', // Thêm border nhẹ
        borderRadius: 2 // Bo góc
      }}
      onClick={handleCardClick} // Sử dụng handleCardClick
      elevation={1} // Giảm elevation mặc định
    >
      <CardContent sx={{ '&:last-child': { pb: 2 } }}> {/* Giảm padding bottom của CardContent */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={7} md={8}>
            <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 'medium' }}>
              Mã đơn hàng: <Typography component="span" sx={{ color: '#5B0101', fontWeight: 'bold'}}>{order.id.substring(0,8)}...</Typography>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Khách hàng: {order.customerFullName} ({order.customerEmail})
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Ngày đặt: {formattedDate}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Địa chỉ: {order.shippingAddress} {/* shippingAddress giờ là string */}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: {xs: 'flex-start', sm:'flex-end'} }}>
            <Chip
              label={currentStatusInfo.translation}
              sx={{
                bgcolor: currentStatusInfo.color,
                color: 'white',
                mb: 1,
                fontWeight: 'medium'
              }}
              size="small"
            />
            <Typography variant="h6" sx={{ color: '#950B0B', fontWeight: 'bold', textAlign: {xs: 'left', sm:'right'} }}>
              {order.totalAmount.toLocaleString('vi-VN')}₫
            </Typography>
          </Grid>
        </Grid>
        {/* Bạn có thể muốn hiển thị một vài item trong đơn hàng ở đây nếu cần */}
        {/* Ví dụ:
        <Box sx={{ mt: 2, pl:1, borderTop: '1px dashed #eee', pt:1 }}>
          <Typography variant="caption" color="text.secondary">
            Sản phẩm: {order.orderItems.map(item => `${item.productName} (x${item.quantity})`).join(', ')}
          </Typography>
        </Box>
        */}
      </CardContent>
    </Card>
  );
};

export default OrderCard;