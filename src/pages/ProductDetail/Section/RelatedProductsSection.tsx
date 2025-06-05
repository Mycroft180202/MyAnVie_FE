import { Box, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import ProductCard from '../../../components/ProductCard/ProductCard';
import { Product } from '../../../types/product';
import { productService } from '../../../services/productService';

interface RelatedProductsSectionProps {
  currentProductId: string;
  category: string;
}

const RelatedProductsSection: React.FC<RelatedProductsSectionProps> = ({
  currentProductId,
  category,
}) => {
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await productService.getProductsByCategory(category);
        const filtered = response.data
          .filter((product: Product) => product.id !== currentProductId)
          .slice(0, 4);
        setRelatedProducts(filtered);
      } catch (error) {
        console.error('Error fetching related products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchRelatedProducts();
    }
  }, [category, currentProductId]);

  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading || relatedProducts.length === 0) return null;

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold', color: '#950B0B' }}>
        Sản phẩm liên quan
      </Typography>
      <Grid container spacing={3}>
        {relatedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <div onClick={() => handleProductClick(product.id)}>
              <ProductCard
                id={product.id}
                image={product.thumbnailUrl || '/images/products/default.jpg'}
                title={product.name}
                price={product.price}
                category={product.category}
              />
            </div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RelatedProductsSection;
