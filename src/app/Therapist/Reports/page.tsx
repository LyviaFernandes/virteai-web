"use client"

import React, { useRef, useState } from 'react';
import './style.css'
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Footer from '@/components/footer/Footer';

type User = {
    id: number;
    pacient: string;
    therapist:string;
    goals: string;
}

export default function Reports () {
    const user: User = {
        id: 1,
        pacient: "João Lucas Vega",
        therapist: "Camila Andrade",
        goals: "Comunicação e interação social",
    };

    const [status, setStatus] = useState("evoluiu");
    const [open, setOpen] = useState(false);

    const statusLabel: Record<string, string> = {
        evoluiu: "Evoluiu",
        manteve: "Manteve",
        retrocedeu: "Retrocedeu"
    };
    return(
        <div className="Section__Reports">
            <HeaderEnter
                src={Return}
            />

            <div className="reports-header">
                <h1>Relatório Terapêutico</h1>
            </div>

            <div className="personal-data-section">
                <h3 className='personal-data-title'>Dados Pessoais:</h3>

                <div className="personal-data-item">
                    <p>Paciente: {user.pacient}</p>
                </div>

                <div className="personal-data-item">
                    <p>Terapeuta: {user.therapist}</p>
                </div>

                <div className="personal-data-item">
                    <p>Objetivo da sessão: {user.goals}</p>
                </div>
            </div>

            <div className="Report_Text_Section">
                <div className="Report__Text__Field">
                    <div className="Report__Text__item">
                        <p>Desenvolvimento da comunicação verbal</p>
                        <div className="status-container">
                            <h3
                                onClick={() => setOpen(!open)}
                                className={`status status--${status}`}
                            >
                                {statusLabel[status]}
                            </h3>

                            {open && (
                                <div className="status-dropdown">
                                    {Object.entries(statusLabel).map(([key, label]) => (
                                        <div
                                            key={key}
                                            className={`status-option status--${key}`}
                                            onClick={() => {
                                                setStatus(key);
                                                setOpen(false);
                                            }}
                                        >
                                            {label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="Report__Field">
                        <p>
                            Durante a sessão, o paciente foi exposto a um cenário 
                            voltado ao estímulo da comunicação verbal e interação 
                            social. Inicialmente, apresentou leve resistência ao 
                            ambiente, evitando contato direto e demonstrando necessidade 
                            de adaptação gradual.
                            <br />
                            <br />
                            Com o avanço das atividades, observou-se maior engajamento, 
                            especialmente quando utilizados estímulos visuais e comandos 
                            simples. O paciente passou a responder de forma mais consistente, 
                            mantendo contato  visual por períodos mais prolongados.
                            <br />
                            <br />
                            A aceitação do cenário evoluiu ao longo da sessão, indicando 
                            progresso na tolerância a interações estruturadas. Apesar de 
                            pequenas pausas e momentos de hesitação, o desempenho geral foi 
                            considerado positivo.
                            <br />
                            <br />
                            Recomenda-se continuidade das estratégias aplicadas, com introdução gradual de novos estímulos para fortalecer a generalização das habilidades desenvolvidas.
                        </p>
                        
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    )

}