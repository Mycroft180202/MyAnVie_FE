import React, { useState, useEffect } from 'react';
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
  CircularProgress,
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
import { useAuth } from '../../context/AuthContext';
import { getMyOrders, OrderDto } from '../../services/orderService';
import { userService, UserDto } from '../../services/userService';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { t } = useLanguage();
  const { token } = useAuth();
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [users, setUsers] = useState<UserDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [revenueView, setRevenueView] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) return;
        setLoading(true);
        const [ordersData, usersData] = await Promise.all([
          getMyOrders(token),
          userService.getAllUsers()
        ]);
        setOrders(ordersData);
        setUsers(usersData);
      } catch (error: any) {
        toast.error(error.message || 'Không thể tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const calculateStatistics = () => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    const ordersByStatus = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    const revenueByMonth = orders.reduce((acc, order) => {
      const month = dayjs(order.orderDate).format('MM/YYYY');
      acc[month] = (acc[month] || 0) + order.totalAmount;
      return acc;
    }, {} as Record<string, number>);

    const productSales = orders.flatMap(order => 
      order.orderItems.map(item => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        revenue: item.price * item.quantity
      }))
    ).reduce((acc, item) => {
      if (!acc[item.productId]) {
        acc[item.productId] = {
          name: item.productName,
          totalQuantity: 0,
          totalRevenue: 0
        };
      }
      acc[item.productId].totalQuantity += item.quantity;
      acc[item.productId].totalRevenue += item.revenue;
      return acc;
    }, {} as Record<string, { name: string; totalQuantity: number; totalRevenue: number }>);

    const topProducts = Object.values(productSales)
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
      .slice(0, 3);

    const customerOrders = orders.reduce((acc, order) => {
      if (!acc[order.userId]) {
        acc[order.userId] = {
          fullName: order.customerFullName,
          totalOrders: 0,
          totalSpent: 0
        };
      }
      acc[order.userId].totalOrders++;
      acc[order.userId].totalSpent += order.totalAmount;
      return acc;
    }, {} as Record<string, { fullName: string; totalOrders: number; totalSpent: number }>);

    const topCustomers = Object.entries(customerOrders)
      .sort(([, a], [, b]) => b.totalSpent - a.totalSpent)
      .slice(0, 3)
      .map(([, value]) => value);

    return {
      totalRevenue,
      ordersByStatus,
      revenueByMonth,
      topProducts,
      topCustomers
    };
  };

  if (loading) {
    return (
      <AdminLayout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      </AdminLayout>
    );
  }

  const stats = calculateStatistics();
  const chartData = Object.entries(stats.revenueByMonth).map(([name, revenue]) => ({
    name,
    revenue
  }));

  return (
    <AdminLayout>
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Tổng doanh thu
              </Typography>
              <Typography variant="h5">
                {stats.totalRevenue.toLocaleString('vi-VN')} ₫
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Đơn hàng mới
              </Typography>
              <Typography variant="h5">
                {stats.ordersByStatus[0] || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Số người dùng
              </Typography>
              <Typography variant="h5">{users.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Đơn hàng đã giao
              </Typography>
              <Typography variant="h5">
                {stats.ordersByStatus[3] || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Doanh thu theo tháng</Typography>
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
              <LineChart data={chartData}>
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

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sản phẩm bán chạy
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
                  {stats.topProducts.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell align="right">{product.totalQuantity}</TableCell>
                      <TableCell align="right">
                        {product.totalRevenue.toLocaleString('vi-VN')} ₫
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Khách hàng tiềm năng
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
                  {stats.topCustomers.map((customer, index) => (
                    <TableRow key={index}>
                      <TableCell>{customer.fullName}</TableCell>
                      <TableCell align="right">{customer.totalOrders}</TableCell>
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