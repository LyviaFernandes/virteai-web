"use client"

import { useRef, useState, useEffect } from 'react';import './style.css'
import Image from 'next/image';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Footer from '@/components/footer/Footer';
import email from '@/assets/images/emailIcon.svg';
import DefaultProfileIcon from '@/assets/images/ProfileIcon.svg';

type User = {
    id: number;
    name: string;
    profileImage?: string;
    CRP: string;
}

export default function ProcessesAndTreatments () {
    
    const user: User = {
        id: 1,
        name: "Camilla Andrade",
        profileImage: "",
        CRP: "CRP 06/38472",
    };

    // 🔽 ADICIONADO: estados do código
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [generatedCode, setGeneratedCode] = useState("");
    const [userCode, setUserCode] = useState("");
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const codeBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (
            codeBoxRef.current &&
            !codeBoxRef.current.contains(event.target as Node)
        ) {
            setShowCodeInput(false);
            setUserCode("");
            setIsValid(null);
        }
    };

    if (showCodeInput) {
        document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
    }, [showCodeInput]);
    // 🔽 ADICIONADO: gerar código fake
    const handleAccessScenario = () => {
        const fakeCode = Math.floor(100000 + Math.random() * 900000).toString();

        console.log("Código fake:", fakeCode);

        setGeneratedCode(fakeCode);
        setShowCodeInput(true);
        setIsValid(null);
    };

    // 🔽 ADICIONADO: validar código
    const handleValidateCode = () => {
        if (userCode === generatedCode) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    };

    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return; // só número

    const newCode = userCode.split("");
    newCode[index] = value;
    const updatedCode = newCode.join("");

    setUserCode(updatedCode);

    // vai pro próximo input
    if (value && inputsRef.current[index + 1]) {
        inputsRef.current[index + 1]?.focus();
    }
};

const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !userCode[index]) {
        inputsRef.current[index - 1]?.focus();
    }
};

    return(
        <div className="processes-container">
            <HeaderEnter
                src={Return}
            />

            <div className="section-header">
                <h1>Processos e Tratamentos</h1>
                <p>Abaixo estão os cenários e tratamentos disponibilizados pelo seu terapeuta:</p>
            </div>

            <h3 className='section-title-responsible'>Responsável:</h3>

            <div className="profile-container">

                <div className="profile-avatar-wrapper">
                    <div className="profile-avatar-container">
                        <Image 
                        src={user.profileImage || DefaultProfileIcon}
                        alt="Foto do usuário"
                        fill
                        className="profile-avatar-image"
                        />
                    </div>
                </div>

                <div className="profile-info">

                    <h2>{user.name}</h2>

                    <p>{user.CRP}</p>

                </div>

                <div className="email-box">
                    <h3>Envie um email</h3>
                    <Image 
                        src={email}
                        alt=""
                        className="email-icon"
                        />
                </div>

            </div>

            <h3 className='section-title-scenarios'>Cenários Terapêuticos:</h3>

            <div className="scenarios-container">
                <div className="scenario-card">
                    <h3>Cenário 1: Interação Social Básica</h3>
                    <button onClick={handleAccessScenario}>Acessar Cenário</button>
                </div>

                <div className="scenario-card">
                    <h3>Cenário 2: Ambiente Escolar</h3>
                    <button onClick={handleAccessScenario}>Acessar Cenário</button>
                </div>

                <div className="scenario-card">
                    <h3>Cenário 3: Situações do Dia a Dia</h3>
                    <button onClick={handleAccessScenario}>Acessar Cenário</button>
                </div>
            </div>

            {/* 🔽 ADICIONADO: área de validação */}
            {showCodeInput && (
                <div className="overlay" onClick={() => setShowCodeInput(false)}>
                    <div
                        className="code-box"
                        ref={codeBoxRef}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="validation">
                            <h2>Validação</h2>
                        </div>

                        <p>Enviamos um código de validação no email cadastrado em sua conta. Informe-o abaixo para acessar o cenário.</p>
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
            )}

            <Footer/>
        </div>
    )

}