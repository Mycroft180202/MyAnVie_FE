import React from 'react';
import {
  Box,
  TextField,
  Typography,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Paper,
} from '@mui/material';

interface DeliveryFormProps {
  formData: {
    fullName: string;
    phoneNumber: string;
    email: string;
    address: string;
    note: string;
    paymentMethod: 'cod' | 'bank';
  };
  onChange: (field: string, value: string) => void;
}

const DeliveryForm: React.FC<DeliveryFormProps> = ({ formData, onChange }) => {
  return (
    <Paper elevation={0} sx={{ p: 3, border: '1px solid #E0E0E0', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Thông tin giao hàng
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Họ và tên"
            value={formData.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            label="Số điện thoại"
            value={formData.phoneNumber}
            onChange={(e) => onChange('phoneNumber', e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => onChange('email', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Địa chỉ"
            value={formData.address}
            onChange={(e) => onChange('address', e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Ghi chú"
            multiline
            rows={3}
            value={formData.note}
            onChange={(e) => onChange('note', e.target.value)}
            placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay địa chỉ giao hàng chi tiết hơn."
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Phương thức thanh toán
        </Typography>

        <FormControl component="fieldset">
          <RadioGroup
            value={formData.paymentMethod}
            onChange={(e) => onChange('paymentMethod', e.target.value)}
          >
            <FormControlLabel
              value="cod"
              control={<Radio color="error" />}
              label={
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Thanh toán khi nhận hàng (COD)
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Thanh toán bằng tiền mặt khi nhận hàng
                  </Typography>
                </Box>
              }
            />
            <FormControlLabel
              value="bank"
              control={<Radio color="error" />}
              label={
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Chuyển khoản ngân hàng
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Thông tin tài khoản sẽ được gửi qua email
                  </Typography>
                </Box>
              }
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </Paper>
  );
};

export default DeliveryForm;