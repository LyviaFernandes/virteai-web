import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  User,
} from '@/types';
import { apiClient } from './api';

const parseJwt = (token: string): { userId: number; email: string; role: User['role'] } | null => {
  if (!token) return null;
  try {
    const base64Payload = token.split('.')[1];
    const payload = base64Payload.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = decodeURIComponent(
      Array.prototype.map
        .call(window.atob(payload), (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Failed to parse JWT token', error);
    return null;
  }
};

const getUserFromResponse = (response: LoginResponse | RegisterResponse): User | null => {
  if (response.user) {
    return {
      userId: response.user.userId,
      email: response.user.email,
      role: response.user.role,
    };
  }

  if (response.token) {
    const payload = parseJwt(response.token);
    if (payload) {
      return {
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
      };
    }
  }

  return null;
};

export const authService = {
  /**
   * Register a new user
   */
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await apiClient.post<RegisterResponse>(
      '/auth/register',
      data,
      { skipAuth: true }
    );

    const user = getUserFromResponse(response);

    if (typeof window !== 'undefined') {
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
    }

    return response;
  },

  /**
   * Login user and store token
   */
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      '/auth/login',
      data,
      { skipAuth: true }
    );

    const user = getUserFromResponse(response);

    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', response.token);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
    }

    return response;
  },

  /**
   * Request password reset
   */
  async forgotPassword(data: ForgotPasswordRequest): Promise<{ message: string }> {
    return apiClient.post(
      '/auth/forgot-password',
      data,
      { skipAuth: true }
    );
  },

  /**
   * Reset password with token
   */
  async resetPassword(data: ResetPasswordRequest): Promise<{ message: string }> {
    return apiClient.post(
      '/auth/reset-password',
      data,
      { skipAuth: true }
    );
  },

  /**
   * Get current user from local storage
   */
  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Get auth token
   */
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('authToken');
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('authToken');
  },

  /**
   * Logout user
   */
  logout(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },
};
