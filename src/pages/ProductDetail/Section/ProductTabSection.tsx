import { Box, Tabs, Tab, Typography } from '@mui/material';
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
  const [tabIndex, setTabIndex] = useState(0);

  const renderTabContent = () => {
    switch (tabIndex) {
      case 0:
        return `Mô tả sản phẩm: ${product.title} thuộc danh mục ${product.category.toUpperCase()}. Đây là sản phẩm được ưa chuộng.`;
      case 1:
        return `Thông số kỹ thuật đang được cập nhật cho sản phẩm ID: ${product.id}.`;
      case 2:
        return `Chính sách: Vui lòng liên hệ để biết chi tiết về chính sách đổi trả cho sản phẩm ${product.title}.`;
      default:
        return '';
    }
  };

  return (
    <Box sx={{ mt: 6 }}>
      <Tabs
        value={tabIndex}
        onChange={(_, newValue) => setTabIndex(newValue)}
        textColor="primary"
        indicatorColor="primary"
        sx={{
          mb: 3,
          '& .MuiTab-root': {
            fontWeight: 500,
            textTransform: 'none',
            fontSize: '16px',
            mr: 4,
          },
        }}
      >
        <Tab label="Mô tả sản phẩm" />
        <Tab label="Thông số kỹ thuật" />
        <Tab label="Chính sách mua hàng" />
      </Tabs>

      <Typography variant="body1" sx={{ whiteSpace: 'pre-line', lineHeight: 1.7 }}>
        {renderTabContent()}
      </Typography>
    </Box>
  );
};

export default ProductTabSection;
