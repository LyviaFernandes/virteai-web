"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib';
import './profile.css'
import Image from 'next/image';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '../../assets/images/return-icon.svg';
import Iconpaciente from '../../assets/images/PacientIcon.svg';
import Iconterapeuta from '../../assets/images/TherapistIcon.svg';
import Link from 'next/link';



export default function Profile () {
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/Home');
        }
    }, [isAuthenticated, router]);

    if (isAuthenticated) {
        return <div>Redirecting...</div>;
    }

    return(
        <div className="profile-section">
            <HeaderEnter
            src={Return}
            />
            
            <div className="profile-header">
                <h2>Perfil</h2>
                <p>Selecione abaixo o tipo de perfil que mais se adequa a você</p>

            </div>

            <div className="profile-card-list">
                <Link href="../Patient/SingUpPatient">
                    <div className="profile-card">
                        <Image 
                        className='profile-card__icon' 
                        src={Iconpaciente} 
                        alt="" 
                        />
                        <p>Paciente</p>
                    </div>
                </Link>

                <Link href="../Therapist/SingUpTherapist">
                    <div className="profile-card">
                        <Image 
                        className='profile-card__icon' 
                        src={Iconterapeuta} 
                        alt="" 
                        />
                        <p>Terapeuta</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}