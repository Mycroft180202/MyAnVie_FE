import { Box, Container } from '@mui/material';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import HeroIntroSection from './Section/HeroIntroSection';
import ShowroomSection from './Section/ShowroomSection';
import StatsSection from './Section/StatsSection';
import TeamSection from './Section/TeamSection';
import VillageVisitSection from './Section/VillageVisitSection';
import ContactSection from '../Home/Section/ContactSection';

const AboutUsPage = () => {
  return (
    
    <Box sx={{ width: '100%', px: { xs: 0, sm: 0, md: 0 } }}>
        <Container maxWidth="lg" sx={{ pt: -1,ml:15 }}>
        <Breadcrumb
          items={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Về chúng tôi' },
          ]}
        />
      </Container>
        <HeroIntroSection />
        {/* <TeamSection/> */}
        <StatsSection/>
        <VillageVisitSection/>
        <ShowroomSection/>
        <ContactSection/>
    </Box>
  );
};

export default AboutUsPage;