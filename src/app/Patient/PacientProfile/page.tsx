"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './pacientprofile.css'
import Image from 'next/image';
import { useAuth, usePatient } from '@/lib';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Iconpaciente from '@/assets/images/ProfileIcon.svg';
import visualize from '@/assets/images/visualizeicon.svg';
import barraprocess from '@/assets/images/barraprocesso.svg';
import Footer from '@/components/footer/Footer';

export default function PacientProfile () {
    const router = useRouter();
    const { isAuthenticated, user } = useAuth();
    const { data: patientData, loading, error, getMyProfile } = usePatient();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/Login');
            return;
        }
        if (user?.role !== 'PATIENT') {
            router.push('/Home');
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

    const careStatusMap: { [key: string]: string } = {
        'NOT_STARTED': 'Não iniciado',
        'IN_PROGRESS': 'Em acompanhamento',
        'PAUSED': 'Pausado',
        'FINISHED': 'Concluído'
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
                        src={Iconpaciente}
                        alt="Foto do usuário"
                        fill
                        className="profile-avatar-image"
                        />
                    </div>
                </div>

                <div className="profile-info">

                    <h2>{patientData?.name || 'Paciente'}</h2>

                    <div className="profile-status">
                        <h3>{careStatusMap[patientData?.careStatus || 'NOT_STARTED']}</h3>
                    </div>

                </div>

            </div>

            <div className="profile-content">
                <div className="profile-card">
                    <h3>Informações de Cadastro</h3>
                    {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
                    {patientData && (
                        <div style={{ marginBottom: '10px', fontSize: '14px' }}>
                            <p><strong>Email:</strong> {patientData.email}</p>
                            <p><strong>Cidade:</strong> {patientData.city}</p>
                            <p><strong>Data de Nascimento:</strong> {new Date(patientData.birthDate).toLocaleDateString('pt-BR')}</p>
                        </div>
                    )}
                    
                    <div className="profile-card__actions">
                        <Image 
                        className='profile-card__icon--view' 
                        src={visualize} 
                        alt="View"
                        style={{ cursor: 'pointer' }}
                        onClick={() => router.push('/Patient/AccountInformation')}
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
                        alt="View"
                        style={{ cursor: 'pointer' }}
                        onClick={() => router.push('/Patient/SheetsAndTests')}
                        />
                    </div>
                </div>

                <div className="profile-card">
                    <h3>Processos e Tratamentos</h3>
                    
                    <div className="profile-card__actions">
                        <Image 
                        className='profile-card__icon--view' 
                        src={visualize} 
                        alt="View"
                        style={{ cursor: 'pointer' }}
                        onClick={() => router.push('/Patient/ProcessesAndTreatments')}
                        />
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    )
}