import {
  Box,
  Typography,
  Rating,
  IconButton,
  Stack,
  Divider,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import Button from '../../../components/Button/Button';

interface ProductProps {
  title: string;
  price: number;
  rating: number;
  category: string;
  image: string;
}

const ProductPurchaseInfo = ({ product }: { product: ProductProps }) => {
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState<string>('blue');
  const [size, setSize] = useState('50x70');

  const handleQtyChange = (type: 'inc' | 'dec') => {
    setQuantity((prev) => (type === 'inc' ? prev + 1 : Math.max(1, prev - 1)));
  };

  const colorOptions = ['blue', 'red', 'brown', 'orange'];
  const sizeOptions = ['50x70', '70x90', '90x110'];

  return (
    <Box>
      {/* Title */}
      <Typography sx={{ fontSize: 24, fontWeight: 'bold', mb: 1, fontFamily: 'Hoaico2', letterSpacing:2 }}>
        {product.title}
      </Typography>

      {/* Price */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
        <Typography sx={{ color: '#999', textDecoration: 'line-through' }}>500.000đ</Typography>
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
        <Stack direction="row" alignItems="center" spacing={1}>
          <Rating value={product.rating} readOnly size="small" />
          <Typography>5/5 sao</Typography>
        </Stack>
        <Divider orientation="vertical" flexItem sx={{ bgcolor: '#000' }} />
        <Typography>100 Sản phẩm còn lại</Typography>
      </Stack>

      <Divider sx={{ my: 2, bgcolor: '#000' }} />

      {/* Color */}
      <Box sx={{ my: 2 }}>
        <Stack direction="row" alignItems="center" spacing={4}>
          <Typography fontWeight="bold" sx={{ minWidth: 80 }}>
            Màu sắc
          </Typography>
          <Stack direction="row" spacing={2}>
            {colorOptions.map((c) => (
              <Box
                key={c}
                onClick={() => setColor(c)}
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  bgcolor: c,
                  border: c === color ? '2px solid black' : '1px solid #ccc',
                  cursor: 'pointer',
                }}
              />
            ))}
          </Stack>
        </Stack>
      </Box>

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
      <Box sx={{ my: 2 }}>
        <Typography fontWeight="bold" mb={1}>
          Kích thước
        </Typography>
        <Stack direction="row" spacing={2}>
          {sizeOptions.map((s) => (
            <Button
              key={s}
              onClick={() => setSize(s)}
              variant={size === s ? 'solid' : 'outline'}
            >
              {s.replace('x', ' x ')} cm
            </Button>
          ))}
        </Stack>
      </Box>

      {/* Stock */}
      <Typography sx={{ mt: 1, mb: 2 }}>Còn 20 sản phẩm</Typography>

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
