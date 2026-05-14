'use client';

import { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: UserRole[];
  fallback?: ReactNode;
}

/**
 * Component to protect routes based on authentication and user role
 *
 * @example
 * // Require any authenticated user
 * <ProtectedRoute>
 *   <Dashboard />
 * </ProtectedRoute>
 *
 * @example
 * // Require specific roles
 * <ProtectedRoute requiredRoles={['THERAPIST', 'ADMIN']}>
 *   <TherapistDashboard />
 * </ProtectedRoute>
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles,
  fallback,
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return fallback ?? <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return fallback ?? <div>Please log in to access this page</div>;
  }

  if (requiredRoles && user && !requiredRoles.includes(user.role)) {
    return fallback ?? <div>You don't have permission to access this page</div>;
  }

  return <>{children}</>;
};
