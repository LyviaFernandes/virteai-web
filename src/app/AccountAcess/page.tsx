"use client"

import React from 'react';
import './account.css'
import Image from 'next/image';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '../../assets/images/return-icon.svg';
import Input from '@/components/input/Input';
import ButtonEnter from '@/components/enter-button/Button';
import background from '../../assets/images/backgroundimage.svg';
import profile from '../../assets/images/ProfileIcon.svg';

export default function Acess () {
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