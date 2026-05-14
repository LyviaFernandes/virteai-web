import { ApiError } from '@/types';

/**
 * Extract error message from various error formats
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error && typeof error === 'object') {
    const err = error as any;
    return err.message || err.error || JSON.stringify(error);
  }

  return 'An unexpected error occurred';
};

/**
 * Check if error is an API error
 */
export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    'status' in error
  );
};

/**
 * Handle API errors with appropriate user messages
 */
export const handleApiError = (error: unknown): string => {
  if (isApiError(error)) {
    switch (error.status) {
      case 400:
        return 'Invalid request. Please check your input.';
      case 401:
        return 'Session expired. Please log in again.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 409:
        return 'This resource already exists.';
      case 422:
        return 'Validation error. Please check your input.';
      case 500:
        return 'Server error. Please try again later.';
      case 503:
        return 'Service unavailable. Please try again later.';
      default:
        return error.message || 'An error occurred. Please try again.';
    }
  }

  return getErrorMessage(error);
};

/**
 * Parse validation errors from API response
 */
export const parseValidationErrors = (
  error: unknown
): Record<string, string> => {
  if (!isApiError(error)) {
    return {};
  }

  const data = error.data;
  if (data?.errors && typeof data.errors === 'object') {
    return data.errors;
  }

  if (data?.field && data?.message) {
    return {
      [data.field]: data.message,
    };
  }

  return {};
};
