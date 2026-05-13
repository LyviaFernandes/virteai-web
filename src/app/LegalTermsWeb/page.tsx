"use client"

import React from 'react';
import './terms.css'
import HeaderHome from '@/components/header-login/Header';
import Footer from '@/components/footer/Footer';

export default function TermosLegais () {
    return(
        <div className="legal-section">
            <HeaderHome/>
                <div className="legal-header">
                    <h1>Termos Legais</h1>
                </div>

                <div className="legal-content">
                    <div className="legal-item">
                        <h2>1. Natureza do Serviço</h2>
                        <p>A VirTEAi é uma ferramenta de suporte tecnológico 
                            e não substitui acompanhamento médico, psicológico 
                            ou terapêutico profissional presencial.</p>
                    </div>

                    <div className="legal-item">
                        <h2>2. Relação com Profissionais</h2>
                        <p>Os terapeutas cadastrados são responsáveis por suas 
                            práticas profissionais. A VirTEAi atua como intermediadora 
                            tecnológica.</p>
                    </div>

                    <div className="legal-item">
                        <h2>3. Resposabilidade do Usuário </h2>
                        <p>O usuário é responsável por:</p>

                            <ul>
                                <li>Informações fornecidas;</li>
                                <li>Informações fornecidas;</li>
                                <li>Cumprimento das orientações profissionais.</li>
                            </ul>
                    </div>

                    <div className="legal-item">
                        <h2>4. Isenção de Garantias</h2>
                        <p>A plataforma é fornecida “como está”, sem garantias de resultados específicos.</p>
                    </div>

                    <div className="legal-item">
                        <h2>5. Serviços Oferecidos</h2>
                        <p>O usuário reconhece possíveis falhas tecnológicas, como indisponibilidade, 
                            erros de sistema ou limitações de hardware.</p>
                    </div>

                    <div className="legal-item">
                        <h2>6. Uso de Inteligência Artificial</h2>
                        <p>A IA utilizada pode gerar respostas baseadas em padrões e dados. 
                            Não há garantia de precisão absoluta.</p>
                    </div>

                    <div className="legal-item">
                        <h2>7. Responsabilidade Limitada</h2>
                        <p>A VirTEAi não será responsável por:</p>

                             <ul>
                                <li>Danos indiretos;</li>
                                <li>Perda de dados;</li>
                                <li>Resultados terapêuticos não alcançados.</li>
                            </ul>
                    </div>
                </div>

            <Footer/>

        </div>
    )
}