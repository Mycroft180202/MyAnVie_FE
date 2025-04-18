import { Container, Grid, Box, Typography } from '@mui/material';
import SectionTitle from '../../components/shared/SectionTitle';
import ContactSection from '../../components/home/ContactSection';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import HeroIntroSection from './HeroIntroSection';
import TeamSection from './TeamSection';
import StatsSection from './StatsSection';
import VillageVisitSection from './VillageVisitSection';
import ShowroomSection from './ShowroomSection';

const AboutUs = () => {
  return (
    <Box sx={{ bgcolor: '#FFF9EC' }}>
      <Breadcrumbs />
      <HeroIntroSection />
      <TeamSection />
      <StatsSection />
      <VillageVisitSection />
      <ShowroomSection />
      <ContactSection />
    </Box>
  );
};

export default AboutUs;