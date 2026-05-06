"use client"

import { useState } from 'react';
import './style.css'
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '../../assets/images/return-icon.svg';
import Link from 'next/link';

export default function CodeAuthentication () {

    const [generatedCode] = useState(() =>
        Math.floor(100000 + Math.random() * 900000).toString()
    );

    const [userCode, setUserCode] = useState(['', '', '', '', '']);

    const handleChange = (value: string, index: number) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newCode = [...userCode];
        newCode[index] = value;
        setUserCode(newCode);
    };

    const handleSubmit = () => {
        const code = userCode.join('');

        console.log("Código gerado:", generatedCode);

        if (code === generatedCode) {
            alert('Código correto ✅');
        } else {
            alert('Código incorreto ❌');
        }
    };

    return(
        <div className="reset-password">
            <HeaderEnter src={Return} />
            
            <div className="reset-password__container">
                <h2>Autenticação</h2>

                <div className="reset-password__card">
                    <div className="reset-password__message">
                        <p>
                            Enviamos um código em seu email. Informe-o abaixo para continuar a redefinição de senha.
                        </p>
                    </div>

                    <div className="code-inputs">
                        {userCode.map((value, index) => (
                            <input
                                key={index}
                                className="code-input"
                                maxLength={1}
                                value={value}
                                onChange={(e) => handleChange(e.target.value, index)}
                            />
                        ))}
                    </div>

                    <div className="reset-password__actions">
                        <Link href="../NewPassword">
                        </Link>
                        <button>Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}