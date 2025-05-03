import { Box, Typography, Grid } from '@mui/material';
import { useState } from 'react';

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: number;
  category: string;
  subCategory: string;
}

interface ProductTabSectionProps {
  product: Product;
}

const ProductTabSection: React.FC<ProductTabSectionProps> = ({ product }) => {
  const [tab, setTab] = useState<'description' | 'review'>('description');

  const tabs = [
    { key: 'description', label: 'Mô tả sản phẩm' },
    { key: 'review', label: 'Đánh giá từ khách hàng' },
  ];

  return (
    <Box sx={{ mt: 8 }}>
      {/* Tabs */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        {tabs.map((tabItem) => (
          <Box
            key={tabItem.key}
            sx={{
              width: `${100 / tabs.length}%`,
              textAlign: 'center',
              cursor: 'pointer',
              pb: 1,
              borderBottom: tab === tabItem.key ? '2px solid #950B0B' : '2px solid transparent',
            }}
            onClick={() => setTab(tabItem.key as 'description' | 'review')}
          >
            <Typography
              sx={{ fontSize: 18, fontWeight: 500, color: tab === tabItem.key ? '#950B0B' : '#000' }}
            >
              {tabItem.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Content */}
      {tab === 'description' && (
        <Box sx={{ px: { xs: 2, md: 4 }, lineHeight: 1.7 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <Box
                component="img"
                src="/images/AboutUs/showroom-2.jpg"
                alt="video placeholder"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '12px',
                  objectFit: 'cover',
                }}
              />
              <Typography fontWeight="bold" mt={2}>
                Video quá trình sản xuất sản phẩm
              </Typography>
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography>
                {product.title} là sản phẩm thuộc danh mục {product.category}. Được sản xuất thủ công với quy trình nghiêm ngặt và nguyên liệu cao cấp, sản phẩm mang đến sự tinh tế và độc đáo cho không gian sống.
              </Typography>
              <Box mt={2}>
                <Typography fontWeight="bold">Màu sắc:</Typography>
                <Typography>Xanh, Đỏ, Vàng</Typography>
                <Typography fontWeight="bold" mt={1}>Chất liệu:</Typography>
                <Typography>Gốm cao cấp sản xuất tại Bát Tràng</Typography>
                <Typography fontWeight="bold" mt={1}>Kiểu dáng:</Typography>
                <Typography>Dáng cao, phình dưới</Typography>
                <Typography fontWeight="bold" mt={1}>Các kích thước:</Typography>
                <Typography>50 x 70 cm, 70 x 90 cm, 90 x 110 cm</Typography>
                <Typography fontWeight="bold" mt={1}>Công dụng:</Typography>
                <Typography>Trang trí, làm quà tặng, cắm hoa</Typography>
              </Box>
              <Typography fontWeight="bold" mt={4}>
                Cách vệ sinh và bảo quản sản phẩm
              </Typography>
              <Typography>
                Lau nhẹ bằng khăn mềm. Tránh va đập mạnh. Bảo quản nơi khô ráo, thoáng mát.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )}

      {tab === 'review' && (
        <Box sx={{ px: { xs: 2, md: 4 } }}>
          <Typography variant="h6" mb={2}>
            Đánh giá từ khách hàng (đang cập nhật)
          </Typography>
          {/* Placeholder: add real customer review section here later */}
          <Typography>Chưa có đánh giá nào.</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProductTabSection;
