"use client"

import React from 'react';
import './test.css'
import HeaderHome from '@/components/header-login/Header';
import Footer from '@/components/footer/Footer';
import { useRef, useEffect } from 'react';

export default function Questionnaire () {
    return(
        <div className="Questionnaire-Section">
            <HeaderHome/>

            <div className="description">
                <div className="title-wrapper">
                    <h1>Teste - Quociente do Espectro Autista</h1>
                </div>
                <p>Abaixo está o AQ-10 (Teste de Quociente do Espectro Autista), 
                    composto por 10 questões que referenciam o nível de suspeita 
                    de autismo em um indivíduo. Responda de acordo com o que se identifica.</p>
            </div>

            
            <h2>AQ-10</h2>

            <div className="card-questions">
                <form className="questions">
                    <p>1. Costumo notar pequenos sons quando outros não percebem</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                    {/* //////// */}
                <form className="questions-colorsand">
                    <p>2. Eu geralmente me concentro mais no todo de uma imagem, ao invés de pequenos detalhes</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                {/* //////// */}
                <form className="questions">
                    <p>3. Acho fácil fazer mais de uma coisa de uma só vez</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                    {/* //////// */}
                <form className="questions-colorsand">
                    <p>4. Se houver uma interrupção, posso voltar para o que eu estava fazendo muito rápido</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                {/* //////// */}
                <form className="questions">
                    <p>5. Acho fácil “ler nas entrelinhas” quando alguém esta falando comigo</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                    {/* //////// */}
                <form className="questions-colorsand">
                    <p>6. Eu sei dizer se alguém que está me ouvindo está ficando entediado</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                {/* //////// */}
                {/* //////// */}
                <form className="questions">
                    <p>7. Quando estou lendo uma história, acho difícil descobrir as intenções dos personagens</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                    {/* //////// */}
                <form className="questions-colorsand">
                    <p>8. Gosto de coletar informações sobre categorias de coisas (por exemplo, tipos de carro, tipos de pássaros, etc.)</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                {/* //////// */}
                <form className="questions">
                    <p>9. Acho que é fácil descobrir o que alguém está pensando ou sentindo apenas olhando para o rosto da pessoa</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                    {/* //////// */}
                <form className="questions-colorsand">
                    <p>10. Acho difícil entender as intenções das pessoas</p>
                    <div className="questions-section">
                        <div className="label-container">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="label-container">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>
                {/* //////// */}
                <button className='envite'>
                    <p>Enviar</p>
                </button>
            </div>

            <Footer/>
        </div>
    )
}