import { Box, Container, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import productsData from '../../pages/Shop/mockProducts'; 
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import ProductImageGallery from '../ProductDetail/Section/ProductGallery';
import ProductPurchaseInfo from '../ProductDetail/Section/ProductPurchaseInfo';
import ProductTabSection from '../ProductDetail/Section/ProductTabSection';
import RelatedProductsSection from '../ProductDetail/Section/RelatedProductsSection';

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = productsData.find((p) => p.id === Number(productId));

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Typography variant="h6">Sản phẩm không tồn tại</Typography>
      </Container>
    );
  }

  return (
    <Box >
      
      <Container maxWidth="lg" sx={{ pt: -1,ml:15 }} >
        <Breadcrumb
          items={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Cửa hàng', href: '/shop' },
            { label: product.title },
          ]}
        />
        </Container>

        <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <ProductImageGallery images={[product.image]} />
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
