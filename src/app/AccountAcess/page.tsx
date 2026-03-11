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
        <div className="Section-Password">
            <HeaderEnter
            src={Return}
            />
            
                
                
                <div className="card-container">
                    <h2>Acesse sua conta!</h2>
                    <div className="card">
                        <Image 
                            className='IconProfile' 
                            src={profile} 
                            alt="" 
                        />
                        

                        <div className="container-buttons">
                            <ButtonEnter
                            label='Continuar'
                            onclick={() => console.log("oi")}
                            />
                        </div>
                        <div className="mensage">
                            <p>
                                Ao continuar você concorda com nossos
                            </p>
                            <p className='termos'>Termos de Uso</p>
                        </div>
                    </div>

                </div>
            </div>
    )
}