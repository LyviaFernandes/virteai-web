import {
  TherapistProfile,
  UpdateTherapistRequest,
  PatientProfile,
} from '@/types';
import { apiClient } from './api';

export const therapistService = {
  /**
   * Get authenticated therapist's own profile
   */
  async getMyProfile(): Promise<TherapistProfile> {
    return apiClient.get<TherapistProfile>('/therapists/me');
  },

  /**
   * List all therapist profiles
   */
  async listTherapists(): Promise<TherapistProfile[]> {
    return apiClient.get<TherapistProfile[]>('/therapists/list');
  },

  /**
   * Get specific therapist profile by ID
   */
  async getTherapistById(userId: number): Promise<TherapistProfile> {
    return apiClient.get<TherapistProfile>(`/therapists/${userId}`);
  },

  /**
   * List patients associated with authenticated therapist
   */
  async getMyPatients(): Promise<PatientProfile[]> {
    return apiClient.get<PatientProfile[]>('/therapists/patients');
  },

  /**
   * Update authenticated therapist's own profile
   */
  async updateMyProfile(data: UpdateTherapistRequest): Promise<TherapistProfile> {
    return apiClient.put<TherapistProfile>(
      '/therapists/update',
      data
    );
  },
};
