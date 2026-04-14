"use client"

import React, { useState } from 'react';
import './pay.css'
import Image from 'next/image';
import Footer from '@/components/footer/Footer';
import ImageCenter from '@/assets/images/Banner.svg';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';

export default function Payment () {
    const [value, setValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
     };
        return(
        <div className="payment-section">
            <HeaderEnter
                src={Return}
            />
            
            <div className="text-center">
                <h1>Você está a um passo de começar!</h1>
            </div>

            <div className="plan-section">  

            <h3 className='plan'>Plano:</h3>

            <div className="select-container">
                <select name="Plan" id="Plan">
                    <option value="Plano-Comum">Plano Comum -  R$49,90 por mês</option>
                    <option value="Plano-Corporativo">Plano Corporativo -  R$199,00 por mês</option>
                </select>
            </div>

            <h3 className='charge'>Cobrança:</h3>

            <div className="select-container">
                <select name="Plan" id="Plan">
                    <option value="Plano-Comum">1° dia do mês</option>
                    <option value="Plano-Corporativo">5° dia do mês</option>
                    <option value="Plano-Comum">10° dia do mês</option>
                    <option value="Plano-Comum">15° dia do mês</option>
                    <option value="Plano-Comum">20° dia do mês</option>
                </select>
            </div>

            <h3 className='data'>Dados Pessoais:</h3>
            <div className="select-container-data">
                <p>Nome:</p>
                <input 
                    type="text" 
                    value={value} 
                    onChange={handleChange} 
                    placeholder="Digite o seu nome completo" 
                    />
            </div>
            <div className="select-container-data">
                <p>Email:</p>
                <input 
                    type="text" 
                    value={value} 
                    onChange={handleChange} 
                    placeholder="Digite o seu email" 
                    />
            </div>

            </div>

            <Footer/>
        </div>
    )
}