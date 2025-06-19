import { Box, Button, Container, Typography } from '@mui/material';

const categories = [
  {
    id: 1,
    image: '/images/img/pottery-showcase.jpg',
    title: 'Bộ sưu tập bình\nvà lọ hoa gốm',
    description:
      'Chắt lọc từ những thớ đất sét tinh túy, được nhào nặn dưới bàn tay tài hoa và nung luyện qua lửa đỏ, mỗi tác phẩm gốm sứ của MYANVIE là một lời tự sự mộc mạc của đất. Không chỉ là vật dụng, đó là mảnh hồn của làng nghề truyền thống, mang đến sự bình yên, ấm cúng và một vẻ đẹp vững chãi cho không gian sống của bạn. Mỗi món gốm là một dấu ấn riêng, không hoàn toàn lặp lại, hứa hẹn sẽ trở thành một điểm nhấn độc đáo, kể câu chuyện về sự gắn kết giữa con người và thiên nhiên.',
    isReversed: false,
  },
  {
    id: 2,
    image: '/images/ActualProduct/lua1.png',
    title: 'Cô gái bên đầm sen \n từ lụa hà đông',
    description:
      'Từ những sợi tơ tằm óng ả được nuôi dưỡng bởi lá dâu xanh, qua đôi tay khéo léo của người nghệ nhân dệt vải, mỗi tấm lụa MYANVIE là một dòng chảy của vẻ đẹp mềm mại và thanh lịch. Chúng tôi không chỉ tạo ra những khổ vải, mà còn dệt nên những câu chuyện văn hóa, những nét duyên thầm của người phụ nữ Việt. Khoác lên mình tấm lụa MYANVIE không chỉ là mặc một trang phục, mà là mang theo cả một di sản, một sự khẳng định về vẻ đẹp tinh tế, sang trọng và đầy cuốn hút vượt thời gian.',
    isReversed: true,
  },
  {
    id: 3,
    image: '/images/img/bamboo-showcase.jpg',
    title: 'Đồ trang trí mây tre đan',
    description:
      'Từ những sợi mây, nan tre mộc mạc của làng nghề Việt, qua đôi tay khéo léo của người nghệ nhân, mỗi tác phẩm được hình thành không chỉ là một vật dụng trang trí. Đó là sự kết tinh của nét đẹp tự nhiên, sự ấm áp của vật liệu và câu chuyện văn hóa dung dị, mang đến một không gian sống an yên và tinh tế.',
    isReversed: false,
  },
];

const features = [
  {
    id: 1,
    title: 'Gìn giữ tinh hoa di sản',
  },
  {
    id: 2,
    title: 'Thổi hồn xưa vào nhịp sống nay',
  },
  {
    id: 3,
    title: 'Kể chuyện văn hóa qua từng tác phẩm.',
  },
];

const CategoryShowcase = () => {
  return (
    <Box
      sx={{
        background: '#f5f5dc',
        position: 'relative',
        overflow: 'hidden',
        mt:-1
      }}
    >
      
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
            Cầu nối giữa những giá trị xưa với nhịp chảy hối hả ngày nay.
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