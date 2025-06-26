import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  Paper,
  Grid,
  Divider
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { toast } from 'react-toastify';
import { getOrderById, OrderDto } from '../services/orderService';
import { useAuth } from '../context/AuthContext';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PaymentResult: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'failed' | 'cancelled' | 'pending' | 'loading' | null>('loading');
  const [transactionDetails, setTransactionDetails] = useState<any>(null);
  const [orderInfo, setOrderInfo] = useState<OrderDto | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const status = params.get('status')?.toUpperCase();
    const id = params.get('id');
    const cancel = params.get('cancel') === 'true';
    const orderCode = params.get('orderCode');
    const orderIdFromState = location.state?.orderId;

    if (code === '01') {
      setPaymentStatus('failed');
      setErrorMessage('Thông tin giao dịch không hợp lệ.');
    } else if (status === 'PAID' && !cancel && code === '00') {
      setPaymentStatus('success');
      toast.success('Thanh toán thành công!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setTransactionDetails({
        transactionId: id,
        orderCode,
        statusCode: code,
        cancel: cancel ? 'Yes' : 'No',
      });
    } else if (status === 'CANCELLED' || cancel) {
      setPaymentStatus('cancelled');
      toast.error('Thanh toán đã bị hủy!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setTransactionDetails({
        transactionId: id,
        orderCode,
        statusCode: code,
        cancel: cancel ? 'Yes' : 'No',
      });
    } else if (status === 'PENDING' || status === 'PROCESSING') {
      setPaymentStatus('pending');
      toast.info('Thanh toán đang được xử lý...', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setTransactionDetails({
        transactionId: id,
        orderCode,
        statusCode: code,
        cancel: cancel ? 'Yes' : 'No',
      });
    } else {
      setPaymentStatus('failed');
      setErrorMessage('Không tìm thấy thông tin giao dịch hoặc trạng thái không hợp lệ.');
    }

    const finalOrderId = orderIdFromState || orderCode;
    if (finalOrderId && token && (paymentStatus === 'success' || paymentStatus === 'pending')) {
      getOrderById(finalOrderId, token)
        .then((data: OrderDto) => {
          setOrderInfo(data);
        })
        .catch((err: any) => {
          console.error("Error fetching order details:", err);
          setErrorMessage('Không thể lấy thông tin đơn hàng.');
        });
    }
  }, [location.search, location.state, token]);

  const renderContent = () => {
    if (paymentStatus === 'loading') {
      return (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <CircularProgress size={60} sx={{ color: 'primary.main' }} />
          <Typography variant="h6" sx={{ mt: 2, color: 'text.primary' }}>
            Đang xử lý thanh toán...
          </Typography>
        </Box>
      );
    }

    if (paymentStatus === 'success') {
      return (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <CheckCircleIcon sx={{ fontSize: 100, color: 'success.main', mb: 2 }} />
          <Typography variant="h4" color="text.primary" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
            Thanh toán của bạn đã thành công
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Cảm ơn bạn đã thanh toán. Chúng tôi sẽ liên hệ lại với bạn để cung cấp thêm chi tiết trong thời gian sớm nhất.
          </Typography>
          {transactionDetails && (
            <Paper elevation={1} sx={{ p: 3, mx: 'auto', maxWidth: 600, mt: 3, textAlign: 'left', bgcolor: 'background.default' }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
                Chi tiết giao dịch
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Mã giao dịch:</Typography></Grid>
                <Grid item xs={12} sm={6}><Typography variant="body2" fontWeight="bold">{transactionDetails.transactionId}</Typography></Grid>
                <Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Mã đơn hàng:</Typography></Grid>
                <Grid item xs={12} sm={6}><Typography variant="body2" fontWeight="bold">{transactionDetails.orderCode}</Typography></Grid>
                <Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Mã trạng thái:</Typography></Grid>
                <Grid item xs={12} sm={6}><Typography variant="body2" fontWeight="bold">{transactionDetails.statusCode}</Typography></Grid>
                <Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Hủy giao dịch:</Typography></Grid>
                <Grid item xs={12} sm={6}><Typography variant="body2" fontWeight="bold">{transactionDetails.cancel}</Typography></Grid>
              </Grid>
            </Paper>
          )}
          {orderInfo && (
            <Paper elevation={1} sx={{ p: 3, mx: 'auto', maxWidth: 600, mt: 3, textAlign: 'left', bgcolor: 'background.default' }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
                Thông tin đơn hàng
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Mã đơn hàng:</Typography></Grid>
                <Grid item xs={12} sm={6}><Typography variant="body2" fontWeight="bold">{orderInfo.id}</Typography></Grid>
                <Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Tổng tiền đơn hàng:</Typography></Grid>
                <Grid item xs={12} sm={6}><Typography variant="body2" fontWeight="bold" color="success.main">
                  {orderInfo.totalAmount?.toLocaleString('vi-VN')} VNĐ
                </Typography></Grid>
                <Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Địa chỉ giao hàng:</Typography></Grid>
                <Grid item xs={12} sm={6}><Typography variant="body2" fontWeight="bold">{orderInfo.shippingAddress}</Typography></Grid>
              </Grid>
            </Paper>
          )}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<HomeIcon />}
              onClick={() => navigate('/')}
              sx={{ minWidth: 200 }}
            >
              Về trang chủ
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ListAltIcon />}
              onClick={() => navigate('/orders')}
              sx={{ minWidth: 200 }}
            >
              Xem đơn hàng của tôi
            </Button>
          </Box>
        </Box>
      );
    }

    if (paymentStatus === 'pending') {
      return (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <CircularProgress size={60} sx={{ color: 'warning.main', mb: 2 }} />
          <Typography variant="h4" color="text.primary" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
            Thanh toán đang được xử lý
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Vui lòng chờ trong giây lát. Chúng tôi sẽ thông báo khi có kết quả.
          </Typography>
          {transactionDetails && (
            <Paper elevation={1} sx={{ p: 3, mx: 'auto', maxWidth: 600, mt: 3, textAlign: 'left', bgcolor: 'background.default' }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
                Chi tiết giao dịch
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Mã giao dịch:</Typography></Grid>
                <Grid item xs={12} sm={6}><Typography variant="body2" fontWeight="bold">{transactionDetails.transactionId}</Typography></Grid>
                <Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Mã đơn hàng:</Typography></Grid>
                <Grid item xs={12} sm={6}><Typography variant="body2" fontWeight="bold">{transactionDetails.orderCode}</Typography></Grid>
                <Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Mã trạng thái:</Typography></Grid>
                <Grid item xs={12} sm={6}><Typography variant="body2" fontWeight="bold">{transactionDetails.statusCode}</Typography></Grid>
                <Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Hủy giao dịch:</Typography></Grid>
                <Grid item xs={12} sm={6}><Typography variant="body2" fontWeight="bold">{transactionDetails.cancel}</Typography></Grid>
              </Grid>
            </Paper>
          )}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<HomeIcon />}
              onClick={() => navigate('/')}
              sx={{ minWidth: 200 }}
            >
              Về trang chủ
            </Button>
          </Box>
        </Box>
      );
    }

    // Failed or Cancelled
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        {paymentStatus === 'cancelled' ? (
          <CancelOutlinedIcon sx={{ fontSize: 100, color: 'warning.main', mb: 2 }} />
        ) : (
          <ErrorOutlineIcon sx={{ fontSize: 100, color: 'error.main', mb: 2 }} />
        )}
        <Typography 
          variant="h4" 
          color={paymentStatus === 'cancelled' ? 'warning.main' : 'error.main'} 
          gutterBottom 
          sx={{ mt: 2, fontWeight: 600 }}
        >
          {paymentStatus === 'cancelled' ? 'Giao dịch đã bị hủy' : 'Thanh toán thất bại'}
        </Typography>
        {errorMessage && (
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Chi tiết lỗi: {errorMessage}
          </Typography>
        )}
        {transactionDetails && (
          <Paper elevation={1} sx={{ p: 3, mx: 'auto', maxWidth: 600, mt: 3, textAlign: 'left', bgcolor: 'background.default' }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
              Chi tiết giao dịch
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Mã giao dịch:</Typography></Grid>
              <Grid item xs={12} sm={6}><Typography variant="body2" fontWeight="bold">{transactionDetails.transactionId}</Typography></Grid>
              <Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Mã đơn hàng:</Typography></Grid>
              <Grid item xs={12} sm={6}><Typography variant="body2" fontWeight="bold">{transactionDetails.orderCode}</Typography></Grid>
              <Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Mã trạng thái:</Typography></Grid>
              <Grid item xs={12} sm={6}><Typography variant="body2" fontWeight="bold">{transactionDetails.statusCode}</Typography></Grid>
              <Grid item xs={12} sm={6}><Typography variant="body2" color="text.secondary">Hủy giao dịch:</Typography></Grid>
              <Grid item xs={12} sm={6}><Typography variant="body2" fontWeight="bold">{transactionDetails.cancel}</Typography></Grid>
            </Grid>
          </Paper>
        )}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            sx={{ minWidth: 200 }}
          >
            Về trang chủ
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/checkout', { state: location.state })}
            sx={{ minWidth: 200 }}
          >
            Thử lại thanh toán
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      <Paper 
        elevation={4} 
        sx={{ 
          p: { xs: 2, md: 4 },
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        {renderContent()}
      </Paper>
    </Container>
  );
};

export default PaymentResult;