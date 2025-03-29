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
} from '@mui/material';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Mock data
const users = [
  {
    id: 1,
    username: 'user1',
    fullName: 'Nguyễn Văn A',
    email: 'user1@example.com',
    role: 'USER',
    status: 'active',
  },
  {
    id: 2,
    username: 'admin1',
    fullName: 'Trần Thị B',
    email: 'admin1@example.com',
    role: 'ADMIN',
    status: 'active',
  },
];

const UserManagement = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [usersList, setUsersList] = useState(users);

  const handleOpenDialog = (user: any) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedUser(null);
    setOpenDialog(false);
  };

  const handleSaveUser = () => {
    if (selectedUser) {
      const updatedUsers = usersList.map((user) =>
        user.id === selectedUser.id ? selectedUser : user
      );
      setUsersList(updatedUsers);
    }
    handleCloseDialog();
  };

  const handleDeleteUser = (userId: number) => {
    const updatedUsers = usersList.filter((user) => user.id !== userId);
    setUsersList(updatedUsers);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Quản lý người dùng</Typography>
        <Button variant="contained" color="primary">
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
              <TableCell>Vai trò</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersList.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(user)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteUser(user.id)}
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
        <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Tên đăng nhập"
                value={selectedUser.username}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, username: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Họ tên"
                value={selectedUser.fullName}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, fullName: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                value={selectedUser.email}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                select
                label="Vai trò"
                value={selectedUser.role}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, role: e.target.value })
                }
                inputProps={{ 'aria-label': 'Vai trò người dùng' }}
              >
                <option value="USER">Người dùng</option>
                <option value="ADMIN">Quản trị viên</option>
              </TextField>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSaveUser} variant="contained" color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement; 