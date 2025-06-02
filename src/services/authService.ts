// src/services/authService.ts
import axios from 'axios';
import {
  LoginCredentials,
  RegisterData,
  User,
  LoginResponsePayload, // Sử dụng type này từ types/auth.ts
  ForgotPasswordRequest,
  VerifyResetCodeRequest,
  ResetPasswordRequest
} from '../types/auth'; // Đảm bảo đường dẫn đúng
import { API_URL } from '../config/api'; // Đảm bảo đường dẫn đúng

export const authService = {
  /**
   * Đăng nhập người dùng.
   * Backend endpoint: POST /api/auth/login
   * Mong đợi backend trả về cấu trúc khớp với LoginResponsePayload (có object token lồng nhau)
   */
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    try {
      const response = await axios.post<LoginResponsePayload>(`${API_URL}/auth/login`, {
        // Backend của bạn nhận LoginDto { Email, Password }
        // LoginCredentials của bạn hiện tại là { email: string, password: string }
        // Nếu LoginCredentials của bạn có 'identifier', thì cần map:
        // email: credentials.identifier, 
        email: credentials.email, // Giả sử LoginCredentials của bạn đã có 'email'
        password: credentials.password,
      });
      
      // Trích xuất đúng từ cấu trúc lồng nhau
      const actualTokenString = response.data.token.token;
      const userDetails = response.data.token.user;

      if (actualTokenString) {
        localStorage.setItem('token', actualTokenString);
        this.setAuthHeader(actualTokenString);
      }
      localStorage.removeItem('refreshToken'); 

      // Trả về một cấu trúc phẳng cho AuthContext sử dụng (nếu muốn)
      // Hoặc AuthContext có thể tự xử lý LoginResponsePayload
      return { user: userDetails, token: actualTokenString }; 

    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Email hoặc mật khẩu không chính xác.');
    }
  },

  /**
   * Đăng ký người dùng mới.
   * Backend endpoint: POST /api/auth/register
   * Backend trả về UserDto. Hàm này sẽ trả về User type của frontend.
   */
  async register(data: RegisterData): Promise<User> { 
    try {
      // RegisterData của bạn không có username, khớp với RegisterDto backend (chỉ cần bỏ username nếu FE form có)
      const dataToSend = {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        phoneNumber: data.phoneNumber,
        address: data.address,
        dateOfBirth: data.dateOfBirth, // Đảm bảo RegisterData có dateOfBirth
      };
      const response = await axios.post<User>(`${API_URL}/auth/register`, dataToSend); // Backend trả về UserDto
      return response.data;
    } catch (error: any) {
      console.error('Register error:', error.response?.data || error.message);
      if (error.response?.data?.message?.toLowerCase().includes('email đã được sử dụng')) {
        throw new Error('Email này đã được sử dụng!');
      }
      // Xử lý các lỗi khác từ backend
      throw new Error(error.response?.data?.message || 'Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.');
    }
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
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

  /**
   * Lấy thông tin người dùng hiện tại đang đăng nhập.
   * Backend endpoint: GET /api/auth/me
   * Backend UserDto.Role cần trả về number để khớp User.role: number của bạn
   */
  async getCurrentUser(): Promise<User | null> {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    this.setAuthHeader(token); 
    
    try {
      // API /auth/me của backend cần trả về UserDto có role là number
      const response = await axios.get<User>(`${API_URL}/auth/me`);
      return response.data;
    } catch (error: any) {
      // ... (xử lý lỗi như cũ) ...
      console.error('Get current user error:', error.response?.data || error.message);
      if (error.response?.status === 401 || error.response?.status === 403) {
        this.logout();
      }
      throw new Error(error.response?.data?.message || 'Không thể lấy thông tin người dùng hoặc phiên đăng nhập hết hạn.');
    }
  },

  async forgotPassword(data: ForgotPasswordRequest): Promise<{ message: string }> {
    try {
      const response = await axios.post<{ message: string }>(`${API_URL}/auth/forgot-password`, data);
      return response.data;
    } catch (error: any) {
      console.error('Forgot password error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Không thể gửi yêu cầu khôi phục mật khẩu.');
    }
  },

  async verifyResetCode(data: VerifyResetCodeRequest): Promise<{ message: string }> {
    try {
      const response = await axios.post<{ message: string }>(`${API_URL}/auth/verify-reset-code`, data);
      return response.data;
    } catch (error: any) {
      console.error('Verify reset code error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Mã khôi phục không hợp lệ hoặc đã hết hạn.');
    }
  },
  
  async resetPassword(data: ResetPasswordRequest): Promise<{ message: string }> {
    try {
      const response = await axios.post<{ message: string }>(`${API_URL}/auth/reset-password`, data);
      return response.data;
    } catch (error: any) {
      console.error('Reset password error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Không thể đặt lại mật khẩu.');
    }
  },

  async refreshToken(): Promise<string | null> {
    console.warn('refreshToken function is not implemented in the backend yet.');
    return null;
  },
};