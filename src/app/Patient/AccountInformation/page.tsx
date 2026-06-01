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
    const { getMyProfile, updateMyProfile, loading } = usePatient();
    const [patientData, setPatientData] = useState<PatientProfile | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isSaving, setIsSaving] = useState(false);

    const [isEditingName, setIsEditingName] = useState(false);
    const [editedName, setEditedName] = useState('');

    const [isEditingBirthDate, setIsEditingBirthDate] = useState(false);
    const [editedBirthDate, setEditedBirthDate] = useState('');

    const [isEditingCity, setIsEditingCity] = useState(false);
    const [editedCity, setEditedCity] = useState('');

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
                const data: PatientProfile = await getMyProfile();
                setPatientData(data);

                // Nome
                setEditedName(data.name || '');

                // Data de nascimento
                setEditedBirthDate(
                    data.birthDate
                        ? data.birthDate.split('T')[0]
                        : ''
                );

                // Cidade
                setEditedCity(data.city || '');
            } catch (err) {
                setError(handleApiError(err));
            }
        };
        
        fetchPatientData();
    }, [isAuthenticated, user, router, getMyProfile]);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const uploadProfileImage = async (file: File) => {
        try {
            setIsSaving(true);
            const formData = new FormData();
            formData.append('profilePicture', file);

            const updatedProfile = await updateMyProfile(formData);
            setPatientData(updatedProfile);
            setProfileImage(updatedProfile.profileImage);
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setIsSaving(false);
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
            uploadProfileImage(file);
            event.currentTarget.value = '';
        }
    };

    const handleSaveField = async (field: 'birthDate' | 'city' | 'name') => {
        try {
            setIsSaving(true);
            const updateData: any = {};
            
            if (field === 'birthDate') {
                updateData.birthDate = editedBirthDate;
            } else if (field === 'city') {
                updateData.city = editedCity;
            } else if (field === 'name') {
                updateData.name = editedName;
            }

            const updatedProfile = await updateMyProfile(updateData);
            setPatientData(updatedProfile);

            if (field === 'birthDate') {
                setIsEditingBirthDate(false);
            } else if (field === 'city') {
                setIsEditingCity(false);
            } else if (field === 'name') {
                setIsEditingName(false);
            }
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancelEdit = (field: 'birthDate' | 'city' | 'name') => {
        if (field === 'birthDate' && patientData) {
            setEditedBirthDate(
                patientData.birthDate
                    ? patientData.birthDate.split('T')[0]
                    : ''
            );
            setIsEditingBirthDate(false);
        } else if (field === 'city' && patientData) {
            setEditedCity(patientData.city || '');
            setIsEditingCity(false);
        } else if (field === 'name' && patientData) {
            setEditedName(patientData.name || '');
            setIsEditingName(false);
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
                                disabled={isSaving}
                            />
                            <button className='edit_button'
                                onClick={() => handleSaveField('name')}
                                disabled={isSaving}
                            >
                                {isSaving ? 'Salvando...' : 'Salvar'}
                            </button>
                            <button className='edit_button'
                                onClick={() => handleCancelEdit('name')}
                                disabled={isSaving}
                            >
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <>
                            <p>Nome: {patientData.name || 'Não informado'}</p>
                            <Image
                                src={edit}
                                alt=""
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
                                disabled={isSaving}
                            />

                            <button className='edit_button'
                                onClick={() => handleSaveField('birthDate')}
                                disabled={isSaving}
                            >
                                {isSaving ? 'Salvando...' : 'Salvar'}
                            </button>

                            <button className='edit_button'
                                onClick={() => handleCancelEdit('birthDate')}
                                disabled={isSaving}
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

                    {isEditingCity ? (
                        <>
                            <input
                                className='editprogram'
                                value={editedCity}
                                onChange={(e) => setEditedCity(e.target.value)}
                                disabled={isSaving}
                            />

                            <button className='edit_button'
                                onClick={() => handleSaveField('city')}
                                disabled={isSaving}
                            >
                                {isSaving ? 'Salvando...' : 'Salvar'}
                            </button>

                            <button className='edit_button'
                                onClick={() => handleCancelEdit('city')}
                                disabled={isSaving}
                            >
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <>
                            <p>Cidade: {patientData.city || 'Não informado'}</p>

                            <Image
                                src={edit}
                                alt=""
                                className="edit-icon"
                                onClick={() => setIsEditingCity(true)}
                            />
                        </>
                    )}

                </div>
            </div>

            <div className="account-settings-section">
                <h3 className='account-settings-title'>Informações da conta</h3>

                <div className="account-field">
                    <p>Email:</p>
                    <input
                        value={patientData.email || ''}
                        readOnly
                    />
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
