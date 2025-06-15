import {
  Box,
  Typography,
  IconButton,
  Stack,
  Divider,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import Button from '../../../components/Button/Button';
import { Product } from '../../../services/productService';

interface ProductPurchaseInfoProps {
  product: Product;
}

const ProductPurchaseInfo = ({ product }: ProductPurchaseInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleQtyChange = (type: 'inc' | 'dec') => {
    setQuantity((prev) => (type === 'inc' ? prev + 1 : Math.max(1, prev - 1)));
  };

  return (
    <Box>
      {/* Title */}
      <Typography sx={{ fontSize: 24, fontWeight: 'bold', mb: 1, fontFamily: 'Hoaico2', letterSpacing:2 }}>
        {product.name}
      </Typography>

      {/* Price */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
        <Typography sx={{ color: '#950B0B', fontSize: 24, fontWeight: 700 }}>
          {product.price.toLocaleString('vi-VN')}đ
        </Typography>
      </Stack>

      {/* Stats row */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
        <Typography>20 Lượt bán</Typography>
        <Divider orientation="vertical" flexItem sx={{ bgcolor: '#000' }} />
        <Typography>15 Lượt đánh giá</Typography>
        <Divider orientation="vertical" flexItem sx={{ bgcolor: '#000' }} />
        <Typography>{product.stock} Sản phẩm còn lại</Typography>
      </Stack>

      <Divider sx={{ my: 2, bgcolor: '#000' }} />

      {/* Color */}
      {product.color && (
        <Box sx={{ my: 2 }}>
          <Stack direction="row" alignItems="center" spacing={4}>
            <Typography fontWeight="bold" sx={{ minWidth: 80 }}>
              Màu sắc
            </Typography>
            <Typography>{product.color}</Typography>
          </Stack>
        </Box>
      )}

      {/* Quantity */}
      <Box sx={{ my: 2 }}>
        <Stack direction="row" alignItems="center" spacing={4}>
          <Typography fontWeight="bold" sx={{ minWidth: 80 }}>
            Số lượng
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton onClick={() => handleQtyChange('dec')}>
              <RemoveIcon />
            </IconButton>
            <Typography>{quantity}</Typography>
            <IconButton onClick={() => handleQtyChange('inc')}>
              <AddIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      {/* Size */}
      {product.size && (
        <Box sx={{ my: 2 }}>
          <Typography fontWeight="bold" mb={1}>
            Kích thước
          </Typography>
          <Button
            variant="solid"
          >
            {product.size} cm
          </Button>
        </Box>
      )}

      {/* Stock */}
      <Typography sx={{ mt: 1, mb: 2 }}>Còn {product.stock} sản phẩm</Typography>

      <Divider sx={{ my: 2, bgcolor: '#000' }} />

      {/* Buttons */}
      <Stack direction="row" spacing={2}>
        <Button onClick={() => { /* handle mua ngay */ }}>Mua ngay</Button>
        <Button variant="outline" onClick={() => { /* handle thêm giỏ hàng */ }}>
          Thêm vào giỏ hàng
        </Button>
      </Stack>
    </Box>
  );
};

export default ProductPurchaseInfo;
