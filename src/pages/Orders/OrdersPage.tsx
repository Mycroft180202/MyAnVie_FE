import React, { useState } from 'react';
import { Box, Container, Typography, Tabs, Tab } from '@mui/material';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import OrderCard from '../../components/Orders/OrderCard';
import { Order } from '../../types/order';

// Mock data - sẽ thay thế bằng API call sau
const mockOrders: Order[] = [
  {
    id: "ORD001",
    userId: "user1",
    orderDate: "2025-05-30",
    status: "pending",
    totalAmount: 1500000,
    shippingAddress: {
      fullName: "Nguyễn Văn A",
      phone: "0123456789",
      address: "123 Đường ABC",
      city: "Hà Nội"
    },
    items: [
      {
        id: "ITEM001",
        productId: "PROD001",
        name: "Bình gốm Bát Tràng",
        image: "/images/products/Pottery1.jpg",
        price: 500000,
        quantity: 2
      }
    ]
  },
  {
    id: "ORD002",
    userId: "user1",
    orderDate: "2025-05-29",
    status: "delivered",
    totalAmount: 800000,
    shippingAddress: {
      fullName: "Nguyễn Văn A",
      phone: "0123456789",
      address: "123 Đường ABC",
      city: "Hà Nội"
    },
    items: [
      {
        id: "ITEM002",
        productId: "PROD002",
        name: "Khăn lụa Vạn Phúc",
        image: "/images/products/Silk1.jpg",
        price: 800000,
        quantity: 1
      }
    ]
  }
];

const OrdersPage = () => {
  const [tabValue, setTabValue] = useState<string>('all');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const getFilteredOrders = () => {
    if (tabValue === 'all') return mockOrders;
    return mockOrders.filter(order => order.status === tabValue);
  };

  return (
    <Box>
      <Container maxWidth="lg" sx={{ pt: 4, ml: 15 }}>
        <Breadcrumb
          items={[
            { label: 'Trang chủ', href: '/' },
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
        </Box>
      </Container>
    </Box>
  );
};

export default OrdersPage;