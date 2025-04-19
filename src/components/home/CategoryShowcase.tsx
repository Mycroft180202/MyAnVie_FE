import { Box, Button, Container, Typography } from '@mui/material';

const categories = [
  {
    id: 1,
    image: '/images/img/pottery-showcase.jpg',
    title: 'Bộ sưu tập bình\nvà lọ hoa gốm',
    description:
      'Lorem ipsum dolor sit amet consectetur. Ut elementum id erat dignissim cursus ac. Vivamus amet feugiat justo in et at. Enim ac sed lobortis proin. Amet habitant vitae integer enim condimentum. Sed blandit elementum semper ac lorem ut cursus massa etiam. Eros lacus erat vulputate pellentesque ultrices sit amet sapien.',
    isReversed: false,
  },
  {
    id: 2,
    image: '/images/img/silk-showcase.jpg',
    title: 'Phụ kiện làm tóc\n từ lụa hà đông',
    description:
      'Lorem ipsum dolor sit amet consectetur. Ut elementum id erat dignissim cursus ac. Vivamus amet feugiat justo in et at. Enim ac sed lobortis proin. Amet habitant vitae integer enim condimentum. Sed blandit elementum semper ac lorem ut cursus massa etiam. Eros lacus erat vulputate pellentesque ultrices sit amet sapien.',
    isReversed: true,
  },
  {
    id: 3,
    image: '/images/img/bamboo-showcase.jpg',
    title: 'Đồ trang trí mây tre đan',
    description:
      'Lorem ipsum dolor sit amet consectetur. Ut elementum id erat dignissim cursus ac. Vivamus amet feugiat justo in et at. Enim ac sed lobortis proin. Amet habitant vitae integer enim condimentum. Sed blandit elementum semper ac lorem ut cursus massa etiam. Eros lacus erat vulputate pellentesque ultrices sit amet sapien.',
    isReversed: false,
  },
];

const features = [
  {
    id: 1,
    title: 'Giữ gìn và lan tỏa giá trị truyền thống',
  },
  {
    id: 2,
    title: 'Kết nối khách hàng và nghệ nhân',
  },
  {
    id: 3,
    title: 'Truyền tải câu chuyện văn hóa qua từng sản phẩm',
  },
];

const CategoryShowcase = () => {
  return (
    <Box
      sx={{
        background: '#f5f5dc',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Flower decorations */}
      {[...Array(8)].map((_, index) => (
        <Box
          key={index}
          component="img"
          src={index % 2 === 0 ? '/images/icons/hoa-left.svg' : '/images/icons/hoa-right.svg'}
          alt=""
          sx={{
            position: 'absolute',
            opacity: 0.5,
            transform: `rotate(${index * 45}deg)`,
            width: '150px',
            height: '150px',
            ...(index === 0 && { top: '5%', left: '5%' }),
            ...(index === 1 && { top: '15%', right: '10%' }),
            ...(index === 2 && { bottom: '20%', left: '15%' }),
            ...(index === 3 && { bottom: '10%', right: '5%' }),
            ...(index === 4 && { top: '50%', left: '8%' }),
            ...(index === 5 && { top: '40%', right: '12%' }),
            ...(index === 6 && { bottom: '40%', left: '20%' }),
            ...(index === 7 && { top: '30%', right: '25%' }),
          }}
        />
      ))}

      <Container maxWidth="lg" sx={{ py: 10, position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              color: '#5B0101',
              fontFamily: 'Hoaico2',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              mb: 1,
            }}
          >
            MYANVIE
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: '#5B0101',
              fontFamily: 'Hoaico2',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              mb: 3,
            }}
          >
            KẾT NỐI DI SẢN, LAN TỎA GIÁ TRỊ
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: '720px',
              mx: 'auto',
              fontSize: '16px',
              lineHeight: 1.6,
              color: '#000',
            }}
          >
            Lorem ipsum dolor sit amet consectetur. Faucibus feugiat porttitor aliquet natoque. Nisi massa ullamcorper
            fames sit ac scelerisque. Consequat nibh dolor pellentesque morbi aliquam proin. Venenatis enim dolor elit
            enim proin.
          </Typography>
        </Box>

        {/* Feature 1-2-3 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 10,
            flexWrap: 'wrap',
            gap: { xs: 4, md: 0 },
          }}
        >
          {features.map((item) => (
            <Box
              key={item.id}
              sx={{
                textAlign: 'center',
                maxWidth: 300,
                mx: 'auto',
              }}
            >
              {/* Số ID */}
              <Typography
                sx={{
                  fontSize: '60px',
                  fontWeight: 'bold',
                  color: '#000',
                  fontFamily: 'Hoaico2',
                  mb: -1,
                }}
              >
                {item.id}
              </Typography>

              {/* Hoa và Line */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  mb: 1,
                }}
              >
                <img src="/images/icons/hoa-left.svg" alt="" />
                <Box
                  sx={{
                    width: '120px',
                    height: '1px',
                    backgroundColor: '#000',
                    mx: 0,
                  }}
                />
                <img src="/images/icons/hoa-right.svg" alt="" />
              </Box>

              {/* Tiêu đề */}
              <Typography
                sx={{
                  fontSize: '18px',
                  fontFamily: 'Roboto',
                  color: '#000',
                }}
              >
                {item.title}
              </Typography>
            </Box>
          ))}
        </Box>
        {/* Section giới thiệu bộ sưu tập */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 500,
              fontSize: '20px',
              color: '#000',
              fontFamily: 'Roboto',
              mb: 1,
            }}
          >
            Hãy cùng khám phá
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              fontSize: '24px',
              color: '#000',
              fontFamily: 'Roboto',
              mb: 2,
            }}
          >
            Các bộ sưu tập sản phẩm thủ công truyền thống HOT nhất của
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              fontSize: '28px',
              color: '#5B0101',
              fontFamily: 'Hoaico2',
              letterSpacing: '0.1em',
            }}
          >
            MYANVIE
          </Typography>
        </Box>

        {/* Showcase list */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
          {categories.map((category) => (
            <Box
              key={category.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '124px',
                flexDirection: category.isReversed ? 'row-reverse' : 'row',
                ...(category.isReversed && { pl: '100px' }),
                flexWrap: 'wrap',
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  height: '650px',
                  borderRadius: '12px',
                  border: '1px solid #000',
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${category.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <Box
                sx={{
                  width: '476px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '40px',
                  alignItems: category.isReversed ? 'flex-end' : 'flex-start',
                }}
              >
                <Box sx={{ width: '100%' }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontFamily: 'Hoaico2',
                      fontSize: '32px',
                      lineHeight: 1.25,
                      letterSpacing: '0.12em',
                      color: '#5B0101',
                      textAlign: category.isReversed ? 'right' : 'left',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {category.title}
                  </Typography>
                  <Typography
                    sx={{
                      mt: 3,
                      fontSize: '16px',
                      lineHeight: 1.6,
                      letterSpacing: '0.05em',
                      color: '#000',
                      textAlign: 'justify',
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
                      bgcolor: '#7A0909',
                    },
                  }}
                >
                  Khám phá ngay
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default CategoryShowcase;
