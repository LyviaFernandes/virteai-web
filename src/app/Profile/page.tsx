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
        <div className="section-profile">
            <HeaderEnter
            src={Return}
            />
            
            <div className="container-text">
                <h2>Perfil</h2>
                <p>Selecione abaixo o tipo de perfil que mais se adequa a você</p>

            </div>

            <div className="card-profiles">
                <div className="box-profile">
                    <Image 
                    className='IconPaciente' 
                    src={Iconpaciente} 
                    alt="" 
                    />
                    <p>Paciente</p>
                </div>

                <div className="box-profile">
                    <Image 
                    className='IconTerapeuta' 
                    src={Iconterapeuta} 
                    alt="" 
                    />
                    <p>Terapeuta</p>
                </div>
            </div>
        </div>
    )
}