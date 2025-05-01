import { Box } from '@mui/material';
import HeroSection from './Section/HeroSection';
import CategoryShowcase from './Section/CategoryShowcase';
import FeaturedProducts from './Section/FeaturedProducts';
import CommentSection from './Section/CommentSection';
import NewsSection from './Section/NewsSection';
import ContactSection from './Section/ContactSection';

const HomePage = () => {
  return (
    <Box sx={{ width: '100%', px: { xs: 0, sm: 0, md: 0 } }}>
        <HeroSection />
        <CategoryShowcase />
        <FeaturedProducts />
        <CommentSection />
        <NewsSection />
        <ContactSection />
    </Box>
  );
};

export default HomePage;