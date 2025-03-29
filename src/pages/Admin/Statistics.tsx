import {
  Grid,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  PeopleOutline,
  ShoppingCartOutlined,
  CategoryOutlined,
  InventoryOutlined,
} from '@mui/icons-material';

// Mock data
const revenueData = [
  { month: 'T1', revenue: 4000 },
  { month: 'T2', revenue: 3000 },
  { month: 'T3', revenue: 5000 },
  { month: 'T4', revenue: 4500 },
  { month: 'T5', revenue: 6000 },
  { month: 'T6', revenue: 5500 },
];

const topProducts = [
  { name: 'Bình gốm Bát Tràng', quantity: 150, revenue: 75000000 },
  { name: 'Túi mây tre đan', quantity: 120, revenue: 60000000 },
  { name: 'Khăn lụa Vạn Phúc', quantity: 100, revenue: 50000000 },
  { name: 'Nón lá Huế', quantity: 80, revenue: 40000000 },
];

const topCustomers = [
  { name: 'Nguyễn Văn A', totalOrders: 15, totalSpent: 15000000 },
  { name: 'Trần Thị B', totalOrders: 12, totalSpent: 12000000 },
  { name: 'Lê Văn C', totalOrders: 10, totalSpent: 10000000 },
];

const StatCard = ({ title, value, icon: Icon }: { title: string; value: number; icon: any }) => (
  <Paper
    sx={{
      p: 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
    }}
  >
    <Icon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
    <Typography variant="h4" component="div" gutterBottom>
      {value}
    </Typography>
    <Typography color="text.secondary" variant="subtitle1">
      {title}
    </Typography>
  </Paper>
);

const Statistics = () => {
  // Mock data - sẽ thay thế bằng API sau
  const stats = [
    { title: 'Tổng số người dùng', value: 150, icon: PeopleOutline },
    { title: 'Tổng số đơn hàng', value: 45, icon: ShoppingCartOutlined },
    { title: 'Số danh mục', value: 8, icon: CategoryOutlined },
    { title: 'Số sản phẩm', value: 120, icon: InventoryOutlined },
  ];

  return (
    <Grid container spacing={3}>
      {/* Thống kê doanh thu */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Thống kê doanh thu theo tháng
          </Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" name="Doanh thu (triệu VNĐ)" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>

      {/* Sản phẩm bán chạy */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Sản phẩm bán chạy nhất
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Sản phẩm</TableCell>
                  <TableCell align="right">Số lượng</TableCell>
                  <TableCell align="right">Doanh thu</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topProducts.map((product) => (
                  <TableRow key={product.name}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell align="right">{product.quantity}</TableCell>
                    <TableCell align="right">
                      {product.revenue.toLocaleString()} VNĐ
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>

      {/* Khách hàng mua nhiều nhất */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Khách hàng mua nhiều nhất
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Khách hàng</TableCell>
                  <TableCell align="right">Số đơn hàng</TableCell>
                  <TableCell align="right">Tổng chi tiêu</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topCustomers.map((customer) => (
                  <TableRow key={customer.name}>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell align="right">{customer.totalOrders}</TableCell>
                    <TableCell align="right">
                      {customer.totalSpent.toLocaleString()} VNĐ
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>

      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <StatCard {...stat} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Statistics; 