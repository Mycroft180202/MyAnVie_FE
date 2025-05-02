import { Box, Typography } from '@mui/material';

const bannerData: Record<string, { images: string[]; name: string; description: string }> = {
  pottery: {
    images: ['/images/products/Pottery1.jpg', '/images/products/Pottery2.jpg', '/images/products/Pottery3.jpg'],
    name: 'Gốm',
    description: 'Các sản phẩm gốm sứ tinh xảo, mang đậm nét truyền thống và hiện đại.',
  },
  silk: {
    images: ['/images/products/Silk1.jpg', '/images/products/Silk2.jpg'],
    name: 'Lụa',
    description: 'Những sản phẩm lụa cao cấp, mềm mại và sang trọng.',
  },
  bamboo: {
    images: ['/images/products/Bamboo1.jpg', '/images/products/Bamboo2.jpg'],
    name: 'Mây tre đan',
    description: 'Sản phẩm mây tre đan thủ công, thân thiện với môi trường.',
  },
};

interface ShopBannerProps {
  category: string; // 👈 Cho phép nhận từ useParams
}

const ShopBanner = ({ category }: ShopBannerProps) => {
  const { images = [], name = category, description = '' } = bannerData[category] || {};

  return (
    <Box sx={{ mt: -2, mb: 6 }}>
      <Box sx={{ display: 'flex', height: { xs: 250, md: 550 }, position: 'relative', overflow: 'hidden' }}>
        {images.map((img) => (
          <Box
            key={img}
            sx={{
              flex: 1,
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
        <Box sx={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            px: 4,
            color: '#fff',
            textAlign: 'center',
          }}
        >
          <Typography sx={{ fontSize: { xs: 20, md: 36 }, fontWeight: 'bold', fontFamily: 'Hoaico2', mb: 2 }}>
            Danh Mục Sản Phẩm {name}
          </Typography>
          <Typography sx={{ maxWidth: '70%', fontSize: { xs: 12, md: 16 }, fontFamily: 'Roboto', fontWeight: 300 }}>
            {description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ShopBanner;
