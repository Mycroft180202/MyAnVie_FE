import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  SelectChangeEvent,
} from '@mui/material';
import { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { userService, User, CreateUserData, UpdateUserData } from '../../services/userService';
import { toast } from 'react-toastify';

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [formData, setFormData] = useState<CreateUserData>({
    username: '',
    password: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    role: 'USER',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (error: any) {
      toast.error('Không thể tải danh sách người dùng');
    }
  };

  const handleOpenDialog = (user?: User) => {
    if (user) {
      setSelectedUser(user);
      setFormData({
        username: user.username,
        password: '',
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber || '',
        address: user.address || '',
        role: user.role,
      });
      setIsCreateMode(false);
    } else {
      setSelectedUser(null);
      setFormData({
        username: '',
        password: '',
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
        role: 'USER',
      });
      setIsCreateMode(true);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setError(null);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (e: SelectChangeEvent) => {
    const value = e.target.value as 'USER' | 'ADMIN';
    setFormData(prev => ({
      ...prev,
      role: value
    }));
  };

  const handleSubmit = async () => {
    setError(null);
    try {
      if (isCreateMode) {
        await userService.createUser(formData);
        toast.success('Tạo người dùng thành công!');
      } else if (selectedUser) {
        await userService.updateUser(selectedUser.id, formData);
        toast.success('Cập nhật thông tin thành công!');
      }
      handleCloseDialog();
      loadUsers();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Có lỗi xảy ra');
      toast.error('Thao tác thất bại!');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      try {
        await userService.deleteUser(id);
        toast.success('Xóa người dùng thành công!');
        loadUsers();
      } catch (error: any) {
        toast.error('Không thể xóa người dùng');
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Quản lý người dùng</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Thêm người dùng
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên đăng nhập</TableCell>
              <TableCell>Họ tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>Vai trò</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber || '-'}</TableCell>
                <TableCell>{user.address || '-'}</TableCell>
                <TableCell>
                  <Chip
                    label={user.role === 'ADMIN' ? 'Quản trị viên' : 'Người dùng'}
                    color={user.role === 'ADMIN' ? 'primary' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.active ? 'Hoạt động' : 'Không hoạt động'}
                    color={user.active ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(user)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(user.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {isCreateMode ? 'Thêm người dùng mới' : 'Chỉnh sửa thông tin người dùng'}
        </DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Tên đăng nhập"
              name="username"
              value={formData.username}
              onChange={handleTextChange}
              disabled={!isCreateMode}
              sx={{ mb: 2 }}
            />
            {isCreateMode && (
              <TextField
                fullWidth
                label="Mật khẩu"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleTextChange}
                sx={{ mb: 2 }}
              />
            )}
            <TextField
              fullWidth
              label="Họ tên"
              name="fullName"
              value={formData.fullName}
              onChange={handleTextChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleTextChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Số điện thoại"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleTextChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Địa chỉ"
              name="address"
              value={formData.address}
              onChange={handleTextChange}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth>
              <InputLabel>Vai trò</InputLabel>
              <Select
                name="role"
                value={formData.role}
                onChange={handleRoleChange}
                label="Vai trò"
              >
                <MenuItem value="USER">Người dùng</MenuItem>
                <MenuItem value="ADMIN">Quản trị viên</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {isCreateMode ? 'Tạo' : 'Cập nhật'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement; 