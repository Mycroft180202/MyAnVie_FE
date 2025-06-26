import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Stack,
  Button,
  CircularProgress,
} from '@mui/material';
import { toast } from 'react-toastify';
import CartItem from '../../components/Cart/CartItem';
import CartSummary from '../../components/Cart/CartSummary';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { cartService } from '../../services/cartService';
import { CartItem as CartItemType, Cart as CartType } from '../../services/cartService';
import { useAuth } from '../../context/AuthContext';

const CartPage = () => {
  const navigate = useNavigate();
  const { user, token, isAuthenticated, isLoading: authLoading } = useAuth();
  const [cartData, setCartData] = useState<CartType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      toast.info('Vui lòng đăng nhập để xem giỏ hàng của bạn.');
      navigate('/login');
      return;
    }

    fetchCart();
  }, [isAuthenticated, authLoading, navigate, token]);

  const fetchCart = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const cart = await cartService.getMyCart(token);
      setCartData(cart);
      setError(null);
    } catch (error: any) {
      setError(error.message || 'Không thể tải giỏ hàng.');
      toast.error(error.message || 'Không thể tải giỏ hàng.');
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    if (!token) {
      toast.error('Vui lòng đăng nhập để cập nhật giỏ hàng');
      return;
    }

    try {
      setLoading(true);
      console.log('Updating quantity for item:', itemId, 'to:', quantity);
      const updatedCart = await cartService.updateItemQuantity(itemId, quantity, token);
      console.log('Cart updated successfully:', updatedCart);
      setCartData(updatedCart);
      toast.success('Đã cập nhật số lượng sản phẩm!');
    } catch (error: any) {
      console.error('Error in handleUpdateQuantity:', error);
      const errorMessage = error.message || 'Không thể cập nhật số lượng.';
      setError(errorMessage);
      toast.error(errorMessage);
      // Refresh cart data to ensure UI is in sync with server
      await fetchCart();
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    if (!token) return;
    try {
      setLoading(true);
      await cartService.removeItem(itemId, token);
      await fetchCart();
      toast.success('Đã xóa sản phẩm khỏi giỏ hàng.');
    } catch (error: any) {
      setError(error.message || 'Không thể xóa sản phẩm.');
      toast.error(error.message || 'Không thể xóa sản phẩm.');
      console.error('Error removing item:', error);
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cartData?.cartItems.reduce((sum, item) => sum + item.productPrice * item.quantity, 0) || 0;
  const shipping = 30000;
  const total = (cartData?.totalPrice !== undefined && cartData.totalPrice !== null) ? cartData.totalPrice : (subtotal + shipping);

  const handleCheckout = () => {
    console.log('CartPage: handleCheckout called.');
    console.log('CartPage: cartData before checkout:', cartData);
    if (!cartData || cartData.cartItems.length === 0) {
      toast.error('Giỏ hàng của bạn đang trống');
      return;
    }
    navigate('/checkout', { state: { cartItems: cartData.cartItems } });
  };

  if (authLoading || loading) {
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
        <Button component={Link} to="/login" sx={{ mt: 2 }}>Đăng nhập</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      {cartData && cartData.cartItems.length > 0 ? (
        <>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
            Giỏ hàng của bạn
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Stack spacing={2}>
                {cartData.cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    productId={item.productId}
                    productName={item.productName}
                    price={item.productPrice}
                    productImage={item.productImage}
                    quantity={item.quantity}
                    onUpdateQuantity={(qty) => handleUpdateQuantity(item.id, qty)}
                    onRemove={() => handleRemoveItem(item.id)}
                  />
                ))}
              </Stack>

              <Button
                component={Link}
                to="/"
                startIcon={<KeyboardBackspaceIcon />}
                sx={{ mt: 4, textTransform: 'none' }}
              >
                Tiếp tục mua sắm
              </Button>
            </Grid>

            <Grid item xs={12} md={4}>
              <CartSummary
                subtotal={subtotal}
                shipping={shipping}
                total={total + shipping}
                onCheckout={handleCheckout}
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
          }}
        >
          <ShoppingBasketOutlinedIcon
            sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }}
          />
          <Typography variant="h5" gutterBottom>
            Giỏ hàng trống
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Bạn chưa có sản phẩm nào trong giỏ hàng
          </Typography>
          <Button
            component={Link}
            to="/shop/lụa"
            variant="contained"
            color="error"
            sx={{ textTransform: 'none' }}
          >
            Mua sắm ngay
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default CartPage;