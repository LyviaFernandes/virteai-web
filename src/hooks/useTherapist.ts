'use client';

import { useState, useCallback } from 'react';
import { TherapistProfile, PatientProfile, UpdateTherapistRequest, ApiError } from '@/types';
import { therapistService } from '@/services/therapistService';

export const useTherapist = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [data, setData] = useState<TherapistProfile | null>(null);
  const [patients, setPatients] = useState<PatientProfile[]>([]);

  const getMyProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await therapistService.getMyProfile();
      setData(result);
      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getTherapistById = useCallback(async (userId: number) => {
    try {
      setLoading(true);
      setError(null);
      return await therapistService.getTherapistById(userId);
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const listTherapists = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      return await therapistService.listTherapists();
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getMyPatients = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await therapistService.getMyPatients();
      setPatients(result);
      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateMyProfile = useCallback(async (updateData: UpdateTherapistRequest) => {
    try {
      setLoading(true);
      setError(null);
      const result = await therapistService.updateMyProfile(updateData);
      setData(result);
      return result;
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
    data,
    patients,
    getMyProfile,
    getTherapistById,
    listTherapists,
    getMyPatients,
    updateMyProfile,
  };
};
