"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useTest } from '@/lib';
import { handleApiError } from '@/utils/apiErrors';
import './test.css'
import HeaderHome from '@/components/header-login/Header';
import Footer from '@/components/footer/Footer';

const questions = [
    "Costumo notar pequenos sons quando outros não percebem",
    "Normalmente me concentro mais no quadro geral do que nos pequenos detalhes",
    "Costumo notar detalhes de uma passagem escrita que outros não notam",
    "Costumo encontrar instruções difíceis de seguir",
    "Costumo fazer as coisas da mesma maneira todos os dias",
    "Costumo planejar as coisas com antecedência",
    "Costumo perder a noção do tempo",
    "Costumo encontrar fácil fazer mais de uma coisa ao mesmo tempo",
    "Quando estou lendo uma história, costumo encontrar fácil trabalhar com os personagens",
    "Costumo gostar de coletar informações sobre categorias de coisas (exemplo: tipos de carros, tipos de aves, tipos de trem, tipos de planta etc.)"
];

export default function Questionnaire () {
    const router = useRouter();
    const { isAuthenticated, user } = useAuth();
    const { submitTest10, loading } = useTest();
    const [answers, setAnswers] = useState<number[]>(new Array(10).fill(-1));
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/Login');
            return;
        }
        if (user?.role !== 'PATIENT') {
            router.push('/Home');
            return;
        }
    }, [isAuthenticated, user, router]);

    const handleAnswerChange = (questionIndex: number, value: number) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = value;
        setAnswers(newAnswers);
    };

    const handleSubmit = async () => {
        if (answers.includes(-1)) {
            setError('Por favor, responda todas as perguntas');
            return;
        }

        try {
            setError(null);
            const result = await submitTest10({ answers });
            router.push(`/Patient/AQ10ResultTest?score=${result.score}`);
        } catch (err) {
            setError(handleApiError(err));
        }
    };

    if (!isAuthenticated) {
        return <div style={{ padding: '20px', textAlign: 'center' }}>Please log in</div>;
    }

    return(
        <div className="questionnaire-section">
            <HeaderHome/>

            <div className="questionnaire-header">
                <div className="questionnaire-title-wrapper">
                    <h1>Teste - Quociente do Espectro Autista</h1>
                </div>
                <p>Abaixo está o AQ-10 (Teste de Quociente do Espectro Autista),
                    composto por 10 questões que referenciam o nível de suspeita
                    de autismo em um indivíduo. Responda de acordo com o que se identifica.</p>
            </div>

            {error && (
                <div style={{ backgroundColor: '#fee', color: '#c00', padding: '10px', borderRadius: '4px', margin: '20px' }}>
                    <p>{error}</p>
                </div>
            )}

            <h2 className="questionnaire-subtitle">AQ-10</h2>

            <div className="questionnaire-card">
                {questions.map((question, index) => (
                    <form key={index} className="questionnaire-item">
                        <p>{index + 1}. {question}</p>
                        <div className="questionnaire-options">
                            <div className="questionnaire-option">
                                <label htmlFor={`q${index}-0`}>Concordo plenamente</label>
                                <input
                                    type="radio"
                                    id={`q${index}-0`}
                                    name={`q${index}`}
                                    checked={answers[index] === 0}
                                    onChange={() => handleAnswerChange(index, 0)}
                                />
                            </div>

                            <div className="questionnaire-option">
                                <label htmlFor={`q${index}-1`}>Concordo parcialmente</label>
                                <input
                                    type="radio"
                                    id={`q${index}-1`}
                                    name={`q${index}`}
                                    checked={answers[index] === 1}
                                    onChange={() => handleAnswerChange(index, 1)}
                                />
                            </div>

                            <div className="questionnaire-option">
                                <label htmlFor={`q${index}-2`}>Discordo parcialmente</label>
                                <input
                                    type="radio"
                                    id={`q${index}-2`}
                                    name={`q${index}`}
                                    checked={answers[index] === 2}
                                    onChange={() => handleAnswerChange(index, 2)}
                                />
                            </div>

                            <div className="questionnaire-option">
                                <label htmlFor={`q${index}-3`}>Discordo plenamente</label>
                                <input
                                    type="radio"
                                    id={`q${index}-3`}
                                    name={`q${index}`}
                                    checked={answers[index] === 3}
                                    onChange={() => handleAnswerChange(index, 3)}
                                />
                            </div>
                        </div>
                    </form>
                ))}

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        style={{
                            backgroundColor: '#007bff',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        {loading ? 'Enviando...' : 'Enviar Teste'}
                    </button>
                </div>
            </div>

            <Footer/>
        </div>
    )

                <form className="questionnaire-item questionnaire-item--sand">
                    <p>2. Eu geralmente me concentro mais no todo de uma imagem, ao invés de pequenos detalhes</p>
                    <div className="questionnaire-options">
                        <div className="questionnaire-option">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="questionnaire-option">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="questionnaire-option">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="questionnaire-option">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>

                <form className="questionnaire-item">
                    <p>3. Acho fácil fazer mais de uma coisa de uma só vez</p>
                    <div className="questionnaire-options">
                        <div className="questionnaire-option">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="questionnaire-option">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="questionnaire-option">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="questionnaire-option">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>

                <form className="questionnaire-item questionnaire-item--sand">
                    <p>4. Se houver uma interrupção, posso voltar para o que eu estava fazendo muito rápido</p>
                    <div className="questionnaire-options">
                        <div className="questionnaire-option">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="questionnaire-option">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="questionnaire-option">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="questionnaire-option">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>

                <form className="questionnaire-item">
                    <p>5. Acho fácil “ler nas entrelinhas” quando alguém esta falando comigo</p>
                    <div className="questionnaire-options">
                        <div className="questionnaire-option">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="questionnaire-option">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="questionnaire-option">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="questionnaire-option">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>

                <form className="questionnaire-item questionnaire-item--sand">
                    <p>6. Eu sei dizer se alguém que está me ouvindo está ficando entediado</p>
                    <div className="questionnaire-options">
                        <div className="questionnaire-option">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="questionnaire-option">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="questionnaire-option">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="questionnaire-option">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>

                <form className="questionnaire-item">
                    <p>7. Quando estou lendo uma história, acho difícil descobrir as intenções dos personagens</p>
                    <div className="questionnaire-options">
                        <div className="questionnaire-option">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="questionnaire-option">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="questionnaire-option">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="questionnaire-option">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>

                <form className="questionnaire-item questionnaire-item--sand">
                    <p>8. Gosto de coletar informações sobre categorias de coisas (por exemplo, tipos de carro, tipos de pássaros, etc.)</p>
                    <div className="questionnaire-options">
                        <div className="questionnaire-option">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="questionnaire-option">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="questionnaire-option">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="questionnaire-option">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>

                <form className="questionnaire-item">
                    <p>9. Acho que é fácil descobrir o que alguém está pensando ou sentindo apenas olhando para o rosto da pessoa</p>
                    <div className="questionnaire-options">
                        <div className="questionnaire-option">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="questionnaire-option">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="questionnaire-option">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="questionnaire-option">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>

                <form className="questionnaire-item questionnaire-item--sand">
                    <p>10. Acho difícil entender as intenções das pessoas</p>
                    <div className="questionnaire-options">
                        <div className="questionnaire-option">
                            <label htmlFor="completely-agree">Concordo plenamente </label>
                            <input type="radio" id="completely-agree" name="tea"/>
                        </div>

                        <div className="questionnaire-option">
                            <label htmlFor="agree">Concordo parcialmente </label>
                            <input type="radio" id="agree" name="tea"/>
                        </div>

                        <div className="questionnaire-option">
                            <label htmlFor="completely-disagree">Discordo parcialmente </label>
                            <input type="radio" id="completely-disagree" name="tea"/>
                        </div>

                        <div className="questionnaire-option">
                            <label htmlFor="disagree">Discordo plenamente </label>
                            <input type="radio" id="disagree" name="tea"/>
                        </div>
                    </div>
                </form>

                <button className='questionnaire-submit'>
                    <p>Enviar</p>
                </button>
            </div>

            <Footer/>
        </div>
    )
}