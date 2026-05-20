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

const options = ["Presencial", "Híbrido", "Online"];
const optionMap: { [key: string]: 'PRESENTIAL' | 'BOTH' | 'ONLINE' } = {
    "Presencial": "PRESENTIAL",
    "Híbrido": "BOTH",
    "Online": "ONLINE"
};

type FieldErrors = Partial<Record<
    'name' | 'email' | 'password' | 'date' | 'city' | 'specialty' | 'experience' | 'register' | 'modality',
    string
>>;

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
        const d = validateBirthDateBR(date); if (d) errs.date = d;
        const c = required(city, 'Cidade'); if (c) errs.city = c;
        const s = required(specialty, 'Especialidade'); if (s) errs.specialty = s;
        const ex = required(experiencetime, 'Experiência'); if (ex) errs.experience = ex;
        const rg = required(register, 'Registro profissional'); if (rg) errs.register = rg;
        if (!selected) errs.modality = 'Selecione a modalidade.';
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
            const [day, month, year] = date.split('/');
            const formattedBirthDate = `${year}-${month}-${day}`;

            await registerUser({
                name: name.trim(),
                email: email.trim(),
                password,
                birthDate: formattedBirthDate,
                city: city.trim(),
                specialty: specialty.trim(),
                experience: experiencetime.trim(),
                professionalRegister: register.trim(),
                attendanceModality: optionMap[selected],
                role: 'THERAPIST'
            });
        } catch (err) {
            setError(handleApiError(err));
        }
    };
    
        const formatBirthDate = (value: string) => {
        value = value.replace(/\D/g, '');

        value = value.slice(0, 8);

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
                        <div style={{ backgroundColor: '#fee', color: '#c00', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>
                            <p>{error}</p>
                        </div>
                    )}

                    <p>Nome:</p>
                    <Input
                        autoComplete="name"
                        description='Insira seu nome completo'
                        value={name}
                        onChange={(e) => { setName(e.target.value); clearField('name'); }}
                        onBlur={() => setFieldErrors({ ...fieldErrors, name: required(name, 'Nome') || undefined })}
                        error={fieldErrors.name}
                    />

                    <p>Data de Nascimento:</p>
                    <Input
                        description='DD/MM/YYYY'
                        value={date}
                        onChange={(e) => {
                            setDate(formatBirthDate(e.target.value));
                            clearField('date');
                        }}
                        onBlur={() =>
                            setFieldErrors({
                                ...fieldErrors,
                                date: validateBirthDateBR(date) || undefined
                            })
                        }
                        error={fieldErrors.date}
                    />
                    <p>Cidade:</p>
                    <Input
                        description='Insira a cidade que mora'
                        value={city}
                        onChange={(e) => { setCity(e.target.value); clearField('city'); }}
                        onBlur={() => setFieldErrors({ ...fieldErrors, city: required(city, 'Cidade') || undefined })}
                        error={fieldErrors.city}
                    />

                    <p>Especialidade:</p>
                    <Input
                        description='Insira sua especialidade de trabalho'
                        value={specialty}
                        onChange={(e) => { setSpecialty(e.target.value); clearField('specialty'); }}
                        onBlur={() => setFieldErrors({ ...fieldErrors, specialty: required(specialty, 'Especialidade') || undefined })}
                        error={fieldErrors.specialty}
                    />

                    <p>Tempo de Experiência:</p>
                    <Input
                        description='Insira seu tempo de experiência na área'
                        value={experiencetime}
                        onChange={(e) => { setExperienceTime(e.target.value); clearField('experience'); }}
                        onBlur={() => setFieldErrors({ ...fieldErrors, experience: required(experiencetime, 'Experiência') || undefined })}
                        error={fieldErrors.experience}
                    />

                    <p>Métodos de Atendimento:</p>
                    <div className="select-container">
                        <div
                            className="select-box"
                            onClick={() => setOpen(!open)}
                            style={fieldErrors.modality ? { outline: '2px solid #c0392b' } : undefined}
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
                                    clearField('modality');
                                }}
                                >
                                {opt}
                                </div>
                            ))}
                            </div>
                        )}
                    </div>
                    {fieldErrors.modality && (
                        <small style={{ color: '#c0392b', fontSize: '13px', paddingLeft: '12px' }}>{fieldErrors.modality}</small>
                    )}

                    <p>Registro Profissional:</p>
                    <Input
                        description='Insira seu número de registro profissional'
                        value={register}
                        onChange={(e) => { setRegister(e.target.value); clearField('register'); }}
                        onBlur={() => setFieldErrors({ ...fieldErrors, register: required(register, 'Registro profissional') || undefined })}
                        error={fieldErrors.register}
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
                        <div style={{ marginTop: '15px', marginLeft: '30px' }}>
                            <Link href={ROUTES.login}>
                                Já possui conta? Entrar
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
