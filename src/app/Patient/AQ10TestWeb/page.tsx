"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/routes';
import { useAuth, useTest } from '@/lib';
import { handleApiError } from '@/utils/apiErrors';
import './test.css'
import HeaderHome from '@/components/header-login/Header';
import Footer from '@/components/footer/Footer';

const questions = [
    "Costumo notar pequenos sons quando outros não percebem",
    "Eu geralmente me concentro mais no todo de uma imagem, ao invés de pequenos detalhes",
    "Acho fácil fazer mais de uma coisa de uma só vez",
    "Se houver uma interrupção, posso voltar para o que eu estava fazendo muito rápido",
    "Acho fácil “ler nas entrelinhas” quando alguém esta falando comigo",
    "Eu sei dizer se alguém que está me ouvindo está ficando entediado",
    "Quando estou lendo uma história, acho difícil descobrir as intenções dos personagens",
    "Gosto de coletar informações sobre categorias de coisas (por exemplo, tipos de carro, tipos de pássaros, etc.)",
    "Acho que é fácil descobrir o que alguém está pensando ou sentindo apenas olhando para o rosto da pessoa",
    "Acho difícil entender as intenções das pessoas"
];

export default function Questionnaire () {
    const router = useRouter();
    const { isAuthenticated, user } = useAuth();
    const { submitTest10, loading } = useTest();
    const [answers, setAnswers] = useState<number[]>(new Array(10).fill(-1));
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push(ROUTES.login);
            return;
        }
        if (user?.role !== 'PATIENT') {
            router.push(ROUTES.home);
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
            router.push(`${ROUTES.patientAQ10Result}?score=${result.score}`);
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

            
            <h2 className="questionnaire-subtitle">AQ-10</h2>

            <div className="questionnaire-card">
                {questions.map((question, index) => (
                    <form
                        key={index}
                        className={`questionnaire-item ${
                            index % 2 === 0
                                ? 'questionnaire-white'
                                : 'questionnaire-send'
                        }`}
                    >
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
                            backgroundColor: '#22304A',
                            color: 'white',
                            padding: '15px 50px',
                            border: 'none',
                            borderRadius: '30px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontSize: '30px'
                        }}
                    >
                        {loading ? 'Enviando...' : 'Enviar'}
                    </button>
                </div>
                
            </div>
            {error && (
                <div style={{ backgroundColor: '#fee', color: '#c00', padding: '10px', borderRadius: '4px', margin: '50px' }}>
                    <p>{error}</p>
                </div>
            )}


            <Footer/>
        </div>
    )
}
