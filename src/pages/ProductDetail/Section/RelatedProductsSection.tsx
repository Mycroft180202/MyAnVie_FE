import { Box, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import ProductCard from '../../../components/ProductCard/ProductCard';
import { productService, Product } from '../../../services/productService'; // Import Product interface

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await productService.getProducts();
        const filteredProducts = allProducts.filter(
          (product) => product.categoryName === category && product.id !== currentProductId
        ).slice(0, 4); // Giới hạn 4 sản phẩm
        setRelatedProducts(filteredProducts);
        setError(null);
      } catch (err) {
        console.error('Error fetching related products:', err);
        setError('Không thể tải sản phẩm liên quan.');
      } finally {
        setLoading(false);
      }
    };

    if (category && currentProductId) {
      fetchRelatedProducts();
    }
  }, [category, currentProductId]);

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <div>Đang tải sản phẩm liên quan...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (relatedProducts.length === 0) return null;

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
                title={product.name}
                image={product.thumbnailUrl}
                price={product.price}
                category={product.categoryName}
                subCategory={product.subCategoryName}
              />
            </div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RelatedProductsSection;
