import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  TextField,
  MenuItem,
  Slider,
  Button,
  Typography,
} from '@mui/material';
import ProductCard from '../../components/shared/ProductCard';

const products = [
  {
    id: 1,
    image: '/images/products/Pottery1.jpg',
    title: 'Bát gốm sứ trắng',
    price: 100000,
    rating: 4.5,
    category: 'Pottery',
  },
  {
    id: 2,
    image: '/images/products/Pottery2.jpg',
    title: 'Bộ 4 bình hoa sen',
    price: 200000,
    rating: 4.0,
    category: 'Pottery',
  },
  {
    id: 3,
    image: '/images/products/Pottery3.jpg',
    title: 'Bộ 3 bình hoa xa lánh',
    price: 200000,
    rating: 4.0,
    category: 'Pottery',
  },
  {
    id: 4,
    image: '/images/products/Pottery4.jpg',
    title: 'Bộ 3 bình hoa sen',
    price: 200000,
    rating: 4.0,
    category: 'Pottery',
  },
  {
    id: 5,
    image: '/images/products/Pottery5.jpg',
    title: 'Bộ chén trắng tinh như Ngọc Trinh',
    price: 100000,
    rating: 4.5,
    category: 'Pottery',
  },
  {
    id: 6,
    image: '/images/products/Pottery6.jpg',
    title: 'Bộ chén sen ngọc',
    price: 200000,
    rating: 4.0,
    category: 'Pottery',
  },
  {
    id: 7,
    image: '/images/products/Pottery7.jpg',
    title: 'Bộ chén thời nảo thời nào',
    price: 200000,
    rating: 4.0,
    category: 'Pottery',
  },
  {
    id: 8,
    image: '/images/products/Pottery8.jpg',
    title: 'Bộ chén xanh ngọc cá Koi',
    price: 200000,
    rating: 4.0,
    category: 'Pottery',
  },
  {
    id: 9,
    image: '/images/products/Pottery9.jpg',
    title: 'Bộ chén triệu đô',
    price: 100000,
    rating: 4.5,
    category: 'Pottery',
  },
  {
    id: 10,
    image: '/images/products/Pottery10.jpg',
    title: 'Bộ chén tỉ đô',
    price: 200000,
    rating: 4.0,
    category: 'Pottery',
  },
  {
    id: 11,
    image: '/images/products/Silk1.jpg',
    title: 'Lụa tằm',
    price: 100000,
    rating: 4.5,
    category: 'Silk',
  },
  {
    id: 12,
    image: '/images/products/Silk2.jpg',
    title: 'Lụa Hà Đông rep 1:1',
    price: 200000,
    rating: 4.0,
    category: 'Silk',
  },
  {
    id: 13,
    image: '/images/products/Silk3.jpg',
    title: 'Lụa riu no phake',
    price: 200000,
    rating: 4.0,
    category: 'Silk',
  },
  {
    id: 14,
    image: '/images/products/Silk4.jpg',
    title: 'Lụa gấc đẹp',
    price: 200000,
    rating: 4.0,
    category: 'Silk',
  },
  {
    id: 15,
    image: '/images/products/Silk5.jpg',
    title: 'Pass môn pls',
    price: 100000,
    rating: 4.5,
    category: 'Silk',
  },
  {
    id: 16,
    image: '/images/products/Bamboo1.jpg',
    title: 'Mây tre đan đa năng',
    price: 100000,
    rating: 4.5,
    category: 'Bamboo',
  },
  {
    id: 17,
    image: '/images/products/Bamboo2.jpg',
    title: 'Đèn ngủ mây tre đan',
    price: 200000,
    rating: 4.0,
    category: 'Bamboo',
  },
  {
    id: 18,
    image: '/images/products/Bamboo3.jpg',
    title: 'Bộ 3 chúng tôi đơn giản là Gấu',
    price: 200000,
    rating: 4.0,
    category: 'Bamboo',
  },
  {
    id: 19,
    image: '/images/products/Bamboo4.jpg',
    title: 'Ghế mây tre đan',
    price: 200000,
    rating: 4.0,
    category: 'Bamboo',
  },
  {
    id: 20,
    image: '/images/products/Bamboo5.jpg',
    title: 'Đèn trang trí',
    price: 100000,
    rating: 4.5,
    category: 'Bamboo',
  },
  {
    id: 21,
    image: '/images/products/Bamboo6.jpg',
    title: 'Đèn ngủ siêu chill',
    price: 200000,
    rating: 4.0,
    category: 'Bamboo',
  },
  {
    id: 22,
    image: '/images/products/Bamboo7.jpg',
    title: 'Bộ ghế mây tre đan',
    price: 200000,
    rating: 4.0,
    category: 'Bamboo',
  },
  {
    id: 23,
    image: '/images/products/Bamboo8.jpg',
    title: 'Bộ túi lắc xu ry',
    price: 200000,
    rating: 4.0,
    category: 'Bamboo',
  },
  {
    id: 24,
    image: '/images/products/Bamboo9.jpg',
    title: 'Giỏ đồ mây tre đan',
    price: 100000,
    rating: 4.5,
    category: 'Bamboo',
  },
  {
    id: 25,
    image: '/images/products/Bamboo10.jpg',
    title: 'Cũng là giỏ đồ mây tre đan',
    price: 200000,
    rating: 4.0,
    category: 'Bamboo',
  },
];

const sortOptions = [
  { value: 'alphabetical', label: 'A to Z' },
  { value: 'priceAsc', label: 'Price: Low to High' },
  { value: 'priceDesc', label: 'Price: High to Low' },
];

const ProductPage: React.FC = () => {
  const [selectedSort, setSelectedSort] = useState<string>('alphabetical');

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSort(event.target.value);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (selectedSort === 'alphabetical') {
      return a.title.localeCompare(b.title);
    } else if (selectedSort === 'priceAsc') {
      return a.price - b.price;
    } else if (selectedSort === 'priceDesc') {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <Box>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Danh mục sản phẩm
        </Typography>
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                select
                label="Sort By"
                value={selectedSort}
                onChange={handleSortChange}
                fullWidth
              >
                {sortOptions.map(({ value, label }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={3}>
          {sortedProducts.map(({ id, image, title, price, rating, category }) => (
            <Grid item key={id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard
                image={image}
                title={title}
                price={price}
                rating={rating}
                category={category}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductPage;