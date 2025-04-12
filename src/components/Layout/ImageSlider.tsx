import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const images = [
  '/images/imgSlider/img1.svg',
  '/images/imgSlider/img2.svg',
  '/images/imgSlider/img3.svg',
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        backgroundImage: `url(${images[currentIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%', // Chiếm toàn bộ chiều cao của container cha
        width: '100%',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        px: 2,
        transition: 'background-image 0.5s ease-in-out',
      }}
    >
      <Typography variant="h5" sx={{ textShadow: '1px 1px 4px black' }}>
        CHÀO MỪNG QUAY TRỞ LẠI
      </Typography>
      <Typography variant="h3" fontWeight="bold" sx={{ textShadow: '2px 2px 6px black' }}>
        MYANVIE!
      </Typography>
    </Box>
  );
};

export default ImageSlider;