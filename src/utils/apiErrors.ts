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
  // Prefer the message provided by the API (e.g. { error: "..." } or { message: "..." }).
  // Fall back to generic extraction for non-API errors.
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
