"use client"

import React from 'react';
import './singup.css'
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Input from '@/components/input/Input';
import ButtonEnter from '@/components/enter-button/Button';

export default function TherapistSingup () {
    return(
        <div className="Section-Singup">
            <HeaderEnter
            src={Return}
            />

            <div className="card-container">
                <h2>Cadastro</h2>
                <div className="card">
                    <p>Nome:</p>
                    <Input description='Insira seu nome'/>

                    <p>Email:</p>
                    <Input description='Insira seu email'/>

                    <p>Senha:</p>
                    <Input description='Insira sua senha'/>

                    <p>Registro profissional:</p>
                    <Input description='Insira seu registro profissional'/>


                    <div className="container-buttons">
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