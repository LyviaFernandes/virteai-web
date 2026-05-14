'use client';

import { useState, useCallback } from 'react';
import { Objective, CreateObjectiveRequest, UpdateObjectiveRequest, ApiError } from '@/types';
import { objectiveService } from '@/services/objectiveService';

export const useObjective = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [objectives, setObjectives] = useState<Objective[]>([]);

  const createObjective = useCallback(async (data: CreateObjectiveRequest) => {
    try {
      setLoading(true);
      setError(null);
      const result = await objectiveService.createObjective(data);
      setObjectives(prev => [...prev, result]);
      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const listObjectives = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await objectiveService.listObjectives();
      setObjectives(result);
      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getObjectiveById = useCallback(async (objectiveId: number) => {
    try {
      setLoading(true);
      setError(null);
      return await objectiveService.getObjectiveById(objectiveId);
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateObjective = useCallback(async (objectiveId: number, data: UpdateObjectiveRequest) => {
    try {
      setLoading(true);
      setError(null);
      const result = await objectiveService.updateObjective(objectiveId, data);
      setObjectives(prev =>
        prev.map(o => o.id === objectiveId ? result : o)
      );
      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteObjective = useCallback(async (objectiveId: number) => {
    try {
      setLoading(true);
      setError(null);
      await objectiveService.deleteObjective(objectiveId);
      setObjectives(prev => prev.filter(o => o.id !== objectiveId));
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
    objectives,
    createObjective,
    listObjectives,
    getObjectiveById,
    updateObjective,
    deleteObjective,
  };
};
