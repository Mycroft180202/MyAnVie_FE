import { 
    Card, 
    CardMedia, 
    CardContent, 
    Typography, 
    Box, 
    Rating,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
  } from '@mui/material';
  import { useState } from 'react';
  
  interface ProductCardProps {
    image: string;
    title: string;
    price: number;
    rating: number;
    category: string;
  }
  
  const ProductCard = ({ image, title, price, rating, category }: ProductCardProps) => {
    const [open, setOpen] = useState(false);
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
      <>
        <Card 
          sx={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '12px',
            border: '1px solid #DDD',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }
          }}
          onClick={handleOpen}
        >
          <CardMedia
            component="img"
            height="300"
            image={image}
            alt={title}
            sx={{ 
              objectFit: 'cover',
              borderBottom: '1px solid #DDD'
            }}
          />
          <CardContent sx={{ flexGrow: 1, p: 2 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontSize: '1rem',
                mb: 1,
                height: '3rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}
            >
              {title}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: '#950B0B',
                  fontWeight: 'bold'
                }}
              >
                {price.toLocaleString('vi-VN')}₫
              </Typography>
              <Rating value={rating} readOnly size="small" />
            </Box>
          </CardContent>
        </Card>
  
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <CardMedia
                component="img"
                height="400"
                image={image}
                alt={title}
                sx={{ objectFit: 'contain' }}
              />
              <Typography variant="subtitle1">
                Danh mục: {category}
              </Typography>
              <Typography variant="h6" color="primary">
                Giá: {price.toLocaleString('vi-VN')}₫
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography>Đánh giá:</Typography>
                <Rating value={rating} readOnly />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="inherit">
              Đóng
            </Button>
            <Button variant="contained" color="primary" onClick={handleClose}>
              Thêm vào giỏ hàng
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };
  
  export default ProductCard;