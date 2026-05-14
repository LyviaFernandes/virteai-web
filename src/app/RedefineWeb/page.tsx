"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib';
import './redefine.css'
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '../../assets/images/return-icon.svg';
import Input from '@/components/input/Input';
import ButtonEnter from '@/components/enter-button/Button';
import Link from 'next/link';


export default function RedefinePassword () {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const [email, setEmail] = useState('');

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
                    <h2>Redefinir Senha</h2>
                    <div className="reset-password__card">
                        <div className="reset-password__message">
                            <p>
                                Informe o email registrado em sua conta e 
                                lhe enviaremos um link para a redefinição de senha
                            </p>

                        </div>
                        <div className="reset-password__input-group">
                            <p>Email:</p>
                            <Input
                                description='Insira seu email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="reset-password__actions">
                            <Link href="../CodeAuthentication">
                            </Link>
                            <ButtonEnter
                            label='Enviar'
                            onclick={() => console.log("oi")}
                            />
                        </div>
                    </div>

                </div>
            </div>
    )
}