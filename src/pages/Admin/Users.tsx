import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  CircularProgress,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import AdminLayout from '../../layouts/AdminLayout';
import { userService, UserDto } from '../../services/userService';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const Users = () => {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const fetchUsers = async () => {
    try {
      if (!token) {
        navigate('/login');
        return;
      }
      setLoading(true);
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (error: any) {
      toast.error(error.message || 'Không thể tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (user: UserDto) => {
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Họ tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Ngày sinh</TableCell>
              <TableCell>Ngày tạo</TableCell>
              <TableCell>Vai trò</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>
                    {dayjs(user.dateOfBirth).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    {dayjs(user.createdAt).format('DD/MM/YYYY HH:mm')}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.role === 1 ? 'Admin' : 'User'}
                      color={user.role === 1 ? 'primary' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleOpenDialog(user)}>
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
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
                <Typography>Số điện thoại: {selectedUser.phoneNumber}</Typography>
                <Typography>
                  Ngày sinh: {dayjs(selectedUser.dateOfBirth).format('DD/MM/YYYY')}
                </Typography>
                <Typography>
                  Địa chỉ: {selectedUser.address || 'Chưa cập nhật'}
                </Typography>
                <Typography>
                  Vai trò: {selectedUser.role === 1 ? 'Admin' : 'User'}
                </Typography>
                <Typography>
                  Ngày tạo: {dayjs(selectedUser.createdAt).format('DD/MM/YYYY HH:mm')}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Users;