import { Box, Grid, Typography } from '@mui/material';
import ProductCard from '../../components/shared/ProductCard';

const mockProducts = [
  {
    id: 1,
    image: '/images/products/Pottery1.jpg',
    title: 'Bình hoa gốm men lam',
    price: 300000,
    rating: 5,
    category: 'Pottery',
  },
  {
    id: 2,
    image: '/images/products/Pottery2.jpg',
    title: 'Bình hoa gốm men lam',
    price: 300000,
    rating: 5,
    category: 'Pottery',
  },
  {
    id: 3,
    image: '/images/products/Pottery3.jpg',
    title: 'Bình hoa gốm men lam',
    price: 300000,
    rating: 5,
    category: 'Pottery',
  },
  // Thêm sản phẩm tùy ý nếu cần
];

const ProductList = ({ category }: { category: string }) => {
  const filteredProducts = mockProducts.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <Box>
      {filteredProducts.length > 0 ? (
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Box
                sx={{
                  border: '1px solid #eee',
                  borderRadius: 2,
                  p: 2,
                  bgcolor: '#fff',
                  textAlign: 'center',
                  boxShadow: 1,
                  position: 'relative',
                  transition: '0.3s',
                  '&:hover': {
                    boxShadow: 3,
                  },
                }}
              >
                <Box
                  component="img"
                  src={product.image}
                  alt={product.title}
                  sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                    borderRadius: 1,
                    mb: 2,
                  }}
                />

                <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
                  {product.title}
                </Typography>

                <Typography
                  variant="h6"
                  sx={{ color: '#c0392b', fontWeight: 'bold', mb: 1 }}
                >
                  {product.price.toLocaleString('vi-VN')}đ
                </Typography>

                <Box>
                  {'⭐'.repeat(Math.floor(product.rating)) +
                    (product.rating % 1 ? '½' : '')}
                </Box>

                {/* Icon yêu thích nếu muốn thêm sau */}
                {/* <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                  <FavoriteBorderIcon sx={{ color: 'gray' }} />
                </Box> */}
              </Box>
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
