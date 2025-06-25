import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Tabs, Tab, CircularProgress, Alert } from '@mui/material';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import OrderCard from '../../components/Orders/OrderCard';
import { Order } from '../../types/order';
import { getMyOrders, OrderDto } from '../../services/orderService';
import { useAuth } from '../../context/AuthContext';

// Map status number from API to string for frontend
const mapOrderStatus = (status: number): Order['status'] => {
  switch (status) {
    case 0: return 'pending';
    case 1: return 'processing';
    case 2: return 'shipped';
    case 3: return 'delivered';
    case 4: return 'cancelled';
    default: return 'pending';
  }
};

// Transform OrderDto to Order type
const transformOrder = (orderDto: OrderDto): Order => {
  return {
    id: orderDto.id,
    userId: orderDto.userId,
    orderDate: orderDto.orderDate,
    status: mapOrderStatus(orderDto.status),
    totalAmount: orderDto.totalAmount,
    shippingAddress: {
      fullName: orderDto.customerFullName,
      address: orderDto.shippingAddress,
      phone: '', // These fields might need to be added to the API response
      city: ''
    },
    items: orderDto.orderItems.map(item => ({
      id: item.id,
      productId: item.productId,
      name: item.productName,
      image: item.productThumbnailUrl,
      price: item.price,
      quantity: item.quantity
    }))
  };
};

const OrdersPage = () => {
  const [tabValue, setTabValue] = useState<string>('all');
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const ordersData = await getMyOrders(token);
        const transformedOrders = ordersData.map(transformOrder);
        setOrders(transformedOrders);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải đơn hàng');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const getFilteredOrders = () => {
    if (tabValue === 'all') return orders;
    return orders.filter(order => order.status === tabValue);
  };

  return (
    <Box>
      <Container maxWidth="lg" sx={{ pt: 4, ml: 15 }}>
        <Breadcrumb
          items={[
            { label: 'Trang chủ', path: '/' },
            { label: 'Đơn hàng của tôi' }
          ]}
        />

        <Typography variant="h4" sx={{ 
          mt: 4, 
          mb: 3, 
          fontFamily: 'Hoaico2',
          color: '#5B0101',
          textTransform: 'uppercase'
        }}>
          Đơn hàng của tôi
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root.Mui-selected': {
                color: '#950B0B',
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#950B0B',
              },
            }}
          >
            <Tab label="Tất cả" value="all" />
            <Tab label="Chờ xử lý" value="pending" />
            <Tab label="Đang xử lý" value="processing" />
            <Tab label="Đang vận chuyển" value="shipped" />
            <Tab label="Đã giao" value="delivered" />
            <Tab label="Đã hủy" value="cancelled" />
          </Tabs>
        </Box>

        <Box sx={{ mb: 4 }}>
          {isLoading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress sx={{ color: '#950B0B' }} />
            </Box>
          ) : (
            <>
              {getFilteredOrders().map((order) => (
                <OrderCard 
                  key={order.id} 
                  order={order}
                  onClick={() => console.log('Order clicked:', order.id)}
                />
              ))}
              {getFilteredOrders().length === 0 && (
                <Typography variant="body1" sx={{ textAlign: 'center', mt: 4, color: 'text.secondary' }}>
                  Không có đơn hàng nào trong mục này
                </Typography>
              )}
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default OrdersPage;