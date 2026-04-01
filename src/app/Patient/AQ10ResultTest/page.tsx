"use client"

import React from 'react';
import './result.css'
import Return from '@/assets/images/return-icon.svg';
import { useRef, useEffect } from 'react';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Input from '@/components/input/Input';
import ButtonEnter from '@/components/enter-button/Button';
import Link from "next/link";

export default function ResultQuestionnaire () {
    return(
        <div className="Section-Result">
            <HeaderEnter
            src={Return}
            />
            
                <div className="card-container">
                    <h2>Seu resultado!</h2>

                    <div className="card">
                        <div className="pontuacao">
                            <p>??/10</p>
                        </div>
                        <div className="mensage">
                            <p>
                                Temos um teste ainda mais robusto, deseja realizá-lo ou 
                                continuar para uma lista de terapeutas prontos para atender 
                                às suas necessidades?
                            </p>

                        </div>
                        

                        <div className="container-buttons">
                            
                            <ButtonEnter
                            label='Continuar'
                            onclick={() => console.log("oi")}
                            />

                            <Link href="/AQ50TestWeb">
                                <button className='white-button'>
                                    <h3>Acessar Teste</h3>
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>
        </div>
    )
}