import React, { useState } from 'react';
import { Box, Typography, TextField, Grid, Paper } from '@mui/material';

interface ShippingFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
}

export const ShippingForm: React.FC = () => {
  const [formData, setFormData] = useState<ShippingFormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    ward: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Thông tin giao hàng
      </Typography>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Họ và tên"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          label="Số điện thoại"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          label="Địa chỉ"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          required
        />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Tỉnh/Thành phố"
              name="city"
              value={formData.city}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Quận/Huyện"
              name="district"
              value={formData.district}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Phường/Xã"
              name="ward"
              value={formData.ward}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}; 