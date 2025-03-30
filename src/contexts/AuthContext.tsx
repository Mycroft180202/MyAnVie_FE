import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType, AuthState, LoginCredentials, RegisterData, User } from '../types/auth';
import { authService } from '../services/authService';

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const user = await authService.getCurrentUser();
        setState({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        setState({ ...initialState, isLoading: false });
      }
    } catch (error) {
      setState({ ...initialState, isLoading: false });
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      const { token, user } = await authService.login(credentials);
      console.log('Login successful:', { token, user });
      localStorage.setItem('token', token);
      console.log('Token saved in context:', localStorage.getItem('token'));
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Login error in context:', error);
      setState({
        ...initialState,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Đăng nhập thất bại',
      });
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    const { token, user } = await authService.register(data);
    localStorage.setItem('token', token);
    setState({
      user,
      token,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });
  };

  const logout = async () => {
    localStorage.removeItem('token');
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        setUser: (user) => setState(prev => ({ ...prev, user })),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
