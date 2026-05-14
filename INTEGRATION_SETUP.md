# VirTEAI Frontend - Backend Integration Setup Complete ✅

This document summarizes the complete backend-frontend integration that has been set up for the VirTEAI application.

## What Was Implemented

### 1. **Core API Client** (`src/services/api.ts`)
- Centralized HTTP client using native Fetch API
- Automatic JWT token management (retrieval, sending, refresh)
- Error handling with appropriate status code responses
- Automatic redirect to login on 401 (unauthorized)
- Support for custom headers and request options

### 2. **Service Layer** (8 services in `src/services/`)
Each service provides domain-specific API methods:

| Service | Purpose |
|---------|---------|
| `authService.ts` | Authentication (login, register, password reset) |
| `patientService.ts` | Patient profile management |
| `therapistService.ts` | Therapist profile management |
| `consultationService.ts` | Consultation CRUD operations |
| `objectiveService.ts` | Therapeutic objectives management |
| `reportService.ts` | Clinical reports management |
| `scenarioService.ts` | Therapeutic scenarios management |
| `testService.ts` | Patient assessments (10 & 50 question tests) |
| `sessionService.ts` | Session management for Unity app |

### 3. **React Hooks** (9 hooks in `src/hooks/`)
Custom hooks for each module with built-in state management:
- `useAuth()` - Authentication context hook
- `usePatient()` - Patient data management
- `useTherapist()` - Therapist data management
- `useConsultation()` - Consultation CRUD
- `useObjective()` - Objective management
- `useReport()` - Report management
- `useScenario()` - Scenario management
- `useTest()` - Test operations
- `useSession()` - Session management

**Each hook includes:**
- Loading state
- Error state
- Data state
- All relevant API methods
- Automatic state updates

### 4. **Authentication Context** (`src/context/AuthContext.tsx`)
Global authentication state management using React Context:
- `useAuth()` hook for any component
- User login/logout
- Session persistence
- Error handling
- Loading states

**Provides:**
```typescript
{
  user: User | null;                    // Current user with role
  isAuthenticated: boolean;              // Auth status
  isLoading: boolean;                    // Loading state
  error: string | null;                  // Error messages
  login: (credentials) => Promise<void>;
  register: (data) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}
```

### 5. **TypeScript Types** (`src/types/index.ts`)
Complete type definitions for all API operations:
- User & Auth types
- Patient & Therapist profiles
- Consultation, Objective, Report types
- Scenario & Test types
- Session types
- Error types
- Request/Response interfaces

### 6. **Utility Functions** (`src/utils/apiErrors.ts`)
Error handling utilities:
- `getErrorMessage()` - Extract error message
- `isApiError()` - Type guard for API errors
- `handleApiError()` - User-friendly error messages
- `parseValidationErrors()` - Parse validation responses

### 7. **Protected Routes** (`src/components/ProtectedRoute.tsx`)
Wrapper component for route protection:
```tsx
<ProtectedRoute requiredRoles={['THERAPIST', 'ADMIN']}>
  <AdminPanel />
</ProtectedRoute>
```

### 8. **Configuration** (`.env.local`)
Environment variables for API URL:
```env
NEXT_PUBLIC_API_URL=https://virteai-backend-tcc.onrender.com
```

### 9. **Documentation**
- `API_INTEGRATION_GUIDE.md` - Complete usage guide with examples
- `src/app/APIExample/page.tsx` - Working example component

### 10. **Central Exports** (`src/lib/index.ts`)
All services, hooks, and types can be imported from single location:
```tsx
import { useAuth, usePatient, authService } from '@/lib';
```

## Project Structure

```
src/
├── services/
│   ├── api.ts                          # Core HTTP client
│   ├── authService.ts
│   ├── patientService.ts
│   ├── therapistService.ts
│   ├── consultationService.ts
│   ├── objectiveService.ts
│   ├── reportService.ts
│   ├── scenarioService.ts
│   ├── testService.ts
│   └── sessionService.ts
├── context/
│   └── AuthContext.tsx                 # Global auth state
├── hooks/
│   ├── usePatient.ts
│   ├── useTherapist.ts
│   ├── useConsultation.ts
│   ├── useObjective.ts
│   ├── useReport.ts
│   ├── useScenario.ts
│   ├── useTest.ts
│   └── useSession.ts
├── components/
│   └── ProtectedRoute.tsx              # Route protection
├── types/
│   └── index.ts                        # TypeScript interfaces
├── utils/
│   └── apiErrors.ts                    # Error handling
├── lib/
│   └── index.ts                        # Central exports
├── app/
│   ├── layout.tsx                      # Updated with AuthProvider
│   ├── APIExample/
│   │   └── page.tsx                    # Example usage
│   └── ... (other pages)
├── .env.local                          # API configuration
└── API_INTEGRATION_GUIDE.md            # Complete guide
```

## Key Features

### ✅ JWT Authentication
- Automatic token extraction from login response
- Token stored in localStorage
- Automatically sent with every request in `Authorization` header
- Automatic refresh on 401 response
- Automatic redirect to login on auth failure

### ✅ User Roles
- `PATIENT` - Can access own data, take tests
- `THERAPIST` - Can manage patients and create records
- `ADMIN` - Full access to all data
- Role-based access control with `ProtectedRoute` component

### ✅ Full TypeScript Support
- Complete type definitions for all API operations
- Type-safe service methods
- Type-safe hooks and context
- Intellisense and autocomplete support

### ✅ State Management
- React Context for global authentication state
- Custom hooks for local state management
- Automatic state updates after API calls
- Error and loading states included

### ✅ Error Handling
- Structured error objects with status codes
- User-friendly error messages
- Validation error parsing
- Automatic 401 redirect

### ✅ Developer Experience
- Simple import paths: `import { useAuth } from '@/lib'`
- Clear method names and documentation
- JSDoc comments for all functions
- Example component showing usage

## Quick Start

### 1. Check Configuration
```bash
# Verify .env.local has API URL
cat .env.local
```

### 2. Use in Components
```tsx
'use client';

import { useAuth, usePatient } from '@/lib';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { data, getMyProfile } = usePatient();

  // Component code...
}
```

### 3. Example: Login Flow
```tsx
import { useAuth } from '@/lib';

export default function LoginPage() {
  const { login, error } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login({ email, password });
      // User is now authenticated
      // Token is in localStorage
      // Can access user context via useAuth()
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  // Form component...
}
```

### 4. Example: Patient Data
```tsx
import { usePatient } from '@/lib';
import { useEffect } from 'react';

export default function PatientProfile() {
  const { data, loading, error, getMyProfile } = usePatient();

  useEffect(() => {
    getMyProfile();
  }, [getMyProfile]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{data?.name}</div>;
}
```

## API Endpoints Mapped

All routes from `routes.json` are fully integrated:

✅ Auth: `/auth/register`, `/auth/login`, `/auth/forgot-password`, `/auth/reset-password`
✅ Patients: `/patients/me`, `/patients/list`, `/patients/:id`, `/patients/care-status`, `/patients/update`
✅ Therapists: `/therapists/me`, `/therapists/list`, `/therapists/patients`, `/therapists/:id`, `/therapists/update`
✅ Consultations: `/consultations/create`, `/consultations/list`, `/consultations/:id`, `/consultations/update/:id`, `/consultations/delete/:id`
✅ Objectives: `/objectives/create`, `/objectives/list`, `/objectives/:id`, `/objectives/update/:id`, `/objectives/delete/:id`
✅ Reports: `/reports/create`, `/reports/list`, `/reports/:id`, `/reports/update/:id`, `/reports/delete/:id`
✅ Scenarios: `/scenarios/create`, `/scenarios/list`, `/scenarios/:id`, `/scenarios/update/:id`, `/scenarios/delete/:id`
✅ Tests: `/tests/get-test-10`, `/tests/get-test-50`, `/tests/submit-test-10`, `/tests/submit-test-50`
✅ Sessions: `/sessions/:id`, `/sessions/generate`, `/sessions/attach`

## Testing the Integration

1. **Visit example page**: `/APIExample` to see a working example
2. **Check authentication**: Verify token in browser localStorage after login
3. **Test API calls**: Use hooks in any component
4. **Check Network tab**: Verify `Authorization` header in requests

## Next Steps

1. **Update Login Component**: Use `useAuth().login()` instead of direct API calls
2. **Update Patient Pages**: Use `usePatient()` for profile management
3. **Update Therapist Dashboard**: Use `useTherapist()` and `useConsultation()`
4. **Protect Routes**: Wrap components with `<ProtectedRoute>`
5. **Add Error Messages**: Use `handleApiError()` for user feedback

## Troubleshooting

### 401 Unauthorized Errors
- Check if token is being sent (look in Network tab > request headers)
- Verify `.env.local` has correct API URL
- Token may have expired - logout and login again

### CORS Errors
- Ensure backend has CORS enabled
- Check `Access-Control-Allow-Origin` header in responses
- Verify API URL in `.env.local`

### Type Errors
- Import types from `@/lib` or `@/types`
- Check TypeScript version in `package.json`
- Restart TypeScript server in IDE

### Token Not Persisting
- Check if localStorage is enabled
- Verify browser isn't in private/incognito mode
- Check for localStorage quota exceeded

## Documentation Files

- **API_INTEGRATION_GUIDE.md** - Complete usage guide with examples for each service
- **src/app/APIExample/page.tsx** - Working example component
- **src/types/index.ts** - All TypeScript type definitions
- **src/services/** - Service implementations with JSDoc comments

## Support

For detailed examples and usage patterns, see:
1. `API_INTEGRATION_GUIDE.md` - Full guide with code examples
2. `src/app/APIExample/page.tsx` - Working implementation
3. Service files - Well-commented with JSDoc

All code is production-ready and fully typed with TypeScript.
