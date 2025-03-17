import { useParams } from 'react-router-dom';
import SectionTitle from '../../components/shared/SectionTitle';
import ProductCard from '../../components/shared/ProductCard';
import { Container, Grid, Box, Typography, TextField, MenuItem } from '@mui/material';
import { useState } from 'react';

// **Dữ liệu sản phẩm mẫu (sẽ thay thế bằng API sau)**
const mockProducts = [
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

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<string>('alphabetical');

  const categoryName = categoryId ? categoryId.replace('-', ' ').toUpperCase() : 'Danh mục sản phẩm';

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSort(event.target.value);
  };

  // Lọc sản phẩm theo danh mục và search query
  const filteredProducts = categoryId
    ? mockProducts.filter(product => 
        product.category.toUpperCase() === categoryName &&
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockProducts.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // Sắp xếp sản phẩm đã lọc
  const sortedProducts = [...filteredProducts].sort((a, b) => {
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
        <SectionTitle title={`Danh mục: ${categoryName}`} />
        
        {/* Thanh search và sort */}
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
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Search Products"
                value={searchQuery}
                onChange={handleSearchChange}
                fullWidth
                placeholder="Enter product name..."
              />
            </Grid>
          </Grid>
        </Box>

        {sortedProducts.length > 0 ? (
          <Grid container spacing={3}>
            {sortedProducts.map(product => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
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
              Hiện tại chưa có sản phẩm nào trong danh mục này.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default CategoryPage;