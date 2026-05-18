'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { User, LoginRequest, RegisterRequest } from '@/types';
import { authService } from '@/services/authService';
import { ROUTES } from '@/lib/routes';

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
        const preLoginPaths = [
          ROUTES.login,
          ROUTES.patientSignup,
          ROUTES.therapistSignup,
          ROUTES.profile,
        ];
        if (preLoginPaths.includes(currentPath)) {
          router.push(ROUTES.home);
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

  // Monitor localStorage changes and redirect if token is deleted
  useEffect(() => {
    if (isLoading) return; // Don't check while loading

    const checkAuth = () => {
      const token = authService.getToken();
      
      // If no token but user is set, redirect to login
      if (!token && user) {
        console.log('Token deleted, redirecting to login');
        setUser(null);
        router.push(ROUTES.login);
      }
    };

    // Listen for storage changes from other tabs
    window.addEventListener('storage', checkAuth);
    
    // Listen for window focus (user comes back to tab)
    window.addEventListener('focus', checkAuth);
    
    // Check every 300ms for same-tab token deletion
    const interval = setInterval(checkAuth, 300);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('focus', checkAuth);
      clearInterval(interval);
    };
  }, [router, user, isLoading]);

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
      await authService.register(data);
      // Per designer flow: SignUp -> Login. Don't auto-login the user after register.
      authService.logout();
      setUser(null);
      router.push('/Login');
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
    router.push('/Home');
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
