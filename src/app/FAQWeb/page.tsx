"use client"

import React from 'react';
import './faq.css'
import HeaderHome from '@/components/header-login/Header';
import Footer from '@/components/footer/Footer';
import Image from 'next/image';
import questionicon from '@/assets/images/questionicon.svg';


export default function FAQ () {
    return(
        <div className="faq-section">
            <HeaderHome/>
                <div className="faq-header">
                    <h1>Perguntas Frequentes</h1>
                    <p>Veja abaixo as respostas de nossas perguntas mais frequentes.</p>
                </div>

                <div className="faq-list">
                    <div className="faq-card faq-card--sand">
                        <Image 
                        src={questionicon}
                        alt=''
                        className="faq-card__icon"
                        />
                        
                        <div className="faq-card__content">
                            <div className="faq-card__question">
                                <p>O que é a VirTEAi?</p>
                            </div>
                            <div className="faq-card__answer">
                                <p>A VirTEAi é uma iniciativa que desenvolve óculos de realidade 
                                    virtual adaptados e personalizados para pessoas com TEA. 
                                    Promovendo experiências seguras, acessíveis e focadas no bem-estar.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="faq-card faq-card--ciano">
                        <Image 
                        src={questionicon}
                        alt=''
                        className="faq-card__icon"
                        />
                        
                        <div className="faq-card__content">
                            <div className="faq-card__question">
                                <p>Como os óculos da VirTEAi ajudam pessoas com TEA?</p>
                            </div>
                            <div className="faq-card__answer">
                                <p>Eles permitem vivências controladas em ambientes virtuais 
                                    que estimulam o aprendizado, a interação e o relaxamento, 
                                    respeitando os níveis sensoriais de cada pessoa.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="faq-card faq-card--blue">
                        <Image 
                        src={questionicon}
                        alt=''
                        className="faq-card__icon"
                        />
                        
                        <div className="faq-card__content">
                            <div className="faq-card__question">
                                <p>Como os óculos da VirTEAi ajudam pessoas com TEA?</p>
                            </div>
                            <div className="faq-card__answer">
                                <p>Eles permitem vivências controladas em ambientes virtuais 
                                    que estimulam o aprendizado, a interação e o relaxamento, 
                                    respeitando os níveis sensoriais de cada pessoa.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="faq-card faq-card--green">
                        <Image 
                        src={questionicon}
                        alt=''
                        className="faq-card__icon"
                        />
                        
                        <div className="faq-card__content">
                            <div className="faq-card__question">
                                <p>Como os óculos da VirTEAi ajudam pessoas com TEA?</p>
                            </div>
                            <div className="faq-card__answer">
                                <p>Eles permitem vivências controladas em ambientes virtuais 
                                    que estimulam o aprendizado, a interação e o relaxamento, 
                                    respeitando os níveis sensoriais de cada pessoa.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="faq-card faq-card--sand">
                        <Image 
                        src={questionicon}
                        alt=''
                        className="faq-card__icon"
                        />
                        
                        <div className="faq-card__content">
                            <div className="faq-card__question">
                                <p>Como os óculos da VirTEAi ajudam pessoas com TEA?</p>
                            </div>
                            <div className="faq-card__answer">
                                <p>Eles permitem vivências controladas em ambientes virtuais 
                                    que estimulam o aprendizado, a interação e o relaxamento, 
                                    respeitando os níveis sensoriais de cada pessoa.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            <Footer/>

        </div>
    )
}