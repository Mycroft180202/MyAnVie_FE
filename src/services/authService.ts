import api from './api';
import { LoginCredentials, RegisterData, User } from '../types/auth';

export const authService = {
  async login(credentials: LoginCredentials) {
    const { data } = await api.post('/auth/login', credentials);
    return data;
  },

  async register(registerData: RegisterData) {
    const { data } = await api.post('/auth/register', registerData);
    return data;
  },

  async getCurrentUser(): Promise<User> {
    const { data } = await api.get('/auth/me');
    return data;
  },
};
