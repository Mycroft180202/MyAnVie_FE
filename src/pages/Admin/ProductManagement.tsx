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
const products = [
  {
    id: 1,
    name: 'Bát gốm sứ trắng',
    category: 'Đồ gốm',
    price: 100000,
    stock: 50,
    status: 'active',
  },
  {
    id: 2,
    name: 'Bộ 4 bình hoa sen',
    category: 'Đồ gốm',
    price: 200000,
    stock: 30,
    status: 'active',
  },
];

const ProductManagement = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [productsList, setProductsList] = useState(products);

  const handleOpenDialog = (product: any) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedProduct(null);
    setOpenDialog(false);
  };

  const handleSaveProduct = () => {
    if (selectedProduct) {
      const updatedProducts = productsList.map((product) =>
        product.id === selectedProduct.id ? selectedProduct : product
      );
      setProductsList(updatedProducts);
    }
    handleCloseDialog();
  };

  const handleDeleteProduct = (productId: number) => {
    const updatedProducts = productsList.filter(
      (product) => product.id !== productId
    );
    setProductsList(updatedProducts);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Quản lý sản phẩm</Typography>
        <Button variant="contained" color="primary">
          Thêm sản phẩm
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Danh mục</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Tồn kho</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsList.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price.toLocaleString('vi-VN')}₫</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.status}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(product)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteProduct(product.id)}
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
        <DialogTitle>Chỉnh sửa sản phẩm</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Tên sản phẩm"
                value={selectedProduct.name}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, name: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                select
                label="Danh mục"
                value={selectedProduct.category}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    category: e.target.value,
                  })
                }
                inputProps={{ 'aria-label': 'Danh mục sản phẩm' }}
                sx={{ mb: 2 }}
              >
                <option value="Đồ gốm">Đồ gốm</option>
                <option value="Mây tre đan">Mây tre đan</option>
                <option value="Lụa">Lụa</option>
                <option value="Nón lá">Nón lá</option>
              </TextField>
              <TextField
                fullWidth
                label="Giá"
                type="number"
                value={selectedProduct.price}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    price: Number(e.target.value),
                  })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Tồn kho"
                type="number"
                value={selectedProduct.stock}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    stock: Number(e.target.value),
                  })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                select
                label="Trạng thái"
                value={selectedProduct.status}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    status: e.target.value,
                  })
                }
                inputProps={{ 'aria-label': 'Trạng thái sản phẩm' }}
              >
                <option value="active">Đang bán</option>
                <option value="inactive">Ngừng bán</option>
              </TextField>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSaveProduct} variant="contained" color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductManagement; 