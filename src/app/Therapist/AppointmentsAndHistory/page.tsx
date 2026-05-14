"use client"

import { useEffect, useState } from 'react';
import './styles.css'
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Footer from '@/components/footer/Footer';
import CalendarVirteai from '@/components/calendar/page';
import { useConsultation } from '@/lib';
import type { Consultation } from '@/types';
import ProtectedRoute from '@/components/ProtectedRoute';
import { handleApiError } from '@/utils/apiErrors';

const formatDate = (iso?: string) => {
    if (!iso) return '';
    const d = new Date(iso);
    return isNaN(d.getTime()) ? iso : d.toLocaleDateString('pt-BR');
};

const formatTime = (iso?: string) => {
    if (!iso) return '';
    const d = new Date(iso);
    return isNaN(d.getTime()) ? '' : d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};

export default function CalendarHistory () {
    const { listConsultations } = useConsultation();
    const [consultations, setConsultations] = useState<Consultation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                const list = await listConsultations();
                if (!cancelled) setConsultations(list || []);
            } catch (err) {
                if (!cancelled) setError(handleApiError(err));
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, [listConsultations]);

    const sorted = [...consultations].sort(
        (a, b) => new Date(b.consultationDate).getTime() - new Date(a.consultationDate).getTime()
    );

    return (
        <ProtectedRoute>
        <div className="Appointments__section">
            <HeaderEnter src={Return} />

            <div className="section-header">
                <h1>Consultas</h1>
            </div>

            {error && (
                <div style={{ backgroundColor: '#fee', color: '#c00', padding: '10px', borderRadius: '4px', margin: '10px 16px' }}>
                    <p>{error}</p>
                </div>
            )}

            <p className="paragraph">Calendário</p>

            <div className="Calendar__Section">
                <CalendarVirteai/>
            </div>

            <h3 className='section-title-responsible'>Histórico de consultas</h3>

            <div className="consult__history">
                <div className="section__list_reports">
                    {loading && <p>Carregando...</p>}
                    {!loading && sorted.length === 0 && <p>Nenhuma consulta registrada.</p>}
                    {sorted.map((c) => (
                        <div className="list-report-info" key={c.consultationId}>
                            <h2>{c.objective}</h2>
                            <div className="list-status">
                                <p>{formatDate(c.consultationDate)} •</p>
                                <p>{formatTime(c.consultationDate)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
        </ProtectedRoute>
    );
}
