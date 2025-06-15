// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  AuthContextType,
  AuthState,
  LoginCredentials,
  RegisterData,
  User,
  LoginResponsePayload, // Đảm bảo type này khớp với cấu trúc backend trả về
  ForgotPasswordRequest,
  VerifyResetCodeRequest,
  ResetPasswordRequest,
} from '../types/auth'; // Đảm bảo đường dẫn đúng
import { authService } from '../services/authService'; // Đảm bảo đường dẫn đúng

const defaultAuthState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true, // Bắt đầu với isLoading = true để chờ initializeAuth
  error: null,
};

// Tạo Context với một giá trị mặc định đầy đủ hơn
export const AuthContext = createContext<AuthContextType>({
  ...defaultAuthState,
  login: async () => { throw new Error('login function not implemented in default context'); },
  register: async () => { throw new Error('register function not implemented in default context'); },
  logout: () => { throw new Error('logout function not implemented in default context'); },
  requestPasswordReset: async () => { 
    throw new Error('requestPasswordReset function not implemented in default context'); 
    // return { message: '' }; // Để tránh lỗi type, nhưng hàm thực sự sẽ ném lỗi
  },
  verifyResetCode: async () => { 
    throw new Error('verifyResetCode function not implemented in default context'); 
    // return { message: '' };
  },
  resetPassword: async () => { 
    throw new Error('resetPassword function not implemented in default context'); 
    // return { message: '' };
  },
});


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(defaultAuthState);

  useEffect(() => {
    const initAuth = async () => {
      // Không cần setState isLoading ở đây nữa vì defaultAuthState đã là true
      try {
        const token = authService.getToken();
        if (token) {
          authService.setAuthHeader(token); // Quan trọng: Set header cho axios TRƯỚC KHI gọi getCurrentUser
          const user = await authService.getCurrentUser(); // getCurrentUser trong service đã xử lý logout nếu token không hợp lệ
          
          if (user) { // Nếu getCurrentUser trả về user (token hợp lệ)
            setState({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else { 
            // Token có trong localStorage nhưng không hợp lệ (getCurrentUser trả về null hoặc ném lỗi đã được xử lý trong service bằng cách logout)
            // authService.logout() đã được gọi bên trong getCurrentUser nếu có lỗi 401/403
            setState({ ...defaultAuthState, isLoading: false }); // Đặt lại state và dừng loading
          }
        } else {
          // Không có token trong localStorage
          setState({ ...defaultAuthState, isLoading: false }); // Đặt lại state và dừng loading
        }
      } catch (error) { // Bắt lỗi từ authService.getCurrentUser nếu nó ném lỗi chưa được xử lý
        console.error('Auth initialization error in context:', error);
        authService.logout(); 
        setState({ ...defaultAuthState, isLoading: false });
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const { user, token } = await authService.login(credentials);
      
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Đăng nhập thất bại';
      setState(prev => ({
        ...defaultAuthState,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  };

  const register = async (data: RegisterData): Promise<User> => { // Hàm này trả về User
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const user = await authService.register(data); // authService.register trả về User
      setState(prev => ({ ...prev, isLoading: false }));
      // Sau khi đăng ký thành công, không tự động đăng nhập, người dùng cần đăng nhập riêng
      return user; // Trả về user để component Register có thể hiển thị thông báo thành công
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Đăng ký thất bại';
      setState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setState({ ...defaultAuthState, isLoading: false });
  };

  const requestPasswordReset = async (data: ForgotPasswordRequest) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await authService.forgotPassword(data);
      setState(prev => ({ ...prev, isLoading: false }));
      return response; // Trả về { message: string }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Lỗi gửi yêu cầu đặt lại mật khẩu.';
      setState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
      throw error;
    }
  };

  const verifyResetCode = async (data: VerifyResetCodeRequest) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await authService.verifyResetCode(data);
      setState(prev => ({ ...prev, isLoading: false }));
      return response; // Trả về { message: string }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Lỗi xác thực mã.';
      setState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
      throw error;
    }
  };

  const resetPassword = async (data: ResetPasswordRequest) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await authService.resetPassword(data);
      setState(prev => ({ ...prev, isLoading: false }));
      return response; // Trả về { message: string }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Lỗi đặt lại mật khẩu.';
      setState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        requestPasswordReset,
        verifyResetCode,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // Giá trị mặc định của context đã được cung cấp, lỗi này ít khi xảy ra
    // trừ khi useAuth được gọi bên ngoài AuthProvider một cách không đúng.
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};