import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import ProductCard from '../../../components/ProductCard/ProductCard';
import { productService, Product } from '../../../services/productService';

interface ShopProductListProps {
  categoryId: string | null;
  subCategoryId?: string;
}

const ShopProductList = ({ categoryId, subCategoryId }: ShopProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await productService.getProducts(); // Lấy tất cả sản phẩm
        let filteredProducts: Product[] = [];
        
        if (subCategoryId) {
          filteredProducts = allProducts.filter(p => p.subCategoryId === subCategoryId);
        } else if (categoryId) {
          filteredProducts = allProducts.filter(p => p.categoryId === categoryId);
        } else {
          filteredProducts = allProducts; // Nếu không có bộ lọc, hiển thị tất cả
        }
        
        setProducts(filteredProducts);
        setError(null);
      } catch (err) {
        setError('Không thể tải danh sách sản phẩm');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, subCategoryId]);

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <ProductCard
            id={product.id}
            title={product.name}
            image={product.thumbnailUrl}
            price={product.price}
            category={product.categoryName}
            subCategory={product.subCategoryName}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ShopProductList;
