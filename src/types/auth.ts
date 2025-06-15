// src/types/auth.ts

export enum UserRole {
  Customer = 'Customer', // Giả sử backend trả về string, nếu là số thì là 0
  Admin = 'Admin',     // Giả sử backend trả về string, nếu là số thì là 1
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  role: number;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
}

export interface LoginResponsePayload {
  token: string;
  user: User;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyResetCodeRequest {
  email: string;
  code: string;
}

export interface ResetPasswordRequest {
  email: string;
  code: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<User>;
  logout: () => void;
  requestPasswordReset: (data: ForgotPasswordRequest) => Promise<{ message: string }>;
  verifyResetCode: (data: VerifyResetCodeRequest) => Promise<{ message: string }>;
  resetPassword: (data: ResetPasswordRequest) => Promise<{ message: string }>;
}