"use client"

import React, { useState } from 'react';
import './style.css'
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Footer from '@/components/footer/Footer';

type FormType = {
    pacient: string;
    therapist: string;
    goals: string;
    title: string,
    report: string,
}

export default function AddNewReport () {

    const [form, setForm] = useState<FormType>({
        pacient: "",
        therapist: "",
        goals: "",
        title: "",
        report: "",
    });

   const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};

    const [status, setStatus] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    const statusLabel: Record<string, string> = {
        evoluiu: "Evoluiu",
        manteve: "Manteve",
        retrocedeu: "Retrocedeu"
    };

    return(
        <div className="Section__Reports">
            <HeaderEnter src={Return} />

            <div className="reports-header">
                <h1>Preencher Relatório</h1>
            </div>

            <div className="text__reports">
                <p>Preencha os campos abaixo com informações sobre a sessão que quer relatar:</p>
            </div>

            <div className="personal-data-section">
                <h3 className='personal-data-title'>Dados Pessoais:</h3>

                <div className="personal-data-item">
                    <p>Paciente:</p>
                    <input 
                        name="pacient" 
                        value={form.pacient} 
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Insira neste campo o nome de seu paciente"
                    />
                </div>

                <div className="personal-data-item">
                    <p>Terapeuta:</p>
                    <input 
                        name="therapist" 
                        value={form.therapist} 
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Insira seu nome"
                    />
                </div>

                <div className="personal-data-item">
                    <p>Objetivo da sessão:</p>
                    <input 
                        name="goals" 
                        value={form.goals} 
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Insira o objetivo da sessão realizada"
                    />
                </div>
            </div>

            <div className="Report_Text_Section">
                <div className="Report__Text__Field">
                    
                    <div className="Report__Text__item">
                        <input 
                            name="title" 
                            value={form.title} 
                            onChange={handleChange}
                            className="input-title"
                            placeholder="Título do relatório"
                        />

                        <div className="status-container">
                            <h3
                                onClick={() => setOpen(!open)}
                                 className={`status-option status ${status ? `status--${status}` : "status--default"}`}
                               
                            >
                                {status ? statusLabel[status] : "Status"}
                            </h3>

                            {open && (
                                <div className="status-dropdown">
                                    {Object.entries(statusLabel).map(([key, label]) => (
                                        <div
                                            key={key}
                                           className="status-container"
                                            onClick={() => {
                                                setStatus(key);
                                                setOpen(false);
                                            }}
                                        >
                                            <h3>
                                            {label}

                                            </h3>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="Report__Field">
                        <textarea 
                            name="report" 
                            value={form.report} 
                            onChange={handleChange}
                            className="input-report"
                            placeholder="Neste campo, escreva o relatório sobre a sessão realizada."
                        />
                    </div>

                </div>
            </div>
            
            <div className="Send__Report">
                <button>Enviar Relatório</button>
            </div>
            <Footer/>
        </div>
    )
}