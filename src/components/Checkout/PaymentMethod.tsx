import React from 'react';
import {
  Paper,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Box,
} from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import QrCodeIcon from '@mui/icons-material/QrCode';

interface PaymentMethodProps {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
}

export const PaymentMethod: React.FC<PaymentMethodProps> = ({
  selectedMethod,
  onMethodChange,
}) => {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Phương thức thanh toán
      </Typography>
      
      <FormControl component="fieldset">
        <RadioGroup
          value={selectedMethod}
          onChange={(e) => onMethodChange(e.target.value)}
        >
          <FormControlLabel
            value="COD"
            control={<Radio />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocalAtmIcon />
                <Typography>Thanh toán khi nhận hàng (COD)</Typography>
              </Box>
            }
          />
          <FormControlLabel
            value="QR"
            control={<Radio />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <QrCodeIcon />
                <Typography>Thanh toán qua QR</Typography>
              </Box>
            }
          />
          <FormControlLabel
            value="VNPAY"
            disabled
            control={<Radio />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PaymentIcon />
                <Typography>Thanh toán qua VNPAY (Đang bảo trì)</Typography>
              </Box>
            }
          />
        </RadioGroup>
      </FormControl>
    </Paper>
  );
};