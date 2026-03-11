"use client"

import React, { useState } from 'react';
import './Header.css'
import logo from '../../assets/images/logo.svg';
import aboutUs from '../../assets/images/about-us.svg';
import Offers from '../../assets/images/offers.svg';
import home from '../../assets/images/homeicon.svg';
import profile from '../../assets/images/ProfileIcon.svg';
import Notification from '../../assets/images/notification.svg';
import Image from 'next/image';

export default function HeaderHome () {

    const [openModal, setOpenModal] = useState(false);

    return (
        <>
        <header>
            <Image 
            className='logo' 
            src={logo} 
            alt="Logo image" 
            />
            
            <div className="container-pages">

                <div className="iconecontainer">
                    <Image 
                    className='image' 
                    src={aboutUs} 
                    alt="Sobre nós icon" 
                    width={50}
                    />
                    <p>Sobre nós</p>
                </div>

                <button 
                className="iconecontainer"
                onClick={() => setOpenModal(true)}
                >
                    <Image 
                    className='image' 
                    src={Offers} 
                    alt="Ofertas icon" 
                    width={50}
                    />

                    <p>Nossos serviços</p>
                </button>
                
                <div className="iconecontainer">
                    <Image 
                    className='image' 
                    src={home} 
                    alt="Pagina inicial" 
                    width={50}
                    />

                    <p>Página inicial</p>
                </div>

                <div className="iconecontainer">
                    <Image 
                    className='image' 
                    src={Notification} 
                    alt="Notificações icon" 
                    width={50}
                    />

                    <p>Notificações</p>
                </div>
            </div>

            <div className="container-profile">
                <Image 
                className='Profile' 
                src={profile} 
                alt="Icon profile" 
                />
            </div>
            
        </header>

        {openModal && (
            <div className="modal-overlay">
                    <div className="container-tittle">
                        <h2>Formulário de Conhecimento</h2>
                    </div>
                <div className="modal">

                    <p>
                        Responda o pequeno formulário a seguir, para que possamos seguir da melhor maneira:
                    </p>

                    <label>
                        <input type="radio" name="tea"/>
                        Eu não sei ou não tenho certeza se possuo o Transtorno do Espectro Autista (TEA).
                    </label>

                    <label>
                        <input type="radio" name="tea"/>
                        Eu possuo o Transtorno do Espectro Autista (TEA), mas não possuo ou não consegui um laudo.
                    </label>

                    <label>
                        <input type="radio" name="tea"/>
                        Eu possuo o Transtorno do Espectro Autista (TEA), e já possuo um laudo.
                    </label>

                    <div className="modal-buttons">
                        <button>Enviar</button>
                        <button onClick={() => setOpenModal(false)}>Fechar</button>
                    </div>

                </div>
            </div>
        )}
        </>
    );
}