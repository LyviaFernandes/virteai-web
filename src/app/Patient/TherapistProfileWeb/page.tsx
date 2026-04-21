"use client"

import React from 'react';
import './therapist.css'
import Image from 'next/image';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import DefaultProfileIcon from '@/assets/images/ProfileIcon.svg';
import star from '@/assets/images/RatingIcon.svg';
import EditIcon from '@/assets/images/editicon.svg';
import Footer from '@/components/footer/Footer';
import email from '@/assets/images/emailIcon.svg';

type User = {
    id: number;
    name: string;
    profileImage?: string;
    CRP: string;
    status: string;
}

export default function TherapistProfileWeb () {
    const user: User = {
        id: 1,
        name: "Camilla Andrade",
        profileImage: "",
        CRP: "CRP 06/38472",
        status: "Terapeuta Cognitivo-Comportamental"
    };
    return(
        <div className="Section-Therapist">
            <HeaderEnter
                src={Return}
            />

            <div className="profile-header">

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

                <div className="profile-details">

                    <h2>{user.name}</h2>

                    <p>{user.CRP}</p>

                    <div className="profile-status">
                        <h3>{user.status}</h3>
                    </div>

                </div>

            </div>

            <div className="AboutTherapist-section">
                <div className="box-abouttherapist">
                    <h2>Um Pouco Sobre Mim:</h2>
                    <p>Sou psicóloga clínica em São Paulo, SP, 
                        com foco na avaliação diagnóstica do TEA 
                        em adultos. Trabalho com uma abordagem estruturada 
                        e acolhedora, ajudando você a compreender melhor 
                        seus padrões de comportamento, emoções e relações, 
                        além de oferecer suporte durante todo o processo de 
                        investigação e possível diagnóstico.</p>

                        <div className="section-tags">
                            <p>TCC</p>
                            <p>Neurodiverdidade</p>
                            <p>Habilidades sociais</p>
                            <p>TEA</p>
                        </div>
                    <div className="avaliation">
                        <h3>Avaliação:</h3>
                        <Image 
                        src={star}
                        alt=""
                        className="star-image"
                        />
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
            </div>
            <Footer/>

        </div>
    )
}