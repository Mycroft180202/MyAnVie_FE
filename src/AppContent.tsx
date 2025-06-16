import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ChatPopup from './components/ChatPopup/ChatPopup';
import HomePage from './pages/Home/HomePage';
import AboutUsPage from './pages/AboutUs/AboutUs';
import ShopPage from './pages/Shop/ShopPage';
import ProductDetailPage from './pages/ProductDetail/ProductDetailPage';
import Login from './pages/Authentication/Login';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './store/LanguageContext';
import Register from './pages/Authentication/Register';
import ForgotPassword from './pages/Authentication/ForgotPassword';
import ResetPassword from './pages/Authentication/ResetPassword';
import Profile from './pages/Profile/Profile';
import CartPage from './pages/Cart/CartPage';
import CheckoutPage from './pages/Checkout/CheckoutPage';
import OrderSuccessPage from './pages/Checkout/OrderSuccessPage';
import OrdersPage from './pages/Orders/OrdersPage';
import Dashboard from './pages/Admin/Dashboard';
import Products from './pages/Admin/Products';
import AdminOrders from './pages/Admin/Orders';
import Users from './pages/Admin/Users';
import AdminRoute from './components/PrivateRoute/AdminRoute';
import AdminLayout from './layouts/AdminLayout';
import PaymentResult from './pages/PaymentResult';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <AuthProvider>
      <LanguageProvider>
        {!isAdminRoute && <Header />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/shop/:category" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/payment-result" element={<PaymentResult />} />
          
          {/* Admin routes wrapped in AdminLayout */}
          <Route path="/admin/*" element={
            <AdminRoute>
              <AdminLayout>
                <Routes>
                  <Route index element={<Dashboard />} />
                  <Route path="products" element={<Products />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="users" element={<Users />} />
                </Routes>
              </AdminLayout>
            </AdminRoute>
          } />
        </Routes>
        {!isAdminRoute && <Footer />}
        <ChatPopup />
      </LanguageProvider>
    </AuthProvider>
  );
};

export default AppContent; 