import React, { useState } from 'react';
import { Box, Typography, RadioGroup, FormControlLabel, Radio, TextField, Paper, Divider } from '@mui/material';

interface PaymentFormData {
  paymentMethod: 'cod' | 'banking' | 'qr';
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
}

export const PaymentForm: React.FC = () => {
  const [formData, setFormData] = useState<PaymentFormData>({
    paymentMethod: 'cod',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Phương thức thanh toán
      </Typography>
      <Box>
        <RadioGroup
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
        >
          <FormControlLabel
            value="cod"
            control={<Radio />}
            label="Thanh toán khi nhận hàng (COD)"
          />
          <FormControlLabel
            value="qr"
            control={<Radio />}
            label="Thanh toán qua QR"
          />
          <FormControlLabel
            value="banking"
            control={<Radio />}
            label="Chuyển khoản ngân hàng (Đang bảo trì)"
            disabled
          />
        </RadioGroup>

        {formData.paymentMethod === 'banking' && (
          <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #e0e0e0' }}>
            <TextField
              label="Tên ngân hàng"
              name="bankName"
              value={formData.bankName || ''}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Số tài khoản"
              name="accountNumber"
              value={formData.accountNumber || ''}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Tên tài khoản"
              name="accountName"
              value={formData.accountName || ''}
              onChange={handleChange}
              fullWidth
              required
            />
          </Box>
        )}
      </Box>
    </Paper>
  );
};