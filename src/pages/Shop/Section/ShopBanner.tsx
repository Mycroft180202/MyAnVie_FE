import { Box, Typography } from '@mui/material';

const bannerData: Record<string, { image: string; name: string; description: string }> = {
  'gốm': {
    image: '/images/products/Pottery1.jpg',
    name: 'Gốm',
    description: 'Các sản phẩm gốm sứ tinh xảo, mang đậm nét truyền thống và hiện đại.',
  },
  'lụa': {
    image: '/images/products/Silk1.jpg',
    name: 'Lụa',
    description: 'Chào mừng bạn đến với danh mục sản phẩm lụa, nơi hội tụ vẻ đẹp tinh tế và giá trị văn hóa truyền thống của Việt Nam. Lụa của chúng tôi không chỉ là những món đồ thời trang mà còn là câu chuyện về sự khéo léo, tâm huyết của các nghệ nhân từ những làng nghề dệt lụa nổi tiếng, mang đến cho bạn trải nghiệm đẳng cấp và bền vững.',
  },
  'mây tre đan': {
    image: '/images/products/Bamboo1.jpg',
    name: 'Mây tre đan',
    description: 'Sản phẩm mây tre đan thủ công, thân thiện với môi trường.',
  },
};

interface ShopBannerProps {
  category: string;
}

const ShopBanner = ({ category }: ShopBannerProps) => {
  const { image, name = category, description = '' } = bannerData[category] || {};
  console.log('ShopBanner - category:', category);
  console.log('ShopBanner - bannerData[category]:', bannerData[category]);
  console.log('ShopBanner - image:', image);

  return (
    <Box sx={{ mt: -2, mb: 6 }}>
      <Box sx={{ 
        height: { xs: 250, md: 550 }, 
        position: 'relative', 
        overflow: 'hidden',
      }}>
        {image && (
          <img 
            src={image} 
            alt={`Banner ${name}`} 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        )}
        <Box sx={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))' 
        }} />
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
          <Typography sx={{ 
            fontSize: { xs: 20, md: 36 }, 
            fontWeight: 'bold', 
            fontFamily: 'Hoaico2', 
            mb: 2,
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>
            Danh Mục Sản Phẩm {name}
          </Typography>
          <Typography sx={{ 
            maxWidth: '70%', 
            fontSize: { xs: 12, md: 16 }, 
            fontFamily: 'Roboto', 
            fontWeight: 300,
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}>
            {description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ShopBanner;
