import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import CategoryPage from '../pages/Category/CategoryId';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Profile from '../pages/Profile';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import ProductPage from '../pages/Product/Product';
import News from '../pages/News';
import AdminDashboard from '../pages/Admin';
import AdminRoute from '../components/auth/AdminRoute';
import NotFound from '../pages/NotFound';
import ForgotPassword from '../pages/Auth/ForgotPassword';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="category/:categoryId" element={<CategoryPage />} /> 
        <Route path="products" element={<ProductPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="news" element={<News />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
