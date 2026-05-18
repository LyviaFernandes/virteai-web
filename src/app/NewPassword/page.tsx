"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/routes';
import { useAuth, authService } from '@/lib';
import { handleApiError } from '@/utils/apiErrors';
import './style.css'
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '../../assets/images/return-icon.svg';
import Input from '@/components/input/Input';


export default function NewPassword () {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            router.push(ROUTES.home);
        }
    }, [isAuthenticated, router]);

    if (isAuthenticated) {
        return <div>Redirecting...</div>;
    }

    const handleSubmit = async () => {
        if (!password) { setError('Informe a nova senha.'); return; }
        try {
            setSubmitting(true);
            setError(null);
            const token = (typeof window !== 'undefined' && sessionStorage.getItem('resetToken')) || 'MOCK_TOKEN';
            await authService.resetPassword({ token, password });
            setSuccess(true);
            setTimeout(() => router.push(ROUTES.login), 800);
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setSubmitting(false);
        }
    };

    return(
        <div className="reset-password">
            <HeaderEnter
            src={Return}
            />

                <div className="reset-password__container">
                    <h2>Redefina sua Senha</h2>
                    <div className="reset-password__card">
                        <div className="reset-password__message">
                            <p>Insira sua nova senha:</p>
                        </div>

                        {error && (
                            <div style={{ backgroundColor: '#fee', color: '#c00', padding: '10px', borderRadius: '4px' }}>
                                <p>{error}</p>
                            </div>
                        )}
                        {success && (
                            <div style={{ backgroundColor: '#efe', color: '#080', padding: '10px', borderRadius: '4px' }}>
                                <p>Senha atualizada! Redirecionando para o login...</p>
                            </div>
                        )}

                        <div className="reset-password__input-group">
                            <p>Senha:</p>
                            <Input
                                type="password"
                                description='Insira sua senha'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="reset-password__actions">
                            <button onClick={handleSubmit} disabled={submitting}>
                                {submitting ? 'Enviando...' : 'Enviar'}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
    )
}
