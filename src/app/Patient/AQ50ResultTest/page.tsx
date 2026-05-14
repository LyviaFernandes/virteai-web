"use client"

import { useEffect, useState } from 'react';
import './result.css'
import Return from '@/assets/images/return-icon.svg';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Link from "next/link";
import { useTest } from '@/lib';
import ProtectedRoute from '@/components/ProtectedRoute';
import { handleApiError } from '@/utils/apiErrors';

export default function ResultBigQuestionnaire () {
    const { checkTest50 } = useTest();
    const [score, setScore] = useState<number | null>(null);
    const [completed, setCompleted] = useState<boolean | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const result = await checkTest50();
                if (!cancelled) {
                    setCompleted(!!result?.completed);
                    setScore(result?.score ?? null);
                }
            } catch (err) {
                if (!cancelled) setError(handleApiError(err));
            }
        })();
        return () => { cancelled = true; };
    }, [checkTest50]);

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
                            <p>{score !== null ? `${score}/50` : (completed === false ? 'Não realizado' : '...')}</p>
                        </div>
                        <div className="result-card__message">
                            <p>
                                Deseja continuar para ter acesso à uma lista de
                                terapeutas prontos para atender às suas necessidades?
                            </p>

                        </div>


                        <div className="result-card__actions">

                            <Link href="/Patient/TherapistList">
                                <button className='result-button'>
                                    <h3>Continuar</h3>
                                </button>
                            </Link>


                        </div>
                    </div>

                </div>
        </div>
        </ProtectedRoute>
    )
}
