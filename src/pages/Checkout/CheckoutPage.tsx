import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Breadcrumbs,
  Link,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import DeliveryForm from '../../components/Checkout/DeliveryForm';
import OrderSummary from '../../components/Checkout/OrderSummary';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // Dữ liệu mẫu, sau này sẽ lấy từ Cart Context
  const cartItems: OrderItem[] = [
    {
      id: '1',
      name: 'Bình gốm Bát Tràng',
      image: '/images/products/Pottery1.jpg',
      price: 450000,
      quantity: 1,
    },
    {
      id: '2',
      name: 'Khăn lụa Vạn Phúc',
      image: '/images/products/Silk1.jpg',
      price: 850000,
      quantity: 2,
    },
  ];

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    phoneNumber: user?.phoneNumber || '',
    email: user?.email || '',
    address: user?.address || '',
    note: '',
    paymentMethod: 'cod' as 'cod' | 'bank',
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 30000;
  const total = subtotal + shipping;

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const required = ['fullName', 'phoneNumber', 'email', 'address'];
    for (const field of required) {
      if (!formData[field as keyof typeof formData]) {
        toast.error(`Vui lòng nhập ${field === 'fullName' ? 'họ tên' : 
          field === 'phoneNumber' ? 'số điện thoại' : 
          field === 'email' ? 'email' : 'địa chỉ'}`);
        return false;
      }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Email không hợp lệ');
      return false;
    }

    // Validate phone number format (Vietnam)
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      toast.error('Số điện thoại không hợp lệ');
      return false;
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // TODO: Implement order placement logic
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
      toast.success('Đặt hàng thành công!');
      navigate('/order-success'); // Create this page later
    } catch (error) {
      toast.error('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 4 }}
      >
        <Link component={RouterLink} to="/" color="inherit">
          Trang chủ
        </Link>
        <Link component={RouterLink} to="/cart" color="inherit">
          Giỏ hàng
        </Link>
        <Typography color="text.primary">Thanh toán</Typography>
      </Breadcrumbs>

      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Thanh toán
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <DeliveryForm 
            formData={formData}
            onChange={handleFormChange}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <OrderSummary
            items={cartItems}
            subtotal={subtotal}
            shipping={shipping}
            total={total}
            onPlaceOrder={handlePlaceOrder}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;