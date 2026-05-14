import {
  Consultation,
  CreateConsultationRequest,
  UpdateConsultationRequest,
} from '@/types';
import { apiClient } from './api';

export const consultationService = {
  /**
   * Create new consultation record
   */
  async createConsultation(data: CreateConsultationRequest): Promise<Consultation> {
    return apiClient.post<Consultation>(
      '/consultations/create',
      data
    );
  },

  /**
   * List consultations
   */
  async listConsultations(): Promise<Consultation[]> {
    return apiClient.get<Consultation[]>('/consultations/list');
  },

  /**
   * Get specific consultation by ID
   */
  async getConsultationById(consultationId: number): Promise<Consultation> {
    return apiClient.get<Consultation>(
      `/consultations/${consultationId}`
    );
  },

  /**
   * Update existing consultation
   */
  async updateConsultation(
    consultationId: number,
    data: UpdateConsultationRequest
  ): Promise<Consultation> {
    return apiClient.put<Consultation>(
      `/consultations/update/${consultationId}`,
      data
    );
  },

  /**
   * Delete consultation
   */
  async deleteConsultation(consultationId: number): Promise<{ message: string }> {
    return apiClient.delete(
      `/consultations/delete/${consultationId}`
    );
  },
};
