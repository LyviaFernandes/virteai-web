'use client';

import { useState, useCallback } from 'react';
import { Scenario, CreateScenarioRequest, UpdateScenarioRequest, ApiError } from '@/types';
import { scenarioService } from '@/services/scenarioService';

export const useScenario = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);

  const createScenario = useCallback(async (data: CreateScenarioRequest) => {
    try {
      setLoading(true);
      setError(null);
      const result = await scenarioService.createScenario(data);
      setScenarios(prev => [...prev, result]);
      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const listScenarios = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await scenarioService.listScenarios();
      setScenarios(result);
      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getScenarioById = useCallback(async (scenarioId: number) => {
    try {
      setLoading(true);
      setError(null);
      return await scenarioService.getScenarioById(scenarioId);
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateScenario = useCallback(async (scenarioId: number, data: UpdateScenarioRequest) => {
    try {
      setLoading(true);
      setError(null);
      const result = await scenarioService.updateScenario(scenarioId, data);
      setScenarios(prev =>
        prev.map(s => s.scenarioId === scenarioId ? result : s)
      );
      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteScenario = useCallback(async (scenarioId: number) => {
    try {
      setLoading(true);
      setError(null);
      await scenarioService.deleteScenario(scenarioId);
      setScenarios(prev => prev.filter(s => s.scenarioId !== scenarioId));
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
    scenarios,
    createScenario,
    listScenarios,
    getScenarioById,
    updateScenario,
    deleteScenario,
  };
};
