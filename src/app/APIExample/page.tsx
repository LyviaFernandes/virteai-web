'use client';

import { useAuth } from '@/lib';
import { usePatient } from '@/lib';
import { useEffect, useState } from 'react';
import { handleApiError } from '@/utils/apiErrors';

/**
 * Example component showing how to use the API integration
 * This demonstrates:
 * - Authentication with useAuth hook
 * - Fetching patient data with usePatient hook
 * - Error handling
 * - Loading states
 */
export default function APIIntegrationExample() {
  const { user, isAuthenticated, login, logout, isLoading: authLoading } = useAuth();
  const { data, loading, error, getMyProfile, updateMyProfile } = usePatient();
  const [formError, setFormError] = useState<string | null>(null);

  // Load profile when authenticated
  useEffect(() => {
    if (isAuthenticated && user?.role === 'PATIENT') {
      getMyProfile();
    }
  }, [isAuthenticated, user, getMyProfile]);

  const handleLogin = async () => {
    try {
      await login({
        email: 'patient@example.com',
        password: 'password123',
      });
    } catch (error) {
      setFormError(handleApiError(error));
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setFormError(null);
      await updateMyProfile({
        city: 'São Paulo',
        birthDate: '1990-01-15',
      });
      alert('Profile updated successfully!');
    } catch (error) {
      setFormError(handleApiError(error));
    }
  };

  if (authLoading) {
    return <div className="p-4">Loading authentication...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Not Authenticated</h1>
        <p className="mb-4">Please log in to see this example.</p>
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login Example
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">API Integration Example</h1>

      {/* User Info */}
      <div className="bg-gray-100 p-4 rounded mb-4">
        <h2 className="font-bold mb-2">Authenticated User</h2>
        <p>Email: {user?.email}</p>
        <p>Role: {user?.role}</p>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded mt-2"
        >
          Logout
        </button>
      </div>

      {/* Patient Profile */}
      {user?.role === 'PATIENT' && (
        <div className="bg-gray-50 p-4 rounded">
          <h2 className="font-bold mb-4">Patient Profile</h2>

          {formError && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {formError}
            </div>
          )}

          {loading ? (
            <p>Loading profile...</p>
          ) : error ? (
            <div className="bg-red-100 text-red-700 p-3 rounded">
              Error: {error.message}
            </div>
          ) : data ? (
            <div className="space-y-2 mb-4">
              <p>
                <strong>Name:</strong> {data.name}
              </p>
              <p>
                <strong>Email:</strong> {data.email}
              </p>
              <p>
                <strong>City:</strong> {data.city}
              </p>
              <p>
                <strong>Birth Date:</strong>{' '}
                {new Date(data.birthDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Care Status:</strong> {data.careStatus}
              </p>
            </div>
          ) : null}

          <button
            onClick={handleUpdateProfile}
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
      )}

      {/* Integration Notes */}
      <div className="mt-8 bg-blue-50 p-4 rounded text-sm">
        <h3 className="font-bold mb-2">API Integration Features:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>✅ JWT Token Authentication</li>
          <li>✅ Automatic Token Management</li>
          <li>✅ React Hooks for Data Fetching</li>
          <li>✅ Global Auth Context</li>
          <li>✅ Error Handling Utilities</li>
          <li>✅ Full TypeScript Support</li>
          <li>✅ Protected Routes Component</li>
        </ul>
      </div>
    </div>
  );
}
