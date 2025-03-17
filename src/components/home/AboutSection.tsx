import { Container, Grid, Box, Typography } from '@mui/material';
import SectionTitle from '../shared/SectionTitle';

const AboutSection = () => {
  return (
    <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
      <Container>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/images/about-image.jpg"
              alt="Về MyAnVie"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: 3
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SectionTitle 
              title="Về MyAnVie"
              subtitle="Nơi hội tụ tinh hoa nghề thủ công Việt Nam"
            />
            <Typography paragraph>
              MyAnVie là nơi kết nối những người thợ thủ công tài hoa với những người yêu thích nghệ thuật truyền thống Việt Nam. Chúng tôi mang đến những sản phẩm thủ công mỹ nghệ chất lượng cao, được chế tác tỉ mỉ bởi các nghệ nhân từ các làng nghề nổi tiếng.
            </Typography>
            <Typography paragraph>
              Mỗi sản phẩm tại MyAnVie đều là một tác phẩm nghệ thuật độc đáo, mang đậm bản sắc văn hóa Việt Nam. Chúng tôi cam kết mang đến những sản phẩm chất lượng nhất, đồng thời góp phần bảo tồn và phát triển các làng nghề truyền thống.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutSection;
