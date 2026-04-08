"use client"

import React from 'react';
import './profile.css'
import Image from 'next/image';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '../../assets/images/homeicon.svg';
import Iconpaciente from '../../assets/images/PacientIcon.svg';
import Iconterapeuta from '../../assets/images/TherapistIcon.svg';



export default function Profile () {
    return(
        <div className="profile-section">
            <HeaderEnter
            src={Return}
            />
            
            <div className="profile-header">
                <h2>Perfil</h2>
                <p>Selecione abaixo o tipo de perfil que mais se adequa a você</p>

            </div>

            <div className="profile-card-list">
                <div className="profile-card">
                    <Image 
                    className='profile-card__icon' 
                    src={Iconpaciente} 
                    alt="" 
                    />
                    <p>Paciente</p>
                </div>

                <div className="profile-card">
                    <Image 
                    className='profile-card__icon' 
                    src={Iconterapeuta} 
                    alt="" 
                    />
                    <p>Terapeuta</p>
                </div>
            </div>
        </div>
    )
}