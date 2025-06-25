import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import ProductCard from '../../../components/ProductCard/ProductCard';
import { productService, Product } from '../../../services/productService';
import { FilterOptions } from './ShopFilter';

interface ShopProductListProps {
  categoryId: string | null;
  subCategoryId?: string;
  filters: FilterOptions;
}

const ShopProductList = ({ categoryId, subCategoryId, filters }: ShopProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await productService.getProducts();
        let filteredProducts = allProducts;
        
        // Lọc theo category và subcategory
        if (subCategoryId) {
          filteredProducts = filteredProducts.filter(p => p.subCategoryId === subCategoryId);
        } else if (categoryId) {
          filteredProducts = filteredProducts.filter(p => p.categoryId === categoryId);
        }

        // Áp dụng các bộ lọc
        if (filters.priceRange) {
          filteredProducts = filteredProducts.filter(p => 
            p.price >= filters.priceRange!.min && 
            p.price <= filters.priceRange!.max
          );
        }

        if (filters.timeRange) {
          const now = new Date();
          switch (filters.timeRange) {
            case 'Mới nhất':
              filteredProducts.sort((a, b) => 
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              );
              break;
            case 'Cũ nhất':
              filteredProducts.sort((a, b) => 
                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
              );
              break;
            case 'Tuần này':
              const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
              filteredProducts = filteredProducts.filter(p => 
                new Date(p.createdAt) >= weekAgo
              );
              break;
            case 'Tháng này':
              const monthAgo = new Date(now.getFullYear(), now.getMonth(), 1);
              filteredProducts = filteredProducts.filter(p => 
                new Date(p.createdAt) >= monthAgo
              );
              break;
          }
        }

        if (filters.sortBy) {
          switch (filters.sortBy) {
            case 'Giá tăng dần':
              filteredProducts.sort((a, b) => a.price - b.price);
              break;
            case 'Giá giảm dần':
              filteredProducts.sort((a, b) => b.price - a.price);
              break;
            case 'Tên A-Z':
              filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
              break;
            case 'Tên Z-A':
              filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
              break;
          }
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
  }, [categoryId, subCategoryId, filters]);

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
