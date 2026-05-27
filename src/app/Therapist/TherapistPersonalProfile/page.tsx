"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/routes';
import './personal.css'
import Image from 'next/image';
import { useAuth, useTherapist } from '@/lib';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import DefaultProfileIcon from '@/assets/images/ProfileIcon.svg';
import ViewIcon from '@/assets/images/visualizeicon.svg';
import EditIcon from '@/assets/images/editicon.svg';
import Footer from '@/components/footer/Footer';

export default function TherapistProfile () {
    const router = useRouter();
    const { isAuthenticated, user } = useAuth();
    const { data: therapistData, loading, error, getMyProfile } = useTherapist();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push(ROUTES.login);
            return;
        }
        if (user?.role !== 'THERAPIST') {
            router.push(ROUTES.home);
            return;
        }
        getMyProfile();
    }, [isAuthenticated, user, getMyProfile, router]);

    if (!isAuthenticated) {
        return <div style={{ padding: '20px', textAlign: 'center' }}>Please log in</div>;
    }

    if (loading) {
        return <div style={{ padding: '20px', textAlign: 'center' }}>Loading profile...</div>;
    }

    return(
        <div className="profile-page">

            <HeaderEnter
                src={Return}
            />

            <div className="profile-header">

                <div className="profile-avatar-wrapper">
                    <div className="profile-avatar-container">
                        <Image 
                        src={DefaultProfileIcon}
                        alt="Foto do usuário"
                        fill
                        className="profile-avatar-image"
                        />
                    </div>
                </div>

                <div className="profile-details">

                    <h2>{therapistData?.name || 'Terapeuta'}</h2>

                    <p>CRP: {therapistData?.professionalRegister || 'Registro profissional'}</p>

                    <div className="profile-status">
                        <h3>{therapistData?.specialty || 'Especialidade'}</h3>
                    </div>

                </div>

            </div>

            <div className="profile-sections">
               
                
                <div className="profile-card">
                    <h3>Informações de Cadastro</h3>
                    
                    <div className="card-actions">
                        <Image 
                        className='action-icon view-icon' 
                        src={ViewIcon} 
                        alt="View"
                        style={{ cursor: 'pointer' }}
                        onClick={() => router.push(ROUTES.therapistAccountInformation)}
                        />
                      
                    </div>
                </div>

             
                <div className="profile-card">
                    <h3>Pacientes e Tratamentos</h3>
                    
                    <div className="card-actions">
                        <Image 
                        className='action-icon view-icon' 
                        src={ViewIcon} 
                        alt="View"
                        style={{ cursor: 'pointer' }}
                        onClick={() => router.push(ROUTES.therapistPatientList)}
                        />
                    </div>
                </div>

                <div className="profile-card">
                    <h3>Agenda e Histórico</h3>

                    <div className="card-actions">
                        <Image
                        className='action-icon view-icon'
                        src={ViewIcon}
                        alt="View"
                        style={{ cursor: 'pointer' }}
                        onClick={() => router.push(ROUTES.therapistCalendarHistory)}
                        />
                    </div>
                </div>


            </div>

            <Footer/>

        </div>
    )
}