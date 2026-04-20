"use client"

import { useRef, useState } from 'react';
import './style.css'
import Image from 'next/image';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Footer from '@/components/footer/Footer';
import email from '@/assets/images/emailIcon.svg';
import DefaultProfileIcon from '@/assets/images/ProfileIcon.svg';

type User = {
    id: number;
    name: string;
    profileImage?: string;
    CRP: string;
}

export default function ProcessesAndTreatments () {
    
    const user: User = {
        id: 1,
        name: "Camilla Andrade",
        profileImage: "",
        CRP: "CRP 06/38472",
    };

    return(
        <div className="processes-container">
            <HeaderEnter
                src={Return}
            />

            <div className="section-header">
                <h1>Processos e Tratamentos</h1>
                <p>Abaixo estão os cenários e tratamentos disponibilizados pelo seu terapeuta:</p>
            </div>

            <h3 className='section-title-responsible'>Responsável:</h3>

            <div className="profile-container">

                <div className="profile-avatar-wrapper">
                    <div className="profile-avatar-container">
                        <Image 
                        src={user.profileImage || DefaultProfileIcon}
                        alt="Foto do usuário"
                        fill
                        className="profile-avatar-image"
                        />
                    </div>
                </div>

                <div className="profile-info">

                    <h2>{user.name}</h2>

                    <p>{user.CRP}</p>

                </div>

                <div className="email-box">
                    <h3>Envie um email</h3>
                    <Image 
                        src={email}
                        alt=""
                        className="email-icon"
                        />
                </div>

            </div>

            <h3 className='section-title-scenarios'>Cenários Terapêuticos:</h3>

            <div className="scenarios-container">
                <div className="scenario-card">
                    <h3>Cenário 1: Interação Social Básica</h3>
                    <button>Acessar Cenário</button>
                </div>

                <div className="scenario-card">
                    <h3>Cenário 2: Ambiente Escolar</h3>
                    <button>Acessar Cenário</button>
                </div>

                <div className="scenario-card">
                    <h3>Cenário 3: Situações do Dia a Dia</h3>
                    <button>Acessar Cenário</button>
                </div>
            </div>
            <Footer/>
        </div>
    )

}