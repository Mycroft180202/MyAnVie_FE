import { useState, useEffect } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import ProductCard from '../../../components/ProductCard/ProductCard';
import SearchResultsLoader from '../../../components/LoadingSpinner/SearchResultsLoader';
import { Product } from '../../../types/product';
import { productService } from '../../../services/productService';

interface ShopProductListProps {
  category: string;
  tab: string;
  currentPage: number;
  onPageChange: (page: number) => void;
  onTotalPagesChange: (pages: number) => void;
}

const ShopProductList: React.FC<ShopProductListProps> = ({ 
  category, 
  tab, 
  currentPage, 
  
  onTotalPagesChange 
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await productService.getProductsByCategory(category, {
          page: currentPage,
          limit: 9,
          sortBy: tab || undefined
        });
        setProducts(response.data);
        onTotalPagesChange(response.totalPages);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, tab, currentPage, onTotalPagesChange]);

  if (loading) {
    return <SearchResultsLoader count={9} />;
  }

  if (!products || products.length === 0) {
    return (
      <Box
        sx={{
          py: 8,
          textAlign: 'center',
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Không có sản phẩm nào phù hợp
        </Typography>
        <Typography color="text.secondary">Vui lòng thử tìm kiếm với từ khóa khác</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <ProductCard
            id={product.id}
            image={product.thumbnailUrl || '/images/products/default.jpg'}
            title={product.name}
            price={product.price}
            category={product.category}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ShopProductList;