"use client"

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib';
import './account.css'
import Image from 'next/image';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '../../assets/images/return-icon.svg';
import ButtonEnter from '@/components/enter-button/Button';
import profile from '../../assets/images/ProfileIcon.svg';

export default function Acess () {
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
        <div className="account-access">
            <HeaderEnter
                src={Return}
            />

            <div className="account-access__container">
                <h2>Acesse sua conta!</h2>

                <div className="account-access__card">
                    <Image
                        className='account-access__profile-image'
                        src={profile}
                        alt=""
                    />

                    <div className="account-access__actions">
                        <ButtonEnter
                            label='Continuar'
                            onclick={() => console.log("oi")}
                        />
                    </div>

                    <div className="account-access__terms">
                        <p>
                            Ao continuar você concorda com nossos
                        </p>
                        <p className='account-access__terms-link'>
                            Termos de Uso
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}