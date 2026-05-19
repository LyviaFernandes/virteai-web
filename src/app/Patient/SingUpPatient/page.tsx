"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/routes';
import { useAuth } from '@/lib';
import { handleApiError } from '@/utils/apiErrors';
import { validateEmail, validatePassword, validateBirthDateBR, required } from '@/utils/validators';
import './singup.css'
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Input from '@/components/input/Input';
import ButtonEnter from '@/components/enter-button/Button';
import Link from 'next/link';

type FieldErrors = Partial<Record<'name' | 'email' | 'password' | 'birthDate' | 'city', string>>;

export default function PatientSingup () {
    const router = useRouter();
    const { register, isLoading, isAuthenticated } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [city, setCity] = useState('');
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isAuthenticated) {
            router.push(ROUTES.home);
        }
    }, [isAuthenticated, router]);

    const validate = (): boolean => {
        const errs: FieldErrors = {};
        const n = required(name, 'Nome'); if (n) errs.name = n;
        const e = validateEmail(email); if (e) errs.email = e;
        const p = validatePassword(password); if (p) errs.password = p;
        const d = validateBirthDateBR(birthDate); if (d) errs.birthDate = d;
        const c = required(city, 'Cidade'); if (c) errs.city = c;
        setFieldErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const clearField = (field: keyof FieldErrors) => {
        if (fieldErrors[field]) setFieldErrors({ ...fieldErrors, [field]: undefined });
    };

    const handleRegister = async () => {
        setError(null);
        if (!validate()) return;
        try {
            const [day, month, year] = birthDate.split('/');
            const formattedBirthDate = `${year}-${month}-${day}`;

            await register({
                name: name.trim(),
                email: email.trim(),
                password,
                birthDate: formattedBirthDate,
                city: city.trim(),
                role: 'PATIENT'
            });
        } catch (err) {
            setError(handleApiError(err));
        }
    };
    const formatBirthDate = (value: string) => {
    // remove tudo que não for número
    value = value.replace(/\D/g, '');

    // limita em 8 números
    value = value.slice(0, 8);

    // adiciona as barras
    if (value.length > 4) {
        value = value.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3');
    } else if (value.length > 2) {
        value = value.replace(/(\d{2})(\d{1,2})/, '$1/$2');
    }

    return value;
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
                                backgroundColor: '#CADAED',
                                color: '#c00',
                                padding: '10px',
                                borderRadius: '4px',
                                marginBottom: '15px',
                                alignItems: 'center',
                            }}
                        >
                            <p>{error}</p>
                        </div>
                    )}

                    <p>Nome:</p>
                    <Input
                        autoComplete="name"
                        description='Insira seu nome'
                        value={name}
                        onChange={(e) => { setName(e.target.value); clearField('name'); }}
                        onBlur={() => setFieldErrors({ ...fieldErrors, name: required(name, 'Nome') || undefined })}
                        error={fieldErrors.name}
                    />

                    <p>Data de Nascimento:</p>
                    <Input
                        description='DD/MM/YYYY'
                        value={birthDate}
                        onChange={(e) => {
                            setBirthDate(formatBirthDate(e.target.value));
                            clearField('birthDate');
                        }}
                        onBlur={() =>
                            setFieldErrors({
                                ...fieldErrors,
                                birthDate: validateBirthDateBR(birthDate) || undefined
                            })
                        }
                        error={fieldErrors.birthDate}
                    />

                    <p>Cidade:</p>
                    <Input
                        description='Insira sua cidade'
                        value={city}
                        onChange={(e) => { setCity(e.target.value); clearField('city'); }}
                        onBlur={() => setFieldErrors({ ...fieldErrors, city: required(city, 'Cidade') || undefined })}
                        error={fieldErrors.city}
                    />

                    <p>Email:</p>
                    <Input
                        type="email"
                        autoComplete="email"
                        description='Insira seu email'
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); clearField('email'); }}
                        onBlur={() => setFieldErrors({ ...fieldErrors, email: validateEmail(email) || undefined })}
                        error={fieldErrors.email}
                    />

                    <p>Senha:</p>
                    <Input
                        type="password"
                        autoComplete="new-password"
                        description='Mínimo 8 caracteres, com letras e números'
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); clearField('password'); }}
                        onBlur={() => setFieldErrors({ ...fieldErrors, password: validatePassword(password) || undefined })}
                        error={fieldErrors.password}
                    />

                    <div className="signup-actions">
                        <ButtonEnter
                            label={isLoading ? 'Registrando...' : 'Enviar'}
                            onclick={handleRegister}
                        />
                    </div>

                    <div style={{ marginTop: '15px' }}>
                        <Link href={ROUTES.login}>
                            Já possui conta? Entrar
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
