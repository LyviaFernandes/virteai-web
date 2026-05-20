'use client';

import { useState, useCallback } from 'react';
import { SessionAttachRequest, ApiError } from '@/types';
import { sessionService } from '@/services/sessionService';

export const useSession = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const validateSession = useCallback(async (sessionId: string) => {
    try {
      setLoading(true);
      setError(null);
      return await sessionService.validateSession(sessionId);
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const generateSession = useCallback(async (userId: number) => {
    try {
      setLoading(true);
      setError(null);
      return await sessionService.generateSession(userId);
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const attachSessionData = useCallback(async (data: SessionAttachRequest) => {
    try {
      setLoading(true);
      setError(null);
      return await sessionService.attachSessionData(data);
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
    validateSession,
    generateSession,
    attachSessionData,
  };
};
