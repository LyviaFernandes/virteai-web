import {
  Objective,
  CreateObjectiveRequest,
  UpdateObjectiveRequest,
} from '@/types';
import { apiClient } from './api';

export const objectiveService = {
  /**
   * Create new therapeutic objective for patient
   */
  async createObjective(data: CreateObjectiveRequest): Promise<Objective> {
    return apiClient.post<Objective>(
      '/objectives/create',
      data
    );
  },

  /**
   * List objectives
   */
  async listObjectives(): Promise<Objective[]> {
    return apiClient.get<Objective[]>('/objectives/list');
  },

  /**
   * Get specific objective by ID
   */
  async getObjectiveById(objectiveId: number): Promise<Objective> {
    return apiClient.get<Objective>(
      `/objectives/${objectiveId}`
    );
  },

  /**
   * Update existing objective
   */
  async updateObjective(
    objectiveId: number,
    data: UpdateObjectiveRequest
  ): Promise<Objective> {
    return apiClient.put<Objective>(
      `/objectives/update/${objectiveId}`,
      data
    );
  },

  /**
   * Delete objective
   */
  async deleteObjective(objectiveId: number): Promise<{ message: string }> {
    return apiClient.delete(
      `/objectives/delete/${objectiveId}`
    );
  },
};
