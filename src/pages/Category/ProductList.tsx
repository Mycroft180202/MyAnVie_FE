import { useState } from 'react';
import { Box, Grid, TextField, MenuItem, Typography } from '@mui/material';
import ProductCard from '../../components/shared/ProductCard';

const mockProducts = [
  // ... (copy toàn bộ mockProducts từ CategoryId.tsx)
  {
    id: 1,
    image: '/images/products/Pottery1.jpg',
    title: 'Bình hoa gốm men lam',
    price: 300000,
    rating: 4.5,
    category: 'Pottery',
  },
  // ... các sản phẩm khác ...
];

const sortOptions = [
  { value: 'priceAsc', label: 'Giá: Thấp đến cao' },
  { value: 'priceDesc', label: 'Giá: Cao đến thấp' },
  { value: 'newest', label: 'Mới nhất' }
];

const ProductList = ({ category }: { category: string }) => {
  const [selectedSort, setSelectedSort] = useState('priceAsc');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSort(event.target.value);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = mockProducts.filter(product =>
    product.category.toLowerCase() === category.toLowerCase() &&
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (selectedSort === 'priceAsc') {
      return a.price - b.price;
    } else if (selectedSort === 'priceDesc') {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <Box>
      {/* Filter Section */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <TextField
          select
          label="Sắp xếp"
          value={selectedSort}
          onChange={handleSortChange}
          sx={{ width: 200 }}
          size="small"
        >
          {sortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Tìm kiếm"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: 300 }}
          size="small"
          placeholder="Nhập tên sản phẩm..."
        />
      </Box>
      {/* Products Grid */}
      {sortedProducts.length > 0 ? (
        <Grid container spacing={3}>
          {sortedProducts.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard
                image={product.image}
                title={product.title}
                price={product.price}
                rating={product.rating}
                category={product.category}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box textAlign="center" py={4}>
          <Typography variant="body1" color="text.secondary">
            Không tìm thấy sản phẩm nào.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProductList;
