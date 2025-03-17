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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddToCart = () => {
    // Logic thêm vào giỏ hàng ở đây
    console.log(`Added ${title} to cart`);
    handleClose(); // Đóng popup sau khi thêm
  };

  return (
    <>
      <Card 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 3
          },
          cursor: 'pointer' // Thêm con trỏ để báo hiệu có thể click
        }}
        onClick={handleOpen} // Thêm sự kiện click
      >
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography 
            variant="subtitle2" 
            color="text.secondary" 
            gutterBottom
          >
            {category}
          </Typography>
          <Typography 
            variant="h6" 
            component="h3" 
            gutterBottom 
            sx={{ 
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {title}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Typography variant="h6" color="primary.main">
              {price.toLocaleString('vi-VN')}₫
            </Typography>
            <Rating value={rating} readOnly size="small" />
          </Box>
        </CardContent>
      </Card>

      {/* Popup Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <CardMedia
              component="img"
              height="300"
              image={image}
              alt={title}
              sx={{ objectFit: 'cover' }}
            />
            <Typography variant="subtitle1" color="text.secondary">
              Danh mục: {category}
            </Typography>
            <Typography variant="h5" color="primary.main">
              Giá: {price.toLocaleString('vi-VN')}₫
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body1">Đánh giá:</Typography>
              <Rating value={rating} readOnly />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Mô tả sản phẩm: Đây là một sản phẩm tuyệt vời thuộc danh mục {category}. 
              Chất lượng đảm bảo, giá cả hợp lý!
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Đóng
          </Button>
          <Button 
            onClick={handleAddToCart} 
            variant="contained" 
            color="primary"
          >
            Thêm vào giỏ hàng
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductCard;