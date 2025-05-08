import { Box, Typography } from '@mui/material';

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

const HeroIntroSection = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        height: '600px',
      }}
    >
      {/* Split background images */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          width: '100%',
        }}
      >
        <Box
          sx={{
            flex: 1,
            backgroundImage: 'url(/images/AboutUs/village-pottery.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Box
          sx={{
            flex: 1,
            backgroundImage: 'url(/images/AboutUs/village-silk.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Box
          sx={{
            flex: 1,
            backgroundImage: 'url(/images/AboutUs/village-bamboo.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Box>

      {/* Dark overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1000px',
          mx: 'auto',
          textAlign: 'center',
          px: 2,
          py: 10,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            color: '#fff',
            fontFamily: 'Hoaico2',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            mb: 1,
          }}
        >
          MYANVIE
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            color: '#fff',
            fontFamily: 'Hoaico2',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            mb: 3,
          }}
        >
          KẾT NỐI DI SẢN, LAN TỎA GIÁ TRỊ
        </Typography>
        <Typography
          sx={{
            maxWidth: '720px',
            mx: 'auto',
            fontSize: '18px',
            lineHeight: 1.6,
            color: '#fff',
            mb: 6,
          }}
        >
         MYANVIE là một thương hiệu mang trong mình niềm đam mê văn hóa Việt và khát vọng gìn giữ, lan tỏa giá trị của các làng nghề truyền thống, khám phá vẻ đẹp tinh hoa từ những bàn tay nghệ nhân để trong từng sản phẩm thủ công làng nghề - nơi mỗi món đồ là một câu chuyện, mỗi đường nét là một nét di sản
        </Typography>

        {/* Feature 1-2-3 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: { xs: 4, md: 8 },
          }}
        >
          {features.map((item) => (
            <Box
              key={item.id}
              sx={{
                textAlign: 'center',
                maxWidth: 300,
                color: '#fff',
              }}
            >
              <Typography
                sx={{
                  fontSize: '60px',
                  fontWeight: 'bold',
                  fontFamily: 'Hoaico2',
                  mb: -1,
                }}
              >
                {item.id}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 1,
                  gap: 1,
                }}
              >
                <img src="/images/icons/hoa-left.svg" alt="" />
                <Box
                  sx={{
                    width: '100px',
                    height: '1px',
                    mx: -1,
                    backgroundColor: '#fff',
                  }}
                />
                <img src="/images/icons/hoa-right.svg" alt="" />
              </Box>

              <Typography
                sx={{
                  fontSize: '16px',
                  fontFamily: 'Roboto',
                  color: '#fff',
                }}
              >
                {item.title}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default HeroIntroSection;
export{}