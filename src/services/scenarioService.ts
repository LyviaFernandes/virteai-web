import {
  Scenario,
  CreateScenarioRequest,
  UpdateScenarioRequest,
} from '@/types';
import { apiClient } from './api';

export const scenarioService = {
  /**
   * Create new therapeutic scenario for patient
   */
  async createScenario(data: CreateScenarioRequest): Promise<Scenario> {
    return apiClient.post<Scenario>(
      '/scenarios/create',
      data
    );
  },

  /**
   * List scenarios
   */
  async listScenarios(): Promise<Scenario[]> {
    return apiClient.get<Scenario[]>('/scenarios/list');
  },

  /**
   * Get specific scenario by ID
   */
  async getScenarioById(scenarioId: number): Promise<Scenario> {
    return apiClient.get<Scenario>(
      `/scenarios/${scenarioId}`
    );
  },

  /**
   * Update existing scenario
   */
  async updateScenario(
    scenarioId: number,
    data: UpdateScenarioRequest
  ): Promise<Scenario> {
    return apiClient.put<Scenario>(
      `/scenarios/update/${scenarioId}`,
      data
    );
  },

  /**
   * Delete scenario
   */
  async deleteScenario(scenarioId: number): Promise<{ message: string }> {
    return apiClient.delete(
      `/scenarios/delete/${scenarioId}`
    );
  },
};
