import { Box, Stack } from '@mui/material';
import { useState, useEffect } from 'react';

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  useEffect(() => {
    setSelectedImage(images[0]);
  }, [images]);

  return (
    <Box>
      {/* Ảnh chính */}
      <Box
        component="img"
        src={selectedImage}
        alt="Product Main"
        sx={{
          width: '100%',
          height: 'auto',
          borderRadius: '12px',
          border: '1px solid #ddd',
          mb: 2,
          objectFit: 'contain',
        }}
      />

      {/* Danh sách ảnh phụ */}
      <Stack direction="row" spacing={2} justifyContent="center">
        {images.map((img, idx) => (
          <Box
            key={idx}
            component="img"
            src={img}
            alt={`Thumbnail ${idx + 1}`}
            onClick={() => setSelectedImage(img)}
            sx={{
              width: 64,
              height: 64,
              objectFit: 'cover',
              borderRadius: '8px',
              border: selectedImage === img ? '2px solid #950B0B' : '1px solid #ccc',
              cursor: 'pointer',
              transition: 'border 0.2s',
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default ProductGallery;
