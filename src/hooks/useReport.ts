'use client';

import { useState, useCallback } from 'react';
import { Report, CreateReportRequest, UpdateReportRequest, ApiError } from '@/types';
import { reportService } from '@/services/reportService';

export const useReport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [reports, setReports] = useState<Report[]>([]);

  const createReport = useCallback(async (data: CreateReportRequest) => {
    try {
      setLoading(true);
      setError(null);
      const result = await reportService.createReport(data);
      setReports(prev => [...prev, result]);
      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const listReports = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await reportService.listReports();
      setReports(result);
      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getReportById = useCallback(async (reportId: number) => {
    try {
      setLoading(true);
      setError(null);
      return await reportService.getReportById(reportId);
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateReport = useCallback(async (reportId: number, data: UpdateReportRequest) => {
    try {
      setLoading(true);
      setError(null);
      const result = await reportService.updateReport(reportId, data);
      setReports(prev =>
        prev.map(r => r.reportId === reportId ? result : r)
      );
      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteReport = useCallback(async (reportId: number) => {
    try {
      setLoading(true);
      setError(null);
      await reportService.deleteReport(reportId);
      setReports(prev => prev.filter(r => r.reportId !== reportId));
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
    reports,
    createReport,
    listReports,
    getReportById,
    updateReport,
    deleteReport,
  };
};
