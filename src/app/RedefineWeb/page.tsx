"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, authService } from '@/lib';
import { handleApiError } from '@/utils/apiErrors';
import './redefine.css'
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '../../assets/images/return-icon.svg';
import Input from '@/components/input/Input';
import ButtonEnter from '@/components/enter-button/Button';


export default function RedefinePassword () {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/Home');
        }
    }, [isAuthenticated, router]);

    if (isAuthenticated) {
        return <div>Redirecting...</div>;
    }

    const handleSubmit = async () => {
        if (!email) { setError('Informe o email.'); return; }
        try {
            setSubmitting(true);
            setError(null);
            await authService.forgotPassword({ email });
            if (typeof window !== 'undefined') {
                sessionStorage.setItem('resetEmail', email);
            }
            router.push('/CodeAuthentication');
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
                    <h2>Redefinir Senha</h2>
                    <div className="reset-password__card">
                        <div className="reset-password__message">
                            <p>
                                Informe o email registrado em sua conta e
                                lhe enviaremos um link para a redefinição de senha
                            </p>
                        </div>

                        {error && (
                            <div style={{ backgroundColor: '#fee', color: '#c00', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>
                                <p>{error}</p>
                            </div>
                        )}

                        <div className="reset-password__input-group">
                            <p>Email:</p>
                            <Input
                                description='Insira seu email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="reset-password__actions">
                            <ButtonEnter
                                label={submitting ? 'Enviando...' : 'Enviar'}
                                onclick={handleSubmit}
                            />
                        </div>
                    </div>

                </div>
            </div>
    )
}
