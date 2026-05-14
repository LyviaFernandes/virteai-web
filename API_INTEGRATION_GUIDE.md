# VirTEAI Frontend API Integration Guide

This document explains how to use the backend API integration in the VirTEAI frontend.

## Overview

The frontend is fully integrated with the backend API using:
- **API Client**: Centralized fetch-based HTTP client with automatic token management
- **Services**: Domain-specific services for each API module (auth, patients, therapists, etc.)
- **Hooks**: React hooks for easy state management and data fetching
- **Context**: AuthContext for global authentication state

## Configuration

The API URL is configured in `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://virteai-backend-tcc.onrender.com
```

For local development, change to:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Authentication

### Using useAuth Hook

```tsx
'use client';

import { useAuth } from '@/lib';

export default function MyComponent() {
  const { user, isAuthenticated, login, logout, error } = useAuth();

  const handleLogin = async () => {
    try {
      await login({
        email: 'user@example.com',
        password: 'password123',
      });
      // Login successful, user state updated automatically
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  if (!isAuthenticated) {
    return <button onClick={handleLogin}>Login</button>;
  }

  return (
    <div>
      <p>Welcome, {user?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Auth Token Storage

The token is automatically:
1. Stored in `localStorage` after successful login
2. Sent with every API request in the `Authorization: Bearer <token>` header
3. Cleared on logout or 401 response

### User Information

User data is stored in `localStorage` and includes:
- `userId`: numeric ID (decoded from JWT)
- `email`: user email
- `role`: 'PATIENT', 'THERAPIST', or 'ADMIN'

Access current user:
```tsx
import { authService } from '@/lib';

const user = authService.getCurrentUser();
console.log(user?.role); // 'PATIENT' | 'THERAPIST' | 'ADMIN'
```

## Services

### Auth Service

```tsx
import { authService } from '@/lib';

// Register
await authService.register({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'secure123',
  role: 'PATIENT',
  city: 'São Paulo',
  birthDate: '1990-01-15',
});

// Login
const response = await authService.login({
  email: 'john@example.com',
  password: 'secure123',
});

// Forgot password
await authService.forgotPassword({
  email: 'john@example.com',
});

// Reset password
await authService.resetPassword({
  token: 'reset-token',
  password: 'newPassword123',
});

// Logout
authService.logout();

// Check authentication
if (authService.isAuthenticated()) {
  console.log('User is logged in');
}
```

### Patient Service

```tsx
import { patientService } from '@/lib';

// Get own profile
const profile = await patientService.getMyProfile();

// Get patient by ID (therapist/admin only)
const patient = await patientService.getPatientById(1);

// List all patients
const patients = await patientService.listPatients();

// Update care status
await patientService.updateCareStatus('IN_PROGRESS');

// Update own profile
await patientService.updateMyProfile({
  city: 'Rio de Janeiro',
  birthDate: '1990-01-15',
});
```

### Therapist Service

```tsx
import { therapistService } from '@/lib';

// Get own profile
const profile = await therapistService.getMyProfile();

// Get therapist by ID
const therapist = await therapistService.getTherapistById(5);

// List all therapists
const therapists = await therapistService.listTherapists();

// Get my patients
const patients = await therapistService.getMyPatients();

// Update own profile
await therapistService.updateMyProfile({
  specialty: 'Speech Therapy',
  experience: '5 years',
  attendanceModality: 'ONLINE',
});
```

### Consultation Service

```tsx
import { consultationService } from '@/lib';

// Create consultation
const consultation = await consultationService.createConsultation({
  patientId: 1,
  therapistId: 5,
  consultationDate: new Date().toISOString(),
  objective: 'Discuss progress',
  score: 85,
});

// List consultations
const consultations = await consultationService.listConsultations();

// Get specific consultation
const consultation = await consultationService.getConsultationById(10);

// Update consultation
await consultationService.updateConsultation(10, {
  score: 90,
  objective: 'Updated objective',
});

// Delete consultation
await consultationService.deleteConsultation(10);
```

### Objective Service

```tsx
import { objectiveService } from '@/lib';

// Create objective
const objective = await objectiveService.createObjective({
  patientId: 1,
  title: 'Improve communication skills',
});

// List objectives
const objectives = await objectiveService.listObjectives();

// Get objective by ID
const objective = await objectiveService.getObjectiveById(3);

// Update objective
await objectiveService.updateObjective(3, {
  title: 'Updated objective title',
});

// Delete objective
await objectiveService.deleteObjective(3);
```

### Report Service

```tsx
import { reportService } from '@/lib';

// Create report
const report = await reportService.createReport({
  patientId: 1,
  sessionObjective: 'Practice social skills',
  title: 'Session Report',
  evolution: 'IMPROVED',
  content: 'Patient showed great progress...',
});

// List reports
const reports = await reportService.listReports();

// Get report by ID
const report = await reportService.getReportById(2);

// Update report
await reportService.updateReport(2, {
  evolution: 'MAINTAINED',
  content: 'Updated content',
});

// Delete report
await reportService.deleteReport(2);
```

### Scenario Service

```tsx
import { scenarioService } from '@/lib';

// Create scenario
const scenario = await scenarioService.createScenario({
  patientId: 1,
  title: 'Social Interaction Scenario',
  status: 'NOT_STARTED',
});

// List scenarios
const scenarios = await scenarioService.listScenarios();

// Get scenario by ID
const scenario = await scenarioService.getScenarioById(4);

// Update scenario
await scenarioService.updateScenario(4, {
  status: 'IN_PROGRESS',
});

// Delete scenario
await scenarioService.deleteScenario(4);
```

### Test Service

```tsx
import { testService } from '@/lib';

// Check if test is completed
const test10Status = await testService.checkTest10();

// Submit test
const result = await testService.submitTest10({
  answers: [1, 2, 0, 1, 2], // Array of answer indices/values
});

console.log(result.score); // Score from the test
```

### Session Service

```tsx
import { sessionService } from '@/lib';

// Generate session token (for Unity app)
const session = await sessionService.generateSession();
console.log(session.sessionId); // Send to Unity app

// Validate session
const isValid = await sessionService.validateSession('session-id');

// Attach session data (called from Unity)
await sessionService.attachSessionData({
  sessionId: 'session-id',
  data: { gaze: 'object_name', durationSeconds: 5 },
});
```

## React Hooks

All services have corresponding React hooks for easier state management.

### usePatient Hook

```tsx
'use client';

import { usePatient } from '@/lib';

export default function PatientProfile() {
  const {
    data,
    loading,
    error,
    getMyProfile,
    updateMyProfile,
  } = usePatient();

  useEffect(() => {
    getMyProfile();
  }, [getMyProfile]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>{data?.name}</h1>
      <p>Email: {data?.email}</p>
      <button
        onClick={() =>
          updateMyProfile({
            city: 'New City',
          })
        }
      >
        Update Profile
      </button>
    </div>
  );
}
```

### useTherapist Hook

```tsx
'use client';

import { useTherapist } from '@/lib';
import { useEffect } from 'react';

export default function TherapistDashboard() {
  const {
    data,
    patients,
    loading,
    error,
    getMyProfile,
    getMyPatients,
  } = useTherapist();

  useEffect(() => {
    getMyProfile();
    getMyPatients();
  }, [getMyProfile, getMyPatients]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome, {data?.name}</h1>
      <h2>My Patients ({patients.length})</h2>
      <ul>
        {patients.map(patient => (
          <li key={patient.id}>{patient.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### useConsultation Hook

```tsx
'use client';

import { useConsultation } from '@/lib';
import { useEffect } from 'react';

export default function ConsultationsList() {
  const {
    consultations,
    loading,
    listConsultations,
    createConsultation,
  } = useConsultation();

  useEffect(() => {
    listConsultations();
  }, [listConsultations]);

  const handleCreate = async () => {
    await createConsultation({
      patientId: 1,
      consultationDate: new Date().toISOString(),
      objective: 'Progress review',
      score: 85,
    });
  };

  return (
    <div>
      <button onClick={handleCreate}>Create Consultation</button>
      {consultations.map(c => (
        <div key={c.id}>
          <p>{c.objective} - Score: {c.score}</p>
        </div>
      ))}
    </div>
  );
}
```

Other hooks: `useObjective`, `useReport`, `useScenario`, `useTest`, `useSession` follow the same pattern.

## Error Handling

All API calls throw errors with this structure:

```typescript
interface ApiError {
  message: string;
  status: number;
  data?: any;
}
```

Example:

```tsx
try {
  await patientService.updateMyProfile({ city: 'São Paulo' });
} catch (error) {
  if (error.status === 401) {
    // Unauthorized - token expired or invalid
  } else if (error.status === 404) {
    // Not found
  } else {
    console.error(error.message);
  }
}
```

## Type Safety

All operations are fully typed with TypeScript. Import types from `@/lib`:

```tsx
import {
  PatientProfile,
  UpdatePatientRequest,
  Consultation,
  CreateConsultationRequest,
  UserRole,
  User,
} from '@/lib';

const profile: PatientProfile = await patientService.getMyProfile();
const data: UpdatePatientRequest = { city: 'São Paulo' };
```

## Environment Variables

Create or update `.env.local`:

```env
# API Base URL (required)
NEXT_PUBLIC_API_URL=https://virteai-backend-tcc.onrender.com

# For development
# NEXT_PUBLIC_API_URL=http://localhost:3001
```

## File Structure

```
src/
├── services/              # API service layer
│   ├── api.ts            # Core HTTP client
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
│   └── AuthContext.tsx    # Global auth context
├── hooks/                 # React hooks
│   ├── usePatient.ts
│   ├── useTherapist.ts
│   ├── useConsultation.ts
│   ├── useObjective.ts
│   ├── useReport.ts
│   ├── useScenario.ts
│   ├── useTest.ts
│   └── useSession.ts
├── types/
│   └── index.ts          # TypeScript interfaces
└── lib/
    └── index.ts          # Re-exports for easier imports
```

## Best Practices

1. **Always use hooks in components**: Hooks provide state management and error handling
2. **Use useAuth for auth checks**: Before rendering protected content
3. **Handle errors appropriately**: Show user-friendly error messages
4. **Implement loading states**: Show spinners while data is being fetched
5. **Use TypeScript types**: Leverage full type safety for API calls
6. **Re-export from lib**: Import from `@/lib` for cleaner imports

## Quick Start Example

```tsx
'use client';

import { useAuth } from '@/lib';
import { useTherapist } from '@/lib';
import { useEffect } from 'react';

export default function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const { data: therapist, getMyProfile } = useTherapist();

  useEffect(() => {
    if (isAuthenticated && user?.role === 'THERAPIST') {
      getMyProfile();
    }
  }, [isAuthenticated, user, getMyProfile]);

  if (!isAuthenticated) {
    return <p>Please log in</p>;
  }

  return (
    <div>
      <h1>Welcome, {therapist?.name}</h1>
      <p>Role: {user?.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## Support

For issues or questions about the API integration, check:
1. Backend API documentation in `/routes.json`
2. TypeScript types in `/src/types/index.ts`
3. Service implementations in `/src/services/`
