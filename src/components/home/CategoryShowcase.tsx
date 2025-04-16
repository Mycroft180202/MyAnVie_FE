import { Box, Button, Container, Typography } from '@mui/material';

const categories = [
  {
    id: 1,
    image: '/images/img/pottery-showcase.jpg',
    title: 'Bộ sưu tập bình\nvà lọ hoa gốm',
    description: 'Lorem ipsum dolor sit amet consectetur. Ut elementum id erat dignissim cursus ac. Vivamus amet feugiat justo in et at. Enim ac sed lobortis proin. Amet habitant vitae integer enim condimentum. Sed blandit elementum semper ac lorem ut cursus massa etiam. Eros lacus erat vulputate pellentesque ultrices sit amet sapien.',
    isReversed: false
  },
  {
    id: 2,
    image: '/images/img/silk-showcase.jpg',
    title: 'Phụ kiện làm tóc\ntừ lụa hà đông',
    description: 'Lorem ipsum dolor sit amet consectetur. Ut elementum id erat dignissim cursus ac. Vivamus amet feugiat justo in et at. Enim ac sed lobortis proin. Amet habitant vitae integer enim condimentum. Sed blandit elementum semper ac lorem ut cursus massa etiam. Eros lacus erat vulputate pellentesque ultrices sit amet sapien.',
    isReversed: true
  },
  {
    id: 3,
    image: '/images/img/bamboo-showcase.jpg',
    title: 'Đồ trang trí mây tre đan',
    description: 'Lorem ipsum dolor sit amet consectetur. Ut elementum id erat dignissim cursus ac. Vivamus amet feugiat justo in et at. Enim ac sed lobortis proin. Amet habitant vitae integer enim condimentum. Sed blandit elementum semper ac lorem ut cursus massa etiam. Eros lacus erat vulputate pellentesque ultrices sit amet sapien.',
    isReversed: false
  }
];

const CategoryShowcase = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#5B0101' }}>
          MYANVIE
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#5B0101' }}>
          KẾT NỐI DI SẢN, LAN TỎA GIÁ TRỊ
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#000', mb: 1 }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium accusantium laudantium eaque itaque nulla optio maxime est eum labore sit quibusdam nam provident voluptas, molestias voluptates deleniti deserunt minima error.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
        {categories.map((category) => (
          <Box
            key={category.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '124px',
              flexDirection: category.isReversed ? 'row-reverse' : 'row',
              ...(category.isReversed && { pl: '100px' })
            }}
          >
            <Box
              sx={{
                flex: 1,
                height: '400px',
                borderRadius: '12px',
                border: '1px solid #000',
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${category.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <Box
              sx={{
                width: '476px',
                display: 'flex',
                flexDirection: 'column',
                gap: '40px',
                alignItems: category.isReversed ? 'flex-end' : 'flex-start'
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: 'TH Hoaico 2',
                    fontSize: '32px',
                    lineHeight: 1.25,
                    letterSpacing: '12%',
                    color: '#5B0101',
                    textAlign: category.isReversed ? 'right' : 'left',
                    whiteSpace: 'pre-line'
                  }}
                >
                  {category.title}
                </Typography>
                <Typography
                  sx={{
                    mt: 3,
                    fontSize: '16px',
                    lineHeight: 1.17,
                    letterSpacing: '5%',
                    color: '#000',
                    textAlign: 'justify'
                  }}
                >
                  {category.description}
                </Typography>
              </Box>
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#950B0B',
                  borderRadius: '100px',
                  padding: '10px 24px',
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: '#7A0909'
                  }
                }}
              >
                Khám phá ngay
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default CategoryShowcase;
