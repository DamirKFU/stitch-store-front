/**
 * Error Handler Utility
 * Handles API errors and displays appropriate toast messages
 */

import { toast } from '@/hooks/use-toast';
import { APIResponse } from '@/types/api.types';

/**
 * Handle API errors and show appropriate toast messages
 * @param response API response
 * @param showSuccessToast Whether to show success toast (default: false)
 * @param successMessage Custom success message
 * @returns Field errors if any
 */
export function handleApiResponse<T>(
  response: APIResponse<T>,
  showSuccessToast: boolean = false,
  successMessage?: string
): Record<string, string> | null {
  if (response.success) {
    if (showSuccessToast) {
      toast({
        title: 'Успешно',
        description: successMessage || 'Операция выполнена успешно',
      });
    }
    return null;
  }

  // Handle field-specific errors
  if (response.error?.fields && Object.keys(response.error.fields).length > 0) {
    return response.error.fields;
  }

  // Return general error for form display (using _general key)
  if (response.error?.message) {
    return { _general: response.error.message };
  }

  // Return generic error
  return { _general: 'Произошла ошибка' };
}

/**
 * Handle HTTP errors (500, network errors, etc.)
 * @param error Error object
 * @param customMessage Custom error message
 */
export function handleHttpError(error: any, customMessage?: string): void {
  console.error('HTTP Error:', error);
  
  // Check if it's a 500 error or network error
  const is500Error = error?.status === 500 || error?.message?.includes('500');
  
  toast({
    title: 'Ошибка',
    description: is500Error 
      ? 'Ошибка сервера, попробуйте позже'
      : customMessage || 'Произошла ошибка при выполнении запроса',
    variant: 'destructive',
  });
}
