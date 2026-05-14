import {
  TestCheckResponse,
  TestSubmitRequest,
  TestSubmitResponse,
} from '@/types';
import { apiClient } from './api';

export const testService = {
  /**
   * Check if patient has completed 10-question test
   */
  async checkTest10(): Promise<TestCheckResponse> {
    return apiClient.get<TestCheckResponse>('/tests/get-test-10');
  },

  /**
   * Check if patient has completed 50-question test
   */
  async checkTest50(): Promise<TestCheckResponse> {
    return apiClient.get<TestCheckResponse>('/tests/get-test-50');
  },

  /**
   * Submit answers for 10-question test
   */
  async submitTest10(data: TestSubmitRequest): Promise<TestSubmitResponse> {
    return apiClient.post<TestSubmitResponse>(
      '/tests/submit-test-10',
      data
    );
  },

  /**
   * Submit answers for 50-question test
   */
  async submitTest50(data: TestSubmitRequest): Promise<TestSubmitResponse> {
    return apiClient.post<TestSubmitResponse>(
      '/tests/submit-test-50',
      data
    );
  },
};
