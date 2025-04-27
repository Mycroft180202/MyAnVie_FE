import { Box } from '@mui/material';
import HeroSection from '../../components/home/HeroSection';
import FeaturedProducts from '../../components/home/FeaturedProducts';
import CategoryShowcase from '../../components/home/CategoryShowcase';
import ContactSection from '../../components/home/ContactSection';
import CommentSection from '../../components/home/CommentSection';
import NewsSection from '../../components/home/NewsSection';

const Home = () => {
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

export default Home;
