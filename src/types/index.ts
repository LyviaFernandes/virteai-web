// User and Auth Types
export type UserRole = 'PATIENT' | 'THERAPIST' | 'ADMIN';

export interface User {
  userId: number;
  email: string;
  role: UserRole;
}

export interface AuthToken {
  accessToken: string;
  refreshToken?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user?: {
    userId: number;
    email: string;
    role: UserRole;
  };
}

export interface RegisterResponse {
  token?: string;
  user?: {
    userId: number;
    email: string;
    role: UserRole;
  };
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  city: string;
  birthDate: string;
  professionalRegister?: string;
  specialty?: string;
  experience?: string;
  attendanceModality?: 'ONLINE' | 'PRESENTIAL' | 'BOTH';
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

// Patient Types
export type PatientCareStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'PAUSED' | 'FINISHED';

export interface PatientProfile {
  userId: number;
  email: string;
  name: string;
  city: string;
  birthDate: string;
  careStatus: PatientCareStatus;
  therapistId?: number;
  createdAt: string;
  updatedAt: string;

  // adicionar
  profileImage?: string;
  country?: string;
  status?: string;
}

export interface UpdatePatientRequest {
  city?: string;
  birthDate?: string;
  careStatus?: PatientCareStatus;
}

// Therapist Types
export type AttendanceModality = 'ONLINE' | 'PRESENCIAL' | 'BOTH';

export interface TherapistProfile {
  userId: number;
  email: string;
  name: string;
  city?: string;
  birthDate: string;
  professionalRegister: string;
  specialty: string;
  experience?: string;
  attendanceModality: AttendanceModality;
  createdAt: string;
  updatedAt: string;
  crp?: string;
  specialization?: string;
  country?: string;
  modality?: 'ONLINE' | 'IN_PERSON' | 'BOTH';
  profileImage?: string;

}

export interface UpdateTherapistRequest {
  professionalRegister?: string;
  city?: string;
  birthDate?: string;
  specialty?: string;
  experience?: string;
  attendanceModality?: AttendanceModality;
}

// Session Types
export interface SessionGenerateResponse {
  sessionId: string;
  expiresIn: number;
}

export interface SessionAttachRequest {
  sessionId: string;
  data?: Record<string, unknown>;
}

// Test Types
export interface TestCheckResponse {
  completed: boolean;
  score?: number;
  submittedAt?: string;
}

export interface TestSubmitRequest {
  answers: (string | number | boolean)[];
}

export interface TestSubmitResponse {
  score: number;
  completedAt: string;
}

// Consultation Types
export interface Consultation {
  consultationId: number;
  patientId: number;
  therapistId?: number;
  consultationDate: string;
  objective: string;
  score: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateConsultationRequest {
  patientId: number;
  therapistId?: number;
  consultationDate: string;
  objective: string;
  score: number;
}

export interface UpdateConsultationRequest {
  patientId?: number;
  consultationDate?: string;
  objective?: string;
  score?: number;
}

// Objective Types
export interface Objective {
  objectiveId: number;
  patientId: number;
  therapistId?: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateObjectiveRequest {
  patientId: number;
  therapistId?: number;
  title: string;
}

export interface UpdateObjectiveRequest {
  title?: string;
}

// Report Types
export type ReportEvolution = 'IMPROVED' | 'MAINTAINED' | 'REGRESSED';

export interface Report {
  reportId: number;
  patientId: number;
  therapistId?: number;
  sessionObjective: string;
  title: string;
  evolution: ReportEvolution;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReportRequest {
  patientId: number;
  therapistId?: number;
  sessionObjective: string;
  title: string;
  evolution: ReportEvolution;
  content: string;
}

export interface UpdateReportRequest {
  sessionObjective?: string;
  title?: string;
  evolution?: ReportEvolution;
  content?: string;
}

// Scenario Types
export type ScenarioStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'PAUSED' | 'FINISHED';

export interface Scenario {
  scenarioId: number;
  patientId: number;
  therapistId?: number;
  title: string;
  status: ScenarioStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateScenarioRequest {
  patientId: number;
  therapistId?: number;
  title: string;
  status?: ScenarioStatus;
}

export interface UpdateScenarioRequest {
  title?: string;
  status?: ScenarioStatus;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
  data?: unknown;
}
