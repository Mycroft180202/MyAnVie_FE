import React, { useState, useEffect } from 'react';
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
import { OrderDto } from '../../services/orderService';
import axios from 'axios';
import { API_URL } from '../../config/constants';

const Orders = () => {
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderDto | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get<OrderDto[]>(`${API_URL}/Orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setOrders(response.data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const getStatusLabel = (status: number) => {
    switch (status) {
      case 0:
        return 'Đang xử lý';
      case 1:
        return 'Đang giao';
      case 2:
        return 'Đã giao';
      case 3:
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case 0:
        return 'warning';
      case 1:
        return 'info';
      case 2:
        return 'success';
      case 3:
        return 'error';
      default:
        return 'default';
    }
  };

  const handleOpenDialog = (order: OrderDto) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleStatusChange = async (orderId: string, newStatus: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${API_URL}/Orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (filterStatus !== 'all' && order.status !== parseInt(filterStatus))
      return false;
    if (startDate && dayjs(order.orderDate).isBefore(startDate, 'day'))
      return false;
    if (endDate && dayjs(order.orderDate).isAfter(endDate, 'day')) return false;
    return true;
  });

  if (loading) return <Box sx={{ p: 3 }}>Đang tải...</Box>;
  if (error)
    return <Box sx={{ p: 3, color: 'error.main' }}>Lỗi: {error}</Box>;

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
                <MenuItem value="0">Đang xử lý</MenuItem>
                <MenuItem value="1">Đang giao</MenuItem>
                <MenuItem value="2">Đã giao</MenuItem>
                <MenuItem value="3">Đã hủy</MenuItem>
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
              <TableCell>Email</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Ngày đặt</TableCell>
              <TableCell align="right">Tổng tiền</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>#{order.id.slice(0, 8)}</TableCell>
                <TableCell>{order.customerFullName}</TableCell>
                <TableCell>{order.customerEmail}</TableCell>
                <TableCell>{order.customerPhone}</TableCell>
                <TableCell>
                  {dayjs(order.orderDate).format('DD/MM/YYYY HH:mm')}
                </TableCell>
                <TableCell align="right">
                  {order.totalAmount.toLocaleString('vi-VN')} ₫
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStatusLabel(order.status)}
                    color={getStatusColor(order.status) as any}
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
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Chi tiết đơn hàng #{selectedOrder?.id.slice(0, 8)}</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Thông tin đơn hàng
                  </Typography>
                  <Typography>Khách hàng: {selectedOrder.customerFullName}</Typography>
                  <Typography>Email: {selectedOrder.customerEmail}</Typography>
                  <Typography>Số điện thoại: {selectedOrder.customerPhone}</Typography>
                  <Typography>
                    Ngày đặt: {dayjs(selectedOrder.orderDate).format('DD/MM/YYYY HH:mm')}
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
                        handleStatusChange(selectedOrder.id, Number(e.target.value))
                      }
                    >
                      <MenuItem value={0}>Đang xử lý</MenuItem>
                      <MenuItem value={1}>Đang giao</MenuItem>
                      <MenuItem value={2}>Đã giao</MenuItem>
                      <MenuItem value={3}>Đã hủy</MenuItem>
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
                      <TableCell>Hình ảnh</TableCell>
                      <TableCell align="right">Số lượng</TableCell>
                      <TableCell align="right">Đơn giá</TableCell>
                      <TableCell align="right">Thành tiền</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedOrder.orderItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell>
                          <img
                            src={item.productThumbnailUrl}
                            alt={item.productName}
                            style={{
                              width: '50px',
                              height: '50px',
                              objectFit: 'cover',
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">{item.quantity}</TableCell>
                        <TableCell align="right">
                          {item.price.toLocaleString('vi-VN')} ₫
                        </TableCell>
                        <TableCell align="right">
                          {(item.price * item.quantity).toLocaleString('vi-VN')} ₫
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Typography variant="subtitle1">Tổng cộng</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle1">
                          {selectedOrder.totalAmount.toLocaleString('vi-VN')} ₫
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