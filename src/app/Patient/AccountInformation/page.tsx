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

export default function AccountInformation () {
    const router = useRouter();
    const { isAuthenticated, user } = useAuth();
    const { getMyProfile, loading } = usePatient();
    const [patientData, setPatientData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
    const fileInputRef = useRef<HTMLInputElement>(null);

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
                const data = await getMyProfile();
                setPatientData(data);
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
                    <p>Nome: {patientData.name}</p>
                    <Image
                            src={edit}
                            alt=""
                            className="edit-icon"
                        />
                </div>

                <div className="personal-data-item">
                    <p>Data de nascimento: {patientData.birthDate || 'Não informado'}</p>
                    <Image
                            src={edit}
                            alt=""
                            className="edit-icon"
                        />
                </div>

                <div className="personal-data-item">
                    <p>País: {patientData.country || 'Brasil'}</p>
                    <Image
                            src={edit}
                            alt=""
                            className="edit-icon"
                        />
                </div>
            </div>

            <div className="account-settings-section">
                <h3 className='account-settings-title'>Informações da conta</h3>

                <div className="account-field">
                    <p>Email:</p>
                    <input name="email" value={patientData.email || user?.email || ''} readOnly />
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
