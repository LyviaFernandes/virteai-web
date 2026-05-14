"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib';
import './style.css'
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '../../assets/images/return-icon.svg';
import Input from '@/components/input/Input';
import Link from 'next/link';


export default function NewPassword () {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/Home');
        }
    }, [isAuthenticated, router]);

    if (isAuthenticated) {
        return <div>Redirecting...</div>;
    }

    return(
        <div className="reset-password">
            <HeaderEnter
            src={Return}
            />
            
                <div className="reset-password__container">
                    <h2>Redefina sua Senha</h2>
                    <div className="reset-password__card">
                        <div className="reset-password__message">
                            <p>
                                Insira sua nova senha:
                            </p>

                        </div>
                        <div className="reset-password__input-group">
                            <p>Senha:</p>
                            <Input
                                description='Insira sua senha'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="reset-password__actions">
                            <Link href="../Profile">
                                <button>Enviar</button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
    )
}