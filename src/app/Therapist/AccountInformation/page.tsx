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

    const [editingField, setEditingField] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        specialization: '',
        experience: '',
        country: '',
        city: '',
        email: '',
        password: '',
        modality: ''
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
                specialization: data.specialization || '',
                experience: data.experience || '',
                country: data.country || '',
                city: data.city || '',
                email: data.email || '',
                password: '',
                modality: data.modality || ''
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

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
            // TODO: Implement image upload to backend
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

    const handleSave = async (
        field: keyof typeof formData
    ) => {
        try {

            const updatedData: TherapistProfile = {
                ...therapistData!,
                [field]: formData[field as keyof typeof formData]
            };

            await updateTherapistProfile(updatedData);

            setTherapistData(updatedData);

            setEditingField(null);

        } catch (err) {
            setError(handleApiError(err));
        }
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
                            src={profileImage || Iconpaciente}
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
                    
                </div>

                <div className="account-user-info">

                    <h2>{therapistData.name}</h2>

                    <div className="account-status">
                        <p>CRP: {therapistData.crp || 'Não informado'}</p>
                        <p>{therapistData.specialization || 'Terapeuta'}</p>
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
                            />

                            <button
                                onClick={() => handleSave('name')}
                            >
                                Salvar
                            </button>

                            <button
                                onClick={() => setEditingField(null)}
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
                    <p>CRP: {therapistData.crp || 'Não informado'}</p>
                </div>

                <div className="personal-data-item">

                    {editingField === 'specialization' ? (
                        <>
                            <input
                                value={formData.specialization}
                                onChange={(e) =>
                                    handleInputChange('specialization', e.target.value)
                                }
                            />

                            <button
                                onClick={() => handleSave('specialization')}
                            >
                                Salvar
                            </button>

                            <button
                                onClick={() => setEditingField(null)}
                            >
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <>
                            <p>Especialização: {therapistData.specialization}</p>

                            <Image
                                src={edit}
                                alt=""
                                className="edit-icon"
                                onClick={() => setEditingField('specialization')}
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
                            />

                            <button
                                onClick={() => handleSave('experience')}
                            >
                                Salvar
                            </button>

                            <button
                                onClick={() => setEditingField(null)}
                            >
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <>
                            <p>Experiencia: {therapistData.experience}</p>

                            <Image
                                src={edit}
                                alt=""
                                className="edit-icon"
                                onClick={() => setEditingField('experience')}
                            />
                        </>
                    )}

                </div>


            </div>

            <div className="account-settings-section">
                <h3 className='account-local-title'>Localização e Atendimento:</h3>

                <div className="personal-data-item">

                    {editingField === 'country' ? (
                        <>
                            <input
                                value={formData.country}
                                onChange={(e) =>
                                    handleInputChange('country', e.target.value)
                                }
                            />

                            <button
                                onClick={() => handleSave('country')}
                            >
                                Salvar
                            </button>

                            <button
                                onClick={() => setEditingField(null)}
                            >
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <>
                            <p>País: {therapistData.country}</p>

                            <Image
                                src={edit}
                                alt=""
                                className="edit-icon"
                                onClick={() => setEditingField('country')}
                            />
                        </>
                    )}

                </div>

                <div className="personal-data-item">

                    {editingField === 'city' ? (
                        <>
                            <input
                                value={formData.city}
                                onChange={(e) =>
                                    handleInputChange('city', e.target.value)
                                }
                            />

                            <button
                                onClick={() => handleSave('city')}
                            >
                                Salvar
                            </button>

                            <button
                                onClick={() => setEditingField(null)}
                            >
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <>
                            <p>Cidade: {therapistData.city}</p>

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

                        {editingField !== 'modality' && (
                            <Image
                                src={edit}
                                alt=""
                                className="edit-icon"
                                onClick={() => setEditingField('modality')}
                            />
                        )}
                    </div>

                    <div className="questionnaire-options">

                        <div className="questionnaire-option">
                            <input
                                type="radio"
                                id="online"
                                name="modality"
                                checked={formData.modality === 'ONLINE'}
                                disabled={editingField !== 'modality'}
                                onChange={() =>
                                    handleInputChange('modality', 'ONLINE')
                                }
                            />

                            <label htmlFor="online">Online</label>
                        </div>

                        <div className="questionnaire-option">
                            <input
                                type="radio"
                                id="presencial"
                                name="modality"
                                checked={formData.modality === 'IN_PERSON'}
                                disabled={editingField !== 'modality'}
                                onChange={() =>
                                    handleInputChange('modality', 'IN_PERSON')
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
                                name="modality"
                                checked={formData.modality === 'BOTH'}
                                disabled={editingField !== 'modality'}
                                onChange={() =>
                                    handleInputChange('modality', 'BOTH')
                                }
                            />

                            <label htmlFor="hibrido">Híbrido</label>
                        </div>

                    </div>

                    {editingField === 'modality' && (
                        <div className="modalidade-buttons">

                            <button
                                onClick={() => handleSave('modality')}
                            >
                                Salvar
                            </button>

                            <button
                                onClick={() => {
                                    setFormData((prev) => ({
                                        ...prev,
                                        modality: therapistData.modality || ''
                                    }));

                                    setEditingField(null);
                                }}
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

                    {editingField === 'email' ? (
                        <>
                            <input
                                value={formData.email}
                                onChange={(e) =>
                                    handleInputChange('email', e.target.value)
                                }
                            />

                            <button
                                onClick={() => handleSave('email')}
                            >
                                Salvar
                            </button>

                            <button
                                onClick={() => setEditingField(null)}
                            >
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <>
                            <input
                                name="email"
                                value={therapistData.email || user?.email || ''}
                                readOnly
                            />

                            <Image
                                src={edit}
                                alt=""
                                className="edit-icon"
                                onClick={() => setEditingField('email')}
                            />
                        </>
                    )}
                </div>

                <div className="account-field">
                    <p>Senha:</p>

                    {editingField === 'password' ? (
                        <>
                            <input
                                type="password"
                                placeholder="Nova senha"
                                value={formData.password}
                                onChange={(e) =>
                                    handleInputChange('password', e.target.value)
                                }
                            />

                            <button
                                onClick={() => {
                                    // futura API de alteração de senha
                                    setEditingField(null);

                                    setFormData((prev) => ({
                                        ...prev,
                                        password: ''
                                    }));
                                }}
                            >
                                Salvar
                            </button>

                            <button
                                onClick={() => {
                                    setEditingField(null);

                                    setFormData((prev) => ({
                                        ...prev,
                                        password: ''
                                    }));
                                }}
                            >
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <>
                            <input
                                name="password"
                                value="••••••••••••"
                                type="password"
                                readOnly
                            />

                            <Image
                                src={edit}
                                alt=""
                                className="edit-icon"
                                onClick={() => setEditingField('password')}
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