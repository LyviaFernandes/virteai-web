"use client"

import { useState } from 'react';
import './singup.css'
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Input from '@/components/input/Input';
import ButtonEnter from '@/components/enter-button/Button';
import Link from 'next/link';

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
                        description='Insira seu nome'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <p>Data de Nascimento:</p>
                    <Input
                        description='Insira sua data de nascimento'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <p>Cidade:</p>
                    <Input
                        description='Insira sua data de nascimento'
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
                        <Link href="../../Login">
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