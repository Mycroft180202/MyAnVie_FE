import React, { useState } from 'react';
import {
  Box,
  Typography,
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
  Chip,
  TablePagination,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Block as BlockIcon,
} from '@mui/icons-material';
import AdminLayout from '../../layouts/AdminLayout';

// Mock data - replace with API calls
const mockUsers = [
  {
    id: 1,
    username: 'nguyenvana',
    fullName: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    age: 35,
    totalOrders: 15,
    totalSpent: 45000000,
    status: 'active',
  },
  {
    id: 2,
    username: 'tranthib',
    fullName: 'Trần Thị B',
    email: 'tranthib@example.com',
    age: 28,
    totalOrders: 12,
    totalSpent: 36000000,
    status: 'active',
  },
  {
    id: 3,
    username: 'levanc',
    fullName: 'Lê Văn C',
    email: 'levanc@example.com',
    age: 42,
    totalOrders: 8,
    totalSpent: 25000000,
    status: 'inactive',
  },
];

const mockOrders = [
  {
    id: 1,
    date: '2025-05-15',
    products: [
      { name: 'Bình gốm hoa văn', quantity: 2, price: 1500000 },
      { name: 'Khăn lụa thêu tay', quantity: 1, price: 800000 },
    ],
    total: 3800000,
    status: 'delivered',
  },
  {
    id: 2,
    date: '2025-05-10',
    products: [
      { name: 'Giỏ tre đan', quantity: 3, price: 450000 },
    ],
    total: 1350000,
    status: 'processing',
  },
];

const Users = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = (user: any) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const toggleUserStatus = (userId: number) => {
    // In a real app, this would make an API call
    const confirmed = window.confirm(
      'Bạn có chắc muốn thay đổi trạng thái của người dùng này?'
    );
    if (confirmed) {
      console.log('Toggling status for user:', userId);
    }
  };

  return (
    <AdminLayout>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Họ tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Tuổi</TableCell>
              <TableCell align="right">Số đơn hàng</TableCell>
              <TableCell align="right">Tổng chi tiêu</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.age}</TableCell>
                  <TableCell align="right">{user.totalOrders}</TableCell>
                  <TableCell align="right">
                    {user.totalSpent.toLocaleString('vi-VN')} ₫
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.status === 'active' ? 'Hoạt động' : 'Vô hiệu'}
                      color={user.status === 'active' ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleOpenDialog(user)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => toggleUserStatus(user.id)}>
                      <BlockIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={mockUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Chi tiết người dùng</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Thông tin cá nhân
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography>Họ tên: {selectedUser.fullName}</Typography>
                <Typography>Email: {selectedUser.email}</Typography>
                <Typography>Tuổi: {selectedUser.age}</Typography>
                <Typography>
                  Tổng số đơn hàng: {selectedUser.totalOrders}
                </Typography>
                <Typography>
                  Tổng chi tiêu: {selectedUser.totalSpent.toLocaleString('vi-VN')} ₫
                </Typography>
              </Box>

              <Typography variant="h6" gutterBottom>
                Lịch sử đơn hàng
              </Typography>
              <TableContainer component={Paper} sx={{ mb: 2 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Mã đơn</TableCell>
                      <TableCell>Ngày đặt</TableCell>
                      <TableCell>Sản phẩm</TableCell>
                      <TableCell align="right">Tổng tiền</TableCell>
                      <TableCell>Trạng thái</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>#{order.id}</TableCell>
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
                                : 'Đang xử lý'
                            }
                            color={
                              order.status === 'delivered'
                                ? 'success'
                                : 'warning'
                            }
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
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

export default Users;