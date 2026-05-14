"use client"

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import './style.css'
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Footer from '@/components/footer/Footer';
import { useReport, useTherapist } from '@/lib';
import type { PatientProfile, ReportEvolution } from '@/types';
import ProtectedRoute from '@/components/ProtectedRoute';
import { handleApiError } from '@/utils/apiErrors';

type FormType = {
    patientId: string;
    goals: string;
    title: string;
    report: string;
}

const statusToEvolution: Record<string, ReportEvolution> = {
    evoluiu: 'IMPROVED',
    manteve: 'MAINTAINED',
    retrocedeu: 'REGRESSED',
};

function AddNewReportContent () {
    const router = useRouter();
    const searchParams = useSearchParams();
    const prefillPatient = searchParams.get('patientId');

    const { createReport, loading: saving } = useReport();
    const { getMyPatients } = useTherapist();

    const [patients, setPatients] = useState<PatientProfile[]>([]);
    const [form, setForm] = useState<FormType>({
        patientId: prefillPatient || '',
        goals: '',
        title: '',
        report: '',
    });
    const [status, setStatus] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const statusLabel: Record<string, string> = {
        evoluiu: 'Evoluiu',
        manteve: 'Manteve',
        retrocedeu: 'Retrocedeu',
    };

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const list = await getMyPatients();
                if (!cancelled) setPatients(list || []);
            } catch (err) {
                if (!cancelled) setError(handleApiError(err));
            }
        })();
        return () => { cancelled = true; };
    }, [getMyPatients]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setError(null);
        setSuccess(null);

        if (!form.patientId) { setError('Selecione um paciente.'); return; }
        if (!form.title.trim()) { setError('Informe o título.'); return; }
        if (!form.goals.trim()) { setError('Informe o objetivo da sessão.'); return; }
        if (!form.report.trim()) { setError('Escreva o relatório.'); return; }
        if (!status) { setError('Selecione um status de evolução.'); return; }

        try {
            await createReport({
                patientId: Number(form.patientId),
                sessionObjective: form.goals,
                title: form.title,
                evolution: statusToEvolution[status],
                content: form.report,
            });
            setSuccess('Relatório enviado com sucesso.');
            setTimeout(() => router.push('/Therapist/ReportsList'), 800);
        } catch (err) {
            setError(handleApiError(err));
        }
    };

    return(
        <ProtectedRoute requiredRoles={['THERAPIST', 'ADMIN']}>
        <div className="Section__Reports">
            <HeaderEnter src={Return} />

            <div className="reports-header">
                <h1>Preencher Relatório</h1>
            </div>

            <div className="text__reports">
                <p>Preencha os campos abaixo com informações sobre a sessão que quer relatar:</p>
            </div>

            {error && (
                <div style={{ backgroundColor: '#fee', color: '#c00', padding: '10px', borderRadius: '4px', margin: '10px 16px' }}>
                    <p>{error}</p>
                </div>
            )}
            {success && (
                <div style={{ backgroundColor: '#efe', color: '#070', padding: '10px', borderRadius: '4px', margin: '10px 16px' }}>
                    <p>{success}</p>
                </div>
            )}

            <div className="personal-data-section">
                <h3 className='personal-data-title'>Relatório</h3>

                <div className="personal-data-item">
                    <p>Paciente:</p>
                    <select
                        name="patientId"
                        value={form.patientId}
                        onChange={handleChange}
                        className="input-field"
                    >
                        <option value="">Selecione um paciente</option>
                        {patients.map(p => (
                            <option key={p.userId} value={p.userId}>{p.name}</option>
                        ))}
                    </select>
                </div>

                <div className="personal-data-item">
                    <p>Objetivo da sessão:</p>
                    <input
                        name="goals"
                        value={form.goals}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Insira o objetivo da sessão realizada"
                    />
                </div>
            </div>

            <div className="Report_Text_Section">
                <div className="Report__Text__Field">

                    <div className="Report__Text__item">
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="input-title"
                            placeholder="Título do relatório"
                        />

                        <div className="status-container">
                            <h3
                                onClick={() => setOpen(!open)}
                                 className={`status-option status ${status ? `status--${status}` : "status--default"}`}

                            >
                                {status ? statusLabel[status] : "Status"}
                            </h3>

                            {open && (
                                <div className="status-dropdown">
                                    {Object.entries(statusLabel).map(([key, label]) => (
                                        <div
                                            key={key}
                                           className="status-container"
                                            onClick={() => {
                                                setStatus(key);
                                                setOpen(false);
                                            }}
                                        >
                                            <h3>
                                            {label}

                                            </h3>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="Report__Field">
                        <textarea
                            name="report"
                            value={form.report}
                            onChange={handleChange}
                            className="input-report"
                            placeholder="Neste campo, escreva o relatório sobre a sessão realizada."
                        />
                    </div>

                </div>
            </div>

            <div className="Send__Report">
                <button onClick={handleSubmit} disabled={saving}>
                    {saving ? 'Enviando...' : 'Enviar Relatório'}
                </button>
            </div>
            <Footer/>
        </div>
        </ProtectedRoute>
    )
}

export default function AddNewReport () {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <AddNewReportContent />
        </Suspense>
    );
}
