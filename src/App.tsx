import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './store/store';
import AppContent from './AppContent';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import OrderSuccessPage from './pages/Checkout/OrderSuccessPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#950B0B', // Màu chính của bạn
    },
    secondary: {
      main: '#FFD700', // Một màu phụ
    },
    error: {
      main: '#D32F2F', // Màu lỗi
    },
    background: {
      default: '#F5F5F5', // Màu nền mặc định
      paper: '#FFFFFF', // Màu nền cho các Paper, Card
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Góc bo tròn cho button
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Góc bo tròn cho Paper và Card
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/*" element={<AppContent />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;