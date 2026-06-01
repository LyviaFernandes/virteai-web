"use client"

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import './therapist.css'
import Image from 'next/image';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import DefaultProfileIcon from '@/assets/images/ProfileIcon.svg';
import star from '@/assets/images/RatingIcon.svg';
import Footer from '@/components/footer/Footer';
import email from '@/assets/images/emailIcon.svg';
import { useTherapist } from '@/lib';
import type { TherapistProfile } from '@/types';
import ProtectedRoute from '@/components/ProtectedRoute';
import { handleApiError } from '@/utils/apiErrors';

function TherapistProfileContent() {
    const searchParams = useSearchParams();
    const idParam = searchParams.get('id');

    const { getTherapistById } = useTherapist();

    const [therapist, setTherapist] = useState<TherapistProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!idParam) {
            setLoading(false);
            setError('Terapeuta não informado.');
            return;
        }

        let cancelled = false;

        (async () => {
            try {
                setLoading(true);

                const t = await getTherapistById(Number(idParam));

                if (!cancelled) {
                    setTherapist(t);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(handleApiError(err));
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [idParam, getTherapistById]);

    return (
        <ProtectedRoute>
            <div className="Section-Therapist">
                <HeaderEnter src={Return} />

                {error && (
                    <div
                        style={{
                            backgroundColor: '#fee',
                            color: '#c00',
                            padding: '10px',
                            borderRadius: '4px',
                            margin: '10px 16px'
                        }}
                    >
                        <p>{error}</p>
                    </div>
                )}

                <div className="profile-header">
                    <div className="profile-avatar-wrapper">
                        <div className="profile-avatar-container">
                            <Image
                                src={therapist?.profileImage || DefaultProfileIcon}
                                alt="Foto do usuário"
                                fill
                                unoptimized={!!therapist?.profileImage}
                                className="profile-avatar-image"
                            />
                        </div>
                    </div>

                    <div className="profile-details">
                        <h2>
                            {therapist?.name || (loading ? 'Carregando...' : '—')}
                        </h2>

                        <p>{therapist?.professionalRegister || ''}</p>

                        <div className="profile-status">
                            <h3>{therapist?.specialty || ''}</h3>
                        </div>
                    </div>
                </div>

                <div className="AboutTherapist-section">
                    <div className="box-abouttherapist">
                        <h2>Um Pouco Sobre Mim:</h2>

                        <p>
                            {therapist?.experience ||
                                'Profissional cadastrado em nossa plataforma.'}
                        </p>

                        <div className="section-tags">
                            {therapist?.specialty && (
                                <p>{therapist.specialty}</p>
                            )}

                            {therapist?.attendanceModality && (
                                <p>{therapist.attendanceModality}</p>
                            )}

                            {therapist?.city && (
                                <p>{therapist.city}</p>
                            )}
                        </div>

                        <div className="avaliation">
                            <h3>Avaliação:</h3>

                            <Image
                                src={star}
                                alt=""
                                className="star-image"
                            />
                        </div>

                        {therapist?.email && (
                            <a
                                className="email-box"
                                href={`mailto:${therapist.email}`}
                            >
                                <h3>Envie um email</h3>

                                <Image
                                    src={email}
                                    alt=""
                                    className="email-icon"
                                />
                            </a>
                        )}
                    </div>
                </div>

                <Footer />
            </div>
        </ProtectedRoute>
    );
}

export default function TherapistProfileWeb() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <TherapistProfileContent />
        </Suspense>
    );
}