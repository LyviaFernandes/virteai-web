"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/routes';
import { useAuth } from '@/lib';
import { handleApiError } from '@/utils/apiErrors';
import './singup.css'
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Input from '@/components/input/Input';
import ButtonEnter from '@/components/enter-button/Button';
import Link from 'next/link';

const options = ["Presencial", "Híbrido", "Online"];
const optionMap: { [key: string]: string } = {
    "Presencial": "PRESENCIAL",
    "Híbrido": "BOTH",
    "Online": "ONLINE"
};

export default function TherapistSignup () {
    const router = useRouter();
    const { register: registerUser, isLoading, isAuthenticated } = useAuth();

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("");

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [date, setDate] = useState('');
    const [city, setCity] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [experiencetime, setExperienceTime] = useState('');
    const [register, setRegister] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isAuthenticated) {
            router.push(ROUTES.home);
        }
    }, [isAuthenticated, router]);

    const handleRegister = async () => {
        try {
            setError(null);

            // Validate DD/MM/YYYY
            const isValidDate = /^\d{2}\/\d{2}\/\d{4}$/.test(date);

            if (!isValidDate) {
                setError('Data inválida. Use DD/MM/YYYY');
                return;
            }

            // Convert DD/MM/YYYY -> YYYY-MM-DD
            const [day, month, year] = date.split('/');
            const formattedBirthDate = `${year}-${month}-${day}`;
            
            await registerUser({
                name,
                email,
                password,
                birthDate: formattedBirthDate,
                city,
                specialty,
                experience: experiencetime,
                professionalRegister: register,
                attendanceModality: optionMap[selected] as 'ONLINE' | 'PRESENCIAL' | 'BOTH',
                role: 'THERAPIST'
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
                        <div style={{ backgroundColor: '#fee', color: '#c00', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>
                            <p>{error}</p>
                        </div>
                    )}

                    <p>Nome:</p>
                        <Input
                            description='Insira seu nome completo'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    <p>Data de Nascimento:</p>
                        <Input
                            description='Insira sua data de nascimento'
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    <p>Cidade:</p>
                        <Input
                            description='Insira a cidade que mora'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    <p>Especialidade:</p>
                        <Input
                            description='Insira sua especialidade de trabalho'
                            value={specialty}
                            onChange={(e) => setSpecialty(e.target.value)}
                        />
                    <p>Tempo de Experiência:</p>
                        <Input
                            description='Insira seu tempo de experiência na área'
                            value={experiencetime}
                            onChange={(e) => setExperienceTime(e.target.value)}
                        />

                    <p>Métodos de Atendimento:</p>
                         <div className="select-container">
                            <div
                                className="select-box"
                                onClick={() => setOpen(!open)}
                                
                            >
                                {selected || "Selecione"}
                            </div>

                            {open && (
                                <div className="dropdown">
                                {options.map((opt) => (
                                    <div
                                    key={opt}
                                    className="option"
                                    onClick={() => {
                                        setSelected(opt);
                                        setOpen(false);
                                    }}
                                    >
                                    {opt}
                                    </div>
                                ))}
                                
                                </div>
                            )}
                        </div>
                    

                    <p>Registro Profissional:</p>
                        <Input
                            description='Insira seu número de registro profissional'
                            value={register}
                            onChange={(e) => setRegister(e.target.value)}
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
                            label={isLoading ? 'Registrando...' : 'Enviar'}
                            onclick={handleRegister}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}