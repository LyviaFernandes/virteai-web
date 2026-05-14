'use client';

import { useState, useCallback } from 'react';
import { PatientProfile, UpdatePatientRequest, PatientCareStatus, ApiError } from '@/types';
import { patientService } from '@/services/patientService';

export const usePatient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [data, setData] = useState<PatientProfile | null>(null);

  const getMyProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await patientService.getMyProfile();
      setData(result);
      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getPatientById = useCallback(async (userId: number) => {
    try {
      setLoading(true);
      setError(null);
      const result = await patientService.getPatientById(userId);
      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const listPatients = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      return await patientService.listPatients();
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCareStatus = useCallback(async (careStatus: PatientCareStatus) => {
    try {
      setLoading(true);
      setError(null);
      const result = await patientService.updateCareStatus(careStatus);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateMyProfile = useCallback(async (updateData: UpdatePatientRequest) => {
    try {
      setLoading(true);
      setError(null);
      const result = await patientService.updateMyProfile(updateData);
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
    getMyProfile,
    getPatientById,
    listPatients,
    updateCareStatus,
    updateMyProfile,
  };
};
