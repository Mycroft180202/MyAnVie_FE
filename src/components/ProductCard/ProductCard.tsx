import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Box, 
  Rating 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  id: number;
  image: string;
  title: string;
  price: number;
  rating: number;
  category: string;
}

const ProductCard = ({ id, image, title, price, rating, category }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  return (
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
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        height="300"
        image={image}
        alt={title}
        sx={{
          objectFit: 'cover',
          borderBottom: '1px solid #DDD',
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
            WebkitBoxOrient: 'vertical',
          }}
        >
          {title}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            variant="subtitle1"
            sx={{
              color: '#950B0B',
              fontWeight: 'bold',
            }}
          >
            {price.toLocaleString('vi-VN')}₫
          </Typography>
          <Rating value={rating} readOnly size="small" />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
