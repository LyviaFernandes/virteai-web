"use client"

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import './style.css'
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Footer from '@/components/footer/Footer';
import { useReport, usePatient, useTherapist } from '@/lib';
import type { Report, ReportEvolution } from '@/types';
import ProtectedRoute from '@/components/ProtectedRoute';
import { handleApiError } from '@/utils/apiErrors';

const evolutionLabel: Record<ReportEvolution, string> = {
    IMPROVED: 'Evoluiu',
    MAINTAINED: 'Manteve',
    REGRESSED: 'Retrocedeu',
};

const evolutionClass: Record<ReportEvolution, string> = {
    IMPROVED: 'evoluiu',
    MAINTAINED: 'manteve',
    REGRESSED: 'retrocedeu',
};

export default function Reports () {
    const searchParams = useSearchParams();
    const reportId = searchParams.get('id');

    const { getReportById } = useReport();
    const { getPatientById } = usePatient();
    const { getTherapistById } = useTherapist();

    const [report, setReport] = useState<Report | null>(null);
    const [patientName, setPatientName] = useState<string>('');
    const [therapistName, setTherapistName] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!reportId) {
            setLoading(false);
            setError('Relatório não informado.');
            return;
        }
        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                const r = await getReportById(Number(reportId));
                if (cancelled) return;
                setReport(r);

                if (r?.patientId) {
                    try {
                        const p = await getPatientById(r.patientId);
                        if (!cancelled) setPatientName(p?.name || '');
                    } catch { /* sem permissão */ }
                }
                if (r?.therapistId) {
                    try {
                        const t = await getTherapistById(r.therapistId);
                        if (!cancelled) setTherapistName(t?.name || '');
                    } catch { /* sem permissão */ }
                }
            } catch (err) {
                if (!cancelled) setError(handleApiError(err));
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, [reportId, getReportById, getPatientById, getTherapistById]);

    return(
        <ProtectedRoute>
        <div className="Section__Reports">
            <HeaderEnter
                src={Return}
            />

            <div className="reports-header">
                <h1>Relatório Terapêutico</h1>
            </div>

            {error && (
                <div style={{ backgroundColor: '#fee', color: '#c00', padding: '10px', borderRadius: '4px', margin: '10px 16px' }}>
                    <p>{error}</p>
                </div>
            )}

            {loading && <p style={{ padding: '16px' }}>Carregando...</p>}

            {report && (
                <>
                    <div className="personal-data-section">
                        <h3 className='personal-data-title'>Dados Pessoais:</h3>

                        <div className="personal-data-item">
                            <p>Paciente: {patientName || `#${report.patientId}`}</p>
                        </div>

                        <div className="personal-data-item">
                            <p>Terapeuta: {therapistName || (report.therapistId ? `#${report.therapistId}` : '—')}</p>
                        </div>

                        <div className="personal-data-item">
                            <p>Objetivo da sessão: {report.sessionObjective}</p>
                        </div>
                    </div>

                    <div className="Report_Text_Section">
                        <div className="Report__Text__Field">
                            <div className="Report__Text__item">
                                <p>{report.title}</p>
                                <div className="status-container">
                                    <h3 className={`status status--${evolutionClass[report.evolution]}`}>
                                        {evolutionLabel[report.evolution]}
                                    </h3>
                                </div>
                            </div>

                            <div className="Report__Field">
                                <p style={{ whiteSpace: 'pre-line' }}>
                                    {report.content}
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <Footer/>
        </div>
        </ProtectedRoute>
    )

}
