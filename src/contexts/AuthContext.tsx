import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType, AuthState, LoginCredentials, RegisterData, User } from '../types/auth';
import { authService } from '../services/authService';

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
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
        });
      } else {
        setState({ ...initialState, isLoading: false });
      }
    } catch (error) {
      setState({ ...initialState, isLoading: false });
    }
  };

  const login = async (credentials: LoginCredentials) => {
    const { token, user } = await authService.login(credentials);
    localStorage.setItem('token', token);
    setState({
      user,
      token,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const register = async (data: RegisterData) => {
    const { token, user } = await authService.register(data);
    localStorage.setItem('token', token);
    setState({
      user,
      token,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
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
