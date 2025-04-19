import { Box, Container, Typography, Grid } from '@mui/material';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import ProductList from './ProductList';

const categoryImages = [
  '/images/products/Pottery1.jpg',
  '/images/products/Pottery2.jpg',
  '/images/products/Pottery3.jpg',
];

const CategoryIndex = () => {
  return (
    <Box sx={{ bgcolor: '#FFF9EC', minHeight: '100vh', pb: 6 }}>
      <Breadcrumbs />
      <Container maxWidth="lg" sx={{ pt: 3 }}>
        {/* Banner ghép 3 ảnh */}
        <Box sx={{ mt: 4, mb: 6 }}>
          <Box
            sx={{
              display: 'flex',
              height: { xs: '250px', sm: '300px', md: '400px' },
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: 4,
              position: 'relative',
            }}
          >
            {/* Image 1 */}
            <Box
              sx={{
                flex: 1,
                backgroundImage: `url(${categoryImages[0]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            {/* Image 2 */}
            <Box
              sx={{
                flex: 1,
                backgroundImage: `url(${categoryImages[1]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            {/* Image 3 */}
            <Box
              sx={{
                flex: 1,
                backgroundImage: `url(${categoryImages[2]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            {/* Overlay */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.5)',
              }}
            />

            {/* Text over the images */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 16,
                left: 0,
                width: '100%',
                textAlign: 'center',
                color: '#fff',
                textShadow: '0 2px 8px #000',
                fontFamily: 'Hoaico2',
                fontSize: { xs: 20, sm: 28, md: 36 },
                fontWeight: 'bold',
                letterSpacing: 2,
                textTransform: 'uppercase',
              }}
            >
              Danh Mục Sản Phẩm Gốm
            </Box>
          </Box>
        </Box>

        {/* Danh sách sản phẩm */}
        <ProductList category="Pottery" />
      </Container>
    </Box>
  );
};

export default CategoryIndex;
