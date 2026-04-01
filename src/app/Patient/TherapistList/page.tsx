"use client"

import React from 'react';
import './therapistlist.css'
import Image from 'next/image';
import HeaderHome from '@/components/header-login/Header';
import ImageCenter from '@/assets/images/TherapyBanner.svg';
import profile from '@/assets/images/ProfileIcon.svg';
import visualize from '@/assets/images/visualizeicon.svg';
import Footer from '@/components/footer/Footer';

export default function TherapistList () {
    return(
        <div className="Therapist-Section">
            <HeaderHome/>

            <Image 
                className='Banner' 
                src={ImageCenter} 
                alt="" 
            />

            <div className="text-container">
                <h1>Nossos Terapeutas</h1>

                <p>Com base nos resultados do seu teste, você pode
                     consultar abaixo terapeutas disponíveis para avaliação, 
                     diagnóstico ou acompanhamento terapêutico.</p>
            </div>

            <div className="container-therapist">
                <div className="therapist-perfil">
                    <Image 
                    className='profile' 
                    src={profile} 
                    alt="" 
                    />

                    <div className="description-therapist">
                        <h2>Dra. Camila Andrade</h2>
                        <p>Especialista em avaliação diagnóstica do TEA em adultos.</p>
                    </div>

                    <Image 
                    className='visualize-icon' 
                    src={visualize} 
                    alt="" 
                    />
                </div>

                <div className="therapist-perfil">
                    <Image 
                    className='profile' 
                    src={profile} 
                    alt="" 
                    />

                    <div className="description-therapist">
                        <h2>Dr. Rafael Moreira</h2>
                        <p>Psicólogo focado em acompanhamento para jovens e adultos no espectro.</p>
                    </div>

                    <Image 
                    className='visualize-icon' 
                    src={visualize} 
                    alt="" 
                    />
                </div>

                <div className="therapist-perfil">
                    <Image 
                    className='profile' 
                    src={profile} 
                    alt="" 
                    />

                    <div className="description-therapist">
                        <h2>Dra. Beatriz Nogueira</h2>
                        <p>Neuropsicóloga dedicada à avaliação em casos de suspeita de TEA.</p>
                    </div>

                    <Image 
                    className='visualize-icon' 
                    src={visualize} 
                    alt="" 
                    />
                </div>

                <div className="therapist-perfil">
                    <Image 
                    className='profile' 
                    src={profile} 
                    alt="" 
                    />

                    <div className="description-therapist">
                        <h2>Dr. Lucas Tavares</h2>
                        <p>Terapeuta especializado em desenvolvimento socioemocional</p>
                    </div>

                    <Image 
                    className='visualize-icon' 
                    src={visualize} 
                    alt="" 
                    />
                </div>

                <div className="therapist-perfil">
                    <Image 
                    className='profile' 
                    src={profile} 
                    alt="" 
                    />

                    <div className="description-therapist">
                        <h2>Dra. Mariana Falcão</h2>
                        <p>Psicóloga com atuação em diagnóstico precoce e orientação familiar no TEA.</p>
                    </div>

                    <Image 
                    className='visualize-icon' 
                    src={visualize} 
                    alt="" 
                    />
                </div>

                <div className="therapist-perfil">
                    <Image 
                    className='profile' 
                    src={profile} 
                    alt="" 
                    />

                    <div className="description-therapist">
                        <h2>Dr. Felipe Azevedo</h2>
                        <p>Neuropsicólogo com 10 anos de experiência em avaliação clínica</p>
                    </div>

                    <Image 
                    className='visualize-icon' 
                    src={visualize} 
                    alt="" 
                    />
                </div>

                <div className="therapist-perfil">
                    <Image 
                    className='profile' 
                    src={profile} 
                    alt="" 
                    />

                    <div className="description-therapist">
                        <h2>Dra. Juliana Siqueira</h2>
                        <p>Especialista em intervenções terapêuticas focadas em habilidades sociais.</p>
                    </div>

                    <Image 
                    className='visualize-icon' 
                    src={visualize} 
                    alt="" 
                    />
                </div>

                <div className="therapist-perfil">
                    <Image 
                    className='profile' 
                    src={profile} 
                    alt="" 
                    />

                    <div className="description-therapist">
                        <h2>Dr. André Vasconcelos</h2>
                        <p>Psicólogo clínico com foco em adultos que buscam avaliação tardia para TEA.</p>
                    </div>

                    <Image 
                    className='visualize-icon' 
                    src={visualize} 
                    alt="" 
                    />
                </div>

                <div className="therapist-perfil">
                    <Image 
                    className='profile' 
                    src={profile} 
                    alt="" 
                    />

                    <div className="description-therapist">
                        <h2>Dra. Renata Duarte</h2>
                        <p>Profissional com experiência em planejamento de intervenções.</p>
                    </div>

                    <Image 
                    className='visualize-icon' 
                    src={visualize} 
                    alt="" 
                    />
                </div>

                <div className="therapist-perfil">
                    <Image 
                    className='profile' 
                    src={profile} 
                    alt="" 
                    />

                    <div className="description-therapist">
                        <h2>Dr. Thiago Barreto</h2>
                        <p>Especialista em avaliação neuropsicológica e suporte para TEA.</p>
                    </div>

                    <Image 
                    className='visualize-icon' 
                    src={visualize} 
                    alt="" 
                    />
                </div>
            </div>

            <Footer/>

        </div>
    )
}