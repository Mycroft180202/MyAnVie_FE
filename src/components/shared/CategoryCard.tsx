import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface CategoryCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

const CategoryCard = ({ image, title, description, link }: CategoryCardProps) => {
  return (
    <Card
      component={RouterLink}
      to={link}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3
        }
      }}
    >
      <CardMedia
        component="img"
        height="250"
        image={image}
        alt={title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography variant="h5" component="h3" gutterBottom color="text.primary">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
