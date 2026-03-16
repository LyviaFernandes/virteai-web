"use client"

import React from 'react';
import './test.css'
import Image from 'next/image';
import HeaderHome from '@/components/header-login/Header';
import Footer from '@/components/footer/Footer';
import { useRef, useEffect } from 'react';

export default function Questionnaire () {
    return(
        <div className="Questionnaire-Section">
            <HeaderHome/>

            <div className="description">
            <h1>Teste - Quociente do Espectro Autista</h1>
            <p>Abaixo está o AQ-10 (Teste de Quociente do Espectro Autista), 
                composto por 10 questões que referenciam o nível de suspeita 
                de autismo em um indivíduo. Responda de acordo com o que se identifica.</p>
            </div>

            <h2>AQ-10</h2>

            <div className="card-questions">
                <div className="questions">
                    <p>1. Costumo notar pequenos sons quando outros não percebem</p>
                     <label>
                        <input type="radio" name="tea"/>
                        Concordo plenamente 
                    </label>
                </div>
            </div>
        </div>
    )
}