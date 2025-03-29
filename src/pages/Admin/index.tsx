import { useState } from 'react';
import {
  Box,
  Container,
  Tabs,
  Tab,
  Typography,
  Paper,
} from '@mui/material';
import UserManagement from './UserManagement';
import CategoryManagement from './CategoryManagement';
import ProductManagement from './ProductManagement';
import OrderManagement from './OrderManagement';
import Statistics from './Statistics';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const AdminDashboard = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Quản trị hệ thống
      </Typography>
      
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="admin dashboard tabs"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Thống kê" />
          <Tab label="Quản lý người dùng" />
          <Tab label="Quản lý danh mục" />
          <Tab label="Quản lý sản phẩm" />
          <Tab label="Quản lý đơn hàng" />
        </Tabs>

        <TabPanel value={value} index={0}>
          <Statistics />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UserManagement />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <CategoryManagement />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ProductManagement />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <OrderManagement />
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default AdminDashboard; 