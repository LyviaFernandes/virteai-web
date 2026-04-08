"use client"

import React from 'react';
import './result.css'
import Return from '@/assets/images/return-icon.svg';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Link from "next/link";

export default function ResultBigQuestionnaire () {
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
                                Deseja continuar para ter acesso à uma lista de 
                                terapeutas prontos para atender às suas necessidades?
                            </p>

                        </div>
                        

                        <div className="result-card__actions">
                            
                            <Link href="/TherapistList">
                                <button className='result-button'>
                                    <h3>Continuar</h3>
                                </button>
                            </Link>

                            
                        </div>
                    </div>

                </div>
        </div>
    )
}