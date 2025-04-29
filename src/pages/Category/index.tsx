import { useState } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import Breadcrumbs from '../../components/shared/Breadcrumbs';
import ProductList from './ProductList';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const categoryImages: string[] = [
  '/images/products/Pottery1.jpg',
  '/images/products/Pottery2.jpg',
  '/images/products/Pottery3.jpg',
];

const CategoryIndex = () => {
  const [activeTab, setActiveTab] = useState<'do-gia-dung' | 'binh-lo'>('do-gia-dung');
  const [openDropdown, setOpenDropdown] = useState<'time' | 'price' | 'sort' | null>(null);

  const toggleDropdown = (dropdown: 'time' | 'price' | 'sort') => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

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
            position: 'relative',
            pb: 1,
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
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
                cursor: 'pointer',
                position: 'relative',
              }}
              onClick={() => setActiveTab('do-gia-dung')}
            >
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 500,
                  color: activeTab === 'do-gia-dung' ? '#950B0B' : '#000',
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
                cursor: 'pointer',
                position: 'relative',
              }}
              onClick={() => setActiveTab('binh-lo')}
            >
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 500,
                  color: activeTab === 'binh-lo' ? '#950B0B' : '#000',
                }}
              >
                Bình lọ
              </Typography>
            </Box>
          </Box>

          {/* Line Separator */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: 2,
              background: `linear-gradient(
                to right,
                ${activeTab === 'do-gia-dung' ? '#950B0B' : '#fff'} 50%,
                ${activeTab === 'binh-lo' ? '#950B0B' : '#fff'} 50%
              )`,
              transition: 'background 0.5s ease',
            }}
          />
        </Box>

        {/* Filter Section */}
        <Box
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 3, // Tăng khoảng cách giữa các button
            mt: 2,
            mb: 5
          }}
        >
          <Typography sx={{ 
            fontSize: 18,
            fontWeight: 500,
            color: '#000',
            mr: 40,
          }}>
            Filter
          </Typography>

          {/* Time Dropdown */}
          <Box sx={{ position: 'relative' }}>
            <Button
              variant="outlined"
              onClick={() => toggleDropdown('time')}
              sx={{
                borderRadius: '100px',
                height: 40,
                px: 2,
                borderColor: '#000',
                color: '#ADB6BD',
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              Thời gian {openDropdown === 'time' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </Button>
            {openDropdown === 'time' && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '100%',
                  left: '100%', // Đặt dropdown bên phải button
                  transform: 'translateX(-100%)', // Điều chỉnh vị trí để dropdown không bị lệch
                  bgcolor: '#fff',
                  boxShadow: 2,
                  borderRadius: '12px', // Bo tròn các góc của dropdown
                  zIndex: 10,
                  gap: 2, // Khoảng cách giữa các mục
                  p: 1, // Padding bên trong dropdown
                  width: '120px', // Tự động điều chỉnh chiều rộng
                }}
              >
                <Box sx={{ p: 1, cursor: 'pointer' }}>Mới nhất</Box>
                <Box sx={{ p: 1, cursor: 'pointer' }}>Cũ nhất</Box>
              </Box>
            )}
          </Box>

          {/* Price Dropdown */}
          <Box sx={{ position: 'relative' }}>
            <Button
              variant="outlined"
              onClick={() => toggleDropdown('price')}
              sx={{
                borderRadius: '100px',
                height: 40,
                px: 2,
                borderColor: '#000',
                color: '#ADB6BD',
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              Khoảng giá {openDropdown === 'price' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </Button>
            {openDropdown === 'price' && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '100%',
                  left: '100%', // Đặt dropdown bên phải button
                  transform: 'translateX(-100%)', // Điều chỉnh vị trí để dropdown không bị lệch
                  bgcolor: '#fff',
                  boxShadow: 2,
                  borderRadius: '12px', // Bo tròn các góc của dropdown
                  zIndex: 10,
                  gap: 2, // Khoảng cách giữa các mục
                  p: 1, // Padding bên trong dropdown
                  width: '130px', // Tự động điều chỉnh chiều rộng
                }}
              >
                <Box sx={{ p: 1, cursor: 'pointer' }}>Dưới 100K</Box>
                <Box sx={{ p: 1, cursor: 'pointer' }}>100-300K</Box>
                <Box sx={{ p: 1, cursor: 'pointer' }}>300-500K</Box>
                <Box sx={{ p: 1, cursor: 'pointer' }}>Trên 500K</Box>
              </Box>
            )}
          </Box>

          {/* Sort Dropdown */}
          <Box sx={{ position: 'relative' }}>
            <Button
              variant="outlined"
              onClick={() => toggleDropdown('sort')}
              sx={{
                borderRadius: '100px',
                height: 40,
                px: 2,
                borderColor: '#000',
                color: '#ADB6BD',
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              Sắp xếp theo {openDropdown === 'sort' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </Button>
            {openDropdown === 'sort' && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '100%',
                  left: '100%', // Đặt dropdown bên phải button
                  transform: 'translateX(-100%)', // Điều chỉnh vị trí để dropdown không bị lệch
                  bgcolor: '#fff',
                  boxShadow: 2,
                  borderRadius: '12px', // Bo tròn các góc của dropdown
                  zIndex: 10,
                  gap: 2, // Khoảng cách giữa các mục
                  p: 1, // Padding bên trong dropdown
                  width: '145px', // Tự động điều chỉnh chiều rộng
                }}
              >
                <Box sx={{ p: 1, cursor: 'pointer' }}>Thấp tới cao</Box>
                <Box sx={{ p: 1, cursor: 'pointer' }}>Cao tới thấp</Box>
              </Box>
            )}
          </Box>

          <Button
            variant="outlined"
            sx={{
              minWidth: 'unset',
              width: 32,
              height: 32,
              borderRadius: '100px',
              border: '1px solid #000',
              p: 0,
              ml:30
            }}
          >
            <CloseIcon 
            sx={{ 
              fontSize: 20,
              color: '#000',
              }} />
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
