import axios from 'axios';
import { API_URL } from '../config/api';
import { User } from '../types/auth';

interface PasswordChangeRequest {
  currentPassword: string;
}

interface VerificationRequest {
  code: string;
  newPassword: string;
}

export const userService = {
  async getCurrentUser(): Promise<User> {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_URL}/users/me`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error: any) {
      console.error('Get current user error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Không thể lấy thông tin người dùng');
    }
  },

  async updateProfile(userData: Partial<User>): Promise<User> {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_URL}/users/me`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error: any) {
      console.error('Update profile error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Không thể cập nhật thông tin');
    }
  },

  async sendPasswordChangeVerification(currentPassword: string): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_URL}/users/change-password`,
        { currentPassword },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
    } catch (error: any) {
      console.error('Send verification error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Không thể gửi mã xác thực');
    }
  },

  async verifyAndChangePassword(code: string, newPassword: string): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_URL}/users/verify-password-change`,
        { code, newPassword },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
    } catch (error: any) {
      console.error('Verify password change error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Không thể xác thực mã hoặc đổi mật khẩu');
    }
  }
};