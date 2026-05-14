"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useTherapist } from '@/lib';
import { handleApiError } from '@/utils/apiErrors';
import './style.css'
import Image from 'next/image';
import HeaderHome from '@/components/header-login/Header';
import ImageCenter from '@/assets/images/PatientListBanner.svg';
import profile from '@/assets/images/ProfileIcon.svg';
import visualize from '@/assets/images/visualizeicon.svg';
import Footer from '@/components/footer/Footer';

export default function PatientListPage () {
    const router = useRouter();
    const { isAuthenticated, user } = useAuth();
    const { getPatients, loading } = useTherapist();
    const [patients, setPatients] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/Login');
            return;
        }
        if (user?.role !== 'THERAPIST') {
            router.push('/Home');
            return;
        }

        const fetchPatients = async () => {
            try {
                const patientData = await getPatients();
                setPatients(patientData);
            } catch (err) {
                setError(handleApiError(err));
            }
        };

        fetchPatients();
    }, [isAuthenticated, user, router, getPatients]);

    const handlePatientClick = (patientId: number) => {
        router.push(`/Therapist/PatientsMedicalRecord?patientId=${patientId}`);
    };

    if (!isAuthenticated) {
        return <div style={{ padding: '20px', textAlign: 'center' }}>Please log in</div>;
    }

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

            {error && (
                <div style={{ backgroundColor: '#fee', color: '#c00', padding: '10px', borderRadius: '4px', margin: '20px' }}>
                    <p>{error}</p>
                </div>
            )}

            <div className="patient-list">
                {loading ? (
                    <div style={{ padding: '20px', textAlign: 'center' }}>Loading patients...</div>
                ) : patients.length === 0 ? (
                    <div style={{ padding: '20px', textAlign: 'center' }}>No patients found</div>
                ) : (
                    patients.map((patient) => (
                        <div key={patient.userId} className="patient-card" onClick={() => handlePatientClick(patient.userId)}>
                            <Image
                                className='patient-card__image'
                                src={patient.profileImage || profile}
                                alt=""
                            />

                            <div className="patient-card__content">
                                <h2>{patient.name}</h2>
                            </div>

                            <Image
                                className='patient-card__action-icon'
                                src={visualize}
                                alt=""
                            />
                        </div>
                    ))
                )}
            </div>

            <Footer/>
        </div>
    )
}

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