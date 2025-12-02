/**
 * Authentication Context
 * Manages user authentication state across the application
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/auth.service';
import { apiService } from '@/services/api.service';
import { LoginRequest, RegisterRequest } from '@/types/api.types';
import { handleApiResponse, handleHttpError } from '@/utils/error-handler';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<Record<string, string> | null>;
  register: (data: RegisterRequest) => Promise<Record<string, string> | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const csrfToken = localStorage.getItem('csrf_token');
    if (csrfToken) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginRequest): Promise<Record<string, string> | null> => {
    try {
      const response = await authService.login(credentials);
      
      if (response.success) {
        setIsAuthenticated(true);
        return null;
      } else {
        // Return field errors for form display, handleApiResponse shows toast for general errors
        return handleApiResponse(response);
      }
    } catch (error: any) {
      handleHttpError(error, 'Ошибка при входе в систему');
      throw error;
    }
  };

  const register = async (data: RegisterRequest): Promise<Record<string, string> | null> => {
    try {
      const response = await authService.register(data);
      
      if (response.success) {
        return null;
      } else {
        // Return field errors for form display, handleApiResponse shows toast for general errors
        return handleApiResponse(response);
      }
    } catch (error: any) {
      handleHttpError(error, 'Ошибка при регистрации');
      throw error;
    }
  };

  const logout = async () => {
    try {
      const response = await authService.logout();
      setIsAuthenticated(false);
      handleApiResponse(response, true, 'До скорой встречи!');
    } catch (error) {
      // Even if logout fails, clear local state
      apiService.removeCsrfToken();
      setIsAuthenticated(false);
      handleHttpError(error);
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
