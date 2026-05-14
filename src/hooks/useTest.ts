'use client';

import { useState, useCallback } from 'react';
import { TestCheckResponse, TestSubmitRequest, TestSubmitResponse, ApiError } from '@/types';
import { testService } from '@/services/testService';

export const useTest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const checkTest10 = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      return await testService.checkTest10();
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const checkTest50 = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      return await testService.checkTest50();
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const submitTest10 = useCallback(async (data: TestSubmitRequest) => {
    try {
      setLoading(true);
      setError(null);
      return await testService.submitTest10(data);
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const submitTest50 = useCallback(async (data: TestSubmitRequest) => {
    try {
      setLoading(true);
      setError(null);
      return await testService.submitTest50(data);
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    checkTest10,
    checkTest50,
    submitTest10,
    submitTest50,
  };
};
