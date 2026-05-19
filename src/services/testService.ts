import {
  TestCheckResponse,
  TestSubmitRequest,
  TestSubmitResponse,
} from '@/types';
import { apiClient } from './api';

// Backend aceita "strongly_agree" | "agree" | "neutral" | "disagree" | "strongly_disagree".
// O UI coleta 0..3 (0=Concordo plenamente, 1=Concordo parcialmente,
// 2=Discordo parcialmente, 3=Discordo plenamente).
const LEVEL_BY_INDEX = ['strongly_agree', 'agree', 'disagree', 'strongly_disagree'] as const;

const toAnswerLevel = (answers: TestSubmitRequest['answers']): string[] =>
  answers.map(a => {
    if (typeof a === 'string') return a;
    if (typeof a === 'boolean') return a ? 'agree' : 'disagree';
    const idx = Number(a);
    return LEVEL_BY_INDEX[idx] ?? 'neutral';
  });

const normalizeCheckResponse = (raw: any): TestCheckResponse => ({
  completed: !!(raw?.completed ?? raw?.isTest10Completed ?? raw?.isTest50Completed),
  score: typeof raw?.score === 'number' ? raw.score : undefined,
  submittedAt: raw?.submittedAt ?? raw?.completedAt,
});

export const testService = {
  /**
   * Check if patient has completed 10-question test
   */
  async checkTest10(): Promise<TestCheckResponse> {
    const raw = await apiClient.get<any>('/tests/get-test-10');
    return normalizeCheckResponse(raw);
  },

  /**
   * Check if patient has completed 50-question test
   */
  async checkTest50(): Promise<TestCheckResponse> {
    const raw = await apiClient.get<any>('/tests/get-test-50');
    return normalizeCheckResponse(raw);
  },

  /**
   * Submit answers for 10-question test
   */
  async submitTest10(data: TestSubmitRequest): Promise<TestSubmitResponse> {
    return apiClient.post<TestSubmitResponse>(
      '/tests/submit-test-10',
      { answers: toAnswerLevel(data.answers) }
    );
  },

  /**
   * Submit answers for 50-question test
   */
  async submitTest50(data: TestSubmitRequest): Promise<TestSubmitResponse> {
    return apiClient.post<TestSubmitResponse>(
      '/tests/submit-test-50',
      { answers: toAnswerLevel(data.answers) }
    );
  },
};
