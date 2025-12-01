/**
 * API Service
 * Handles all HTTP requests with CSRF token management and error handling
 */

import config from '@/config/app.config';
import { APIResponse } from '@/types/api.types';

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = config.apiBaseUrl;
  }

  /**
   * Get CSRF token from localStorage
   */
  private getCsrfToken(): string | null {
    return localStorage.getItem(config.csrf.tokenKey);
  }

  /**
   * Save CSRF token to localStorage
   */
  saveCsrfToken(token: string): void {
    localStorage.setItem(config.csrf.tokenKey, token);
  }

  /**
   * Remove CSRF token from localStorage
   */
  removeCsrfToken(): void {
    localStorage.removeItem(config.csrf.tokenKey);
  }

  /**
   * Build headers with CSRF token
   */
  private buildHeaders(includeAuth: boolean = true): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const csrfToken = this.getCsrfToken();
      if (csrfToken) {
        headers[config.csrf.headerName] = csrfToken;
      }
    }

    return headers;
  }

  /**
   * Handle API errors
   */
  private async handleResponse<T>(response: Response): Promise<APIResponse<T>> {
    const data: APIResponse<T> = await response.json();

    // Handle 401 - Unauthorized
    if (response.status === 401) {
      this.removeCsrfToken();
      window.location.href = '/auth';
      throw new Error('Unauthorized');
    }

    // Handle 403 - CSRF errors
    if (response.status === 403 && data.error) {
      const csrfErrors = [
        'CSRF token missing in Headers',
        'CSRF token missing in Cookie',
        'CSRF token mismatch',
      ];

      if (csrfErrors.some(err => data.error?.message.startsWith(err))) {
        this.removeCsrfToken();
        window.location.href = '/auth';
        throw new Error('CSRF validation failed');
      }
    }

    return data;
  }

  /**
   * Make GET request
   */
  async get<T>(endpoint: string, includeAuth: boolean = true): Promise<APIResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: this.buildHeaders(includeAuth),
        credentials: 'include',
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('GET request error:', error);
      throw error;
    }
  }

  /**
   * Make POST request
   */
  async post<T>(
    endpoint: string,
    body?: any,
    includeAuth: boolean = true
  ): Promise<APIResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: this.buildHeaders(includeAuth),
        body: body ? JSON.stringify(body) : undefined,
        credentials: 'include',
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('POST request error:', error);
      throw error;
    }
  }

  /**
   * Make PUT request
   */
  async put<T>(
    endpoint: string,
    body?: any,
    includeAuth: boolean = true
  ): Promise<APIResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: this.buildHeaders(includeAuth),
        body: body ? JSON.stringify(body) : undefined,
        credentials: 'include',
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('PUT request error:', error);
      throw error;
    }
  }

  /**
   * Make DELETE request
   */
  async delete<T>(endpoint: string, includeAuth: boolean = true): Promise<APIResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'DELETE',
        headers: this.buildHeaders(includeAuth),
        credentials: 'include',
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('DELETE request error:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
