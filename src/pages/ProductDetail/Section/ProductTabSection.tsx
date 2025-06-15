import { Box, Typography, Grid } from '@mui/material';
import { useState } from 'react';
import { Product } from '../../../services/productService';

interface ProductTabSectionProps {
  product: Product;
}

const ProductTabSection: React.FC<ProductTabSectionProps> = ({ product }) => {
  const [tab, setTab] = useState<'description' | 'review'>('description');

  console.log('Current tab:', tab);

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
            <Grid item xs={12} md={12}>
              <Typography>
                {product.name} là sản phẩm thuộc danh mục {product.categoryName}. {product.description}
              </Typography>
              <Box mt={2}>
                <Typography fontWeight="bold">Màu sắc:</Typography>
                <Typography>{product.color}</Typography>
                <Typography fontWeight="bold" mt={1}>Chất liệu:</Typography>
                <Typography>Gốm cao cấp sản xuất tại Bát Tràng</Typography>
                <Typography fontWeight="bold" mt={1}>Kiểu dáng:</Typography>
                <Typography>Dáng cao, phình dưới</Typography>
                <Typography fontWeight="bold" mt={1}>Các kích thước:</Typography>
                <Typography>{product.size}</Typography>
                <Typography fontWeight="bold" mt={1}>Công dụng:</Typography>
                <Typography>Trang trí, làm quà tặng, cắm hoa</Typography>
              </Box>
              <Typography mt={2} fontWeight="bold">
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
          <Typography>Chưa có đánh giá nào.</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProductTabSection;
