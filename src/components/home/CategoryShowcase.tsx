import { Container, Grid } from '@mui/material';
import SectionTitle from '../shared/SectionTitle';
import CategoryCard from '../shared/CategoryCard';

const categories = [
  {
    id: 1,
    image: '/images/categories/pottery.jpg',
    title: 'Đồ gốm',
    description: 'Những tác phẩm gốm sứ tinh xảo, kết hợp giữa truyền thống và hiện đại',
    link: '/category/pottery'
  },
  {
    id: 2,
    image: '/images/categories/bamboo.jpg',
    title: 'Mây tre đan',
    description: 'Sản phẩm đan lát thủ công từ các làng nghề truyền thống',
    link: '/category/bamboo'
  },
  {
    id: 3,
    image: '/images/categories/silk.jpg',
    title: 'Lụa',
    description: 'Những tấm lụa mềm mại với họa tiết thêu tay độc đáo',
    link: '/category/silk'
  },
  {
    id: 4,
    image: '/images/categories/conical-hat.jpg',
    title: 'Nón lá',
    description: 'Nón lá truyền thống với những họa tiết trang trí đặc sắc',
    link: '/category/conical-hat'
  }
];

const CategoryShowcase = () => {
  return (
    <Container sx={{ py: 8 }}>
      <SectionTitle
        title="Danh mục sản phẩm"
        subtitle="Khám phá các danh mục sản phẩm thủ công mỹ nghệ đặc sắc"
        centered
      />
      <Grid container spacing={4}>
        {categories.map((category) => (
          <Grid item key={category.id} xs={12} sm={6} md={3}>
            <CategoryCard {...category} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CategoryShowcase;
