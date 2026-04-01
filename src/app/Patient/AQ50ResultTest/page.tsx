"use client"

import React from 'react';
import './result.css'
import Return from '@/assets/images/return-icon.svg';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Link from "next/link";

export default function ResultBigQuestionnaire () {
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
                                Deseja continuar para ter acesso à uma lista de 
                                terapeutas prontos para atender às suas necessidades?
                            </p>

                        </div>
                        

                        <div className="container-buttons">
                            
                            <Link href="/TherapistList">
                                <button className='white-button'>
                                    <h3>Continuar</h3>
                                </button>
                            </Link>

                            
                        </div>
                    </div>

                </div>
        </div>
    )
}