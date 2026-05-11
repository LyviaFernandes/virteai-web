"use client"

import { useState } from 'react';
import './style.css'
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '../../assets/images/return-icon.svg';
import Input from '@/components/input/Input';
import Link from 'next/link';


export default function NewPassword () {
    const [password, setPassword] = useState('');
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