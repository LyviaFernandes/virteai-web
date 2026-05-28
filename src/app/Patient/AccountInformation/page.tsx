"use client"

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/routes';
import { useAuth, usePatient } from '@/lib';
import { handleApiError } from '@/utils/apiErrors';
import './account.css'
import Image from 'next/image';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Iconpaciente from '@/assets/images/ProfileIcon.svg';
import editimage from '@/assets/images/EditImageIcon.svg';
import infoicon from '@/assets/images/InfoIcon.svg';
import Footer from '@/components/footer/Footer';
import edit from '@/assets/images/editicon.svg';
import type { PatientProfile } from '@/types/index';

export default function AccountInformation () {
    const router = useRouter();
    const { isAuthenticated, user } = useAuth();
    const { getMyProfile, loading } = usePatient();
const [patientData, setPatientData] = useState<PatientProfile | null>(null);    const [error, setError] = useState<string | null>(null);
    const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isEditingName, setIsEditingName] = useState(false);
    const [editedName, setEditedName] = useState('');


    const [isEditingBirthDate, setIsEditingBirthDate] = useState(false);
    const [editedBirthDate, setEditedBirthDate] = useState('');

    const [isEditingCountry, setIsEditingCountry] = useState(false);
    const [editedCountry, setEditedCountry] = useState('');

    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [editedEmail, setEditedEmail] = useState('');

    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [editedPassword, setEditedPassword] = useState('');

    useEffect(() => {
        if (!isAuthenticated) {
            router.push(ROUTES.login);
            return;
        }
        if (user?.role !== 'PATIENT') {
            router.push(ROUTES.home);
            return;
        }

        const fetchPatientData = async () => {
         try {
        const data: any = await getMyProfile();

        setPatientData(data);

        // Nome
        setEditedName(data.name || '');

        // Data de nascimento
        setEditedBirthDate(
            data.birthDate
                ? data.birthDate.split('T')[0]
                : ''
        );

        // País
        setEditedCountry(data.country || '');

        // Email
        setEditedEmail(data.email || '');

    } catch (err) {
        setError(handleApiError(err));
    }
};
        
        fetchPatientData();
        
    }, [isAuthenticated, user, router, getMyProfile]);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
            // TODO: Implement image upload to backend
        }
    };

    if (!isAuthenticated) {
        return <div style={{ padding: '20px', textAlign: 'center' }}>Please log in</div>;
    }

    if (loading || !patientData) {
        return <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>;
    }

    return(
        <div className="account-page">
            <HeaderEnter
                src={Return}
            />

            <div className="account-profile">
                <div className="account-avatar-wrapper">
                   <div className="account-avatar" onClick={handleImageClick}>
                        <Image
                            src={profileImage || patientData.profileImage || Iconpaciente}
                            alt="Foto do usuário"
                            fill
                            className="account-avatar-image"
                        />

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                    </div>
                    <div className="box-edit" onClick={handleImageClick}>

                        <Image
                            src={editimage}
                            alt=""
                            className="edit"
                        />
                        <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                            />
                    </div>

                </div>

                <div className="account-user-info">
                    <h2>{patientData.name}</h2>

                    <div className="account-status">
                        <p>{patientData.status || 'Paciente em acompanhamento'}</p>
                    </div>

                    <div className="box-ID">
                        <h3>ID: {patientData.userId}</h3>
                        <div className="info-wrapper">
                                <Image
                                    src={infoicon}
                                    alt=""
                                    className="infoicon"
                                />

                                <div className="info-tooltip">
                                Esse ID é necessário para a segurança
                                e exclusividade no acesso aos cenários
                                </div>
                             </div>
                    </div>
                </div>
            </div>

            <div className="personal-data-section">
                <h3 className='personal-data-title'>Dados Pessoais:</h3>

                <div className="personal-data-item">

                    {isEditingName ? (
                        <>
                            <input
                                className='editprogram'
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                            />
                            <button className='edit_button'
                                onClick={() => {
                                    // futuramente enviar para API
                                    setPatientData({
                                        ...patientData,
                                        name: editedName
                                    });

                                    setIsEditingName(false);
                                }}
                            >
                                Salvar
                            </button>

                            <button className='edit_button'
                                onClick={() => {
                                    setEditedName(patientData.name);
                                    setIsEditingName(false);
                                }}
                            >
                                Cancelar
                            </button>

                        </>
                    ) : (
                        <>
                            <p>Nome: {patientData.name}</p>

                            <Image
                                src={edit}
                                alt="Editar nome"
                                className="edit-icon"
                                onClick={() => setIsEditingName(true)}
                            />
                        </>
                    )}

                </div>
                <div className="personal-data-item">

                    {isEditingBirthDate ? (
                        <>
                            <input 
                                className='editprogram'
                                type="date"
                                value={editedBirthDate}
                                onChange={(e) => setEditedBirthDate(e.target.value)}
                            />

                            <button className='edit_button'
                                onClick={() => {
                                    setPatientData({
                                        ...patientData,
                                        birthDate: editedBirthDate
                                    });

                                    setIsEditingBirthDate(false);
                                }}
                            >
                                Salvar
                            </button>

                            <button className='edit_button'
                                onClick={() => {
                                    setEditedBirthDate(
                                        patientData.birthDate
                                            ? patientData.birthDate.split('T')[0]
                                            : ''
                                    );

                                    setIsEditingBirthDate(false);
                                }}
                            >
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <>
                            <p>
                                Data de nascimento: {
                                    patientData.birthDate
                                        ? patientData.birthDate.split('T')[0].split('-').reverse().join('/')
                                        : 'Não informado'
                                }
                            </p>

                            <Image
                                src={edit}
                                alt=""
                                className="edit-icon"
                                onClick={() => setIsEditingBirthDate(true)}
                            />
                        </>
                    )}

                </div>

                <div className="personal-data-item">

                    {isEditingCountry ? (
                        <>
                            <input
                                className='editprogram'
                                value={editedCountry}
                                onChange={(e) => setEditedCountry(e.target.value)}
                            />

                            <button className='edit_button'
                                onClick={() => {
                                    setPatientData({
                                        ...patientData,
                                        country: editedCountry
                                    });

                                    setIsEditingCountry(false);
                                }}
                            >
                                Salvar
                            </button>

                            <button className='edit_button'
                                onClick={() => {
                                    setEditedCountry(patientData.country || '');

                                    setIsEditingCountry(false);
                                }}
                            >
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <>
                            <p>País: {patientData.country || 'Brasil'}</p>

                            <Image
                                src={edit}
                                alt=""
                                className="edit-icon"
                                onClick={() => setIsEditingCountry(true)}
                            />
                        </>
                    )}

                </div>
            </div>

            <div className="account-settings-section">
                <h3 className='account-settings-title'>Informações da conta</h3>

                <div className="account-field">
                    <p>Email:</p>

                    {isEditingEmail ? (
                        <>
                            <input
                                className='editprogram'
                                value={editedEmail}
                                onChange={(e) => setEditedEmail(e.target.value)}
                            />

                            <button className='edit_button'
                                onClick={() => {
                                    setPatientData({
                                        ...patientData,
                                        email: editedEmail
                                    });

                                    setIsEditingEmail(false);
                                }}
                            >
                                Salvar
                            </button>

                            <button className='edit_button'
                                onClick={() => {
                                    setEditedEmail(patientData.email || '');

                                    setIsEditingEmail(false);
                                }}
                            >
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <>
                            <input
                                value={patientData.email || ''}
                                readOnly
                            />

                            <Image
                                src={edit}
                                alt=""
                                className="edit-icon"
                                onClick={() => setIsEditingEmail(true)}
                            />
                        </>
                    )}
                </div>
                <div className="account-field">
                    <p>Senha:</p>

                    {isEditingPassword ? (
                        <>
                            <input
                                className='editprogram'
                                type="password"
                                value={editedPassword}
                                onChange={(e) => setEditedPassword(e.target.value)}
                                placeholder="Nova senha"
                            />

                            <button className='edit_button'
                                onClick={() => {
                                    setIsEditingPassword(false);
                                    setEditedPassword('');
                                }}
                            >
                                Salvar
                            </button>

                            <button className='edit_button'
                                onClick={() => {
                                    setIsEditingPassword(false);
                                    setEditedPassword('');
                                }}
                            >
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <>
                            <input
                                value="••••••••••••"
                                type="password"
                                readOnly
                            />

                            <Image
                                src={edit}
                                alt=""
                                className="edit-icon"
                                onClick={() => setIsEditingPassword(true)}
                            />
                        </>
                    )}
                </div>
            </div>

            {error && (
                <div style={{ backgroundColor: '#fee', color: '#c00', padding: '10px', borderRadius: '4px', margin: '20px' }}>
                    <p>{error}</p>
                </div>
            )}

            <Footer/>
        </div>
    )
}
