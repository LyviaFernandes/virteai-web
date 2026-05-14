import {
  PatientProfile,
  UpdatePatientRequest,
  PatientCareStatus,
} from '@/types';
import { apiClient } from './api';

export const patientService = {
  /**
   * Get authenticated patient's own profile
   */
  async getMyProfile(): Promise<PatientProfile> {
    return apiClient.get<PatientProfile>('/patients/me');
  },

  /**
   * List all patient profiles
   */
  async listPatients(): Promise<PatientProfile[]> {
    return apiClient.get<PatientProfile[]>('/patients/list');
  },

  /**
   * Get specific patient profile by ID
   */
  async getPatientById(userId: number): Promise<PatientProfile> {
    return apiClient.get<PatientProfile>(`/patients/${userId}`);
  },

  /**
   * Update patient's care status
   */
  async updateCareStatus(careStatus: PatientCareStatus): Promise<PatientProfile> {
    return apiClient.patch<PatientProfile>(
      '/patients/care-status',
      { careStatus }
    );
  },

  /**
   * Update authenticated patient's own profile
   */
  async updateMyProfile(data: UpdatePatientRequest): Promise<PatientProfile> {
    return apiClient.put<PatientProfile>(
      '/patients/update',
      data
    );
  },
};
