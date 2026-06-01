"use client"

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/routes';
import { useAuth, useTherapist } from '@/lib';
import { handleApiError } from '@/utils/apiErrors';
import './style.css'
import Image from 'next/image';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Iconpaciente from '@/assets/images/ProfileIcon.svg';
import editimage from '@/assets/images/EditImageIcon.svg';
import Footer from '@/components/footer/Footer';
import edit from '@/assets/images/editicon.svg';
import type { TherapistProfile } from '@/types/index';

export default function AccountInformationTherapist () {
    const router = useRouter();
    const { isAuthenticated, user } = useAuth();
    const { getMyProfile: getTherapistProfile, updateMyProfile: updateTherapistProfile, loading } = useTherapist();
    const [therapistData, setTherapistData] = useState<TherapistProfile | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isSaving, setIsSaving] = useState(false);

    const [editingField, setEditingField] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        specialty: '',
        experience: '',
        city: '',
        birthDate: '',
        attendanceModality: ''
    });

    useEffect(() => {
        if (!isAuthenticated) {
            router.push(ROUTES.login);
            return;
        }
        if (user?.role !== 'THERAPIST') {
            router.push(ROUTES.home);
            return;
        }

        const fetchTherapistData = async () => {
            try {
                const data = await getTherapistProfile();

            setTherapistData(data);
            setFormData({
                name: data.name || '',
                specialty: data.specialty || '',
                experience: data.experience || '',
                city: data.city || '',
                birthDate: data.birthDate ? data.birthDate.split('T')[0] : '',
                attendanceModality: data.attendanceModality || ''
            });
            } catch (err) {
                setError(handleApiError(err));
            }
        };

        fetchTherapistData();
    }, [isAuthenticated, user, router, getTherapistProfile]);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const uploadProfileImage = async (file: File) => {
        try {
            setIsSaving(true);
            const formData = new FormData();
            formData.append('profilePicture', file);

            const updatedProfile = await updateTherapistProfile(formData);

            setTherapistData((prev) =>
                prev ? { ...prev, ...updatedProfile } : updatedProfile
            );
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
    const handleInputChange = (
        field: keyof typeof formData,
        value: string
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async (field: keyof typeof formData) => {
        try {
            setIsSaving(true);

            const updateData: any = {};
            updateData[field] = formData[field];

            const updatedData = await updateTherapistProfile(updateData);

            setTherapistData((prev) =>
            prev ? { ...prev, ...updatedData } : updatedData
            );

            setFormData((prev) => ({
            ...prev,
            [field]: updateData[field],
            }));

            setEditingField(null);
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = (field: keyof typeof formData) => {
        if (therapistData) {
            const currentValue = therapistData[field as keyof TherapistProfile];
            if (field === 'birthDate' && currentValue) {
                setFormData((prev) => ({
                    ...prev,
                    [field]: (currentValue as string).split('T')[0]
                }));
            } else {
                setFormData((prev) => ({
                    ...prev,
                    [field]: currentValue || ''
                }));
            }
        }
        setEditingField(null);
    };
    if (!isAuthenticated) {
        return <div style={{ padding: '20px', textAlign: 'center' }}>Please log in</div>;
    }

    if (loading || !therapistData) {
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
                            src={profileImage || therapistData.profileImage || Iconpaciente}
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

                    <h2>{therapistData.name}</h2>

                    <div className="account-status">
                        <p>CRP: {therapistData.professionalRegister || 'Não informado'}</p>
                        <p>{therapistData.specialty || 'Terapeuta'}</p>
                    </div>

                </div>

            </div>

            <div className="personal-data-section">
                <h3 className='personal-data-title'>Dados Pessoais:</h3>

                <div className="personal-data-item">
                    {editingField === 'name' ? (
                        <>
                            <input
                                value={formData.name}
                                onChange={(e) =>
                                    handleInputChange('name', e.target.value)
                                }
                                disabled={isSaving}
                            />

                            <button
                                onClick={() => handleSave('name')}
                                disabled={isSaving}
                            >
                                {isSaving ? 'Salvando...' : 'Salvar'}
                            </button>
                            
                            <button
                                onClick={() => handleCancel('name')}
                                disabled={isSaving}
                            >
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <>
                            <p>Nome: {therapistData.name}</p>

                            <Image
                                src={edit}
                                alt=""
                                className="edit-icon"
                                onClick={() => setEditingField('name')}
                            />
                        </>
                    )}

                </div>

                <div className="personal-data-item">
                    <p>CRP: {therapistData.professionalRegister || 'Não informado'}</p>
                </div>

                <div className="personal-data-item">

                    {editingField === 'specialty' ? (
                        <>
                            <input
                                value={formData.specialty}
                                onChange={(e) =>
                                    handleInputChange('specialty', e.target.value)
                                }
                                disabled={isSaving}
                            />

                            <button
                                onClick={() => handleSave('specialty')}
                                disabled={isSaving}
                            >
                                {isSaving ? 'Salvando...' : 'Salvar'}
                            </button>

                            <button
                                onClick={() => handleCancel('specialty')}
                                disabled={isSaving}
                            >
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <>
                            <p>Especialização: {therapistData.specialty}</p>

                            <Image
                                src={edit}
                                alt=""
                                className="edit-icon"
                                onClick={() => setEditingField('specialty')}
                            />
                        </>
                    )}

                </div>

                <div className="personal-data-item">

                    {editingField === 'experience' ? (
                        <>
                            <input
                                value={formData.experience}
                                onChange={(e) =>
                                    handleInputChange('experience', e.target.value)
                                }
                                disabled={isSaving}
                            />

                            <button
                                onClick={() => handleSave('experience')}
                                disabled={isSaving}
                            >
                                {isSaving ? 'Salvando...' : 'Salvar'}
                            </button>

                            <button
                                onClick={() => handleCancel('experience')}
                                disabled={isSaving}
                            >
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <>
                            <p>Experiência: {therapistData.experience || 'Não informado'}</p>

                            <Image
                                src={edit}
                                alt=""
                                className="edit-icon"
                                onClick={() => setEditingField('experience')}
                            />
                        </>
                    )}

                </div>

                <div className="personal-data-item">

                    {editingField === 'birthDate' ? (
                        <>
                            <input 
                                type="date"
                                value={formData.birthDate}
                                onChange={(e) =>
                                    handleInputChange('birthDate', e.target.value)
                                }
                                disabled={isSaving}
                            />

                            <button
                                onClick={() => handleSave('birthDate')}
                                disabled={isSaving}
                            >
                                {isSaving ? 'Salvando...' : 'Salvar'}
                            </button>

                            <button
                                onClick={() => handleCancel('birthDate')}
                                disabled={isSaving}
                            >
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <>
                            <p>
                                Data de nascimento: {
                                    therapistData.birthDate
                                        ? therapistData.birthDate.split('T')[0].split('-').reverse().join('/')
                                        : 'Não informado'
                                }
                            </p>

                            <Image
                                src={edit}
                                alt=""
                                className="edit-icon"
                                onClick={() => setEditingField('birthDate')}
                            />
                        </>
                    )}

                </div>

            </div>

            <div className="account-settings-section">
                <h3 className='account-local-title'>Localização e Atendimento:</h3>

                <div className="personal-data-item">

                    {editingField === 'city' ? (
                        <>
                            <input
                                value={formData.city}
                                onChange={(e) =>
                                    handleInputChange('city', e.target.value)
                                }
                                disabled={isSaving}
                            />

                            <button
                                onClick={() => handleSave('city')}
                                disabled={isSaving}
                            >
                                {isSaving ? 'Salvando...' : 'Salvar'}
                            </button>

                            <button
                                onClick={() => handleCancel('city')}
                                disabled={isSaving}
                            >
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <>
                            <p>Cidade: {therapistData.city || 'Não informado'}</p>

                            <Image
                                src={edit}
                                alt=""
                                className="edit-icon"
                                onClick={() => setEditingField('city')}
                            />
                        </>
                    )}

                </div>
            </div>

            <div className="account-modalidade-section">
                <div className="account-modalidade-box">

                    <div className="account-modalidade-item">
                        <p>Modalidade de atendimento:</p>

                        {editingField !== 'attendanceModality' && (
                            <Image
                                src={edit}
                                alt=""
                                className="edit-icon"
                                onClick={() => setEditingField('attendanceModality')}
                            />
                        )}
                    </div>

                    <div className="questionnaire-options">

                        <div className="questionnaire-option">
                            <input
                                type="radio"
                                id="online"
                                name="attendanceModality"
                                checked={formData.attendanceModality === 'ONLINE'}
                                disabled={editingField !== 'attendanceModality' || isSaving}
                                onChange={() =>
                                    handleInputChange('attendanceModality', 'ONLINE')
                                }
                            />

                            <label htmlFor="online">Online</label>
                        </div>

                        <div className="questionnaire-option">
                            <input
                                type="radio"
                                id="presencial"
                                name="attendanceModality"
                                checked={formData.attendanceModality === 'PRESENTIAL'}
                                disabled={editingField !== 'attendanceModality' || isSaving}
                                onChange={() =>
                                    handleInputChange('attendanceModality', 'PRESENTIAL')
                                }
                            />

                            <label htmlFor="presencial">
                                Presencial
                            </label>
                        </div>

                        <div className="questionnaire-option">
                            <input
                                type="radio"
                                id="hibrido"
                                name="attendanceModality"
                                checked={formData.attendanceModality === 'BOTH'}
                                disabled={editingField !== 'attendanceModality' || isSaving}
                                onChange={() =>
                                    handleInputChange('attendanceModality', 'BOTH')
                                }
                            />

                            <label htmlFor="hibrido">Híbrido</label>
                        </div>

                    </div>

                    {editingField === 'attendanceModality' && (
                        <div className="modalidade-buttons">

                            <button
                                onClick={() => handleSave('attendanceModality')}
                                disabled={isSaving}
                            >
                                {isSaving ? 'Salvando...' : 'Salvar'}
                            </button>

                            <button
                                onClick={() => handleCancel('attendanceModality')}
                                disabled={isSaving}
                            >
                                Cancelar
                            </button>

                        </div>
                    )}

                </div>
            </div>
            <div className="account-settings-section">
                <h3 className='account-settings-title'>Informações da conta</h3>

                <div className="account-field">
                    <p>Email:</p>
                    <input
                        name="email"
                        value={therapistData.email || user?.email || ''}
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