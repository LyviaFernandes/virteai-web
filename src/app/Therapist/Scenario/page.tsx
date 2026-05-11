"use client"

import { useRef, useState, useEffect } from 'react';import './styles.css'
import Image from 'next/image';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Footer from '@/components/footer/Footer';
import email from '@/assets/images/emailIcon.svg';
import DefaultProfileIcon from '@/assets/images/ProfileIcon.svg';
import infoicon from '@/assets/images/InfoIcon.svg';
import Iconpaciente from '@/assets/images/ProfileIcon.svg';

type User = {
    id: number;
    name: string;
    profileImage?: string;
    status: string;
    dataNasc: string;
    pais: string;
}

export default function Scenarios () {
    
    const user: User = {
        id: 482917,
        name: "João Lucas Vega",
        profileImage: "https://thumbs.dreamstime.com/b/retrato-da-pessoa-adulta-22170035.jpg",
        status: "Gerar ID",
        dataNasc: "15/03/2010",
        pais: "Brasil",
    };



    return(
        <div className="processes-container">
            <HeaderEnter
                src={Return}
            />

            <div className="section-header">
                <h1>Cenários</h1>
            </div>

            <h3 className='section-title-responsible'>Paciente:</h3>

            <div className="account-avatar-wrapper">
                   <div className="account-avatar">
                        <Image 
                            src={ Iconpaciente}
                            alt="Foto do usuário"
                            fill
                            className="account-avatar-image"
                        />

                       
                    </div>
                    <div className="account-user-info">

                        <h2>{user.name}</h2>

                      

                        <div className="box-ID">
                            <h3>{user.status}</h3>
                            <Image 
                            src={infoicon}
                            alt=""
                            
                            className="infoicon"
                        />
                        </div>


                    </div>
            </div>


            <h3 className='section-title-scenarios'>Cenários Terapêuticos:</h3>

            <div className="scenarios-container">
                <div className="scenario-card">
                    <h3>Cenário 1: Interação Social Básica</h3>
                    {/* <button onClick={handleAccessScenario}>Acessar Cenário</button> */}
                </div>

                <div className="scenario-card">
                    <h3>Cenário 2: Ambiente Escolar</h3>
                    {/* <button onClick={handleAccessScenario}>Acessar Cenário</button> */}
                </div>

                <div className="scenario-card">
                    <h3>Cenário 3: Situações do Dia a Dia</h3>
                    {/* <button onClick={handleAccessScenario}>Acessar Cenário</button> */}
                </div>
            </div>

            {/* área de validação */}
            {/* {showCodeInput && (
                <div className="overlay" onClick={() => setShowCodeInput(false)}>
                    <div
                        className="code-box"
                        ref={codeBoxRef}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="validation">
                            <h2>Validação</h2>
                        </div>

                        <p>Enviamos seu código de validação no email cadastrado em sua conta. Informe-o abaixo para acessar o cenário.</p>
                        <div className="code-inputs">
                            {[0,1,2,3,4,5].map((_, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    className="code-input"
                                    value={userCode[index] || ""}
                                    onChange={(e) => handleChange(e.target.value, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    ref={(el) => { inputsRef.current[index] = el }}
                                />
                            ))}
                        </div>

                        <button onClick={handleValidateCode}>
                            Enviar
                        </button>

                        {isValid === true && (
                            <p style={{ color: "green" }}>Código correto! Acesso liberado.</p>
                        )}

                        {isValid === false && (
                            <p style={{ color: "red" }}>Código inválido</p>
                        )}
                    </div>
                </div>
            )} */}

            <Footer/>
        </div>
    )

}