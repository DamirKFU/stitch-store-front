/**
 * API Types based on Swagger documentation
 */

export interface APIError {
  message: string;
  fields?: Record<string, string>;
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: APIError;
}

// Auth Types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  repeat_password: string;
}

export interface RegisterConfirmRequest {
  token: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  repeat_password: string;
}

export interface LoginResponse {
  csrf_token?: string;
  [key: string]: any;
}

// Catalog Types
export interface Category {
  id: number;
  name: string;
}

export interface Color {
  id: number;
  name: string;
  color: string;
}

export interface Garment {
  id: number;
  image: string;
  size: string;
  count: number;
  category: Category;
  color: Color;
}
