"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib';
import { ROUTES } from '@/lib/routes';
import { handleApiError } from '@/utils/apiErrors';
import { validateEmail, required } from '@/utils/validators';
import './login.css'
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Input from '@/components/input/Input';
import ButtonEnter from '@/components/enter-button/Button';
import Link from "next/link";


export default function Login () {
    const router = useRouter();
    const { login, isLoading, isAuthenticated } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isAuthenticated) {
            router.push(ROUTES.home);
        }
    }, [isAuthenticated, router]);

    const validate = () => {
        const errs: typeof fieldErrors = {};
        const e = validateEmail(email);
        if (e) errs.email = e;
        const p = required(password, 'Senha');
        if (p) errs.password = p;
        setFieldErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleLogin = async () => {
        setError(null);
        if (!validate()) return;
        try {
            await login({ email: email.trim(), password });
        } catch (err) {
            setError(handleApiError(err));
        }
    };

    if (isAuthenticated) {
        return <div>Redirecting...</div>;
    }

    return(
        <div className="login-section">
            <HeaderEnter
            src={Return}
            />

            <div className="login-container">
                <h2>Login</h2>
                <div className="login-card">
                    {error && (
                        <div style={{ backgroundColor: '#fee', color: '#c00', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>
                            <p>{error}</p>
                        </div>
                    )}

                    <p>Email:</p>
                    <Input
                        type="email"
                        autoComplete="email"
                        description='Insira seu email'
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined }); }}
                        onBlur={() => setFieldErrors({ ...fieldErrors, email: validateEmail(email) || undefined })}
                        error={fieldErrors.email}
                    />

                    <p>Senha:</p>
                    <Input
                        type="password"
                        autoComplete="current-password"
                        description='Insira sua senha'
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: undefined }); }}
                        onBlur={() => setFieldErrors({ ...fieldErrors, password: required(password, 'Senha') || undefined })}
                        error={fieldErrors.password}
                    />

                    <Link href={ROUTES.passwordReset}>
                        <button className='login-forgot-password'>
                            <div className="login-forgot-password__text">
                                <p>esqueci a senha</p>
                            </div>
                        </button>
                    </Link>

                    <div className="login-actions">
                        <ButtonEnter
                            label={isLoading ? 'Entrando...' : 'Entrar'}
                            onclick={handleLogin}
                        />

                        <Link href={ROUTES.profile}>
                            <button className='login-register'>
                                <p>Não tenho cadastro</p>
                            </button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}
