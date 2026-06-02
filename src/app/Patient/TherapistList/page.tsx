"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import './therapistlist.css'
import Image from 'next/image';
import HeaderHome from '@/components/header-login/Header';
import ImageCenter from '@/assets/images/TherapyBanner.svg';
import profile from '@/assets/images/ProfileIcon.svg';
import visualize from '@/assets/images/visualizeicon.svg';
import Footer from '@/components/footer/Footer';
import { useTherapist } from '@/lib';
import type { TherapistProfile } from '@/types';
import ProtectedRoute from '@/components/ProtectedRoute';
import { handleApiError } from '@/utils/apiErrors';

export default function TherapistList () {
    const { listTherapists } = useTherapist();
    const [therapists, setTherapists] = useState<TherapistProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setLoading(true);
                const list = await listTherapists();
                if (!cancelled) setTherapists(list || []);
            } catch (err) {
                if (!cancelled) setError(handleApiError(err));
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, [listTherapists]);

    return(
        <ProtectedRoute>
        <div className="therapist-section">
            <HeaderHome/>

            <Image
                className='therapist-banner'
                src={ImageCenter}
                alt=""
            />

            <div className="therapist-header">
                <h1>Nossos Terapeutas</h1>

                <p>Com base nos resultados do seu teste, você pode
                     consultar abaixo terapeutas disponíveis para avaliação,
                     diagnóstico ou acompanhamento terapêutico.</p>
            </div>

            {error && (
                <div style={{ backgroundColor: '#fee', color: '#c00', padding: '10px', borderRadius: '4px', margin: '10px 16px' }}>
                    <p>{error}</p>
                </div>
            )}

            <div className="therapist-list">
                {loading && <p style={{ padding: '16px' }}>Carregando terapeutas...</p>}
                {!loading && therapists.length === 0 && (
                    <p style={{ padding: '16px' }}>Nenhum terapeuta cadastrado.</p>
                )}
                {therapists.map(t => (
                    <Link
                        key={t.userId}
                        href={`/Patient/TherapistProfileWeb?id=${t.userId}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <div className="therapist-card">
                            <Image
                            className='therapist-card__image'
                            src={t.profileImage || profile}
                            alt={t.name}
                            width={100}
                            height={100}
                            unoptimized={!!t.profileImage}
                            />

                            <div className="therapist-card__content">
                                <h2>{t.name}</h2>
                                <p>{t.specialty || t.experience || 'Profissional cadastrado'}</p>
                            </div>

                            <Image
                            className='therapist-card__action-icon'
                            src={visualize}
                            alt=""
                            />
                        </div>
                    </Link>
                ))}
            </div>

            <Footer/>

        </div>
        </ProtectedRoute>
    )
}
