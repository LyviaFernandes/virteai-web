"use client"

import React from 'react';
import './singup.css'
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Input from '@/components/input/Input';
import ButtonEnter from '@/components/enter-button/Button';

export default function PatientSingup () {
    return(
        <div className="signup-section">
            <HeaderEnter
            src={Return}
            />

            <div className="signup-container">
                <h2>Cadastro</h2>
                <div className="signup-card">
                    <p>Nome:</p>
                    <Input description='Insira seu nome'/>

                    <p>Email:</p>
                    <Input description='Insira seu email'/>

                    <p>Senha:</p>
                    <Input description='Insira sua senha'/>


                    <div className="signup-actions">
                        <ButtonEnter
                        label='Enviar'
                        onclick={() => console.log("oi")}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}