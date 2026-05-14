"use client"

import { useEffect, useState } from 'react';
import './style.css'
import Image from 'next/image';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Footer from '@/components/footer/Footer';
import email from '@/assets/images/emailIcon.svg';
import DefaultProfileIcon from '@/assets/images/ProfileIcon.svg';
import { usePatient, useTherapist, useScenario } from '@/lib';
import type { TherapistProfile, Scenario } from '@/types';
import ProtectedRoute from '@/components/ProtectedRoute';
import { handleApiError } from '@/utils/apiErrors';

export default function ProcessesAndTreatments () {
    const { getMyProfile } = usePatient();
    const { getTherapistById } = useTherapist();
    const { listScenarios } = useScenario();

    const [therapist, setTherapist] = useState<TherapistProfile | null>(null);
    const [scenarios, setScenarios] = useState<Scenario[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                const me = await getMyProfile();
                if (cancelled) return;

                if (me?.therapistId) {
                    try {
                        const t = await getTherapistById(me.therapistId);
                        if (!cancelled) setTherapist(t);
                    } catch {
                        // patient sem terapeuta atribuído ou sem permissão
                    }
                }

                const list = await listScenarios();
                if (!cancelled) setScenarios(list || []);
            } catch (err) {
                if (!cancelled) setError(handleApiError(err));
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, [getMyProfile, getTherapistById, listScenarios]);

    return(
        <ProtectedRoute requiredRoles={['PATIENT']}>
        <div className="processes-container">
            <HeaderEnter
                src={Return}
            />

            <div className="section-header">
                <h1>Processos e Tratamentos</h1>
                <p>Abaixo estão os cenários e tratamentos disponibilizados pelo seu terapeuta:</p>
            </div>

            {error && (
                <div style={{ backgroundColor: '#fee', color: '#c00', padding: '10px', borderRadius: '4px', margin: '10px 0' }}>
                    <p>{error}</p>
                </div>
            )}

            <h3 className='section-title-responsible'>Responsável:</h3>

            <div className="profile-container">

                <div className="profile-avatar-wrapper">
                    <div className="profile-avatar-container">
                        <Image
                        src={DefaultProfileIcon}
                        alt="Foto do usuário"
                        fill
                        className="profile-avatar-image"
                        />
                    </div>
                </div>

                <div className="profile-info">

                    <h2>{therapist?.name || (loading ? 'Carregando...' : 'Sem terapeuta atribuído')}</h2>

                    <p>{therapist?.professionalRegister || ''}</p>

                </div>

                {therapist?.email && (
                    <a className="email-box" href={`mailto:${therapist.email}`}>
                        <h3>Envie um email</h3>
                        <Image
                            src={email}
                            alt=""
                            className="email-icon"
                            />
                    </a>
                )}

            </div>

            <h3 className='section-title-scenarios'>Cenários Terapêuticos:</h3>

            <div className="scenarios-container">
                {loading && <p>Carregando cenários...</p>}
                {!loading && scenarios.length === 0 && (
                    <p>Nenhum cenário disponível.</p>
                )}
                {scenarios.map(s => (
                    <div className="scenario-card" key={s.scenarioId}>
                        <h3>{s.title}</h3>
                        <p>{s.status}</p>
                    </div>
                ))}
            </div>

            <Footer/>
        </div>
        </ProtectedRoute>
    )

}
