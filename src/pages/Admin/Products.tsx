import React, { useState } from 'react';
import {
  Box,
  Button,
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
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useLanguage } from '../../store/LanguageContext';
import AdminLayout from '../../layouts/AdminLayout';

// Mock data - replace with API calls
const mockProducts = [
  {
    id: 1,
    name: 'Bình gốm hoa văn',
    category: 'pottery',
    price: 1500000,
    stock: 50,
    image: '/images/products/Pottery1.jpg',
  },
  {
    id: 2,
    name: 'Khăn lụa thêu tay',
    category: 'silk',
    price: 800000,
    stock: 30,
    image: '/images/products/Silk1.jpg',
  },
];

const Products = () => {
  const { t } = useLanguage();
  const [products, setProducts] = useState(mockProducts);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    image: '',
  });

  const handleOpenDialog = (product?: any) => {
    if (product) {
      setIsEditing(true);
      setSelectedProduct(product);
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        stock: product.stock.toString(),
        image: product.image,
      });
    } else {
      setIsEditing(false);
      setSelectedProduct(null);
      setFormData({
        name: '',
        category: '',
        price: '',
        stock: '',
        image: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({
      name: '',
      category: '',
      price: '',
      stock: '',
      image: '',
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (isEditing) {
      // Update existing product
      setProducts((prev) =>
        prev.map((p) =>
          p.id === selectedProduct.id
            ? {
                ...p,
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
              }
            : p
        )
      );
    } else {
      // Add new product
      setProducts((prev) => [
        ...prev,
        {
          id: Math.max(...prev.map((p) => p.id)) + 1,
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
        },
      ]);
    }
    handleCloseDialog();
  };

  const handleDelete = (productId: number) => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    }
  };

  return (
    <AdminLayout>
      <Box sx={{ mb: 4 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          {t.admin.addProduct}
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Hình ảnh</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Danh mục</TableCell>
              <TableCell align="right">Giá</TableCell>
              <TableCell align="right">Tồn kho</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    sx={{ width: 50, height: 50, objectFit: 'cover' }}
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell align="right">
                  {product.price.toLocaleString('vi-VN')} ₫
                </TableCell>
                <TableCell align="right">{product.stock}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpenDialog(product)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(product.id)}>
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
          {isEditing ? t.admin.editProduct : t.admin.addProduct}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Tên sản phẩm"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Danh mục</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    category: e.target.value as string,
                  }))
                }
              >
                <MenuItem value="pottery">Gốm</MenuItem>
                <MenuItem value="silk">Lụa</MenuItem>
                <MenuItem value="bamboo">Mây tre đan</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Giá"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleFormChange}
              fullWidth
            />
            <TextField
              label="Tồn kho"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleFormChange}
              fullWidth
            />
            <TextField
              label="URL hình ảnh"
              name="image"
              value={formData.image}
              onChange={handleFormChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {isEditing ? 'Cập nhật' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default Products;