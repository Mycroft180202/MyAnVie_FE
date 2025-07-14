import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
import { useAuth } from '../../context/AuthContext';
import { getAllOrders, OrderDto } from '../../services/orderService';
import { userService, UserDto } from '../../services/userService';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { AttachMoney, Group, LocalShipping, Inventory2 } from '@mui/icons-material';

const SHIPPING_FEE = 30000;

const Dashboard = () => {
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
          getAllOrders(),
          userService.getAllUsers()
        ]);
        setOrders(ordersData);
        setUsers(usersData);
      } catch (error: any) {
        toast.error(error.message || 'Không thể tải dữ liệu dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const stats = useMemo(() => {
    // Chỉ tính doanh thu từ đơn hàng đã giao thành công
    const completedOrders = orders.filter(order => order.status === 2);
    
    const totalRevenue = completedOrders.reduce((sum, order) => 
      sum + order.totalAmount + SHIPPING_FEE, 0
    );

    const ordersByStatus = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    // Tính doanh thu theo thời gian
    const revenueByTime = completedOrders.reduce((acc, order) => {
      let timeKey;
      const orderDate = dayjs(order.orderDate);
      
      switch (revenueView) {
        case 'weekly':
          //timeKey = 'Tuần ' + orderDate. + ' - ' + orderDate.format('MM/YYYY');
          break;
        case 'yearly':
          timeKey = orderDate.format('YYYY');
          break;
        default: // monthly
          timeKey = orderDate.format('MM/YYYY');
      }
      
      acc[timeKey] = (acc[timeKey] || 0) + order.totalAmount + SHIPPING_FEE;
      return acc;
    }, {} as Record<string, number>);

    // Chuyển đổi dữ liệu cho biểu đồ
    const chartData = Object.entries(revenueByTime)
      .map(([name, value]) => ({ name, revenue: value }))
      .sort((a, b) => {
        if (revenueView === 'weekly') {
          return dayjs(a.name.split(' - ')[1], 'MM/YYYY')
            .diff(dayjs(b.name.split(' - ')[1], 'MM/YYYY'));
        }
        return dayjs(a.name, revenueView === 'yearly' ? 'YYYY' : 'MM/YYYY')
          .diff(dayjs(b.name, revenueView === 'yearly' ? 'YYYY' : 'MM/YYYY'));
      });

    // Thống kê sản phẩm bán chạy
    const productStats = completedOrders.flatMap(order => 
      order.orderItems.map(item => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        revenue: (item.price + SHIPPING_FEE) * item.quantity,
        image: item.productThumbnailUrl
      }))
    ).reduce((acc, item) => {
      if (!acc[item.productId]) {
        acc[item.productId] = {
          name: item.productName,
          totalQuantity: 0,
          totalRevenue: 0,
          image: item.image
        };
      }
      acc[item.productId].totalQuantity += item.quantity;
      acc[item.productId].totalRevenue += item.revenue;
      return acc;
    }, {} as Record<string, { name: string; totalQuantity: number; totalRevenue: number; image: string }>);

    const topProducts = Object.values(productStats)
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
      .slice(0, 5);

    // Thống kê khách hàng
    const customerStats = completedOrders.reduce((acc, order) => {
      if (!acc[order.userId]) {
        acc[order.userId] = {
          fullName: order.customerFullName,
          email: order.customerEmail,
          totalOrders: 0,
          totalSpent: 0
        };
      }
      acc[order.userId].totalOrders++;
      acc[order.userId].totalSpent += order.totalAmount + SHIPPING_FEE;
      return acc;
    }, {} as Record<string, { fullName: string; email: string; totalOrders: number; totalSpent: number }>);

    const topCustomers = Object.values(customerStats)
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 5);

    return {
      totalRevenue,
      ordersByStatus,
      chartData,
      topProducts,
      topCustomers,
      totalCustomers: users.filter(u => u.role !== 1).length
    };
  }, [orders, users, revenueView]);

  if (loading) {
    return (
      <AdminLayout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Box sx={{ p: 3 }}>
        {/* Overview Cards */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              bgcolor: 'background.default',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AttachMoney sx={{ fontSize: 40, color: 'primary.main' }} />
                </Box>
                <Typography variant="h6" sx={{ mb: 1 }}>Tổng doanh thu</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  {stats.totalRevenue.toLocaleString('vi-VN')}₫
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              bgcolor: 'background.default',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Inventory2 sx={{ fontSize: 40, color: 'warning.main' }} />
                </Box>
                <Typography variant="h6" sx={{ mb: 1 }}>Đơn hàng mới</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                  {stats.ordersByStatus[0] || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              bgcolor: 'background.default',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Group sx={{ fontSize: 40, color: 'info.main' }} />
                </Box>
                <Typography variant="h6" sx={{ mb: 1 }}>Khách hàng</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'info.main' }}>
                  {stats.totalCustomers}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              bgcolor: 'background.default',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocalShipping sx={{ fontSize: 40, color: 'success.main' }} />
                </Box>
                <Typography variant="h6" sx={{ mb: 1 }}>Đã giao</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                  {stats.ordersByStatus[2] || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Revenue Chart */}
        <Card sx={{ mb: 4, p: 2, bgcolor: 'background.default' }}>
          <Box sx={{ px: 2, pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Biểu đồ doanh thu</Typography>
            <ButtonGroup size="small" sx={{ '& .MuiButton-root': { px: 3 } }}>
              <Button
                variant={revenueView === 'weekly' ? 'contained' : 'outlined'}
                onClick={() => setRevenueView('weekly')}
              >
                Tuần
              </Button>
              <Button
                variant={revenueView === 'monthly' ? 'contained' : 'outlined'}
                onClick={() => setRevenueView('monthly')}
              >
                Tháng
              </Button>
              <Button
                variant={revenueView === 'yearly' ? 'contained' : 'outlined'}
                onClick={() => setRevenueView('yearly')}
              >
                Năm
              </Button>
            </ButtonGroup>
          </Box>
          <Box sx={{ height: 300, width: '100%' }}>
            <ResponsiveContainer>
              <LineChart data={stats.chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis 
                  dataKey="name"
                  tick={{ fill: '#666' }}
                  stroke="#eee"
                />
                <YAxis
                  tick={{ fill: '#666' }}
                  stroke="#eee"
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip
                  formatter={(value) => `${Number(value).toLocaleString('vi-VN')}₫`}
                  contentStyle={{ backgroundColor: 'white', borderRadius: '8px' }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ fill: '#8884d8' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Card>

        {/* Tables Section */}
        <Grid container spacing={3}>
          {/* Top Products */}
          <Grid item xs={12} md={6}>
            <Card sx={{ bgcolor: 'background.default' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Top Sản phẩm bán chạy</Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Sản phẩm</TableCell>
                        <TableCell align="center">Đã bán</TableCell>
                        <TableCell align="right">Doanh thu</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {stats.topProducts.map((product, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <img
                                src={product.image}
                                alt={product.name}
                                style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: '4px' }}
                              />
                              <Typography variant="body2">{product.name}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="center">{product.totalQuantity}</TableCell>
                          <TableCell align="right" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                            {product.totalRevenue.toLocaleString('vi-VN')}₫
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Top Customers */}
          <Grid item xs={12} md={6}>
            <Card sx={{ bgcolor: 'background.default' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Top Khách hàng</Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Khách hàng</TableCell>
                        <TableCell align="center">Số đơn</TableCell>
                        <TableCell align="right">Tổng chi tiêu</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {stats.topCustomers.map((customer, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Typography variant="body2">{customer.fullName}</Typography>
                            <Typography variant="caption" color="textSecondary">
                              {customer.email}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">{customer.totalOrders}</TableCell>
                          <TableCell align="right" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                            {customer.totalSpent.toLocaleString('vi-VN')}₫
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
};

export default Dashboard;