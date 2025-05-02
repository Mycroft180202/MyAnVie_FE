import { Grid } from '@mui/material';
import ProductCard from '../../../components/ProductCard/ProductCard';
import productsData from '..//mockProducts';

const ShopProductList = ({ category, tab }: { category: string; tab: string }) => {
  const filteredProducts = productsData.filter((p) => {
    return p.category === category && (tab === '' || p.subCategory === tab);
  });

  return (
    <Grid container spacing={3}>
      {filteredProducts.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <ProductCard {...product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ShopProductList;
