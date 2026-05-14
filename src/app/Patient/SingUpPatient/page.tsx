"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib';
import { handleApiError } from '@/utils/apiErrors';
import './singup.css'
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Input from '@/components/input/Input';
import ButtonEnter from '@/components/enter-button/Button';
import Link from 'next/link';

export default function PatientSingup () {
    const router = useRouter();
    const { register, isLoading, isAuthenticated } = useAuth();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [city, setCity] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/Home');
        }
    }, [isAuthenticated, router]);

    const handleRegister = async () => {
        try {
            setError(null);

            // Validate DD/MM/YYYY
            const isValidDate = /^\d{2}\/\d{2}\/\d{4}$/.test(birthDate);

            if (!isValidDate) {
                setError('Data inválida. Use DD/MM/YYYY');
                return;
            }

            // Convert DD/MM/YYYY -> YYYY-MM-DD
            const [day, month, year] = birthDate.split('/');
            const formattedBirthDate = `${year}-${month}-${day}`;

            await register({
                name,
                email,
                password,
                birthDate: formattedBirthDate,
                city,
                role: 'PATIENT'
            });

            // Redirection is handled by AuthContext
        } catch (err) {
            setError(handleApiError(err));
        }
    };

    return(
        <div className="signup-section">
            <HeaderEnter
                src={Return}
            />

            <div className="signup-container">
                <h2>Cadastro</h2>

                <div className="signup-card">
                    {error && (
                        <div
                            style={{
                                backgroundColor: '#fee',
                                color: '#c00',
                                padding: '10px',
                                borderRadius: '4px',
                                marginBottom: '15px'
                            }}
                        >
                            <p>{error}</p>
                        </div>
                    )}

                    <p>Nome:</p>
                    <Input
                        description='Insira seu nome'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <p>Data de Nascimento:</p>
                    <Input
                        description='Insira sua data de nascimento (DD/MM/YYYY)'
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />

                    <p>Cidade:</p>
                    <Input
                        description='Insira sua cidade'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />

                    <p>Email:</p>
                    <Input
                        description='Insira seu email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    
                    <p>Senha:</p>
                    <Input
                        description='Defina sua senha'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="signup-actions">
                        <ButtonEnter
                            label={isLoading ? 'Registrando...' : 'Enviar'}
                            onclick={handleRegister}
                        />
                    </div>

                    <div style={{ marginTop: '15px' }}>
                        <Link href="/login">
                            Já possui conta? Entrar
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}