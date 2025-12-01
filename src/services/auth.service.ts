/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import { apiService } from './api.service';
import config from '@/config/app.config';
import {
  LoginRequest,
  RegisterRequest,
  RegisterConfirmRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  LoginResponse,
} from '@/types/api.types';

export const authService = {
  /**
   * Login user
   */
  async login(credentials: LoginRequest) {
    const response = await apiService.post<LoginResponse>(
      config.endpoints.auth.login,
      credentials,
      false // Don't include auth for login
    );

    // Save CSRF token if present
    if (response.success && response.data?.csrf_token) {
      apiService.saveCsrfToken(response.data.csrf_token);
    }

    return response;
  },

  /**
   * Register user
   */
  async register(data: RegisterRequest) {
    return apiService.post(config.endpoints.auth.register, data, false);
  },

  /**
   * Confirm registration
   */
  async confirmRegistration(data: RegisterConfirmRequest) {
    return apiService.post(config.endpoints.auth.registerConfirm, data, false);
  },

  /**
   * Logout user
   */
  async logout() {
    const response = await apiService.post(config.endpoints.auth.logout);
    apiService.removeCsrfToken();
    return response;
  },

  /**
   * Refresh tokens
   */
  async refresh() {
    const response = await apiService.post<LoginResponse>(config.endpoints.auth.refresh);
    
    // Update CSRF token if present
    if (response.success && response.data?.csrf_token) {
      apiService.saveCsrfToken(response.data.csrf_token);
    }
    
    return response;
  },

  /**
   * Request password reset
   */
  async forgotPassword(data: ForgotPasswordRequest) {
    return apiService.post(config.endpoints.auth.forgot, data, false);
  },

  /**
   * Reset password
   */
  async resetPassword(data: ResetPasswordRequest) {
    return apiService.post(config.endpoints.auth.reset, data, false);
  },
};
