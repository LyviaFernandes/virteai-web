"use client"

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useTherapist } from '@/lib';
import { handleApiError } from '@/utils/apiErrors';
import './style.css'
import Image from 'next/image';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Iconpaciente from '@/assets/images/ProfileIcon.svg';
import Footer from '@/components/footer/Footer';
import edit from '@/assets/images/editicon.svg';

export default function AccountInformationTherapist () {
    const router = useRouter();
    const { isAuthenticated, user } = useAuth();
    const { getTherapistProfile, updateTherapistProfile, loading } = useTherapist();
    const [therapistData, setTherapistData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/Login');
            return;
        }
        if (user?.role !== 'THERAPIST') {
            router.push('/Home');
            return;
        }

        const fetchTherapistData = async () => {
            try {
                const data = await getTherapistProfile();
                setTherapistData(data);
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
                    <p>Nome: {therapistData.name}</p>
                    <Image
                            src={edit}
                            alt=""
                            className="edit-icon"
                        />
                </div>

                <div className="personal-data-item">
                    <p>CRP: {therapistData.crp || 'Não informado'}</p>
                </div>

                <div className="personal-data-item">
                    <p>Especialidade: {therapistData.specialization || 'Não informado'}</p>
                    <Image
                            src={edit}
                            alt=""
                            className="edit-icon"
                        />
                </div>

                <div className="personal-data-item">
                    <p>Experiência: {therapistData.experience || 'Não informado'}</p>
                    <Image
                            src={edit}
                            alt=""
                            className="edit-icon"
                        />
                </div>


            </div>

            <div className="account-settings-section">
                <h3 className='account-local-title'>Localização e Atendimento:</h3>

                <div className="personal-data-item">
                    <p>País: {therapistData.country || 'Brasil'}</p>
                    <Image
                            src={edit}
                            alt=""
                            className="edit-icon"
                        />
                </div>

                <div className="personal-data-item">
                    <p>Cidade: {therapistData.city || 'Não informado'}</p>
                    <Image
                            src={edit}
                            alt=""
                            className="edit-icon"
                        />
                </div>
            </div>

            <div className="account-modalidade-section">
                <div className="account-modalidade-box">
                    <div className="account-modalidade-item">
                        <p>Modalidade de atendimento:</p>
                        <Image
                                src={edit}
                                alt=""
                                className="edit-icon"
                            />
                    </div>

                    <div className="questionnaire-options">

                        <div className="questionnaire-option">
                            <input type="radio" id="agree" name="tea" checked={therapistData.modality === 'ONLINE'} />
                            <label htmlFor="agree">Online</label>
                        </div>

                        <div className="questionnaire-option">
                            <input type="radio" id="completely-disagree" name="tea" checked={therapistData.modality === 'IN_PERSON'} />
                            <label htmlFor="completely-disagree">Presencial</label>
                        </div>

                        <div className="questionnaire-option">
                            <input type="radio" id="disagree" name="tea" checked={therapistData.modality === 'BOTH'} />
                            <label htmlFor="disagree">Ambos</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="account-settings-section">
                <h3 className='account-settings-title'>Informações da conta</h3>

                <div className="account-field">
                    <p>Email:</p>
                    <input name="email" value={therapistData.email || user?.email || ''} readOnly />

                    <Image
                                src={edit}
                                alt=""
                                className="edit-icon"
                            />
                </div>

                <div className="account-field">
                    <p>Senha:</p>
                    <input name="password" value="••••••••••••" type="password" readOnly />

                    <Image
                                src={edit}
                                alt=""
                                className="edit-icon"
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

                    <Image 
                                src={edit}
                                alt=""
                                className="edit-icon"
                            />
                </div>
            </div>

            <Footer/>
        </div>

    )
}