import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { productService, Product } from '../../services/productService';
import { addToCart } from '../../store/slices/cartSlice';
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

const LOUPE_SIZE = 200; // Kích thước của kính lúp (pixel)
const ZOOM_FACTOR = 2; // Mức độ phóng to


const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;
        const data = await productService.getProductById(id);
        setProduct(data);
        setSelectedImage(data.thumbnailUrl);
        const additionalImages = [
          '/images/ActualProduct/lua1.png', // Thay bằng link ảnh phụ ,
          '/images/ActualProduct/lua2.png', // Thay bằng link ảnh phụ 2
          '/images/ActualProduct/lua3.png', // Thay bằng link ảnh phụ 3
          '/images/ActualProduct/Scrunchi.jpg', 

        ];
        setGalleryImages([data.thumbnailUrl, ...additionalImages]);
      } catch (err) {
        setError('Không thể tải thông tin sản phẩm');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);


  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const { width, height } = e.currentTarget.getBoundingClientRect();
    setImageSize({ width, height });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Lấy vị trí chuột tương đối so với phần tử ảnh
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setMousePosition({ x, y });
  };

  const handleAddToCart = async () => {
    if (!product || !token) return;
    
    if (!isAuthenticated) {
      toast.info('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.');
      navigate('/login');
      return;
    }

    try {
      await cartService.addToCart(product.id, quantity, token);
      toast.success('Đã thêm vào giỏ hàng');
    } catch (error: any) {
      toast.error(error.message || 'Không thể thêm vào giỏ hàng');
      console.error('Error adding to cart:', error);
    }
  };

  const handleBuyNow = async () => {
    console.log('ProductDetailPage: handleBuyNow called.');
    if (!product || !token) return;
    
    if (!isAuthenticated) {
      toast.info('Vui lòng đăng nhập để mua ngay.');
      navigate('/login');
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

        <Grid container spacing={5} sx={{ mt: 4 }}>
            <Grid item xs={12} md={7}>
              <Box
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                sx={{ position: 'relative', cursor: 'crosshair'}}
              >
                <CardMedia
                  component="img"
                  image={selectedImage}
                  alt={product.name}
                  sx={{
                    height: '500',
                    width: '100%',
                    objectFit: 'contain',
                  }}
                />

                {isHovering && (
                  <Box
                    sx={{
                      position: 'absolute',
                      // Căn giữa kính lúp với con trỏ chuột
                      left: mousePosition.x - LOUPE_SIZE / 2,
                      top: mousePosition.y - LOUPE_SIZE / 2,
                      width: LOUPE_SIZE,
                      height: LOUPE_SIZE,
                      borderRadius: '50%', // Tạo hình tròn
                      border: '3px solid #fff',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                      // Quan trọng: Ngăn kính lúp tự bắt sự kiện chuột
                      pointerEvents: 'none',

                      // Phần ma thuật của hiệu ứng zoom
                      backgroundImage: `url(${selectedImage})`,
                      backgroundRepeat: 'no-repeat',
                      // Phóng to ảnh nền
                      backgroundSize: `${imageSize.width * ZOOM_FACTOR}px ${imageSize.height * ZOOM_FACTOR}px`,
                      // Di chuyển ảnh nền ngược với hướng chuột để tạo hiệu ứng zoom
                      backgroundPosition: `-${mousePosition.x * ZOOM_FACTOR - LOUPE_SIZE / 2}px -${mousePosition.y * ZOOM_FACTOR - LOUPE_SIZE / 2}px`,
                    }}
                  />
                )}
              </Box>

              {/* === BẮT ĐẦU KHỐI GALLERY ẢNH PHỤ === */}
                <Box sx={{ display: 'flex', gap: 1, mt: 2, justifyContent: 'center' }}>
                  {galleryImages.map((image, index) => (
                    <Box
                      key={index}
                      component="img"
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      onClick={() => setSelectedImage(image)}
                      sx={{
                        width: 100,
                        height: 100,
                        objectFit: 'cover',
                        cursor: 'pointer',
                        borderRadius: 1,
                        border: selectedImage === image ? '3px solid' : '3px solid transparent',
                        borderColor: selectedImage === image ? 'primary.main' : 'transparent',
                        transition: 'border-color 0.2s ease',
                        '&:hover': {
                          opacity: 0.8,
                        },
                      }}
                    />
                  ))}
                </Box>
                   {/* === KẾT THÚC KHỐI GALLERY ẢNH PHỤ === */}
            </Grid>
          
          <Grid item xs={12} md={5}>
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
