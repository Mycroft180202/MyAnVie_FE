import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { productService, Product } from '../../services/productService';
import { toast } from 'react-toastify';
import ProductTabSection from './Section/ProductTabSection';
import RelatedProductsSection from './Section/RelatedProductsSection';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { LoadingSpinner } from '../../components/Common/LoadingSpinner';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Divider,
  Card,
  CardContent,
  CardMedia,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import { useAuth } from '../../context/AuthContext';
import { cartService } from '../../services/cartService';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (err) {
        setError('Không thể tải thông tin sản phẩm');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.info('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.');
      navigate('/login');
      return;
    }

    if (!product || !token) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau.');
      return;
    }

    try {
      await cartService.addToCart(product.id, quantity, token);
      toast.success('Đã thêm vào giỏ hàng');
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      toast.error(error.message || 'Không thể thêm vào giỏ hàng');
    }
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      toast.info('Vui lòng đăng nhập để mua ngay.');
      navigate('/login');
      return;
    }

    if (!product || !token) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau.');
      return;
    }

    try {
      await cartService.addToCart(product.id, quantity, token);
      navigate('/checkout', { 
        state: { 
          productId: product.id,
          quantity: quantity
        } 
      });
    } catch (error: any) {
      toast.error(error.message || 'Không thể thêm vào giỏ hàng');
      console.error('Error adding to cart:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !product) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h6" color="error" align="center">
          {error || 'Không tìm thấy sản phẩm'}
        </Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
      <Container maxWidth="lg">
        <Breadcrumb
          items={[
            { label: 'Trang chủ', path: '/' },
            { label: product.categoryName, path: `/shop/${product.categoryName.toLowerCase()}` },
            { label: product.name }
          ]}
        />

        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                image={product.thumbnailUrl}
                alt={product.name}
                sx={{ height: 400, objectFit: 'contain' }}
              />
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                {product.name}
              </Typography>
              
              <Typography variant="h5" color="primary.main" sx={{ fontWeight: 600 }}>
                {product.price.toLocaleString('vi-VN')}đ
              </Typography>
              
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {product.description}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Số lượng:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <IconButton
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    size="small"
                  >
                    <RemoveIcon />
                  </IconButton>
                  <TextField
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    inputProps={{
                      min: 1,
                      style: { textAlign: 'center', padding: '8px 0' }
                    }}
                    sx={{
                      width: 60,
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'transparent' },
                        '&:hover fieldset': { borderColor: 'transparent' },
                        '&.Mui-focused fieldset': { borderColor: 'transparent' },
                      },
                    }}
                  />
                  <IconButton
                    onClick={() => setQuantity(quantity + 1)}
                    size="small"
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ShoppingCartIcon />}
                  onClick={handleAddToCart}
                  sx={{ flexGrow: 1, py: 1.5, textTransform: 'none' }}
                >
                  Thêm vào giỏ hàng
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<PaymentIcon />}
                  onClick={handleBuyNow}
                  sx={{ flexGrow: 1, py: 1.5, textTransform: 'none' }}
                >
                  Mua ngay
                </Button>
              </Box>
              
              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Thông tin sản phẩm</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}><Typography color="text.secondary">Danh mục:</Typography><Typography sx={{ fontWeight: 500 }}>{product.categoryName}</Typography></Grid>
                <Grid item xs={6}><Typography color="text.secondary">Danh mục con:</Typography><Typography sx={{ fontWeight: 500 }}>{product.subCategoryName}</Typography></Grid>
                <Grid item xs={6}><Typography color="text.secondary">Mã sản phẩm:</Typography><Typography sx={{ fontWeight: 500 }}>{product.sku}</Typography></Grid>
                <Grid item xs={6}><Typography color="text.secondary">Tồn kho:</Typography><Typography sx={{ fontWeight: 500 }}>{product.stock}</Typography></Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 8 }}>
          <ProductTabSection product={product} />
        </Box>

        <Box sx={{ mt: 8 }}>
          <RelatedProductsSection category={product.categoryName} currentProductId={product.id} />
        </Box>
      </Container>
    </Box>
  );
};

export default ProductDetailPage;
