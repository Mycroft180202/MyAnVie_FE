import { Card, CardMedia, CardContent, Typography, Box, Rating } from '@mui/material';

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  rating: number;
  category: string;
}

const ProductCard = ({ image, title, price, rating, category }: ProductCardProps) => {
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3
        }
      }}
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
  );
};

export default ProductCard;
