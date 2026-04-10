"use client"

import React from 'react';
import './personal.css'
import Image from 'next/image';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import DefaultProfileIcon from '@/assets/images/ProfileIcon.svg';
import ViewIcon from '@/assets/images/visualizeicon.svg';
import EditIcon from '@/assets/images/editicon.svg';
import Footer from '@/components/footer/Footer';

type User = {
    id: number;
    name: string;
    profileImage?: string;
    CRP: string;
    status: string;
}

export default function TherapistProfile () {

    const user: User = {
        id: 1,
        name: "Camilla Andrade",
        profileImage: "",
        CRP: "CRP 06/38472",
        status: "Terapeuta Cognitivo-Comportamental"
    };

    return(
        <div className="profile-page">

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

            <div className="profile-sections">
                <div className="profile-card">
                    <h3>Informações de Cadastro</h3>
                    
                    <div className="card-actions">
                        <Image 
                        className='action-icon view-icon' 
                        src={ViewIcon} 
                        alt="" 
                        />
                        <Image 
                        className='action-icon edit-icon' 
                        src={EditIcon} 
                        alt="" 
                        />
                    </div>
                </div>

             
                <div className="profile-card">
                    <h3>Pacientes e Tratamentos</h3>
                    
                    <div className="card-actions">
                        <Image 
                        className='action-icon view-icon' 
                        src={ViewIcon} 
                        alt="" 
                        />
                    </div>
                </div>

                <div className="profile-card">
                    <h3>Agenda e Histórico</h3>
                    
                    <div className="card-actions">
                        <Image 
                        className='action-icon view-icon' 
                        src={ViewIcon} 
                        alt="" 
                        />
                    </div>
                </div>

            </div>

            <Footer/>

        </div>
    )
}