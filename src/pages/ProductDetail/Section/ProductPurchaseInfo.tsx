import { Box, Typography, Rating, Button } from '@mui/material';

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: number;
  category: string;
  subCategory: string;
}

interface ProductPurchaseInfoProps {
  product: Product;
}

const ProductPurchaseInfo: React.FC<ProductPurchaseInfoProps> = ({ product }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#5B0101', fontFamily: 'Hoaico2' }}>
        {product.title}
      </Typography>

      <Typography variant="h6" sx={{ color: '#950B0B', fontWeight: 500 }}>
        {product.price.toLocaleString('vi-VN')}₫
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Rating value={product.rating} readOnly />
        <Typography variant="body2">({product.rating} sao)</Typography>
      </Box>

      <Typography variant="body2" sx={{ fontSize: 14, color: '#555' }}>
        Danh mục: {product.category.toUpperCase()} / {product.subCategory}
      </Typography>

      <Button
        variant="contained"
        sx={{
          mt: 3,
          backgroundColor: '#950B0B',
          borderRadius: '100px',
          padding: '10px 24px',
          textTransform: 'none',
          fontWeight: 500,
          '&:hover': {
            backgroundColor: '#750909',
          },
        }}
      >
        Thêm vào giỏ hàng
      </Button>
    </Box>
  );
};

export default ProductPurchaseInfo;
