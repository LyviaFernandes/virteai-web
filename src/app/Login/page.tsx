"use client"

import React from 'react';
import './login.css'
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '../../assets/images/return-icon.svg';
import Input from '@/components/input/Input';
import ButtonEnter from '@/components/enter-button/Button';
import Link from "next/link";


export default function Login () {
    return(
        <div className="Section-Login">
            <HeaderEnter
            src={Return}
            />

            <div className="card-container">
                <h2>Login</h2>
                <div className="card">
                    <p>Email:</p>
                    <Input description='Insira seu email'/>

                    <p>Senha:</p>
                    <Input description='Insira sua senha'/>

                    <Link href="/RedefineWeb">
                        <button className='redefine-container'>
                            <div className="password">
                                <p>esqueci a senha</p>
                            </div>
                        </button>
                    </Link>

                    <div className="container-buttons">
                        <ButtonEnter
                        label='Entrar'
                        onclick={() => console.log("oi")}
                        />

                        <Link href="/Profile">
                            <button className='container-login'>
                                <p>Não tenho cadastro</p>
                            </button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}