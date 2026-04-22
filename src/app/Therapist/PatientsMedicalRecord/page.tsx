"use client"

import React from 'react';
import './style.css'
import Image from 'next/image';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Iconpaciente from '@/assets/images/ProfileIcon.svg';
import plusicon from '@/assets/images/PlusIcon.svg';
import progess from '@/assets/images/ProgressDiagram.svg';
import visualize from '@/assets/images/visualizeicon.svg';
import edit from '@/assets/images/editicon.svg';
import Footer from '@/components/footer/Footer';

type User = {
    id: number;
    name: string;
    profileImage?: string;
    status: string;
}

export default function PatientsMedicalRecord () {

    const user: User = {
        id: 1,
        name: "João Lucas Vega",
        profileImage: "https://thumbs.dreamstime.com/b/retrato-da-pessoa-adulta-22170035.jpg",
        status: "Em acompanhamento"
    };

    return(
        <div className="patients-medical-record">
            <HeaderEnter
                src={Return}
            />

            <div className="profile-container">

                <div className="profile-avatar-wrapper">
                    <div className="profile-avatar-container">
                        <Image 
                        src={user.profileImage || Iconpaciente}
                        alt="Foto do usuário"
                        fill
                        className="profile-avatar-image"
                        />
                    </div>
                </div>

                <div className="profile-info">

                    <h2>{user.name}</h2>

                    <div className="profile-status">
                        <h3>{user.status}</h3>
                    </div>

                </div>

            </div>

            <div className="DiagramTitle">
                <p>Evolução geral</p>
                <Image 
                    src={plusicon}
                    alt=""
                    className="plus-image"
                    />
            </div>
            <div className="EvolutionDiagram">
                <Image 
                    src={progess}
                    alt=""
                    className="progess-image"
                    />
            </div>


            <div className="therapeutic-goals">

                <div className="therapeutic-goals-container">
                    <div className="therapeutic-goals__content">
                        <h2>Objetivos terapeuticos</h2>
                    </div>

                    <Image 
                    className='therapeutic-goals__action-icon' 
                    src={edit} 
                    alt="" 
                    />

                </div>

                    <div className="Goals">
                        <p>Comunicação Verbal</p>
                        <p>Interação Social</p>
                        <p>Regulação Emocional</p>
                    </div>
            </div>
            <div className="therapeutic-goals-relatorios">

                <div className="therapeutic-goals-container">
                    <div className="therapeutic-goals__content">
                        <h2>Objetivos terapeuticos</h2>
                    </div>

                    <Image 
                    className='therapeutic-goals__action-icon' 
                    src={visualize} 
                    alt="" 
                    />

                </div>
            </div>
            <Footer/>

        </div>
    )

}