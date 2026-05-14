"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './result.css'
import Return from '@/assets/images/return-icon.svg';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import ButtonEnter from '@/components/enter-button/Button';
import Link from "next/link";
import { useTest } from '@/lib';
import ProtectedRoute from '@/components/ProtectedRoute';
import { handleApiError } from '@/utils/apiErrors';

export default function ResultQuestionnaire () {
    const router = useRouter();
    const { checkTest10 } = useTest();
    const [score, setScore] = useState<number | null>(null);
    const [completed, setCompleted] = useState<boolean | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const result = await checkTest10();
                if (!cancelled) {
                    setCompleted(!!result?.completed);
                    setScore(result?.score ?? null);
                }
            } catch (err) {
                if (!cancelled) setError(handleApiError(err));
            }
        })();
        return () => { cancelled = true; };
    }, [checkTest10]);

    return(
        <ProtectedRoute requiredRoles={['PATIENT']}>
        <div className="result-section">
            <HeaderEnter
            src={Return}
            />

                <div className="result-container">
                    <h2>Seu resultado!</h2>

                    {error && (
                        <div style={{ backgroundColor: '#fee', color: '#c00', padding: '10px', borderRadius: '4px' }}>
                            <p>{error}</p>
                        </div>
                    )}

                    <div className="result-card">
                        <div className="result-card__score">
                            <p>{score !== null ? `${score}/10` : (completed === false ? 'Não realizado' : '...')}</p>
                        </div>
                        <div className="result-card__message">
                            <p>
                                Temos um teste ainda mais robusto, deseja realizá-lo ou
                                continuar para uma lista de terapeutas prontos para atender
                                às suas necessidades?
                            </p>

                        </div>


                        <div className="result-card__actions">

                            <ButtonEnter
                            label='Continuar'
                            onclick={() => router.push('/Patient/TherapistList')}
                            />

                            <Link href="/Patient/AQ50TestWeb">
                                <button className='result-card__secondary-button'>
                                    <h3>Acessar Teste</h3>
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>
        </div>
        </ProtectedRoute>
    )
}
