import axios from 'axios';
import { LoginCredentials, RegisterData, User } from '../types/auth';
import { API_URL } from '../config/api';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    try {
      const response = await axios.post<LoginResponse>(`${API_URL}/authenticate`, {
        identifier: credentials.identifier,
        password: credentials.password
      });
      
      const { accessToken, user } = response.data;
      localStorage.setItem('token', accessToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      
      return { user, token: accessToken };
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Đăng nhập thất bại');
    }
  },

  async register(data: RegisterData): Promise<{ user: User; token: string }> {
    try {
      const response = await axios.post(`${API_URL}/register`, data);
      const { token } = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Sau khi có token, gọi API lấy thông tin user
      const userResponse = await axios.get(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const user = userResponse.data;
      return { user, token };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Đăng ký thất bại');
    }
  },

  logout(): void {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  setAuthHeader(token: string | null): void {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  },

  async getCurrentUser(): Promise<User> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    
    try {
      const response = await axios.get(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      throw error;
    }
  },
};
