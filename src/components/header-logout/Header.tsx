"use client"

import React, { useEffect, useState } from 'react';
import { ROUTES } from '@/lib/routes';
import './Header.css'
import logo from '../../assets/images/logo.svg';
import aboutUs from '../../assets/images/about-us.svg';
import Offers from '../../assets/images/offers.svg';
import home from '../../assets/images/homeicon.svg';
import Notification from '../../assets/images/notification.svg';
import Image from 'next/image';
import Link from "next/link";
import menu from '../../assets/images/iconmenu.svg';

export default function HeaderLogout () {

    const [menuOpen, setMenuOpen] = useState(false);

    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setShowHeader(false);
            } else {
                setShowHeader(true);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <>
            <header className={showHeader ? "header show" : "header hide"}>
                <Image className='logo' src={logo} alt="Logo image" />

                <button 
                    className="hamburger"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <Image 
                        className='menu' 
                        src={menu} 
                        alt="" 
                        width={45}
                        height={45}
                    />
                </button>
                
                <Link href={ROUTES.home}>
                    <button className="iconecontainer">
                        <Image className='image' src={home} alt="Pagina inicial" width={50}/>
                        <p>Página inicial</p>
                    </button>
                </Link>

                <Link href={ROUTES.aboutUs}>
                    <button className="iconecontainer">
                        <Image className='image' src={aboutUs} alt="Sobre nós icon" width={50}/>
                        <p>Sobre nós</p>
                    </button>
                </Link>

                <Link href={ROUTES.accountAccess}>
                    <button className="iconecontainer">
                        <Image className='image' src={Offers} alt="Ofertas icon" width={50}/>
                        <p>Nossos serviços</p>
                    </button>
                </Link>
                
                <Link href={ROUTES.accountAccess}>
                    <button className="iconecontainer">
                        <Image className='image' src={Notification} alt="Notificações icon" width={50}/>
                        <p>Notificações</p>
                    </button>
                </Link>

                <div className="container-button">
                    <Link href={ROUTES.login}>
                        <button className='white-button'>
                            <h3>Entrar</h3>
                        </button>
                    </Link>

                    <Link href={ROUTES.profile}>
                        <button className='blue-button'>
                            <h3>Cadastre-se</h3>
                        </button>
                    </Link>
                </div>
            </header>

            {menuOpen && (
                <div className="mobile-menu">

                    <Link href={ROUTES.home} onClick={() => setMenuOpen(false)}>
                        <p>Página inicial</p>
                    </Link>

                    <Link href={ROUTES.aboutUs} onClick={() => setMenuOpen(false)}>
                        <p>Sobre nós</p>
                    </Link>

                    <Link href={ROUTES.accountAccess} onClick={() => setMenuOpen(false)}>
                        <p>Nossos serviços</p>
                    </Link>

                    <Link href={ROUTES.accountAccess} onClick={() => setMenuOpen(false)}>
                        <p>Notificações</p>
                    </Link>

                </div>
            )}
        </>
    );
}