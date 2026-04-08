"use client"

import React from 'react';
import './login.css'
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Input from '@/components/input/Input';
import ButtonEnter from '@/components/enter-button/Button';
import Link from "next/link";


export default function Login () {
    return(
        <div className="login-section">
            <HeaderEnter
            src={Return}
            />

            <div className="login-container">
                <h2>Login</h2>
                <div className="login-card">
                    <p>Email:</p>
                    <Input description='Insira seu email'/>

                    <p>Senha:</p>
                    <Input description='Insira sua senha'/>

                    <Link href="/RedefineWeb">
                        <button className='login-forgot-password'>
                            <div className="login-forgot-password__text">
                                <p>esqueci a senha</p>
                            </div>
                        </button>
                    </Link>

                    <div className="login-actions">
                        <ButtonEnter
                        label='Entrar'
                        onclick={() => console.log("oi")}
                        />

                        <Link href="/Profile">
                            <button className='login-register'>
                                <p>Não tenho cadastro</p>
                            </button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}