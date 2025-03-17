import { useParams } from 'react-router-dom'; // Để lấy CategoryId từ URL
import SectionTitle from '../../components/shared/SectionTitle'; // Đường dẫn có thể khác
import ProductCard from '../../components/shared/ProductCard'; // Đường dẫn có thể khác
import { Container, Grid, Box, Typography } from '@mui/material';

// **Dữ liệu sản phẩm mẫu (sẽ thay thế bằng API sau)**
const mockProducts = [
  {
    id: 1,
    image: '/images/products/ceramic-vase.jpg', // Đường dẫn ảnh mẫu
    title: 'Bình gốm thủ công tinh xảo',
    price: 250000,
    rating: 4.5,
    category: 'POTTERY',
  },
  {
    id: 2,
    image: '/images/products/bamboo-basket.jpg', // Đường dẫn ảnh mẫu
    title: 'Giỏ mây tre đan đa năng',
    price: 180000,
    rating: 4.2,
    category: 'BAMBOO',
  },
  {
    id: 3,
    image: '/images/products/silk-scarf.jpg', // Đường dẫn ảnh mẫu
    title: 'Khăn lụa tơ tằm mềm mại',
    price: 320000,
    rating: 4.8,
    category: 'SILK',
  },
  {
    id: 4,
    image: '/images/products/conical-hat.jpg', // Đường dẫn ảnh mẫu
    title: 'Nón lá truyền thống Việt Nam',
    price: 90000,
    rating: 4.0,
    category: 'CONICAL HAT',
  },
];

const CategoryPage = () => {
  const { categoryId } = useParams(); // Lấy CategoryId từ URL

  // **Tìm danh mục dựa trên categoryId (tạm thời dùng mock data)**
  const categoryName = categoryId ? categoryId.replace('-', ' ').toUpperCase() : 'Danh mục sản phẩm'; // Ví dụ: pottery -> POTTERY

  // **Lọc sản phẩm theo danh mục (tạm thời dùng mock data)**
  const productsInCategory = categoryId
    ? mockProducts.filter(product => product.category.toUpperCase() === categoryName)
    : mockProducts; // Hiển thị tất cả sản phẩm nếu không có categoryId (ví dụ trang /category)

  return (
    <Box> {/* Sử dụng component Layout */}
      <Container maxWidth="lg" sx={{ py: 4 }}> {/* Container để giới hạn chiều rộng nội dung */}
        <SectionTitle title={`Danh mục: ${categoryName}`} /> {/* Tiêu đề trang */}

        {productsInCategory.length > 0 ? (
          <Grid container spacing={3}> {/* Grid container để tạo layout lưới */}
            {productsInCategory.map(product => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}> {/* Grid item cho mỗi sản phẩm, responsive columns */}
                <ProductCard
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  rating={product.rating}
                  category={product.category}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box textAlign="center" py={4}>
            <Typography variant="body1" color="text.secondary">
              Hiện tại chưa có sản phẩm nào trong danh mục này.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default CategoryPage;