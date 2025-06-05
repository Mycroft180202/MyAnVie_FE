import { Box, Container, Grid, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { Category } from '../../../types/category';
import { categoryService } from '../../../services/categoryService';

interface ShopBannerProps {
  category: string;
}

const ShopBanner: React.FC<ShopBannerProps> = ({ category }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const categoryImage = `/images/categories/${category}.jpg`;

  const getTitle = () => {
    if (category === 'all') return 'Tất cả sản phẩm';
    return `Sản phẩm ${category}`;
  };

  return (
    <Box sx={{ mt: -2, mb: 6 }}>
      <Box sx={{ display: 'flex', height: { xs: 200, md: 300 }, position: 'relative', overflow: 'hidden' }}>
        <Box
          sx={{
            flex: 1,
            bgcolor: '#FFF9EC',
            backgroundImage: 'url(/images/hero-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.7)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            px: 4,
            color: '#fff',
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 24, md: 36 },
              fontWeight: 'bold',
              fontFamily: 'Hoaico2',
              mb: 2,
              textTransform: 'uppercase',
            }}
          >
            {getTitle()}
          </Typography>
          <Typography
            sx={{
              maxWidth: '70%',
              fontSize: { xs: 14, md: 16 },
              fontFamily: 'Roboto',
              fontWeight: 300,
            }}
          >
            Khám phá các sản phẩm đa dạng và phong phú của chúng tôi
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ShopBanner;
