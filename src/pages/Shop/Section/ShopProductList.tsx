import { Grid } from '@mui/material';
import ProductCard from '../../../components/ProductCard/ProductCard';

const dummyProducts = [
  {
    image: '/images/products/Pottery1.jpg',
    title: 'Bình hoa gốm men lam',
    price: 300000,
    rating: 5,
    category: 'Pottery',
  },
  {
    image: '/images/products/Pottery2.jpg',
    title: 'Chén gốm thủ công',
    price: 150000,
    rating: 4,
    category: 'Pottery',
  },
  // Add more items as needed
];

const ShopProductList = ({ category, tab }: { category: string; tab: string }) => {
  return (
    <Grid container spacing={3}>
      {dummyProducts.map((product, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <ProductCard {...product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ShopProductList;
