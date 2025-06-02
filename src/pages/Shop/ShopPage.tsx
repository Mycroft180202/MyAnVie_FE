import { Box, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import ShopBanner from './Section/ShopBanner';
import ShopTabs from './Section/ShopTabs';
import ShopFilter from './Section/ShopFilter';
import ShopProductList from './Section/ShopProductList';
import ShopPagination from './Section/ShopPagination';

import { categoryMapping } from '../../utils/categoryMapping';

const ShopPage = () => {
  const { category = 'pottery' } = useParams<{ category: keyof typeof categoryMapping }>();
  const { tabs } = categoryMapping[category] || { tabs: [] };
  const categoryInfo = categoryMapping[category] || { label: category, tabs: [], bannerImages: [] };

  // Nếu có tabs, chọn tab đầu tiên làm mặc định
  const defaultTab = categoryInfo.tabs.length > 0 ? categoryInfo.tabs[0].key : '';
  
  // Đặt tab nếu chưa có
  const [tab, setTab] = useState<string>(tabs.length > 0 ? tabs[0].key : '');

  // 🛠 Khi category thay đổi thì cập nhật tab tương ứng
  useEffect(() => {
    if (tabs && tabs.length > 0) {
      setTab(defaultTab || tabs[0].key);
    }
  }, [tabs, defaultTab]);

  return (
    <Box>
      {/* Breadcrumb with consistent margin */}
      <Container maxWidth="lg" sx={{ pt: -1,ml:15 }}>
        <Breadcrumb
          items={[
            { label: 'Trang chủ', href: '/' },
            { label: categoryInfo.label },
          ]}
        />
      </Container>

      <Box sx={{ bgcolor: '#FFFCF3', minHeight: '100vh', pb: 2, pt: 2 }}>
        <ShopBanner category={category} />
        <Container maxWidth="lg">
          <ShopTabs tab={tab} tabs={categoryInfo.tabs} onTabChange={setTab} />
          <ShopFilter />
          <ShopProductList category={category} tab={tab} />
          <ShopPagination />
        </Container>
      </Box>
    </Box>
  );
};

export default ShopPage;
