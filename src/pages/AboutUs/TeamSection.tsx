import React from 'react';
import Slider from 'react-slick';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const teamMembers = [
  {
    id: 1,
    name: 'Nguyễn Thị Huyền Trang',
    position: 'CEO',
    image: '/images/AboutUs/team-ceo.jpg',
  },
  {
    id: 2,
    name: 'Nguyễn Thị Minh Nguyệt',
    position: 'COO',
    image: '/images/AboutUs/team-coo.jpg',
  },
  {
    id: 3,
    name: 'Nguyễn Quốc Trường',
    position: 'CFO',
    image: '/images/AboutUs/team-cfo.jpg',
  },
  // thêm các thành viên vào đây nếu cần
];

const TeamSection = () => {
  const sliderRef = React.useRef<Slider | null>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ py: 8, textAlign: 'center', background: '#FFF9EC' }}>
      <Typography variant="h4" sx={{ 
        mb: 6, 
        fontWeight: 'bold',
        fontFamily: 'Hoaico2',
        letterSpacing: '4px',
        color: '#5B0101' 
        }}>
        ĐỘI NGŨ THÀNH VIÊN
      </Typography>
      
      <Box sx={{ position: 'relative', maxWidth: '1200px', mx: 'auto', px: 4 }}>
        <Slider ref={sliderRef} {...settings}>
          {teamMembers.map((member) => (
            <Box key={member.id} sx={{ textAlign: 'center', px: 2 }}>
              <Box sx={{ 
                bgcolor: '#fff',
                borderRadius: '12px',
                border: '1px solid #000',
                p: 2,
                mb: 2,
              }}>
                <Box
                  component="img"
                  src={member.image}
                  alt={member.name}
                  sx={{
                    width: '100%',
                    height: '240px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    mb: 2,
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#5B0101', mb: 1 }}>
                  {member.name}
                </Typography>
                <Typography sx={{ color: '#333', mb: 2 }}>
                  {member.position}
                </Typography>
              </Box>
            </Box>
          ))}
        </Slider>

        {/* Custom navigation arrows */}
        <IconButton
          onClick={() => sliderRef.current?.slickPrev()}
          sx={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: '#fff',
            border: '1px solid #ccc',
            '&:hover': { bgcolor: '#f5f5f5' },
            zIndex: 1,
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton
          onClick={() => sliderRef.current?.slickNext()}
          sx={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: '#fff',
            border: '1px solid #ccc',
            '&:hover': { bgcolor: '#f5f5f5' },
            zIndex: 1,
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TeamSection;
