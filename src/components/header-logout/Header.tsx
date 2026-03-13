"use client"

import React from 'react';
import './Header.css'
import logo from '../../assets/images/logo.svg';
import aboutUs from '../../assets/images/about-us.svg';
import Offers from '../../assets/images/offers.svg';
import home from '../../assets/images/homeicon.svg';
import Notification from '../../assets/images/notification.svg';
import Image from 'next/image';
import ButtonEnter from '../enter-button/Button';
import Link from "next/link";


export default function HeaderLogout () {

    return (
        <header>
            <Image 
            className='logo' 
            src={logo} 
            alt="Logo image" 
            
            />
            
            <Link href="Home">
                    <button className="iconecontainer">
                        <Image 
                        className='image' 
                        src={home} 
                        alt="Pagina inicial" 
                        width={50}
                        />
                        <p>Página inicial</p>
                    </button>
                </Link>

                <Link href="/AboutUs">
                    <button className="iconecontainer">
                        <Image 
                        className='image' 
                        src={aboutUs} 
                        alt="Sobre nós icon" 
                        width={50}
                        />
                        <p>Sobre nós</p>
                    </button>
                </Link>

                <Link href="/AccountAcess">
                    <button 
                    className="iconecontainer"
                    >
                        <Image 
                        className='image' 
                        src={Offers} 
                        alt="Ofertas icon" 
                        width={50}
                        />
                        <p>Nossos serviços</p>
                    </button>
                </Link>
                
                <Link href="/AccountAcess">
                    <button 
                    className="iconecontainer"
                    >
                        <Image 
                        className='image' 
                        src={Notification} 
                        alt="Notificações icon" 
                        width={50}
                        />
                        <p>Notificações</p>
                    </button>
                </Link>


            <div className="container-button">
                <button className='white-button'>
                    <h3>Entrar</h3>
                </button>
                <button className='blue-button'>
                    <h3>Cadastre-se</h3>
                </button>

            </div>
            
        </header>

        );
}