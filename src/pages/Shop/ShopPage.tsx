import { Box, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import ShopBanner from './Section/ShopBanner';
import ShopTabs from './Section/ShopTabs';
import ShopFilter from './Section/ShopFilter';
import ShopProductList from './Section/ShopProductList';
import ShopPagination from './Section/ShopPagination';

const categoryMapping: Record<string, string> = {
  pottery: 'Gốm',
  silk: 'Lụa',
  bamboo: 'Mây tre đan',
};

const ShopPage = () => {
  const { category = 'pottery' } = useParams<{ category: 'pottery' | 'silk' | 'bamboo' }>();
  const [tab, setTab] = useState<'do-gia-dung' | 'binh-lo'>('do-gia-dung');

  const categoryName = categoryMapping[category] || category; // Lấy tên tiếng Việt từ mapping

  return (
    <Box>
      <Container maxWidth="lg" sx={{ pt: -1, ml: 15 }}>
        <Breadcrumb
          items={[
            { label: 'Trang chủ', href: '/' },
            { label: categoryName }, // Hiển thị tên tiếng Việt
          ]}
        />
      </Container>

      <Box sx={{ bgcolor: '#FFFCF3', minHeight: '100vh', pb: 2, pt: 2 }}>
        <ShopBanner category={category} />
        <Container maxWidth="lg">
          <ShopTabs tab={tab} onTabChange={setTab} />
          <ShopFilter />
          <ShopProductList category={category} tab={tab} />
          <ShopPagination />
        </Container>
      </Box>
    </Box>
  );
};

export default ShopPage;