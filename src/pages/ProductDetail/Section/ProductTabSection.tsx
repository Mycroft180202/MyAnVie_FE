import { Box, Typography, Grid } from '@mui/material';
import { useState } from 'react';
import { Product } from '../../../types/product';

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
                }}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography variant="h6" gutterBottom>
                {product.name}
              </Typography>
              <Typography>
                {product.description || 'Chưa có mô tả cho sản phẩm này.'}
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
