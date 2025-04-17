import { Box, Typography, Avatar, IconButton } from '@mui/material';
import { useRef } from 'react';
import Slider from 'react-slick';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../styles/CommentSection.css';

const comments = [
  {
    id: 1,
    avatar: '/images/users/user1.svg',
    name: 'Nguyễn Văn A',
    rating: 5,
    content:
      'Tôi đã mua sản phẩm của Myanvie được 2 lần rồi và lần nào cũng rất hài lòng. Dịch vụ chăm sóc khách hàng rất tốt, rất chu đáo.',
  },
  {
    id: 2,
    avatar: '/images/users/user2.svg',
    name: 'Nguyễn Văn A',
    rating: 5,
    content:
      'Tôi đã mua sản phẩm của Myanvie được 2 lần rồi và lần nào cũng rất hài lòng. Dịch vụ chăm sóc khách hàng rất tốt, rất chu đáo.',
  },
  {
    id: 3,
    avatar: '/images/users/user3.svg',
    name: 'Nguyễn Văn A',
    rating: 5,
    content:
      'Tôi đã mua sản phẩm của Myanvie được 2 lần rồi và lần nào cũng rất hài lòng. Dịch vụ chăm sóc khách hàng rất tốt, rất chu đáo.',
  },
];

const CommentSection = () => {
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 4000,
    dotsClass: 'slick-dots comment-dots',
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <Box
      sx={{
        py: 10,
        background: '#f5f5dc',
        textAlign: 'center',
        position: 'relative',
        minHeight: '500px',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          color: '#5B0101',
          fontFamily: 'Hoaico2',
          mb: 5,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        KHÁCH HÀNG CỦA MYANVIE ĐÃ NÓI GÌ?
      </Typography>

      <Box sx={{ maxWidth: '1400px', mx: 'auto', px: 2, pb: 6 }}>
        <Slider ref={sliderRef} {...settings}>
          {comments.map((comment) => (
            <Box key={comment.id} px={2}>
              <Box className="comment-card">
                <Avatar
                  src={comment.avatar}
                  alt={comment.name}
                  sx={{ width: 60, height: 60, mx: 'auto', mb: 2 }}
                />
                <Typography sx={{ fontWeight: 600 }}>{comment.name}</Typography>
                <Box sx={{ my: 1 }}>{'⭐'.repeat(comment.rating)}</Box>
                <Typography sx={{ fontSize: '14px', color: '#333' }}>{comment.content}</Typography>
              </Box>
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
  );
};

export default CommentSection;
