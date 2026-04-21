"use client"

import { useState } from 'react';
import './singup.css'
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Input from '@/components/input/Input';
import ButtonEnter from '@/components/enter-button/Button';

export default function PatientSingup () {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return(
        <div className="signup-section">
            <HeaderEnter
            src={Return}
            />

            <div className="signup-container">
                <h2>Cadastro</h2>
                <div className="signup-card">
                    <p>Nome:</p>
                    <Input
                        description='Insira seu nome completo'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <p>Email:</p>
                    <Input
                        description='Insira seu email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    
                    <p>Senha:</p>
                    <Input
                        description='defina sua senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="signup-actions">
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