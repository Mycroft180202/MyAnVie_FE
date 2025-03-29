import axios from 'axios';
import { LoginCredentials, RegisterData, User } from '../types/auth';

const API_URL = 'http://localhost:8080';

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    try {
      const response = await axios.post(`${API_URL}/authenticate`, credentials);
      const { user, token } = response.data;
      localStorage.setItem('token', token);
      return { user, token };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Đăng nhập thất bại');
    }
  },

  async register(data: RegisterData): Promise<{ user: User; token: string }> {
    try {
      const response = await axios.post(`${API_URL}/register`, data);
      const { user, token } = response.data;
      localStorage.setItem('token', token);
      return { user, token };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Đăng ký thất bại');
    }
  },

  logout(): void {
    localStorage.removeItem('token');
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
    const { data } = await axios.get(`${API_URL}/auth/me`);
    return {
      id: data.id,
      username: data.username,
      email: data.email,
      fullName: data.fullName,
      role: data.role,
      phoneNumber: data.phoneNumber,
      address: data.address,
    };
  },
};
