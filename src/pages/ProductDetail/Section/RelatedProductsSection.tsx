import { Box, Typography, Grid } from '@mui/material';
import ProductCard from '../../../components/ProductCard/ProductCard';
import productsData from '../../../pages/Shop/mockProducts'; // hoặc import tương ứng

interface RelatedProductsSectionProps {
  currentProductId: number;
  category: string;
}

const RelatedProductsSection: React.FC<RelatedProductsSectionProps> = ({
  currentProductId,
  category,
}) => {
  const relatedProducts = productsData
    .filter(
      (product) => product.category === category && product.id !== currentProductId
    )
    .slice(0, 4); // Giới hạn 4 sản phẩm

  if (relatedProducts.length === 0) return null;

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold', color: '#950B0B' }}>
        Sản phẩm liên quan
      </Typography>
      <Grid container spacing={3}>
        {relatedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RelatedProductsSection;
