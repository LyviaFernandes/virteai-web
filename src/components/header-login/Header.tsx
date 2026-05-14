"use client"

import React, { useEffect, useState } from 'react';
import './Header.css'
import logo from '../../assets/images/logo.svg';
import aboutUs from '../../assets/images/about-us.svg';
import Offers from '../../assets/images/offers.svg';
import home from '../../assets/images/homeicon.svg';
import profile from '../../assets/images/ProfileIcon.svg';
import menu from '../../assets/images/iconmenu.svg';
import Notification from '../../assets/images/notification.svg';
import Image from 'next/image';
import Link from "next/link";
import { useAuth } from '@/lib';

export default function HeaderHome () {
    const { user, logout } = useAuth();
    const profileHref = user?.role === 'THERAPIST'
        ? '/Therapist/TherapistPersonalProfile'
        : '/Patient/PacientProfile';
    
    const [openModal, setOpenModal] = useState(false);
    const [openNotifications, setOpenNotifications] = useState(false);
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

    const [notifications, setNotifications] = useState([
        {id:1, text1:"Novo recurso disponível!", text2:"Ajuste a intensidade visual e sonora", read:false},
        {id:2, text1:"Seu formulário de avaliação foi atualizado!", text2:"Acompanhe!", read:false},
        {id:3, text1:"Atualizamos a interface para melhorar a acessibilidade.", text2:"", read:false},
        {id:4, text1:"Seu responsável adicionou novas configurações ao seu perfil.", text2:"", read:false},
        {id:5, text1:"Você sabia que pode ajustar o tempo de uso na sua conta?", text2:"", read:false},
        {id:6, text1:"Hora de fazer uma pausa ⏱️", text2:"", read:false},
        {id:7, text1:"Revisão de configurações recomendada após 30 dias de uso.", text2:"", read:false},
        {id:8, text1:"Temos novas opções de personalização disponíveis!", text2:"", read:false},
        {id:9, text1:"Um profissional recomendou uma experiência VR para você.", text2:"", read:false},
        {id:10, text1:"Estamos analisando seu feedback.", text2:"Agradecemos a sua contribuição!", read:false}
    ]);

    const markAsRead = (id:number) => {
        setNotifications(prev =>
            prev.map(notification =>
                notification.id === id
                ? {...notification, read:true}
                : notification
            )
        );
    };

    return (
        <>
        <header className={showHeader ? "header show" : "header hide"}>
            <Image className='logo' src={logo} alt="Logo image" />
            
            <button 
                className="hamburger"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <Image className='menu' src={menu} alt="" width={45} height={45}/>
            </button>
            
            <div className="container-pages">
                <Link href="/Home">
                    <button className="iconecontainer">
                        <Image className='image' src={home} alt="Pagina inicial" width={50}/>
                        <p>Página inicial</p>
                    </button>
                </Link>

                <Link href="/AboutUs">
                    <button className="iconecontainer">
                        <Image className='image' src={aboutUs} alt="Sobre nós icon" width={50}/>
                        <p>Sobre nós</p>
                    </button>
                </Link>

                <button className="iconecontainer" onClick={() => setOpenModal(true)}>
                    <Image className='image' src={Offers} alt="Ofertas icon" width={50}/>
                    <p>Nossos serviços</p>
                </button>

                <button className="iconecontainer" onClick={() => setOpenNotifications(true)}>
                    <Image className='image' src={Notification} alt="Notificações icon" width={50}/>
                    <p>Notificações</p>
                </button>
            </div>
            
            <Link href={profileHref}>
                <button className="container-profile">
                    <Image className='Profile' src={profile} alt="Icon profile"/>
                </button>
            </Link>

            <button
                className="container-profile"
                onClick={logout}
                title="Sair"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, marginLeft: 8 }}
            >
                <p style={{ fontWeight: 600 }}>Sair</p>
            </button>
        </header>

        

        {menuOpen && (
            <div className="mobile-menu">

                <Link href="/Home" onClick={() => setMenuOpen(false)}>
                <p>Página inicial</p>
                </Link>

                <Link href="/AboutUs" onClick={() => setMenuOpen(false)}>
                <p>Sobre nós</p>
                </Link>

                <button onClick={() => {
                setOpenModal(true);
                setMenuOpen(false);
                }}>
                    <p>
                        Nossos serviços
                    </p>
                </button>

                <button onClick={() => {
                setOpenNotifications(true);
                setMenuOpen(false);
                }}>
                    <p>

                            Notificações
                    </p>
                </button>

                <Link href={profileHref} onClick={() => setMenuOpen(false)}>
                <p>Perfil</p>
                </Link>

                <button onClick={() => { setMenuOpen(false); logout(); }}>
                    <p>Sair</p>
                </button>

            </div>
            )}

        {openNotifications && (
            <div 
                className="notification-overlay"
                onClick={() => setOpenNotifications(false)}
            >

                <div 
                    className="notification-panel"
                    onClick={(e) => e.stopPropagation()}
                >

                    <h2>NOTIFICAÇÕES</h2>

                    <div className="container-notification">

                        {notifications.map((notification)=>(
                            <div
                                key={notification.id}
                                className={`notification-item ${notification.read ? "read" : ""}`}
                                onClick={()=>markAsRead(notification.id)}
                            >
                                <p>{notification.text1}</p>
                                {notification.text2 && <p>{notification.text2}</p>}
                            </div>
                        ))}

                    </div>

                </div>

            </div>
        )}

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