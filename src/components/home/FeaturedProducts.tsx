import { Container, Grid } from '@mui/material';
import SectionTitle from '../shared/SectionTitle';
import ProductCard from '../shared/ProductCard';

const featuredProducts = [
  {
    id: 1,
    image: '/images/products/ceramic-vase.jpg',
    title: 'Bình gốm trang trí họa tiết lá',
    price: 1200000,
    rating: 4.5,
    category: 'Đồ gốm'
  },
  {
    id: 2,
    image: '/images/products/bamboo-basket.jpg',
    title: 'Giỏ mây đan thủ công',
    price: 450000,
    rating: 4.8,
    category: 'Mây tre đan'
  },
  {
    id: 3,
    image: '/images/products/silk-scarf.jpg',
    title: 'Khăn lụa thêu tay',
    price: 850000,
    rating: 4.7,
    category: 'Lụa'
  },
  {
    id: 4,
    image: '/images/products/conical-hat.jpg',
    title: 'Nón lá họa tiết đặc biệt',
    price: 350000,
    rating: 4.6,
    category: 'Nón lá'
  }
];

const FeaturedProducts = () => {
  return (
    <Container sx={{ py: 8 }}>
      <SectionTitle
        title="Sản phẩm nổi bật"
        subtitle="Khám phá những sản phẩm thủ công độc đáo và được yêu thích nhất"
        centered
      />
      <Grid container spacing={4}>
        {featuredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FeaturedProducts;
