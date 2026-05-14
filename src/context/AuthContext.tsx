'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { User, LoginRequest, RegisterRequest } from '@/types';
import { authService } from '@/services/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Initialize auth state on mount and redirect if authenticated
  useEffect(() => {
    const initializeAuth = () => {
      const currentUser = authService.getCurrentUser();
      const token = authService.getToken();

      if (currentUser && token) {
        setUser(currentUser);
        // Redirect to Home if user is authenticated and on a pre-login page
        const currentPath = window.location.pathname;
        const preLoginPaths = ['/Login', '/Patient/SingUpPatient', '/Therapist/SingUpTherapist', '/Profile'];
        if (preLoginPaths.includes(currentPath)) {
          router.push('/Home');
        }
      } else {
        // Clear invalid state
        authService.logout();
        setUser(null);
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, [router]);

  // Monitor localStorage changes (e.g., token deletion)
  useEffect(() => {
    const handleStorageChange = () => {
      const token = authService.getToken();

      console.log('Token:', token);
      
      if (!token) {
        // Token was removed, clear user and redirect to login
        setUser(null);
        router.push('/Login');
      } else {
        // Token still exists, update user if needed
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }
      }
    };

    // Listen for storage changes from other tabs
    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically in case token is deleted in the same tab
    const interval = setInterval(() => {
      const token = authService.getToken();
      if (!token && user) {
        setUser(null);
        router.push('/Login');
      }
    }, 1000); // Check every second

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [router, user]);

  const login = useCallback(async (data: LoginRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      await authService.login(data);
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        router.push('/Home');
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const register = useCallback(async (data: RegisterRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authService.register(data);
      if (response.token) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('authToken', response.token);
        }
      }
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        router.push('/Home');
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Registration failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setError(null);
    router.push('/Login');
  }, [router]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
