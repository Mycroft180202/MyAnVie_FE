import { Box, IconButton, Stack } from '@mui/material';
import { useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100; // Tính phần trăm vị trí ngang
    const y = ((e.clientY - rect.top) / rect.height) * 100; // Tính phần trăm vị trí dọc
    setZoomPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setZoomPosition({ x: 0, y: 0 }); // Reset vị trí zoom khi chuột rời khỏi ảnh
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      {/* Ảnh chính */}
      <Box
        sx={{
          position: 'relative',
          mb: 2,
          overflow: 'hidden',
          borderRadius: '12px',
          border: '1px solid #ccc',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Box
          component="img"
          src={images[selectedIndex]}
          alt="Main Product"
          sx={{
            width: '100%',
            objectFit: 'cover',
            aspectRatio: '1',
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`, // Điểm zoom
            transform: zoomPosition.x || zoomPosition.y ? 'scale(1.5)' : 'scale(1)', // Phóng to khi hover
            transition: 'transform 0.2s ease',
          }}
        />
      </Box>

      {/* Thumbnails và điều hướng */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
        <IconButton onClick={handlePrev} sx={arrowButtonStyle}>
          <ArrowBackIosNewIcon />
        </IconButton>

        <Stack direction="row" spacing={2}>
          {images.map((img, idx) => (
            <Box
              key={idx}
              component="img"
              src={img}
              alt={`thumb-${idx}`}
              onClick={() => setSelectedIndex(idx)}
              sx={{
                width: 64,
                height: 64,
                borderRadius: '10px',
                objectFit: 'cover',
                cursor: 'pointer',
                border: selectedIndex === idx ? '2px solid #950B0B' : '1px solid #ccc',
                transition: 'all 0.2s',
              }}
            />
          ))}
        </Stack>

        <IconButton onClick={handleNext} sx={arrowButtonStyle}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

const arrowButtonStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  width: 40,
  height: 40,
  backgroundColor: '#eee',
  '&:hover': {
    backgroundColor: '#ddd',
  },
};

export default ProductGallery;