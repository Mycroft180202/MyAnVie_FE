import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Chip,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Mock data
const orders = [
  {
    id: 1,
    orderNumber: 'ORD001',
    customerName: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0123456789',
    totalAmount: 1950000,
    status: 'pending',
    orderDate: '2024-03-20',
    items: [
      {
        productName: 'Bình gốm Bát Tràng',
        quantity: 1,
        price: 1500000,
      },
      {
        productName: 'Túi mây tre đan',
        quantity: 1,
        price: 450000,
      },
    ],
    shippingAddress: '123 Đường ABC, Quận 1, TP.HCM',
  },
  {
    id: 2,
    orderNumber: 'ORD002',
    customerName: 'Trần Thị B',
    email: 'tranthib@example.com',
    phone: '0987654321',
    totalAmount: 800000,
    status: 'confirmed',
    orderDate: '2024-03-19',
    items: [
      {
        productName: 'Khăn lụa Vạn Phúc',
        quantity: 1,
        price: 800000,
      },
    ],
    shippingAddress: '456 Đường XYZ, Quận 2, TP.HCM',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'confirmed':
      return 'info';
    case 'shipping':
      return 'primary';
    case 'paid':
      return 'success';
    case 'cancelled':
      return 'error';
    default:
      return 'default';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Chờ xác nhận';
    case 'confirmed':
      return 'Đã xác nhận';
    case 'shipping':
      return 'Đang giao hàng';
    case 'paid':
      return 'Đã thanh toán';
    case 'cancelled':
      return 'Đã hủy';
    default:
      return status;
  }
};

const OrderManagement = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [ordersList, setOrdersList] = useState(orders);

  const handleOpenDialog = (order: any) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedOrder(null);
    setOpenDialog(false);
  };

  const handleSaveOrder = () => {
    if (selectedOrder) {
      const updatedOrders = ordersList.map((order) =>
        order.id === selectedOrder.id ? selectedOrder : order
      );
      setOrdersList(updatedOrders);
    }
    handleCloseDialog();
  };

  const handleDeleteOrder = (orderId: number) => {
    const updatedOrders = ordersList.filter(
      (order) => order.id !== orderId
    );
    setOrdersList(updatedOrders);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Quản lý đơn hàng</Typography>
        <Button variant="contained" color="primary">
          Thêm đơn hàng
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Mã đơn hàng</TableCell>
              <TableCell>Khách hàng</TableCell>
              <TableCell>Tổng tiền</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Ngày đặt</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordersList.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.orderNumber}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.totalAmount.toLocaleString('vi-VN')}₫</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(order)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteOrder(order.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Chỉnh sửa đơn hàng</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Mã đơn hàng"
                value={selectedOrder.orderNumber}
                onChange={(e) =>
                  setSelectedOrder({
                    ...selectedOrder,
                    orderNumber: e.target.value,
                  })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Tên khách hàng"
                value={selectedOrder.customerName}
                onChange={(e) =>
                  setSelectedOrder({
                    ...selectedOrder,
                    customerName: e.target.value,
                  })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Tổng tiền"
                type="number"
                value={selectedOrder.totalAmount}
                onChange={(e) =>
                  setSelectedOrder({
                    ...selectedOrder,
                    totalAmount: Number(e.target.value),
                  })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                select
                label="Trạng thái"
                value={selectedOrder.status}
                onChange={(e) =>
                  setSelectedOrder({
                    ...selectedOrder,
                    status: e.target.value,
                  })
                }
                inputProps={{ 'aria-label': 'Trạng thái đơn hàng' }}
              >
                <option value="pending">Chờ xử lý</option>
                <option value="processing">Đang xử lý</option>
                <option value="completed">Hoàn thành</option>
                <option value="cancelled">Đã hủy</option>
              </TextField>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSaveOrder} variant="contained" color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderManagement; 