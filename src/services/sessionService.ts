import {
  SessionGenerateResponse,
  SessionAttachRequest,
} from '@/types';
import { apiClient } from './api';

export const sessionService = {
  /**
   * Validate session ID
   */
  async validateSession(sessionId: string): Promise<{ valid: boolean }> {
    return apiClient.get(
      `/sessions/${sessionId}`,
      { skipAuth: true }
    );
  },

  /**
   * Generate temporary session token
   */
  async generateSession(userId: number): Promise<SessionGenerateResponse> {
    return apiClient.post<SessionGenerateResponse>(
      '/sessions/generate',
      { userId }
    );
  },

  /**
   * Attach session data (called from Unity app - no auth required)
   */
  async attachSessionData(data: SessionAttachRequest): Promise<{ message: string }> {
    return apiClient.post(
      '/sessions/attach',
      data,
      { skipAuth: true }
    );
  },
};
