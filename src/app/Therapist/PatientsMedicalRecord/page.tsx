"use client"

import { useRef, useState, useEffect } from 'react';import './style.css'
import './style.css'
import Image from 'next/image';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Iconpaciente from '@/assets/images/ProfileIcon.svg';
import plusicon from '@/assets/images/PlusIcon.svg';
import progess from '@/assets/images/ProgressDiagram.svg';
import visualize from '@/assets/images/visualizeicon.svg';
import deleteicon from '@/assets/images/DeleteIcon.svg';
import edit from '@/assets/images/editicon.svg';
import Footer from '@/components/footer/Footer';
import Input from '@/components/input/Input';


type User = {
    id: number;
    name: string;
    profileImage?: string;
    status: string;
}

export default function PatientsMedicalRecord () {
    const [date, setDate] = useState('');
    const [goal, setGoal] = useState('');
    const [pontuation, setPontuation] = useState('');

    const user: User = {
        id: 1,
        name: "João Lucas Vega",
        profileImage: "https://thumbs.dreamstime.com/b/retrato-da-pessoa-adulta-22170035.jpg",
        status: "Em acompanhamento"
    };
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [showModalInput, setShowModalInput] = useState(false);
    const codeBoxRef = useRef<HTMLDivElement>(null);
    const codeModalRef = useRef<HTMLDivElement>(null);

    const handleAccessScenario = () => {
    setShowCodeInput(true);
    };

    const handleAccessObjectives = () => {
    setShowModalInput(true);
     document.body.style.overflow = 'hidden';
    };

    return(
        <div className="patients-medical-record">
            <HeaderEnter
                src={Return}
            />

            <div className="profile-container">

                <div className="profile-avatar-wrapper">
                    <div className="profile-avatar-container">
                        <Image 
                        src={user.profileImage || Iconpaciente}
                        alt="Foto do usuário"
                        fill
                        className="profile-avatar-image"
                        />
                    </div>
                </div>

                <div className="profile-info">

                    <h2>{user.name}</h2>

                    <div className="profile-status">
                        <h3>{user.status}</h3>
                    </div>

                </div>

            </div>

            <div className="DiagramTitle">
                <p>Evolução geral</p>
                <Image 
                    onClick={handleAccessScenario}
                    src={plusicon}
                    alt=""
                    className="plus-image"
                    />
            </div>
            <div className="EvolutionDiagram">
                <Image 
                    src={progess}
                    alt=""
                    className="progess-image"
                    />
            </div>

            {showCodeInput && (
                <div className="overlay" onClick={() => setShowCodeInput(false)}>
                    <div
                        className="code-box"
                        ref={codeBoxRef}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="evolution">
                            <h2>Evolução Geral</h2>
                        </div>

                        <div className="text-evolution">
                            <p>Preencha as informações abaixo, para adicionar ao 
                            gráfico de evolução de seu paciente:</p>
                        </div>
                        
                        <div className="inputs-section">
                            <div className="input-box">
                                <p>Data da consulta:</p>
                                <Input
                                    description='Insira a data da consulta realizada'
                                    value={date}
                                    onChange={(e) => setDate (e.target.value)}
                                />
                            </div>

                            <div className="input-box">
                                <p>Objetivo da consulta:</p>
                                <Input
                                    description='Insira o objetivo da consulta realizada'
                                    value={goal}
                                    onChange={(e) => setGoal (e.target.value)}
                                />
                            </div>

                            <div className="input-box">
                                <p>Pontuação</p>
                                <Input
                                    description='Avalie a evolução do paciente de 0-100  '
                                    value={pontuation}
                                    onChange={(e) => setPontuation (e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="button-send">
                            <button>Enviar</button>
                        </div>
                    </div>
                </div>
            )}


            <div className="therapeutic-goals">
                <div className="therapeutic-goals-container" >
                    <div className="therapeutic-goals__content">
                        <h2>Objetivos terapeuticos</h2>
                    </div>

                    <Image 
                    onClick={handleAccessObjectives}
                    className='therapeutic-goals__action-icon' 
                    src={edit} 
                    alt="" 
                    />

                </div>

                    <div className="Goals">
                        <p>Comunicação Verbal</p>
                        <p>Interação Social</p>
                        <p>Regulação Emocional</p>
                        
                    </div>
            </div>

            {showModalInput && (
                <div className="modal" onClick={() => { setShowModalInput(false)  
                document.body.style.overflow = 'unset';}}>
                    <div className="modal-box"
                        ref={codeModalRef}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="therapeutic-modal">
                            <h2>Objetivos terapeuticos</h2>
                        </div>

                        <div className="Goals-modal">
                            <div className="delete-goal">
                                <Image 
                                src={deleteicon}
                                alt=""
                                className="delete"
                                />
                                <p>Comunicação Verbal</p>
                            </div>
                            <div className="delete-goal">
                                <Image 
                                src={deleteicon}
                                alt=""
                                className="delete"
                                />
                                <p>Interação Social</p>
                            </div>

                            <div className="delete-goal">
                                <Image 
                                src={deleteicon}
                                alt=""
                                className="delete"
                                />
                                <p>Regulação Emocional</p>
                            </div>
                            <Image 
                            onClick={handleAccessScenario}
                            src={plusicon}
                            alt=""
                            className="plus-modal"
                            />
                        </div>

                    </div>

                </div>
            )}

            
            <div className="therapeutic-goals-relatorios">

                <div className="therapeutic-goals-container">
                    <div className="therapeutic-goals__content">
                        <h2>Relatórios</h2>
                    </div>

                    <Image 
                    className='therapeutic-goals__action-icon' 
                    src={visualize} 
                    alt="" 
                    />

                </div>

                
            </div>

            <div className="therapeutic-goals-cenarios">

                <div className="therapeutic-goals-container">
                    <div className="therapeutic-goals__content">
                        <h2>Cenarios</h2>
                    </div>

                    <Image 
                    className='therapeutic-goals__action-icon' 
                    src={visualize} 
                    alt="" 
                    />

                </div>

                
            </div>

            
            <Footer/>

        </div>
    )

}