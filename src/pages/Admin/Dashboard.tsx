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
// Giả sử bạn có LanguageContext, nếu không có thể xóa dòng này
// import { useLanguage } from '../../store/LanguageContext'; 
import { useAuth } from '../../context/AuthContext';
import { getAllOrders, OrderDto } from '../../services/orderService'; // Sử dụng orderService
import { userService, UserDto } from '../../services/userService';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

// Tối ưu hóa: đưa hàm tính toán ra ngoài để dễ quản lý
const calculateStatistics = (
    orders: OrderDto[], 
    users: UserDto[], 
    revenueView: 'weekly' | 'monthly' | 'yearly'
) => {
    // LỌC CÁC ĐƠN HÀNG ĐỂ TÍNH DOANH THU: Chỉ lấy đơn "Đang giao" (status 1) và "Đã giao" (status 2)
    const revenueOrders = orders.filter(order => order.status === 2 || order.status === 3);

    // 1. TÍNH TỔNG DOANH THU từ các đơn đã lọc
    const totalRevenue = revenueOrders.reduce((sum, order) => sum + order.totalAmount, 0);

    // 2. ĐẾM TỔNG SỐ ĐƠN HÀNG THEO TỪNG TRẠNG THÁI (tính trên tất cả đơn hàng)
    const ordersByStatus = orders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
    }, {} as Record<number, number>);

    // 3. TÍNH DOANH THU THEO TUẦN / THÁNG / NĂM cho biểu đồ
    const revenueByTime = revenueOrders.reduce((acc, order) => {
        let key = '';
        if (revenueView === 'monthly') {
            key = dayjs(order.orderDate).format('YYYY-MM');
        } else if (revenueView === 'yearly') {
            key = dayjs(order.orderDate).format('YYYY');
        } else { // weekly
            key = dayjs(order.orderDate).startOf('week').format('YYYY-MM-DD');
        }
        acc[key] = (acc[key] || 0) + order.totalAmount;
        return acc;
    }, {} as Record<string, number>);

    const chartData = Object.entries(revenueByTime)
      .map(([name, revenue]) => ({ name, revenue }))
      .sort((a, b) => dayjs(a.name).isAfter(dayjs(b.name)) ? 1 : -1);


    // 4. TÍNH DOANH SỐ SẢN PHẨM (dựa trên các đơn hàng tạo ra doanh thu)
    const productSales = revenueOrders.flatMap(order => 
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
        .slice(0, 5); // Hiển thị top 5 sản phẩm

    // 5. TÌM KHÁCH HÀNG TIỀM NĂNG (LOẠI BỎ ADMIN)
    // Lấy danh sách ID của người dùng không phải admin
    const customerIdSet = new Set(users.filter(u => u.role !== 1).map(u => u.id));

    const customerOrders = orders
        .filter(order => customerIdSet.has(order.userId)) // Chỉ lọc các đơn hàng của khách hàng thực sự
        .reduce((acc, order) => {
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
    
    const topCustomers = Object.values(customerOrders)
        .sort((a, b) => b.totalSpent - a.totalSpent)
        .slice(0, 5); // Hiển thị top 5 khách hàng

    return {
        totalRevenue,
        ordersByStatus,
        chartData,
        topProducts,
        topCustomers
    };
};


const Dashboard = () => {
  // Giả sử bạn có LanguageContext, nếu không có thể thay thế bằng text bình thường
  // const { t } = useLanguage(); 
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
        // Sử dụng Promise.all để gọi 2 API cùng lúc cho hiệu quả
        const [ordersData, usersData] = await Promise.all([
         getAllOrders(), // Giả sử có hàm getAllOrders trong service
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
  }, [token]); // Chỉ fetch lại khi token thay đổi

    // Sử dụng useMemo để tránh tính toán lại các chỉ số ở mỗi lần render
    // Chỉ tính lại khi orders, users hoặc revenueView thay đổi
    const stats = useMemo(() => calculateStatistics(orders, users, revenueView), [orders, users, revenueView]);

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
      <Grid container spacing={3} mb={4}>
        {/* Tổng doanh thu (Đang giao + Đã giao) */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Tổng doanh thu</Typography>
              <Typography variant="h5">{stats.totalRevenue.toLocaleString('vi-VN')} ₫</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Đơn hàng đang xử lý (status 0) */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Đơn hàng đang xử lý</Typography>
              <Typography variant="h5">{stats.ordersByStatus[0] || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Tổng số khách hàng (trừ Admin) */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Số khách hàng</Typography>
              <Typography variant="h5">{users.filter(u => u.role !== 1).length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Đơn hàng đã giao (status 2) */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Đơn hàng đã giao</Typography>
              <Typography variant="h5">{stats.ordersByStatus[2] || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* BIỂU ĐỒ DOANH THU */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Biểu đồ doanh thu</Typography>
            <ButtonGroup size="small">
              <Button variant={revenueView === 'weekly' ? 'contained' : 'outlined'} onClick={() => setRevenueView('weekly')}>Tuần</Button>
              <Button variant={revenueView === 'monthly' ? 'contained' : 'outlined'} onClick={() => setRevenueView('monthly')}>Tháng</Button>
              <Button variant={revenueView === 'yearly' ? 'contained' : 'outlined'} onClick={() => setRevenueView('yearly')}>Năm</Button>
            </ButtonGroup>
          </Box>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => new Intl.NumberFormat('vi-VN').format(value as number)} />
                <Tooltip formatter={(value) => `${(value as number).toLocaleString('vi-VN')} ₫`} />
                <Line type="monotone" dataKey="revenue" name="Doanh thu" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* SẢN PHẨM BÁN CHẠY */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Sản phẩm bán chạy</Typography>
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
                      <TableCell align="right">{product.totalRevenue.toLocaleString('vi-VN')} ₫</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>

        {/* KHÁCH HÀNG TIỀM NĂNG */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Khách hàng tiềm năng</Typography>
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
                      <TableCell align="right">{customer.totalSpent.toLocaleString('vi-VN')} ₫</TableCell>
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