import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Box 
} from '@mui/material';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: string; 
  image: string;
  title: string;
  price: number;
  category: string;
}
const ProductCard = ({ id, image, title, price, category }: ProductCardProps) => {
  return (
    <Card
      component={Link}
      to={`/products/${id}`}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{
          paddingTop: '100%', // 1:1 aspect ratio
          height: 0,
          objectFit: 'cover',
        }}
      />
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            fontSize: '1rem',
            fontWeight: 500,
            color: 'text.primary',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {category}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(price)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
