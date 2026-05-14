'use client';

import { useState, useCallback } from 'react';
import { Consultation, CreateConsultationRequest, UpdateConsultationRequest, ApiError } from '@/types';
import { consultationService } from '@/services/consultationService';

export const useConsultation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [consultations, setConsultations] = useState<Consultation[]>([]);

  const createConsultation = useCallback(async (data: CreateConsultationRequest) => {
    try {
      setLoading(true);
      setError(null);
      const result = await consultationService.createConsultation(data);
      setConsultations(prev => [...prev, result]);
      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const listConsultations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await consultationService.listConsultations();
      setConsultations(result);
      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getConsultationById = useCallback(async (consultationId: number) => {
    try {
      setLoading(true);
      setError(null);
      return await consultationService.getConsultationById(consultationId);
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateConsultation = useCallback(async (consultationId: number, data: UpdateConsultationRequest) => {
    try {
      setLoading(true);
      setError(null);
      const result = await consultationService.updateConsultation(consultationId, data);
      setConsultations(prev =>
        prev.map(c => c.consultationId === consultationId ? result : c)
      );
      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteConsultation = useCallback(async (consultationId: number) => {
    try {
      setLoading(true);
      setError(null);
      await consultationService.deleteConsultation(consultationId);
      setConsultations(prev => prev.filter(c => c.consultationId !== consultationId));
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
    consultations,
    createConsultation,
    listConsultations,
    getConsultationById,
    updateConsultation,
    deleteConsultation,
  };
};
