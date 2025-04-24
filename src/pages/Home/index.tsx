import { Box } from '@mui/material';
import HeroSection from '../../components/home/HeroSection';
import FeaturedProducts from '../../components/home/FeaturedProducts';
import CategoryShowcase from '../../components/home/CategoryShowcase';
import AboutSection from '../../components/home/AboutSection';
import ContactSection from '../../components/home/ContactSection';
import CommentSection from '../../components/home/CommentSection';
import NewsSection from '../../components/home/NewsSection';

const Home = () => {
  return (
    <Box sx={{ width: '100%', px: { xs: 0, sm: 0, md: 0 } }}>
      <Box sx={{ mb: { xs: 4, md: 8 } }}>
        <HeroSection />
      </Box>
      <Box sx={{ mb: { xs: 4, md: 8 } }}>
        <CategoryShowcase />
      </Box>
      <Box sx={{ mb: { xs: 4, md: 8 } }}>
        <FeaturedProducts />
      </Box>
      <Box sx={{ mb: { xs: 4, md: 8 } }}>
        <CommentSection />
      </Box>
      <Box sx={{ mb: { xs: 4, md: 8 } }}>
        <NewsSection />
      </Box>
      <Box sx={{ mb: { xs: 4, md: 8 } }}>
        <ContactSection />
      </Box>
      {/* Có thể thêm sx cho Box cha nếu muốn padding nhỏ trên mobile */}
    </Box>
  );
};

export default Home;
