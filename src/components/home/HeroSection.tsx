import { Box, Container, Button, IconButton } from '@mui/material';
import { useState } from 'react';
import Slider from 'react-slick';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/HeroSection.css';

const HeroSection = () => {
  const [slider, setSlider] = useState<Slider | null>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true, // Thêm tính năng tự động chuyển slide
    autoplaySpeed: 3000, // Thời gian giữa các slide (3 giây)
    dotsClass: 'slick-dots custom-dots',
    customPaging: () => (
      <Box
        sx={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: 'white',
        }}
      />
    ),
  };

  const slides = [
    {
      id: 1,
      image: '/images/img/Slider/img1.svg',
      title: 'Khám phá không gian văn hóa',
      subtitle: 'LÀNG LỤA VẠN PHÚC',
      buttonText: 'Khám phá',
    },
    {
      id: 2,
      image: '/images/img/Slider/img2.svg',
      title: 'Khám phá không gian văn hóa',
      subtitle: 'Làng gốm Bát Tràng',
      buttonText: 'Khám phá',
    },
    {
      id: 3,
      image: '/images/img/Slider/img3.svg',
      title: 'Khám phá không gian văn hóa',
      subtitle: 'Làng mây tre đan',
      buttonText: 'Khám phá',
    },
  ];

  return (
    <Box sx={{ position: 'relative', mt: 0 }}>
      <Slider ref={(c) => setSlider(c)} {...settings}>
        {slides.map((slide) => (
          <Box
            key={slide.id}
            sx={{
              position: 'relative',
              background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${slide.image}) no-repeat center center`,
              backgroundSize: 'cover',
              height: { xs: '60vh', md: '80vh' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                textAlign: 'center',
              }}
            >
              <Container maxWidth="lg">
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Box
                    component="h1"
                    sx={{
                      fontSize: '24px',
                      fontWeight: 400,
                      fontFamily: 'Roboto',
                      letterSpacing: '0.05em',
                      margin: 0,
                      color: 'white',
                      textTransform: 'uppercase',
                    }}
                  >
                    {slide.title}
                  </Box>
                  <Box
                    component="p"
                    sx={{
                      fontSize: '44px',
                      fontFamily: 'Hoaico2',
                      letterSpacing: '0.05em',
                      margin: '12px 0',
                      color: 'white',
                    }}
                  >
                    {slide.subtitle}
                  </Box>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: '#F7B463',
                      color: 'black',
                      borderRadius: '100px',
                      padding: '10px 24px',
                      '&:hover': {
                        bgcolor: '#F7B463',
                        opacity: 0.9,
                      },
                      marginTop: '40px',
                      textTransform: 'none',
                    }}
                  >
                    {slide.buttonText}
                  </Button>
                </Box>
              </Container>
            </Box>
          </Box>
        ))}
      </Slider>

      {/* Navigation Arrows */}
      <IconButton
        onClick={() => slider?.slickPrev()}
        sx={{
          position: 'absolute',
          left: { xs: 10, md: 40 },
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'transparent',
          border: '1px solid white',
          color: 'white',
          p: '10px',
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.1)',
          },
          zIndex: 1,
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton
        onClick={() => slider?.slickNext()}
        sx={{
          position: 'absolute',
          right: { xs: 10, md: 40 },
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'transparent',
          border: '1px solid white',
          color: 'white',
          p: '10px',
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.1)',
          },
          zIndex: 1,
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default HeroSection;
