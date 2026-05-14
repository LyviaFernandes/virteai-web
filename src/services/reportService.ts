import {
  Report,
  CreateReportRequest,
  UpdateReportRequest,
} from '@/types';
import { apiClient } from './api';

export const reportService = {
  /**
   * Create new clinical report
   */
  async createReport(data: CreateReportRequest): Promise<Report> {
    return apiClient.post<Report>(
      '/reports/create',
      data
    );
  },

  /**
   * List reports
   */
  async listReports(): Promise<Report[]> {
    return apiClient.get<Report[]>('/reports/list');
  },

  /**
   * Get specific report by ID
   */
  async getReportById(reportId: number): Promise<Report> {
    return apiClient.get<Report>(
      `/reports/${reportId}`
    );
  },

  /**
   * Update existing report
   */
  async updateReport(
    reportId: number,
    data: UpdateReportRequest
  ): Promise<Report> {
    return apiClient.put<Report>(
      `/reports/update/${reportId}`,
      data
    );
  },

  /**
   * Delete report
   */
  async deleteReport(reportId: number): Promise<{ message: string }> {
    return apiClient.delete(
      `/reports/delete/${reportId}`
    );
  },
};
