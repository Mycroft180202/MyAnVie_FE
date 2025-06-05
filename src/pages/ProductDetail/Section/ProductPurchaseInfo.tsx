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
import { Product } from '../../../types/product';

interface ProductPurchaseInfoProps {
  product: Product;
}

const ProductPurchaseInfo = ({ product }: ProductPurchaseInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState<string>(product.color || 'blue');
  const [size, setSize] = useState(product.size || '50x70');

  const handleQtyChange = (type: 'inc' | 'dec') => {
    setQuantity((prev) => {
      if (type === 'inc' && prev < product.stockQuantity) {
        return prev + 1;
      }
      if (type === 'dec' && prev > 1) {
        return prev - 1;
      }
      return prev;
    });
  };

  const colorOptions = ['blue', 'red', 'brown', 'orange'];
  const sizeOptions = ['50x70', '70x90', '90x110'];

  return (
    <Box>
      {/* Title */}
      <Typography variant="h4" sx={{ fontWeight: 500, mb: 2 }}>
        {product.name}
      </Typography>

      {/* Price */}
      <Typography variant="h5" color="primary" sx={{ fontWeight: 600, mb: 2 }}>
        {new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(product.price)}
      </Typography>

      {/* Product Stats */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        divider={<Divider orientation="vertical" flexItem sx={{ bgcolor: '#000' }} />}
        sx={{ mb: 3 }}
      >
        <Typography>Đã bán: 100</Typography>
        <Typography>Kho: {product.stockQuantity}</Typography>
      </Stack>

      <Divider sx={{ my: 2, bgcolor: '#000' }} />

      {/* Color Selection */}
      {product.color && (
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
                    border: color === c ? '2px solid #000' : 'none',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </Stack>
          </Stack>
        </Box>
      )}

      {/* Size Selection */}
      {product.size && (
        <Box sx={{ my: 3 }}>
          <Stack direction="row" alignItems="center" spacing={4}>
            <Typography fontWeight="bold" sx={{ minWidth: 80 }}>
              Kích thước
            </Typography>
            <Stack direction="row" spacing={2}>
              {sizeOptions.map((s) => (
                <Box
                  key={s}
                  onClick={() => setSize(s)}
                  sx={{
                    px: 2,
                    py: 1,
                    border: '1px solid #000',
                    borderRadius: '4px',
                    bgcolor: size === s ? '#000' : 'transparent',
                    color: size === s ? '#fff' : '#000',
                    cursor: 'pointer',
                  }}
                >
                  {s}
                </Box>
              ))}
            </Stack>
          </Stack>
        </Box>
      )}

      <Divider sx={{ my: 2, bgcolor: '#000' }} />

      {/* Quantity */}
      <Stack direction="row" alignItems="center" spacing={4} sx={{ my: 3 }}>
        <Typography fontWeight="bold" sx={{ minWidth: 80 }}>
          Số lượng
        </Typography>
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton
            onClick={() => handleQtyChange('dec')}
            disabled={quantity <= 1}
          >
            <RemoveIcon />
          </IconButton>
          <Box sx={{ px: 2, py: 1 }}>{quantity}</Box>
          <IconButton
            onClick={() => handleQtyChange('inc')}
            disabled={quantity >= product.stockQuantity}
          >
            <AddIcon />
          </IconButton>
        </Stack>
      </Stack>

      {/* Action Buttons */}
      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        <Button variant="outline">Thêm vào giỏ hàng</Button>
        <Button>Mua ngay</Button>
      </Stack>
    </Box>
  );
};

export default ProductPurchaseInfo;
