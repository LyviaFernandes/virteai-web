"use client"

import './pacientprofile.css'
import Image from 'next/image';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Iconpaciente from '@/assets/images/ProfileIcon.svg';
import visualize from '@/assets/images/visualizeicon.svg';
import barraprocess from '@/assets/images/barraprocesso.svg';
import Footer from '@/components/footer/Footer';

type User = {
    id: number;
    name: string;
    profileImage?: string;
    status: string;
}

export default function PacientProfile () {

    const user: User = {
        id: 1,
        name: "João Lucas Vega",
        profileImage: "https://thumbs.dreamstime.com/b/retrato-da-pessoa-adulta-22170035.jpg",
        status: "Em acompanhamento"
    };

    return(
        <div className="profile-section">

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

            <div className="profile-content">
                <div className="profile-card">
                    <h3>Informações de Cadastro</h3>
                    
                    <div className="profile-card__actions">
                        <Image 
                        className='profile-card__icon--view' 
                        src={visualize} 
                        alt="" 
                        />
                    </div>
                </div>

                <div className="profile-card">
                    <div className="profile-card__content">
                        <h3>Fichas e Testes</h3>
                        <div className="profile-progress">
                            <Image 
                            className='profile-progress__bar' 
                            src={barraprocess} 
                            alt="" 
                            />
                        </div>
                    </div>
                    
                    <div className="profile-card__actions">
                        <Image 
                        className='profile-card__icon--view' 
                        src={visualize} 
                        alt="" 
                        />
                    </div>
                </div>

                <div className="profile-card">
                    <h3>Processos e Tratamentos</h3>
                    
                    <div className="profile-card__actions">
                        <Image 
                        className='profile-card__icon--view' 
                        src={visualize} 
                        alt="" 
                        />
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    )
}