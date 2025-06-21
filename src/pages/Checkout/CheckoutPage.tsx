import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  CircularProgress,
  Box,
  Button,
  Paper,
  TextField,
  Divider
} from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { OrderSummary } from '../../components/Checkout/OrderSummary';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ShippingForm } from '../../components/Checkout/ShippingForm';
import { LoadingSpinner } from '../../components/Common/LoadingSpinner';
import { cartService, CartItem } from '../../services/cartService';
import { createOrder, getMyOrders, getOrderById, CreateOrderDto, OrderResponse } from '../../services/orderService';
import { productService } from '../../services/productService';
import { PaymentMethod } from '../../components/Checkout/PaymentMethod';
import { PAYMENT_METHODS } from '../../config/constants';

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, isLoading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

  const cart = useSelector((state: RootState) => state.cart);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [formData, setFormData] = useState({
    shippingAddress: user?.address || '',
    phoneNumber: user?.phoneNumber || '',
    email: user?.email || '',
    note: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('COD');

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      toast.info('Vui lòng đăng nhập để tiến hành thanh toán.');
      navigate('/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    const fetchAndSetCartItems = async () => {
      console.log('CheckoutPage: useEffect triggered.');
      console.log('CheckoutPage: location.state received:', location.state);

      if (!token) {
        toast.info('Vui lòng đăng nhập để tiến hành thanh toán');
        navigate('/login');
        return;
      }

      setLoading(true);
      try {
        const state = location.state as { cartItems?: CartItem[], productId?: string, quantity?: number } | null;

        if (state?.cartItems) {
          console.log('CheckoutPage: Using cartItems from location.state.', state.cartItems);
          setCartItems(state.cartItems);
        } else if (state?.productId && state?.quantity) {
          console.log('CheckoutPage: Using productId and quantity from location.state (Buy Now flow).');
          const product = await productService.getProductById(state.productId);
          const tempCartItem: CartItem = {
            id: 'temp-' + product.id,
            productId: product.id,
            productName: product.name,
            productPrice: product.price,
            productImage: product.imageUrl,
            quantity: state.quantity
          };
          console.log('CheckoutPage: Setting tempCartItem:', tempCartItem);
          setCartItems([tempCartItem]);
        } else {
          console.log('CheckoutPage: No state found, fetching full cart.');
          const cart = await cartService.getMyCart(token);
          console.log('CheckoutPage: Full cart fetched:', cart.cartItems);
          setCartItems(cart.cartItems);
        }
      } catch (error: any) {
        toast.error(error.message || 'Không thể tải giỏ hàng hoặc sản phẩm.');
        console.error('Error in CheckoutPage useEffect:', error);
        if (location.state?.productId) {
          navigate('/shop');
        } else {
          navigate('/cart');
        }
      } finally {
        setLoading(false);
        console.log('CheckoutPage: Loading set to false.');
      }
    };

    if (!isAuthenticated) {
      toast.info('Vui lòng đăng nhập để tiến hành thanh toán');
      navigate('/login');
      return;
    }

    fetchAndSetCartItems();
  }, [isAuthenticated, token, navigate, location.state]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error('Vui lòng đăng nhập để tiếp tục');
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Giỏ hàng trống');
      return;
    }

    if (!formData.shippingAddress) {
      toast.error('Vui lòng nhập địa chỉ giao hàng');
      return;
    }

    try {
      setIsProcessingOrder(true);
      const orderData: CreateOrderDto = {
        shippingAddress: formData.shippingAddress,
        items: cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        })),
        paymentMethod: paymentMethod === 'VNPAY' ? PAYMENT_METHODS.VNPAY : paymentMethod === 'QR' ? PAYMENT_METHODS.QR : PAYMENT_METHODS.COD
      };

      const response: OrderResponse = await createOrder(orderData, token);

      if ((paymentMethod === 'VNPAY' || paymentMethod === 'QR') && response.paymentUrl) {
        window.location.href = response.paymentUrl;
      } else {
        toast.success('Đặt hàng thành công!');
        await cartService.clearCart(token);
        navigate('/payment-result', {
          state: {
            success: true,
            orderId: response.order.id
          }
        });
      }
    } catch (error: any) {
      console.error('Error creating order:', error);
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi đặt hàng');
    } finally {
      setIsProcessingOrder(false);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);
  const shipping = 30000;
  const total = subtotal + shipping;

  if (authLoading || loading || isProcessingOrder) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Typography variant="h6" color="error">{error}</Typography>
        <Button component={RouterLink} to="/cart" sx={{ mt: 2 }}>Quay lại giỏ hàng</Button>
      </Container>
    );
  }

  console.log('CheckoutPage: Current cartItems:', cartItems);
  
  if (!cartItems || cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ my: 4, textAlign: 'center' }}>
        <ShoppingBasketOutlinedIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Giỏ hàng trống
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Bạn chưa có sản phẩm nào trong giỏ hàng để thanh toán.
        </Typography>
        <Button component={RouterLink} to="/shop" variant="contained" color="error" sx={{ textTransform: 'none' }}>
          Mua sắm ngay
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
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
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Thông tin giao hàng
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Địa chỉ giao hàng"
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Ghi chú"
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    multiline
                    rows={3}
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>

          <PaymentMethod
            selectedMethod={paymentMethod}
            onMethodChange={setPaymentMethod}
          />

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Sản phẩm
            </Typography>
            {cartItems.map((item) => (
              <Box key={item.id} sx={{ mb: 2 }}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={2}>
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      style={{ width: '100%', borderRadius: '4px' }} 
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1">{item.productName}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Số lượng: {item.quantity}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sx={{ textAlign: 'right' }}>
                    <Typography variant="subtitle1" color="error">
                      {(item.productPrice * item.quantity).toLocaleString('vi-VN')}đ
                    </Typography>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
              </Box>
            ))} 
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Tổng thanh toán
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Grid container justifyContent="space-between">
                <Typography>Tạm tính:</Typography>
                <Typography>{subtotal.toLocaleString('vi-VN')}đ</Typography>
              </Grid>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Grid container justifyContent="space-between">
                <Typography>Phí vận chuyển:</Typography>
                <Typography>{shipping.toLocaleString('vi-VN')}đ</Typography>
              </Grid>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 3 }}>
              <Grid container justifyContent="space-between">
                <Typography variant="h6">Tổng cộng:</Typography>
                <Typography variant="h6" color="error">
                  {total.toLocaleString('vi-VN')}đ
                </Typography>
              </Grid>
            </Box>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
              disabled={isProcessingOrder}
            >
              {isProcessingOrder 
                ? 'Đang xử lý...' 
                : paymentMethod === 'VNPAY' 
                  ? 'Thanh toán qua VNPAY' 
                  : paymentMethod === 'QR'
                    ? 'Thanh toán qua QR'
                    : 'Đặt hàng'}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;