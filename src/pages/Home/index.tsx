import { Box } from '@mui/material';
import HeroSection from '../../components/home/HeroSection';
import FeaturedProducts from '../../components/home/FeaturedProducts';
import CategoryShowcase from '../../components/home/CategoryShowcase';
import AboutSection from '../../components/home/AboutSection';
import ContactSection from '../../components/home/ContactSection';

const Home = () => {
  return (
    <Box>
      <HeroSection />
      <CategoryShowcase />
      <FeaturedProducts />
      <AboutSection />
      <ContactSection />
    </Box>
  );
};

export default Home;
