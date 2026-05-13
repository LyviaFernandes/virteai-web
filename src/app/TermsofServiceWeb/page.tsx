"use client"

import React from 'react';
import './terms.css'
import HeaderHome from '@/components/header-login/Header';
import Footer from '@/components/footer/Footer';

export default function TermosServico () {
    return(
        <div className="terms-section">
            <HeaderHome/>
                <div className="terms-header">
                    <h1>Termos de serviço</h1>
                </div>

                <div className="terms-content">
                    <div className="terms-item">
                        <h2>1. Aceitação dos Termos</h2>
                        <p>Ao acessar ou utilizar a plataforma VirTEAi, o usuário declara ter lido, 
                            compreendido e concordado com os presentes Termos de Serviço. 
                            Caso não concorde, deverá abster-se de utilizar a plataforma.</p>
                    </div>

                    <div className="terms-item">
                        <h2>2. Sobre a Plataforma</h2>
                        <p>A VirTEAi é uma plataforma digital que utiliza inteligência artificial e 
                            realidade virtual para auxiliar no tratamento, acompanhamento e possível 
                            diagnóstico de pessoas com Transtorno do Espectro Autista (TEA), 
                            conectando pacientes a profissionais qualificados.</p>
                    </div>

                    <div className="terms-item">
                        <h2>3. Cadastro e Contas</h2>
                        <p>O usuário se compromete a fornecer informações verdadeiras, completas e 
                            atualizadas. É de responsabilidade do usuário manter a confidencialidade 
                            de seus dados de acesso. A plataforma pode suspender ou encerrar contas 
                            que apresentem informações falsas ou uso indevido.</p>
                    </div>

                    <div className="terms-item">
                        <h2>4. Uso da Plataforma</h2>
                        <p>O usuário concorda em:</p>

                            <ul>
                                <li>Utilizar a plataforma apenas para fins legais;</li>
                                <li>Não violar direitos de terceiros;</li>
                                <li>Não tentar acessar sistemas internos ou comprometer a segurança;</li>
                                <li>Não utilizar a plataforma para fins comerciais não autorizados.</li>
                            </ul>
                    </div>

                    <div className="terms-item">
                        <h2>5. Serviços Oferecidos</h2>
                        <p>A VirTEAi oferece:</p>

                        <ul>
                            <li>Ambientes virtuais terapêuticos;</li>
                            <li>Recursos de inteligência artificial para simulações comportamentais;</li>
                            <li>Conexão com terapeutas e profissionais da área;</li>
                            <li>Suporte ao acompanhamento do paciente.</li>
                        </ul>
                    </div>

                    <div className="terms-item">
                        <h2>6. Limitação de Responsabilidade</h2>
                        <p>A VirTEAi não substitui diagnóstico médico profissional. 
                            A responsabilidade pelo tratamento é compartilhada entre paciente e 
                            profissional. A plataforma não se responsabiliza por decisões tomadas 
                            com base nas simulações.</p>
                    </div>

                    <div className="terms-item">
                        <h2>7. Propriedade Intelecual</h2>
                        <p>O usuário pode solicitar a exclusão de sua conta a qualquer momento. 
                            A plataforma pode encerrar contas que violem estes termos.</p>
                    </div>

                    <div className="terms-item">
                        <h2>8. Encerramento de Conta</h2>
                        <p>O usuário pode solicitar a exclusão de sua conta a qualquer momento. 
                            A plataforma pode encerrar contas que violem estes termos.</p>
                    </div>

                    <div className="terms-item">
                        <h2>9. Alterações nos Termos</h2>
                        <p>A VirTEAi pode atualizar estes termos a qualquer momento. 
                            O uso contínuo da plataforma implica aceitação das alterações.</p>
                    </div>

                    <div className="terms-item">
                        <h2>10. Legislação Aplicável</h2>
                        <p>Este documento é regido pelas leis brasileiras.</p>
                    </div>
                </div>

            <Footer/>

        </div>
    )
}