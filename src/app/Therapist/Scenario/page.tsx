"use client"

import { useRef, useState } from 'react';import './styles.css'
import Image from 'next/image';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Footer from '@/components/footer/Footer';
import deleteicon from '@/assets/images/deleteicon.svg';
import plusicon from '@/assets/images/PlusIcon.svg';
import visualize from '@/assets/images/visualizeicon.svg';
import infoicon from '@/assets/images/InfoIcon.svg';
import Iconpaciente from '@/assets/images/ProfileIcon.svg';
import Input from "@/components/input/Input";

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

      const [title, setTitle] = useState("");

      const [showCodeInput, setShowCodeInput] = useState(false);
      const codeBoxRef = useRef<HTMLDivElement>(null);
      const handleAccessScenario = () => {
        setShowCodeInput(true);
    };

 {
    
    };
    
        const [status, setStatus] = useState<Record<number, string>>({});
        const [open, setOpen] = useState<number | null>(null);
    
        const statusLabel: Record<string, string> = {
            naoiniciado: "Não iniciado",
            finalizado: "Finalizado",
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
                            <div className="info-wrapper">
                                <Image 
                                    src={infoicon}
                                    alt=""
                                    className="infoicon"
                                />

                                <div className="info-tooltip">
                                O ID gerado será utilizado para a validação 
                                da identidade do seu paciente para o acesso 
                                dos cenários
                                </div>
                             </div>
                        </div>


                    </div>
            </div>


            <div className="text-class">
                <h3 className='section-title-scenarios'>Cenários Terapêuticos</h3>
                    <Image 
                        onClick={handleAccessScenario}
                        src={plusicon}
                        alt=""   
                        className="plus"
                    />
            </div>

            {showCodeInput && (
                    <div className="overlay" onClick={() => setShowCodeInput(false)}>
                      <div
                        className="code-container"
                        ref={codeBoxRef}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="evolution">
                          <h2>Cenário</h2>
                        </div>
            
                        <div className="text-evolution">
                          <p>
                            Preencha as informações abaixo, para adicionar 
                            ao gráfico de evolução de seu paciente:
                          </p>
                        </div>
            
                        <div className="inputs-section">
                          <div className="input-box">
                            <p>Título:</p>
                            <Input
                              description="Insira aqui o título do cenário"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                            />
                          </div>
            
            
                          
                        </div>
            
                        <div className="button-send">
                          <button>Enviar</button>
                        </div>
                      </div>
                    </div>
                  )}

            <div className="scenarios-container">
                <div className="scenario-card">
                    <div className="scenario-card-container">
                        <h2>Cenário 1: Interação Social Básica</h2>
                            <div className="image-container">
                                <Image 
                                    src={deleteicon}
                                    alt=""
                                    className="delete"
                                />

                                {status[1] === "finalizado" && (
                                    <Image 
                                        src={visualize}
                                        alt=""
                                        className="view"
                                    />
                                )}
                            </div>
                    </div>
                    <div className="status-container">
                            <h3
                                onClick={() => setOpen(open === 1 ? null : 1)}
                                 className={`status-option status ${
                                    status[1] ? `status--${status[1]}` : "status--default"
                                }`}
                            >
                                {status[1] ? statusLabel[status[1]] : "Não iniciado"}
                            </h3>

                            {open === 1 && (
                                <div className="status-dropdown">
                                    {Object.entries(statusLabel).map(([key, label]) => (
                                        <div
                                            key={key}
                                           className="status-container"
                                            onClick={() => {
                                                setStatus((prev) => ({
                                                            ...prev,
                                                            1: key
                                                        }));
                                                setOpen(null);
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

                <div className="scenario-card">
                    <div className="scenario-card-container">
                        <h2>Cenário 2: Ambiente Escolar</h2>
                            <div className="image-container">
                                <Image 
                                    src={deleteicon}
                                    alt=""
                                    className="delete"
                                />

                                {status[2] === "finalizado" && (
                                    <Image 
                                        src={visualize}
                                        alt=""
                                        className="view"
                                    />
                                )}

                            </div>
                    </div>
                    <div className="status-container">
                            <h3
                                onClick={() => setOpen(open === 2 ? null : 2)}
                                 className={`status-option status ${
                                    status[2] ? `status--${status[2]}` : "status--default"
                                }`}
                            >
                                {status[2] ? statusLabel[status[2]] : "Não iniciado"}
                            </h3>

                            {open === 2 && (
                                <div className="status-dropdown">
                                    {Object.entries(statusLabel).map(([key, label]) => (
                                        <div
                                            key={key}
                                           className="status-container"
                                            onClick={() => {
                                                setStatus((prev) => ({
                                                            ...prev,
                                                            2: key
                                                        }));
                                                setOpen(null);
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

                <div className="scenario-card">
                    <div className="scenario-card-container">
                        <h2>Cenário 3: Situações do Dia a Dia</h2>
                            <div className="image-container">
                                <Image 
                                    src={deleteicon}
                                    alt=""
                                    className="delete"
                                />
                                {status[3] === "finalizado" && (
                                    <Image 
                                        src={visualize}
                                        alt=""
                                        className="view"
                                    />
                                )}

                            </div>
                    </div>
                    <div className="status-container">
                            <h3
                                onClick={() => setOpen(open === 3 ? null : 3)}
                                 className={`status-option status ${
                                    status[3] ? `status--${status[3]}` : "status--default"
                                }`}
                            >
                                {status[3] ? statusLabel[status[3]] : "Não iniciado"}
                            </h3>
                            {open === 3 && (
                                <div className="status-dropdown">
                                    {Object.entries(statusLabel).map(([key, label]) => (
                                        <div
                                            key={key}
                                           className="status-container"
                                            onClick={() => {
                                                setStatus((prev) => ({
                                                            ...prev,
                                                            3: key
                                                        }));
                                                setOpen(null);
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
            </div>

          
            <Footer/>
        </div>
    )

}