/**
 * Authentication Context
 * Manages user authentication state across the application
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/auth.service';
import { apiService } from '@/services/api.service';
import { LoginRequest, RegisterRequest } from '@/types/api.types';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check if user is already authenticated on mount
  useEffect(() => {
    const csrfToken = localStorage.getItem('csrf_token');
    if (csrfToken) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginRequest) => {
    try {
      const response = await authService.login(credentials);
      
      if (response.success) {
        setIsAuthenticated(true);
        toast({
          title: 'Успешный вход',
          description: 'Добро пожаловать!',
        });
      } else {
        throw new Error(response.error?.message || 'Ошибка входа');
      }
    } catch (error: any) {
      toast({
        title: 'Ошибка входа',
        description: error.message || 'Неверные учетные данные',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      const response = await authService.register(data);
      
      if (response.success) {
        toast({
          title: 'Регистрация успешна',
          description: 'Проверьте email для подтверждения регистрации',
        });
      } else {
        throw new Error(response.error?.message || 'Ошибка регистрации');
      }
    } catch (error: any) {
      toast({
        title: 'Ошибка регистрации',
        description: error.message || 'Не удалось зарегистрироваться',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      toast({
        title: 'Вы вышли',
        description: 'До скорой встречи!',
      });
    } catch (error) {
      // Even if logout fails, clear local state
      apiService.removeCsrfToken();
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
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
