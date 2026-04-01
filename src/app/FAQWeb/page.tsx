"use client"

import React from 'react';
import './faq.css'
import HeaderHome from '@/components/header-login/Header';
import { useRef, useEffect } from 'react';
import Footer from '@/components/footer/Footer';
import Image from 'next/image';
import questionicon from '@/assets/images/questionicon.svg';


export default function FAQ () {
    return(
        <div className="Section-FAQ">
            <HeaderHome/>
                <div className="Page-center">
                    <h1>Perguntas Frequentes</h1>
                    <p>Veja abaixo as respostas de nossas perguntas mais frequentes.</p>
                </div>

                <div className="section-questions">
                    <div className="faq-send">
                        <Image 
                        src={questionicon}
                        alt=''
                        className="questionicon"
                        />
                        
                        <div className="text">
                            <div className="bigger">
                                <p>O que é a VirTEAi?</p>
                            </div>
                            <div className="small">
                                <p>A VirTEAi é uma iniciativa que desenvolve óculos de realidade 
                                    virtual adaptados e personalizados para pessoas com TEA. 
                                    Promovendo experiências seguras, acessíveis e focadas no bem-estar.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="faq-ciano">
                        <Image 
                        src={questionicon}
                        alt=''
                        className="questionicon"
                        />
                        
                        <div className="text">
                            <div className="bigger">
                                <p>Como os óculos da VirTEAi ajudam pessoas com TEA?</p>
                            </div>
                            <div className="small">
                                <p>Eles permitem vivências controladas em ambientes virtuais 
                                    que estimulam o aprendizado, a interação e o relaxamento, 
                                    respeitando os níveis sensoriais de cada pessoa.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="faq-blue">
                        <Image 
                        src={questionicon}
                        alt=''
                        className="questionicon"
                        />
                        
                        <div className="text">
                            <div className="bigger">
                                <p>Como os óculos da VirTEAi ajudam pessoas com TEA?</p>
                            </div>
                            <div className="small">
                                <p>Eles permitem vivências controladas em ambientes virtuais 
                                    que estimulam o aprendizado, a interação e o relaxamento, 
                                    respeitando os níveis sensoriais de cada pessoa.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="faq-green">
                        <Image 
                        src={questionicon}
                        alt=''
                        className="questionicon"
                        />
                        
                        <div className="text">
                            <div className="bigger">
                                <p>Como os óculos da VirTEAi ajudam pessoas com TEA?</p>
                            </div>
                            <div className="small">
                                <p>Eles permitem vivências controladas em ambientes virtuais 
                                    que estimulam o aprendizado, a interação e o relaxamento, 
                                    respeitando os níveis sensoriais de cada pessoa.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="faq-send">
                        <Image 
                        src={questionicon}
                        alt=''
                        className="questionicon"
                        />
                        
                        <div className="text">
                            <div className="bigger">
                                <p>Como os óculos da VirTEAi ajudam pessoas com TEA?</p>
                            </div>
                            <div className="small">
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