import {
  PatientProfile,
  UpdatePatientRequest,
  PatientCareStatus,
} from '@/types';
import { apiClient } from './api';

// Backend retorna name/email aninhados em `user`. Achata para o type plano usado no front.
const normalizePatient = (raw: any): PatientProfile => ({
  ...raw,
  userId: raw?.userId ?? raw?.user?.userId,
  name: raw?.name ?? raw?.user?.name,
  email: raw?.email ?? raw?.user?.email,
});

const normalizePatientList = (raw: any): PatientProfile[] =>
  Array.isArray(raw) ? raw.map(normalizePatient) : [];

export const patientService = {
  /**
   * Get authenticated patient's own profile
   */
  async getMyProfile(): Promise<PatientProfile> {
    const raw = await apiClient.get<any>('/patients/me');
    return normalizePatient(raw);
  },

  /**
   * List all patient profiles
   */
  async listPatients(): Promise<PatientProfile[]> {
    const raw = await apiClient.get<any>('/patients/list');
    return normalizePatientList(raw);
  },

  /**
   * Get specific patient profile by ID
   */
  async getPatientById(userId: number): Promise<PatientProfile> {
    const raw = await apiClient.get<any>(`/patients/${userId}`);
    return normalizePatient(raw);
  },

  /**
   * Update patient's care status
   */
  async updateCareStatus(careStatus: PatientCareStatus): Promise<PatientProfile> {
    const raw = await apiClient.patch<any>(
      '/patients/care-status',
      { careStatus }
    );
    return normalizePatient(raw?.patientProfile ?? raw);
  },

  /**
   * Update authenticated patient's own profile
   */
  async updateMyProfile(data: UpdatePatientRequest): Promise<PatientProfile> {
    const raw = await apiClient.put<any>(
      '/patients/update',
      data
    );
    return normalizePatient(raw?.patientProfile ?? raw);
  },
};
