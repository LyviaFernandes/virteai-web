"use client"

import React, { useRef, useState } from 'react';
import './style.css'
import Image from 'next/image';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Iconpaciente from '@/assets/images/ProfileIcon.svg';
import Footer from '@/components/footer/Footer';
import edit from '@/assets/images/editicon.svg';

type User = {
    id: number;
    name: string;
    profileImage?: string;
    CRP: string;
    status: string;
    especialidade: string;
    experiência: string;
    cidade:string;
    pais: string;
}

export default function AccountInformationTherapist () {
    const user: User = {
        id: 1,
        name: "Camila Andrade",
        profileImage: "https://thumbs.dreamstime.com/b/retrato-da-pessoa-adulta-22170035.jpg",
        CRP: "06/38472",
        status: "Terapeuta Cognitivo-Comportamental",
        especialidade: "Psicologia infantil",
        experiência: "8 anos",
        cidade: "São Paulo - SP",
        pais: "Brasil",
    };

    const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    
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

                    <h2>{user.name}</h2>

                    <div className="account-status">
                        <p>CRP: {user.CRP}</p>
                        <p>{user.status}</p>
                    </div>

                </div>

            </div>

            <div className="personal-data-section">
                <h3 className='personal-data-title'>Dados Pessoais:</h3>

                <div className="personal-data-item">
                    <p>Nome: {user.name}</p>
                    <Image 
                            src={edit}
                            alt=""
                            className="edit-icon"
                        />
                </div>

                <div className="personal-data-item">
                    <p>CRP: {user.CRP}</p>
                </div>

                <div className="personal-data-item">
                    <p>Especialidade: {user.especialidade}</p>
                    <Image 
                            src={edit}
                            alt=""
                            className="edit-icon"
                        />
                </div>

                <div className="personal-data-item">
                    <p>Experiência: {user.experiência}</p>
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
                    <p>País: {user.pais}</p>
                    <Image 
                            src={edit}
                            alt=""
                            className="edit-icon"
                        />
                </div>

                <div className="personal-data-item">
                    <p>Cidade: {user.cidade}</p>
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
                            <input type="radio" id="agree" name="tea"/>
                            <label htmlFor="agree">Online</label>
                        </div>

                        <div className="questionnaire-option">
                            <input type="radio" id="completely-disagree" name="tea"/>
                            <label htmlFor="completely-disagree">Presencial</label>
                        </div>

                        <div className="questionnaire-option">
                            <input type="radio" id="disagree" name="tea"/>
                            <label htmlFor="disagree">Ambos</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="account-settings-section">
                <h3 className='account-settings-title'>Informações da conta</h3>

                <div className="account-field">
                    <p>Email:</p>
                    <input name="name" value="marcosvega82@gmail.com" />

                    <Image 
                                src={edit}
                                alt=""
                                className="edit-icon"
                            />
                </div>

                <div className="account-field">
                    <p>Senha:</p>
                    <input name="email" value="••••••••••••" />

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