import { Box } from '@mui/material';
import HeroSection from '../Home/Section/HeroSection';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

const AboutUsPage = () => {
  return (
    <Box sx={{ width: '100%', px: { xs: 0, sm: 0, md: 0 } }}>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'About Us', href: '/about' },
          ]}
        />
        <HeroSection />
    </Box>
  );
};

export default AboutUsPage;