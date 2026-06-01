"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTherapist } from '@/lib';
import { handleApiError } from '@/utils/apiErrors';
import './style.css'
import Image from 'next/image';
import HeaderHome from '@/components/header-login/Header';
import ImageCenter from '@/assets/images/PatientListBanner.svg';
import profile from '@/assets/images/ProfileIcon.svg';
import visualize from '@/assets/images/visualizeicon.svg';
import Footer from '@/components/footer/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import type { PatientProfile } from '@/types';

export default function PatientListPage () {
    const router = useRouter();
    const { getMyPatients, loading } = useTherapist();
    const [patients, setPatients] = useState<PatientProfile[]>([]);
    const [error, setError] = useState<string | null>(null);

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

    const handlePatientClick = (patientId: number) => {
        router.push(`/Therapist/PatientsMedicalRecord?patientId=${patientId}`);
    };

    return(
        <ProtectedRoute requiredRoles={['THERAPIST', 'ADMIN']}>
        <div className="patient-section">
            <HeaderHome/>

            <Image
                className='patient-banner'
                src={ImageCenter}
                alt=""
            />

            <div className="patient-header">
                <h1>Seus Pacientes</h1>
            </div>

            {error && (
                <div style={{ backgroundColor: '#fee', color: '#c00', padding: '10px', borderRadius: '4px', margin: '20px' }}>
                    <p>{error}</p>
                </div>
            )}

            <div className="patient-list">
                {loading ? (
                    <div style={{ padding: '20px', textAlign: 'center' }}>Carregando pacientes...</div>
                ) : patients.length === 0 ? (
                    <div style={{ padding: '20px', textAlign: 'center' }}>Nenhum paciente associado</div>
                ) : (
                    patients.map((patient) => (
                        <div
                            key={patient.userId}
                            className="patient-card"
                            onClick={() => handlePatientClick(patient.userId)}
                            style={{ cursor: 'pointer' }}
                        >
                            <Image
                                className='patient-card__image'
                                src={patient.profileImage || profile}
                                alt={patient.name}
                                width={80}
                                unoptimized={!!patient.profileImage}
                            />

                            <div className="patient-card__content">
                                <h2>{patient.name}</h2>
                            </div>

                            <Image
                                className='patient-card__action-icon'
                                src={visualize}
                                alt=""
                                width={24}
                            />
                        </div>
                    ))
                )}
            </div>

            <Footer/>
        </div>
        </ProtectedRoute>
    )
}
