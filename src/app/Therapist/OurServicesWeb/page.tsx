"use client"

import React from 'react';
import './singup.css'
import Image from 'next/image';
import Footer from '@/components/footer/Footer';
import ImageCenter from '@/assets/images/Banner.svg';
import Check from '@/assets/images/check.svg';
import HeaderLogout from '@/components/header-logout/Header';

export default function OurServices () {
    return(
        <div className="Section-services">
            <HeaderLogout/>
    
            <Image 
                className='Banner' 
                src={ImageCenter} 
                alt="" 
            />

            <div className="Transformer">
                <h1>Transforme o seu atendimento!</h1>

                <p>Nossos planos oferecem ferramentas inteligentes, 
                    materiais especializados e uma plataforma pensada para profissionais que fazem a diferença no cuidado com o TEA. Escolha o ideal para você!</p>
            </div>

            <div className="Section-cards">
                <div className="blue-card">
                    <h2>Plano comum</h2>

                    <h3>Para quem atende com profundidade, caso a caso.</h3>

                    <div className="section-checks">
                        <div className="check-text">
                            <Image 
                                className='Check-icon' 
                                src={Check} 
                                alt="" 
                            />
                            <p>Acesso completo à plataforma VirTEAi</p>
                        </div>

                        <div className="check-text">
                            <Image 
                                className='Check-icon' 
                                src={Check} 
                                alt="" 
                            />
                            <p>Biblioteca de materiais terapêuticos atualizados</p>
                        </div>

                        <div className="check-text">
                            <Image 
                                className='Check-icon' 
                                src={Check} 
                                alt="" 
                            />
                            <p>Ferramentas de acompanhamento de pacientes</p>
                        </div>

                        <div className="check-text">
                            <Image 
                                className='Check-icon' 
                                src={Check} 
                                alt="" 
                            />
                            <p>Relatórios automatizados de evolução</p>
                        </div>

                        <div className="check-text">
                            <Image 
                                className='Check-icon' 
                                src={Check} 
                                alt="" 
                            />
                            <p>Suporte técnico prioritário</p>
                        </div>
                    </div>

                    <div className="pay">
                        <p>R$49,90/mês</p>
                    </div>

                    <button>
                        <p>saiba mais</p>
                        </button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}