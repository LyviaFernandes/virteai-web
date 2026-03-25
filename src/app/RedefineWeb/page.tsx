"use client"

import React from 'react';
import './redefine.css'
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '../../assets/images/return-icon.svg';
import Input from '@/components/input/Input';
import ButtonEnter from '@/components/enter-button/Button';


export default function RedefinePassword () {
    return(
        <div className="Section-Password">
            <HeaderEnter
            src={Return}
            />
            
                
                
                <div className="card-container">
                    <h2>Redefinir Senha</h2>
                    <div className="card">
                        <div className="mensage">
                            <p>
                                Informe o email registrado em sua conta e 
                                lhe enviaremos um link para a redefinição de senha
                            </p>

                        </div>
                        <div className="container-input">
                            <p>Email:</p>
                            <Input description='Insira seu email'/>
                            
                        </div>

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