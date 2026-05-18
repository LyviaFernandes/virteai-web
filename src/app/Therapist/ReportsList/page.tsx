"use client"

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes';
import { useRouter, useSearchParams } from 'next/navigation';
import './style.css'
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '../../../assets/images/return-icon.svg';
import Footer from '@/components/footer/Footer';
import { useReport } from '@/lib';
import type { Report, ReportEvolution } from '@/types';
import ProtectedRoute from '@/components/ProtectedRoute';
import { handleApiError } from '@/utils/apiErrors';

const evolutionLabel: Record<ReportEvolution, string> = {
    IMPROVED: 'Evoluiu',
    MAINTAINED: 'Manteve',
    REGRESSED: 'Retrocedeu',
};

const evolutionClass: Record<ReportEvolution, string> = {
    IMPROVED: 'status-green',
    MAINTAINED: 'status-blue',
    REGRESSED: 'status-send',
};

const formatDate = (iso?: string) => {
    if (!iso) return '';
    const d = new Date(iso);
    return isNaN(d.getTime()) ? iso : d.toLocaleDateString('pt-BR');
};

function ReportsListContent () {
    const router = useRouter();
    const searchParams = useSearchParams();
    const patientIdFilter = searchParams.get('patientId');

    const { listReports } = useReport();
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                const list = await listReports();
                if (!cancelled) setReports(list || []);
            } catch (err) {
                if (!cancelled) setError(handleApiError(err));
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, [listReports]);

    const filtered = patientIdFilter
        ? reports.filter(r => r.patientId === Number(patientIdFilter))
        : reports;

    return(
        <ProtectedRoute>
        <div className="reports-list">
            <HeaderEnter
            src={Return}
            />

            <div className="reports-header">
                    <h1>Relatórios</h1>
            </div>

            {error && (
                <div style={{ backgroundColor: '#fee', color: '#c00', padding: '10px', borderRadius: '4px', margin: '10px 16px' }}>
                    <p>{error}</p>
                </div>
            )}

            <div className="section__list_reports">
                {loading && <p>Carregando...</p>}
                {!loading && filtered.length === 0 && <p>Nenhum relatório encontrado.</p>}
                {filtered.map((report) => (
                    <Link
                        key={report.reportId}
                        href={`${ROUTES.therapistReports}?id=${report.reportId}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <div className="list-report-info">
                            <div className="list-status">
                                <h2>{report.title}</h2>
                                <h3 className={evolutionClass[report.evolution]}>
                                    {evolutionLabel[report.evolution]}
                                </h3>
                            </div>
                            <p>{formatDate(report.createdAt)}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="new__report">
                <button onClick={() => router.push(`${ROUTES.therapistAddNewReport}${patientIdFilter ? `?patientId=${patientIdFilter}` : ''}`)}>
                    Adicionar novo relatório
                </button>
            </div>
            <Footer/>
        </div>
        </ProtectedRoute>
        )
}

export default function ReportsList () {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <ReportsListContent />
        </Suspense>
    );
}
