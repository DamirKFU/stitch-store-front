/**
 * Application Configuration
 * Centralized configuration for backend endpoints and app settings
 */

interface AppConfig {
  apiBaseUrl: string;
  apiVersion: string;
  endpoints: {
    auth: {
      login: string;
      register: string;
      registerConfirm: string;
      logout: string;
      refresh: string;
      forgot: string;
      reset: string;
    };
    catalog: {
      garments: string;
      categories: string;
      colors: string;
    };
  };
  csrf: {
    tokenKey: string;
    headerName: string;
  };
}

const config: AppConfig = {
  // Backend base URL - change this to your backend URL
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  
  apiVersion: 'v1',
  
  endpoints: {
    auth: {
      login: '/api/v1/auth/login/',
      register: '/api/v1/auth/register/',
      registerConfirm: '/api/v1/auth/register-confirm/',
      logout: '/api/v1/auth/logout/',
      refresh: '/api/v1/auth/refresh/',
      forgot: '/api/v1/auth/forgot/',
      reset: '/api/v1/auth/reset/',
    },
    catalog: {
      garments: '/api/v1/catalog/garments/',
      categories: '/api/v1/catalog/categories/',
      colors: '/api/v1/catalog/colors/',
    },
  },
  
  csrf: {
    tokenKey: 'csrf_token',
    headerName: 'X-CSRF-TOKEN',
  },
};

export default config;
