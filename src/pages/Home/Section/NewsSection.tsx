import { Box, Typography, IconButton, Button } from '@mui/material';
import { useRef } from 'react';
import Slider from 'react-slick';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import  '../Styles/NewsSection.css';

const news = [
  {
    id: 1,
    image: '/images/news/news-image-1.jpg',
    date: '21/03/2025',
    title: 'Triển lãm sản phẩm thủ công mỹ nghệ mới, sáng tạo huyện Thạch Thất',
  },
  {
    id: 2,
    image: '/images/news/news-image-2.jpg',
    date: '21/03/2025',
    title: 'Triển lãm sản phẩm thủ công mỹ nghệ mới, sáng tạo huyện Thạch Thất',
  },
  {
    id: 3,
    image: '/images/news/news-image-1.jpg',
    date: '21/03/2025',
    title: 'Triển lãm sản phẩm thủ công mỹ nghệ mới, sáng tạo huyện Thạch Thất',
  },
  {
    id: 4,
    image: '/images/news/news-image-2.jpg',
    date: '21/03/2025',
    title: 'Triển lãm sản phẩm thủ công mỹ nghệ mới, sáng tạo huyện Thạch Thất',
  },
];

const NewsSection = () => {
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    dotsClass: 'slick-dots news-dots',
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 500,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <Box
      sx={{
        py: 10,
        bgcolor: '#FFF9EC',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: '#5B0101',
            fontFamily: 'Hoaico2',
            textAlign: 'center',
            mb: 5,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Tin tức nổi bật
        </Typography>

        <Box sx={{ maxWidth: '1400px', mx: 'auto', px: 2, pb: 6 }}>
          <Slider ref={sliderRef} {...settings}>
            {news.map((item) => (
              <Box key={item.id} px={2}>
                <Box className="news-card">
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.title}
                    className="news-image"
                  />
                  <Typography
                    variant="caption"
                    sx={{ display: 'block', mt: 1, color: '#555', fontSize: '13px' }}
                  >
                    {item.date}
                  </Typography>
                  <Typography
                    sx={{
                      mt: 1,
                      fontWeight: 500,
                      fontSize: '15px',
                      color: '#000',
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Box className="arrow-icon">→</Box>
                </Box>
              </Box>
            ))}
          </Slider>

          {/* Arrows */}
          <IconButton
            onClick={() => sliderRef.current?.slickPrev()}
            sx={{
              position: 'absolute',
              top: '50%',
              left: 0,
              transform: 'translateY(-50%)',
              zIndex: 2,
              bgcolor: '#fff',
              border: '1px solid #ccc',
              '&:hover': {
                bgcolor: '#f5f5f5',
              },
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton
            onClick={() => sliderRef.current?.slickNext()}
            sx={{
              position: 'absolute',
              top: '50%',
              right: 0,
              transform: 'translateY(-50%)',
              zIndex: 2,
              bgcolor: '#fff',
              border: '1px solid #ccc',
              '&:hover': {
                bgcolor: '#f5f5f5',
              },
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>

          {/* Xem thêm */}
          <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#950B0B',
                color: '#fff',
                px: 4,
                py: 1,
                borderRadius: '20px',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: '#750909',
                },
              }}
            >
              Xem thêm
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NewsSection;
