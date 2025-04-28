import { Box, Container, Typography, Button } from '@mui/material';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import ProductList from './ProductList';
import CloseIcon from '@mui/icons-material/Close';

const categoryImages: string[] = [
  '/images/products/Pottery1.jpg',
  '/images/products/Pottery2.jpg',
  '/images/products/Pottery3.jpg',
];

const CategoryIndex = () => {
  return (
    <Box sx={{ bgcolor: '#FFFCF3', minHeight: '100vh', pb: 6 }}>
      <Breadcrumbs />
      {/* Banner - full width outside Container */}
      <Box sx={{ mt: 0, mb: 6 }}>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: { xs: '250px', sm: '300px', md: '500px'},
            borderRadius: 0,
            overflow: 'hidden',
            boxShadow: 4,
            position: 'relative',
          }}
        >
          {categoryImages.map((image: string, index: number) => (
            <Box
              key={`category-image-${image}`}
              sx={{
                flex: 1,
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          ))}

          {/* Overlay */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.5)',
            }}
          />

          {/* Banner Text */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              px: 4,
              color: '#fff',
              textAlign: 'center',
              zIndex: 2,
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Hoaico2',
                fontSize: { xs: 20, sm: 28, md: 36 },
                fontWeight: 'bold',
                letterSpacing: 2,
                textTransform: 'uppercase',
                mb: 2,
                textShadow: '0 2px 8px #000',
              }}
            >
              Danh Mục Sản Phẩm Gốm
            </Typography>
            <Typography
              sx={{
                maxWidth: '70%',
                fontFamily: 'Roboto',
                fontSize: { xs: 12, sm: 14, md: 16 },
                fontWeight: 300,
                lineHeight: 1.6,
                textShadow: '0 1px 6px rgba(0,0,0,0.6)',
              }}
            >
              Gốm MYANVIE là sự kết hợp hài hòa giữa tinh hoa thủ công truyền thống và thiết kế hiện đại. Từng sản phẩm được chế tác tỉ
              mỉ bởi bàn tay nghệ nhân làng nghề, mang vẻ đẹp mộc mạc, thanh lịch, phù hợp với nhiều không gian sống đương đại. Bộ
              sưu tập bao gồm chén, đĩa, bình hoa, ly tách và các vật dụng trang trí, đặt chất lượng và độ bền lên hàng đầu.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Container maxWidth="lg">
        {/* Category Tabs */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #000',
            pb: 1,
            mb: 4,
          }}
        >
          {/* Left Section */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '50%',
              textAlign: 'center',
            }}
          >
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 500,
                color: '#950B0B',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -1,
                  left: 0,
                  width: '100%',
                  height: 2,
                  bgcolor: '#950B0B',
                },
              }}
            >
              Đồ gia dụng
            </Typography>
          </Box>

          {/* Right Section */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '50%',
              textAlign: 'center',
            }}
          >
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 500,
                color: '#000',
              }}
            >
              Bình lọ
            </Typography>
          </Box>
        </Box>

        {/* Filter Section */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: 2
        }}>
          <Typography sx={{ 
            fontSize: 18,
            fontWeight: 500,
            color: '#000'
          }}>
            Filter
          </Typography>

          <Button
            variant="outlined"
            sx={{
              borderRadius: '100px',
              height: 40,
              px: 2,
              borderColor: '#000',
              color: '#ADB6BD',
              textTransform: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            Thời gian
          </Button>

          <Button
            variant="outlined"
            sx={{
              borderRadius: '100px',
              height: 40,
              px: 2,
              borderColor: '#000',
              color: '#ADB6BD',
              textTransform: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            Khoảng giá
          </Button>

          <Button
            variant="outlined"
            sx={{
              borderRadius: '100px',
              height: 40,
              px: 2,
              borderColor: '#000',
              color: '#ADB6BD',
              textTransform: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            Sắp xếp theo
          </Button>

          <Button
            variant="outlined"
            sx={{
              minWidth: 'unset',
              width: 32,
              height: 32,
              borderRadius: '100px',
              border: '1px solid #000',
              p: 0
            }}
          >
            <CloseIcon sx={{ fontSize: 20, color: '#000' }} />
          </Button>
        </Box>

        {/* Product List */}
        <ProductList category="Pottery" />

        {/* Pagination (dots) */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 1 }}>
          {[1, 2, 3].map((page: number) => (
            <Box
              key={`pagination-dot-${page}`}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: page === 2 ? '#000' : '#ccc',
                cursor: 'pointer',
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default CategoryIndex;
