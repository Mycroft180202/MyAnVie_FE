import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ButtonGroup,
  Button,
} from '@mui/material';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import AdminLayout from '../../layouts/AdminLayout';
import { useLanguage } from '../../store/LanguageContext';

// Mock data - replace with real API calls
const revenueData = [
  { name: 'T1', revenue: 4000 },
  { name: 'T2', revenue: 3000 },
  { name: 'T3', revenue: 2000 },
  { name: 'T4', revenue: 2780 },
  { name: 'T5', revenue: 1890 },
  { name: 'T6', revenue: 2390 },
  { name: 'T7', revenue: 3490 },
];

const bestSellingProducts = [
  { id: 1, name: 'Bình gốm hoa văn', sold: 150, revenue: 45000000 },
  { id: 2, name: 'Khăn lụa thêu tay', sold: 120, revenue: 36000000 },
  { id: 3, name: 'Giỏ tre đan', sold: 100, revenue: 25000000 },
];

const topCustomers = [
  { id: 1, name: 'Nguyễn Văn A', orders: 15, totalSpent: 45000000 },
  { id: 2, name: 'Trần Thị B', orders: 12, totalSpent: 36000000 },
  { id: 3, name: 'Lê Văn C', orders: 10, totalSpent: 25000000 },
];

const Dashboard = () => {
  const { t } = useLanguage();
  const [revenueView, setRevenueView] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');

  return (
    <AdminLayout>
      {/* Statistics Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {t.admin.bestSelling}
              </Typography>
              <Typography variant="h5">150</Typography>
              <Typography variant="subtitle2">Bình gốm hoa văn</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {t.admin.leastSelling}
              </Typography>
              <Typography variant="h5">5</Typography>
              <Typography variant="subtitle2">Giỏ mây vintage</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {t.admin.topCustomers}
              </Typography>
              <Typography variant="h5">15</Typography>
              <Typography variant="subtitle2">Đơn hàng/khách cao nhất</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {t.admin.averageAge}
              </Typography>
              <Typography variant="h5">32</Typography>
              <Typography variant="subtitle2">Tuổi trung bình khách hàng</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Revenue Chart */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">{t.admin.revenue}</Typography>
            <ButtonGroup>
              <Button
                variant={revenueView === 'weekly' ? 'contained' : 'outlined'}
                onClick={() => setRevenueView('weekly')}
              >
                {t.admin.weekly}
              </Button>
              <Button
                variant={revenueView === 'monthly' ? 'contained' : 'outlined'}
                onClick={() => setRevenueView('monthly')}
              >
                {t.admin.monthly}
              </Button>
              <Button
                variant={revenueView === 'yearly' ? 'contained' : 'outlined'}
                onClick={() => setRevenueView('yearly')}
              >
                {t.admin.yearly}
              </Button>
            </ButtonGroup>
          </Box>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>

      {/* Best Selling Products */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t.admin.bestSelling}
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sản phẩm</TableCell>
                    <TableCell align="right">Đã bán</TableCell>
                    <TableCell align="right">Doanh thu</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bestSellingProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell align="right">{product.sold}</TableCell>
                      <TableCell align="right">
                        {product.revenue.toLocaleString('vi-VN')} ₫
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Customers */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t.admin.topCustomers}
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Khách hàng</TableCell>
                    <TableCell align="right">Số đơn</TableCell>
                    <TableCell align="right">Tổng chi tiêu</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell align="right">{customer.orders}</TableCell>
                      <TableCell align="right">
                        {customer.totalSpent.toLocaleString('vi-VN')} ₫
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default Dashboard;