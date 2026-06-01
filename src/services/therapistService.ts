import {
  TherapistProfile,
  UpdateTherapistRequest,
  PatientProfile,
} from '@/types';
import { apiClient } from './api';

// Backend retorna name/email aninhados em `user`. Achata para o type plano usado no front.
const normalizeTherapist = (raw: any): TherapistProfile => ({
  ...raw,
  userId: raw?.userId ?? raw?.user?.userId,
  name: raw?.name ?? raw?.user?.name,
  email: raw?.email ?? raw?.user?.email,
  profileImage: raw?.profilePictureUrl || raw?.profileImage,
});

const normalizePatient = (raw: any): PatientProfile => ({
  ...raw,
  userId: raw?.userId ?? raw?.user?.userId,
  name: raw?.name ?? raw?.user?.name,
  email: raw?.email ?? raw?.user?.email,
});

export const therapistService = {
  /**
   * Get authenticated therapist's own profile
   */
  async getMyProfile(): Promise<TherapistProfile> {
    const raw = await apiClient.get<any>('/therapists/me');
    return normalizeTherapist(raw);
  },

  /**
   * List all therapist profiles
   */
  async listTherapists(): Promise<TherapistProfile[]> {
    const raw = await apiClient.get<any>('/therapists/list');
    return Array.isArray(raw) ? raw.map(normalizeTherapist) : [];
  },

  /**
   * Get specific therapist profile by ID
   */
  async getTherapistById(userId: number): Promise<TherapistProfile> {
    const raw = await apiClient.get<any>(`/therapists/${userId}`);
    return normalizeTherapist(raw);
  },

  /**
   * List patients associated with authenticated therapist
   */
  async getMyPatients(): Promise<PatientProfile[]> {
    const raw = await apiClient.get<any>('/therapists/patients');
    return Array.isArray(raw) ? raw.map(normalizePatient) : [];
  },

  /**
   * Update authenticated therapist's own profile
   */
  async updateMyProfile(data: UpdateTherapistRequest | FormData): Promise<TherapistProfile> {
    const raw = await apiClient.put<any>(
      '/therapists/update',
      data
    );
    return normalizeTherapist(raw?.therapistProfile ?? raw);
  },
};
