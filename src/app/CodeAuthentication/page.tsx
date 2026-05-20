"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib';
import { ROUTES } from '@/lib/routes';
import './style.css'
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '../../assets/images/return-icon.svg';

export default function CodeAuthentication () {
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    const [userCode, setUserCode] = useState(['', '', '', '', '']);

    useEffect(() => {
        if (isAuthenticated) {
            router.push(ROUTES.home);
        }
    }, [isAuthenticated, router]);

    const handleChange = (value: string, index: number) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newCode = [...userCode];
        newCode[index] = value;
        setUserCode(newCode);
    };

    const handleSubmit = () => {
        const code = userCode.join('');

        if (code.length === 5) {
            if (typeof window !== 'undefined') {
                sessionStorage.setItem('resetToken', code);
            }
            router.push(ROUTES.newPassword);
        } else {
            alert('Informe os 5 dígitos do código.');
        }
    };

    if (isAuthenticated) {
        return <div>Redirecting...</div>;
    }

    return(
        <div className="reset-password">
            <HeaderEnter src={Return} />
            
            <div className="reset-password__container">
                <h2>Autenticação</h2>

                <div className="reset-password__card">
                    <div className="reset-password__message">
                        <p>
                            Enviamos um código de 5 dígitos para o seu email. Informe-o abaixo para continuar a redefinição de senha.
                        </p>
                    </div>

                    <div className="code-inputs">
                        {userCode.map((value, index) => (
                            <input
                                key={index}
                                className="code-input"
                                maxLength={1}
                                value={value}
                                onChange={(e) => handleChange(e.target.value, index)}
                            />
                        ))}
                    </div>

                    <div className="reset-password__actions">
                        <button onClick={handleSubmit}>Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}