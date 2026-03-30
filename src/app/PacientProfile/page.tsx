"use client"

import React from 'react';
import './pacientprofile.css'
import Image from 'next/image';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '../../assets/images/return-icon.svg';
import Iconpaciente from '../../assets/images/ProfileIcon.svg';
import visualize from '../../assets/images/visualizeicon.svg';
import editicon from '../../assets/images/editicon.svg';
import barraprocess from '../../assets/images/barraprocesso.svg';
import Footer from '@/components/footer/Footer';



type User = {
    id: number;
    name: string;
    profileImage?: string;
    status: string;
}



export default function PacientProfile () {

    // 🔹 Dados mockados (estáticos)
    const user: User = {
        id: 1,
        name: "João Lucas Vega",
        profileImage: "https://thumbs.dreamstime.com/b/retrato-da-pessoa-adulta-22170035.jpg", // pode colocar uma URL ou deixar vazio pra usar o ícone padrão
        status: "Em acompanhamento"
    };

    return(
        <div className="section-profile">

            <HeaderEnter
                src={Return}
            />

            <div className="Container-profile">

                <div className="image-wrapper">
                    <div className="image-container">
                        <Image 
                        src={user.profileImage || Iconpaciente}
                        alt="Foto do usuário"
                        fill
                        className="IconPaciente"
                        />
                    </div>
                </div>

                <div className="profile-info">

                    <h2>{user.name}</h2>

                    <div className="status-user">
                        <h3>{user.status}</h3>
                    </div>

                </div>

            </div>

            <div className="section-container">
                <div className="box-container">
                    <h3>Informações de Cadastro</h3>
                    
                    <div className="images-box">
                        <Image 
                        className='visualize-icon' 
                        src={visualize} 
                        alt="" 
                        />
                        <Image 
                        className='edit-icon' 
                        src={editicon} 
                        alt="" 
                        />
                    </div>
                </div>

                <div className="box-container">
                    <div className="text-box">
                        <h3>Fichas e Testes</h3>
                        <div className="barra-processo">
                        <Image 
                        className='barra' 
                        src={barraprocess} 
                        alt="" 
                        />
                    </div>

                    </div>
                    
                    <div className="images-box">
                        <Image 
                        className='visualize-icon' 
                        src={visualize} 
                        alt="" 
                        />
                    </div>
                </div>
                <div className="box-container">
                    <h3>Processos e Tratamentos</h3>
                    
                    <div className="images-box">
                        <Image 
                        className='visualize-icon' 
                        src={visualize} 
                        alt="" 
                        />
                        <Image 
                        className='edit-icon' 
                        src={editicon} 
                        alt="" 
                        />
                    </div>
                </div>


            </div>

            <Footer/>


        </div>
    )
}