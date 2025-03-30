import api from './api';

export interface UpdateUserData {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
}

export interface PasswordChangeRequest {
  oldPassword: string;
  newPassword: string;
}

export interface VerificationRequest {
  email: string;
  otp: string;
}

export interface CreateUserData {
  username: string;
  password: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  role: 'USER' | 'ADMIN';
}

export interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  role: 'USER' | 'ADMIN';
  active: boolean;
}

export const userService = {
  // User APIs
  async updateProfile(data: UpdateUserData) {
    const response = await api.put('/users/me', data);
    return response.data;
  },

  async getProfile() {
    const response = await api.get('/users/me');
    return response.data;
  },

  async changePassword(data: PasswordChangeRequest) {
    const response = await api.post('/users/change-password', data);
    return response.data;
  },

  async verifyPasswordChange(data: VerificationRequest) {
    const response = await api.post('/users/verify-password-change', data);
    return response.data;
  },

  // Admin APIs
  async getAllUsers() {
    const response = await api.get('/users');
    return response.data;
  },

  async getUserById(id: number) {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  async createUser(data: CreateUserData) {
    const response = await api.post('/users', data);
    return response.data;
  },

  async updateUser(id: number, data: UpdateUserData) {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  async deleteUser(id: number) {
    await api.delete(`/users/${id}`);
  },
}; 