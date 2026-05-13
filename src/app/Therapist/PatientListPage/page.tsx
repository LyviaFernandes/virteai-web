"use client"

import './style.css'
import Image from 'next/image';
import HeaderHome from '@/components/header-login/Header';
import ImageCenter from '@/assets/images/PatientListBanner.svg';
import profile from '@/assets/images/ProfileIcon.svg';
import visualize from '@/assets/images/visualizeicon.svg';
import Footer from '@/components/footer/Footer';

export default function PatientListPage () {
    return(
        <div className="patient-section">
            <HeaderHome/>

            <Image 
                className='patient-banner' 
                src={ImageCenter} 
                alt="" 
            />

            <div className="patient-header">
                <h1>Seus Pacientes</h1>
            </div>

            <div className="patient-list">
                <div className="patient-card">
                    <Image 
                    className='patient-card__image' 
                    src={profile} 
                    alt="" 
                    />

                    <div className="patient-card__content">
                        <h2>João Lucas Vega</h2>
                    </div>

                    <Image 
                    className='patient-card__action-icon' 
                    src={visualize} 
                    alt="" 
                    />
                </div>

                <div className="patient-card">
                    <Image 
                    className='patient-card__image' 
                    src={profile} 
                    alt="" 
                    />

                    <div className="patient-card__content">
                        <h2>Rafael Moreira</h2>
                    </div>

                    <Image 
                    className='patient-card__action-icon' 
                    src={visualize} 
                    alt="" 
                    />
                </div>

                <div className="patient-card">
                    <Image 
                    className='patient-card__image' 
                    src={profile} 
                    alt="" 
                    />

                    <div className="patient-card__content">
                        <h2>Beatriz Nogueira</h2>
                    </div>

                    <Image 
                    className='patient-card__action-icon' 
                    src={visualize} 
                    alt="" 
                    />
                </div>

                <div className="patient-card">
                    <Image 
                    className='patient-card__image' 
                    src={profile} 
                    alt="" 
                    />

                    <div className="patient-card__content">
                        <h2>Lucas Tavares</h2>
                    </div>

                    <Image 
                    className='patient-card__action-icon' 
                    src={visualize} 
                    alt="" 
                    />
                </div>

                <div className="patient-card">
                    <Image 
                    className='patient-card__image' 
                    src={profile} 
                    alt="" 
                    />

                    <div className="patient-card__content">
                        <h2>Mariana Falcão</h2>
                    </div>

                    <Image 
                    className='patient-card__action-icon' 
                    src={visualize} 
                    alt="" 
                    />
                </div>

                <div className="patient-card">
                    <Image 
                    className='patient-card__image' 
                    src={profile} 
                    alt="" 
                    />

                    <div className="patient-card__content">
                        <h2>Felipe Azevedo</h2>
                    </div>

                    <Image 
                    className='patient-card__action-icon' 
                    src={visualize} 
                    alt="" 
                    />
                </div>

                <div className="patient-card">
                    <Image 
                    className='patient-card__image' 
                    src={profile} 
                    alt="" 
                    />

                    <div className="patient-card__content">
                        <h2>Juliana Siqueira</h2>
                    </div>

                    <Image 
                    className='patient-card__action-icon' 
                    src={visualize} 
                    alt="" 
                    />
                </div>

                <div className="patient-card">
                    <Image 
                    className='patient-card__image' 
                    src={profile} 
                    alt="" 
                    />

                    <div className="patient-card__content">
                        <h2>André Vasconcelos</h2>
                    </div>

                    <Image 
                    className='patient-card__action-icon' 
                    src={visualize} 
                    alt="" 
                    />
                </div>

                <div className="patient-card">
                    <Image 
                    className='patient-card__image' 
                    src={profile} 
                    alt="" 
                    />

                    <div className="patient-card__content">
                        <h2>Renata Duarte</h2>
                    </div>

                    <Image 
                    className='patient-card__action-icon' 
                    src={visualize} 
                    alt="" 
                    />
                </div>

                <div className="patient-card">
                    <Image 
                    className='patient-card__image' 
                    src={profile} 
                    alt="" 
                    />

                    <div className="patient-card__content">
                        <h2>Thiago Barreto</h2>
                    </div>

                    <Image 
                    className='patient-card__action-icon' 
                    src={visualize} 
                    alt="" 
                    />
                </div>
            </div>

            <Footer/>

        </div>
    )
}