import React, { useState } from 'react';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import AdminLayout from '../../layouts/AdminLayout';

// Mock data - replace with API calls
const mockOrders = [
  {
    id: 1,
    customerName: 'Nguyễn Văn A',
    date: '2025-05-15',
    products: [
      { name: 'Bình gốm hoa văn', quantity: 2, price: 1500000 },
      { name: 'Khăn lụa thêu tay', quantity: 1, price: 800000 },
    ],
    total: 3800000,
    status: 'delivered',
    paymentMethod: 'COD',
    shippingAddress: 'Số 123 Đường ABC, Quận XYZ, Hà Nội',
  },
  {
    id: 2,
    customerName: 'Trần Thị B',
    date: '2025-05-10',
    products: [
      { name: 'Giỏ tre đan', quantity: 3, price: 450000 },
    ],
    total: 1350000,
    status: 'processing',
    paymentMethod: 'Banking',
    shippingAddress: 'Số 456 Đường DEF, Quận UVW, Hồ Chí Minh',
  },
];

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);

  const handleOpenDialog = (order: any) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  const handleStatusChange = (orderId: number, newStatus: string) => {
    // In a real app, this would make an API call
    console.log('Changing status for order:', orderId, 'to:', newStatus);
  };

  const filteredOrders = mockOrders.filter((order) => {
    if (filterStatus !== 'all' && order.status !== filterStatus) return false;
    if (startDate && dayjs(order.date).isBefore(startDate, 'day')) return false;
    if (endDate && dayjs(order.date).isAfter(endDate, 'day')) return false;
    return true;
  });

  return (
    <AdminLayout>
      {/* Filters */}
      <Card sx={{ mb: 3, p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Trạng thái</InputLabel>
              <Select
                value={filterStatus}
                label="Trạng thái"
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="all">Tất cả</MenuItem>
                <MenuItem value="processing">Đang xử lý</MenuItem>
                <MenuItem value="shipped">Đang giao</MenuItem>
                <MenuItem value="delivered">Đã giao</MenuItem>
                <MenuItem value="cancelled">Đã hủy</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Từ ngày"
                value={startDate}
                onChange={setStartDate}
                format="DD/MM/YYYY"
                slotProps={{ textField: { size: 'small', fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Đến ngày"
                value={endDate}
                onChange={setEndDate}
                format="DD/MM/YYYY"
                slotProps={{ textField: { size: 'small', fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Card>

      {/* Orders Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã đơn</TableCell>
              <TableCell>Khách hàng</TableCell>
              <TableCell>Ngày đặt</TableCell>
              <TableCell>Sản phẩm</TableCell>
              <TableCell align="right">Tổng tiền</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>#{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  {order.products
                    .map((p) => `${p.name} (${p.quantity})`)
                    .join(', ')}
                </TableCell>
                <TableCell align="right">
                  {order.total.toLocaleString('vi-VN')} ₫
                </TableCell>
                <TableCell>
                  <Chip
                    label={
                      order.status === 'delivered'
                        ? 'Đã giao'
                        : order.status === 'processing'
                        ? 'Đang xử lý'
                        : order.status === 'shipped'
                        ? 'Đang giao'
                        : 'Đã hủy'
                    }
                    color={
                      order.status === 'delivered'
                        ? 'success'
                        : order.status === 'processing'
                        ? 'warning'
                        : order.status === 'shipped'
                        ? 'info'
                        : 'error'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpenDialog(order)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Order Detail Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Chi tiết đơn hàng #{selectedOrder?.id}</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Thông tin đơn hàng
                  </Typography>
                  <Typography>Khách hàng: {selectedOrder.customerName}</Typography>
                  <Typography>Ngày đặt: {selectedOrder.date}</Typography>
                  <Typography>
                    Phương thức thanh toán: {selectedOrder.paymentMethod}
                  </Typography>
                  <Typography>
                    Địa chỉ giao hàng: {selectedOrder.shippingAddress}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Trạng thái đơn hàng
                  </Typography>
                  <FormControl fullWidth sx={{ mt: 1 }}>
                    <InputLabel>Trạng thái</InputLabel>
                    <Select
                      value={selectedOrder.status}
                      label="Trạng thái"
                      onChange={(e) =>
                        handleStatusChange(selectedOrder.id, e.target.value)
                      }
                    >
                      <MenuItem value="processing">Đang xử lý</MenuItem>
                      <MenuItem value="shipped">Đang giao</MenuItem>
                      <MenuItem value="delivered">Đã giao</MenuItem>
                      <MenuItem value="cancelled">Đã hủy</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                Chi tiết sản phẩm
              </Typography>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Sản phẩm</TableCell>
                      <TableCell align="right">Số lượng</TableCell>
                      <TableCell align="right">Đơn giá</TableCell>
                      <TableCell align="right">Thành tiền</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedOrder.products.map((product: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell align="right">{product.quantity}</TableCell>
                        <TableCell align="right">
                          {product.price.toLocaleString('vi-VN')} ₫
                        </TableCell>
                        <TableCell align="right">
                          {(product.price * product.quantity).toLocaleString(
                            'vi-VN'
                          )}{' '}
                          ₫
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3}>
                        <Typography variant="subtitle1">Tổng cộng</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle1">
                          {selectedOrder.total.toLocaleString('vi-VN')} ₫
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Orders;