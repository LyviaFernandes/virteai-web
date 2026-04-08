"use client"

import React from 'react';
import './privacy.css'
import HeaderHome from '@/components/header-login/Header';
import { useRef, useEffect } from 'react';
import Footer from '@/components/footer/Footer';

export default function PoliticaPrivacidade () {
    return(
        <div className="privacy-section">
            <HeaderHome/>
                <div className="privacy-header">
                    <h1>Politica de Privacidade</h1>
                </div>

                <div className="privacy-content">
                    <div className="privacy-item">
                        <h2>1. Coleta de Dados</h2>
                        <p>Podemos coletar:</p>

                            <ul>
                                <li>Dados pessoais (nome, e-mail, idade);</li>
                                <li>Dados sensíveis relacionados à saúde;</li>
                                <li>Dados de uso da plataforma;</li>
                                <li>Dados de interação com ambientes virtuais.</li>
                            </ul>
                    </div>

                   <div className="privacy-item">
                        <h2>2. Uso dos Dados</h2>
                        <p>Os dados são utilizados para:</p>

                            <ul>
                                <li>Melhorar a experiência do usuário;</li>
                                <li>Personalizar os cenários terapêuticos;</li>
                                <li>Conectar usuários a profissionais;</li>
                                <li>Aprimorar os algoritmos de IA.</li>
                            </ul>
                    </div>

                    <div className="privacy-item">
                        <h2>3. Compartilhamento de Dados</h2>
                        <p>Os dados podem ser compartilhados com:</p>

                            <ul>
                                <li>Profissionais autorizados;</li>
                                <li>Parceiros tecnológicos;</li>
                                <li>Autoridades legais, quando necessário.</li>
                            </ul>
                    </div>

                    <div className="privacy-item">
                        <h2>4. Armazenamento e Segurança</h2>
                        <p>Adotamos medidas de segurança para proteger os dados. Apesar disso, nenhum sistema é totalmente seguro.</p>
                    </div>

                    <div className="privacy-item">
                        <h2>5. Direitos do Usuário</h2>
                        <p>O usuário pode:</p>

                            <ul>
                                <li>Solicitar acesso aos dados;</li>
                                <li>Corrigir informações;</li>
                                <li>Solicitar exclusão;</li>
                                <li>Revogar consentimento.</li>
                            </ul>
                    </div>

                    <div className="privacy-item">
                        <h2>6. Retenção de Dados</h2>
                        <p>Os dados são armazenados pelo tempo necessário para cumprir as finalidades descritas.</p>
                    </div>

                    <div className="privacy-item">
                        <h2>7. Cookies</h2>
                        <p>Utilizamos cookies para melhorar a navegação.</p>
                    </div>

                    <div className="privacy-item">
                        <h2>8. Consentimento</h2>
                        <p>Ao utilizar a plataforma, o usuário concorda com esta política.</p>
                    </div>

                    <div className="privacy-item">
                        <h2>9. Alterações</h2>
                        <p>Esta política pode ser atualizada a qualquer momento.</p>
                    </div>

                    <div className="privacy-item">
                        <h2>10. Contato</h2>
                        <p>Para dúvidas sobre privacidade, entre em contato com a VirTEAi.</p>
                    </div>
                </div>

            <Footer/>

        </div>
    )
}