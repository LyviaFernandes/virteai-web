"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib';
import { handleApiError } from '@/utils/apiErrors';
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
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/Home');
        }
    }, [isAuthenticated, router]);

    const handleLogin = async () => {
        try {
            setError(null);
            await login({ email, password });
            // Redirection is handled by AuthContext
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
                        description='Insira seu email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <p>Senha:</p>
                    <Input
                        description='Insira sua senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Link href="/RedefineWeb">
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

                        <Link href="/Profile">
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