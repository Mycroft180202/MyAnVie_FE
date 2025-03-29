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
const categories = [
  {
    id: 1,
    name: 'Đồ gốm',
    description: 'Các sản phẩm gốm sứ truyền thống',
    productCount: 50,
  },
  {
    id: 2,
    name: 'Mây tre đan',
    description: 'Sản phẩm thủ công từ mây tre',
    productCount: 30,
  },
  {
    id: 3,
    name: 'Lụa',
    description: 'Sản phẩm từ lụa tơ tằm',
    productCount: 40,
  },
  {
    id: 4,
    name: 'Nón lá',
    description: 'Nón lá truyền thống',
    productCount: 20,
  },
];

const CategoryManagement = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [categoriesList, setCategoriesList] = useState(categories);

  const handleOpenDialog = (category: any) => {
    setSelectedCategory(category);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedCategory(null);
    setOpenDialog(false);
  };

  const handleSaveCategory = () => {
    if (selectedCategory) {
      const updatedCategories = categoriesList.map((category) =>
        category.id === selectedCategory.id ? selectedCategory : category
      );
      setCategoriesList(updatedCategories);
    }
    handleCloseDialog();
  };

  const handleDeleteCategory = (categoryId: number) => {
    const updatedCategories = categoriesList.filter(
      (category) => category.id !== categoryId
    );
    setCategoriesList(updatedCategories);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Quản lý danh mục</Typography>
        <Button variant="contained" color="primary">
          Thêm danh mục
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên danh mục</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Số sản phẩm</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoriesList.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>{category.productCount}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(category)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteCategory(category.id)}
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
        <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
        <DialogContent>
          {selectedCategory && (
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Tên danh mục"
                value={selectedCategory.name}
                onChange={(e) =>
                  setSelectedCategory({ ...selectedCategory, name: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Mô tả"
                value={selectedCategory.description}
                onChange={(e) =>
                  setSelectedCategory({
                    ...selectedCategory,
                    description: e.target.value,
                  })
                }
                multiline
                rows={3}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSaveCategory} variant="contained" color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoryManagement; 