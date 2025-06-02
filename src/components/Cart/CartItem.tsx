import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Stack,
  TextField,
  useTheme,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface CartItemProps {
  id: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  productName,
  price,
  quantity,
  onUpdateQuantity,
  onRemove,
}) => {
  const theme = useTheme();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      onUpdateQuantity(newQuantity);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        borderBottom: '1px solid #E0E0E0',
      }}
    >
      {/* Product Info */}
      <Box flex={1}>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
          {productName}
        </Typography>
        <Typography variant="body1" color="error" fontWeight={500}>
          {price.toLocaleString('vi-VN')}đ
        </Typography>
      </Box>

      {/* Quantity */}
      <Stack direction="row" alignItems="center" spacing={2}>
        <TextField
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          inputProps={{ min: 1 }}
          sx={{
            width: 80,
            '& input': {
              textAlign: 'center',
            },
          }}
        />

        {/* Remove Button */}
        <IconButton 
          onClick={onRemove}
          sx={{ 
            color: theme.palette.error.main,
            '&:hover': {
              backgroundColor: theme.palette.error.light,
            }
          }}
        >
          <DeleteOutlineIcon />
        </IconButton>
      </Stack>

      {/* Total */}
      <Typography variant="h6" sx={{ minWidth: 120, textAlign: 'right', fontWeight: 500 }}>
        {(price * quantity).toLocaleString('vi-VN')}đ
      </Typography>
    </Box>
  );
};

export default CartItem;