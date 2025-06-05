import { Box, Container, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import ProductImageGallery from './Section/ProductGallery';
import ProductPurchaseInfo from './Section/ProductPurchaseInfo';
import ProductTabSection from './Section/ProductTabSection';
import RelatedProductsSection from './Section/RelatedProductsSection';
import { productService } from '../../services/productService';
import { Product } from '../../types/product';

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      try {
        const data = await productService.getProductById(productId);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Typography variant="h6">Sản phẩm không tồn tại</Typography>
      </Container>
    );
  }

  return (
    <Box>
      <Container maxWidth="lg" sx={{ pt: -1, ml: 15 }}>
        <Breadcrumb
          items={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Cửa hàng', href: '/shop' },
            { label: product.name },
          ]}
        />
      </Container>

      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <ProductImageGallery images={[product.thumbnailUrl || '/images/products/default.jpg']} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProductPurchaseInfo product={product} />
          </Grid>
        </Grid>
        <ProductTabSection product={product} />
        <RelatedProductsSection currentProductId={product.id} category={product.category} />
      </Container>
    </Box>
  );
};

export default ProductDetailPage;
