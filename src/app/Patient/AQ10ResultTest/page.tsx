"use client"

import React from 'react';
import './result.css'
import Return from '@/assets/images/return-icon.svg';
import { useRef, useEffect } from 'react';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import ButtonEnter from '@/components/enter-button/Button';
import Link from "next/link";

export default function ResultQuestionnaire () {
    return(
        <div className="result-section">
            <HeaderEnter
            src={Return}
            />
            
                <div className="result-container">
                    <h2>Seu resultado!</h2>

                    <div className="result-card">
                        <div className="result-card__score">
                            <p>??/10</p>
                        </div>
                        <div className="result-card__message">
                            <p>
                                Temos um teste ainda mais robusto, deseja realizá-lo ou 
                                continuar para uma lista de terapeutas prontos para atender 
                                às suas necessidades?
                            </p>

                        </div>
                        

                        <div className="result-card__actions">
                            
                            <ButtonEnter
                            label='Continuar'
                            onclick={() => console.log("oi")}
                            />

                            <Link href="/AQ50TestWeb">
                                <button className='result-card__secondary-button'>
                                    <h3>Acessar Teste</h3>
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>
        </div>
    )
}