// src/pages/Orders/OrdersPage.tsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  CircularProgress, // Thêm để hiển thị trạng thái loading
} from '@mui/material';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'; // Đảm bảo đường dẫn đúng
import OrderCard from '../../components/Orders/OrderCard';    // Đảm bảo đường dẫn đúng
import { Order, OrderStatus } from '../../types/order';      // Import Order type và OrderStatus enum
import { orderService } from '../../services/orderService'; // Import orderService
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext'; // Để kiểm tra người dùng đã đăng nhập chưa

const OrdersPage = () => {
  const [tabValue, setTabValue] = useState<string>('all'); // 'all' hoặc các giá trị của OrderStatus
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth(); // Kiểm tra xem người dùng đã đăng nhập chưa

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) {
        // Có thể redirect về trang login hoặc hiển thị thông báo
        // toast.info('Vui lòng đăng nhập để xem đơn hàng của bạn.');
        setIsLoading(false);
        setOrders([]); // Xóa đơn hàng cũ nếu có
        return;
      }

      setIsLoading(true);
      try {
        const fetchedOrders = await orderService.getMyOrders(); // Gọi API lấy đơn hàng của tôi
        setOrders(fetchedOrders);
      } catch (error: any) {
        console.error('Error fetching orders:', error);
        toast.error(error.message || 'Không thể tải danh sách đơn hàng.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated]); // Fetch lại đơn hàng khi trạng thái đăng nhập thay đổi

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const getFilteredOrders = () => {
    if (tabValue === 'all') return orders;
    // So sánh giá trị số của OrderStatus từ enum
    // Backend trả về status là số (0, 1, 2, ...), frontend OrderStatus enum cũng là số
    return orders.filter(order => order.status === (OrderStatus[tabValue as keyof typeof OrderStatus]));
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return (
        <Container maxWidth="lg" sx={{ pt: 4, ml: { xs: 0, md: 15 }, textAlign: 'center' }}>
             <Breadcrumb
                items={[
                    { label: 'Trang chủ', href: '/' },
                    { label: 'Đơn hàng của tôi' }
                ]}
            />
            <Typography variant="h5" sx={{ mt: 4, mb: 3 }}>
                Vui lòng đăng nhập để xem đơn hàng của bạn.
            </Typography>
        </Container>
    );
  }

  const filteredOrders = getFilteredOrders();

  return (
    <Box>
      <Container maxWidth="lg" sx={{ pt: 4, ml: { xs:0, md:15} }}> {/* Đảm bảo margin-left cho desktop */}
        <Breadcrumb
          items={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Đơn hàng của tôi' }
          ]}
        />

        <Typography variant="h4" sx={{ 
          mt: 4, 
          mb: 3, 
          fontFamily: 'Hoaico2', // Giữ nguyên font của bạn
          color: '#5B0101',     // Giữ nguyên màu của bạn
          textTransform: 'uppercase' // Giữ nguyên style của bạn
        }}>
          Đơn hàng của tôi
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            variant="scrollable" // Cho phép scroll nếu có nhiều tab trên mobile
            scrollButtons="auto"   // Hiển thị nút scroll tự động
            allowScrollButtonsMobile
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
            {/* Sử dụng Object.keys để lặp qua enum OrderStatus và tạo Tab */}
            {/* Lọc ra các key là string (tên của enum members) */}
            {Object.keys(OrderStatus).filter(key => isNaN(Number(key))).map(statusKey => (
              <Tab 
                key={statusKey} 
                label={statusKey.charAt(0).toUpperCase() + statusKey.slice(1)} // Viết hoa chữ cái đầu
                value={statusKey} // value của tab là tên string của enum member
              />
            ))}
            {/* Ví dụ các tab tĩnh nếu bạn không muốn dùng enum trực tiếp:
            <Tab label="Chờ xử lý" value="Pending" />
            <Tab label="Đang xử lý" value="Processing" />
            <Tab label="Đang vận chuyển" value="Shipped" />
            <Tab label="Đã giao" value="Delivered" />
            <Tab label="Đã hủy" value="Cancelled" />
            <Tab label="Trả hàng" value="Returned" /> 
            */}
          </Tabs>
        </Box>

        <Box sx={{ mb: 4 }}>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard 
                key={order.id} 
                order={order}
                // onClick={() => navigate(`/orders/${order.id}`)} // Ví dụ: điều hướng đến trang chi tiết đơn hàng
              />
            ))
          ) : (
            <Typography variant="body1" sx={{ textAlign: 'center', mt: 4, color: 'text.secondary' }}>
              Không có đơn hàng nào trong mục này.
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default OrdersPage;