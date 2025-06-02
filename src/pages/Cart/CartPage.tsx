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
import type { CartItem as CartItemType } from '../../services/cartService';

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const cart = await cartService.getMyCart();
      setCartItems(cart.items);
    } catch (error) {
      toast.error('Failed to load cart');
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (id: number, quantity: number) => {
    try {
      await cartService.updateItemQuantity(id, quantity);
      const updatedCart = await cartService.getMyCart();
      setCartItems(updatedCart.items);
      toast.success('Cart updated successfully');
    } catch (error) {
      toast.error('Failed to update quantity');
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveItem = async (id: number) => {
    try {
      await cartService.removeItem(id);
      const updatedCart = await cartService.getMyCart();
      setCartItems(updatedCart.items);
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
      console.error('Error removing item:', error);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 30000;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      {cartItems.length > 0 ? (
        <>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
            Giỏ hàng của bạn
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Stack spacing={2}>
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    {...item}
                    onUpdateQuantity={(quantity) => handleUpdateQuantity(item.id, quantity)}
                    onRemove={() => handleRemoveItem(item.id)}
                  />
                ))}
              </Stack>

              <Button
                component={Link}
                to="/shop"
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
                total={total}
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
            to="/shop"
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