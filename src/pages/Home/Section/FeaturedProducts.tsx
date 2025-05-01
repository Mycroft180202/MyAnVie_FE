import { Box, Typography, IconButton } from '@mui/material';
import { useRef } from 'react';
import Slider from 'react-slick';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import  '../Styles/FeaturedProducts.css'; 

const products = [
  {
    id: 1,
    image: '/images/products/Pottery1.jpg',
    name: 'Bình hoa gốm men lam',
    price: '300.000đ',
    rating: 5,
  },
  {
    id: 2,
    image: '/images/products/Bamboo1.jpg',
    name: 'Bình hoa gốm men lam',
    price: '300.000đ',
    rating: 5,
  },
  {
    id: 3,
    image: '/images/products/Silk1.jpg',
    name: 'Bình hoa gốm men lam',
    price: '300.000đ',
    rating: 4,
  },
  {
    id: 4,
    image: '/images/products/Silk2.jpg',
    name: 'Bình hoa gốm men lam',
    price: '300.000đ',
    rating: 5,
  },
];

const FeaturedProducts = () => {
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    centerMode: true,
    centerPadding: '0px',
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    dotsClass: 'slick-dots featured-dots',
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
    <Box
      sx={{
        py: 6,
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
            mb: 5,
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          CÁC SẢN PHẨM NỔI BẬT
        </Typography>

        <Box sx={{ maxWidth: '1400px', mx: 'auto', px: 2, pb: 10}}>
          <Slider ref={sliderRef} {...settings}>
            {products.map((product) => (
              <Box className="product-card">
              <Box className="image-container">
                <Box
                  component="img"
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              </Box>
              <Typography sx={{ fontWeight: 500, mt: 2 }}>{product.name}</Typography>
              <Typography sx={{ color: '#950B0B', fontWeight: 'bold', my: 1 }}>
                {product.price}
              </Typography>
              <Box>{'⭐'.repeat(product.rating)}</Box>
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
        </Box>
      </Box>
    </Box>
  );
};

export default FeaturedProducts;
