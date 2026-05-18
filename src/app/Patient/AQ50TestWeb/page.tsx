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
    "Prefiro fazer coisas com outras pessoas do que sozinho(a).",
    "Prefiro fazer as coisas sempre da mesma maneira.",
    "Quando tento imagina uma coisa, acho muito fácil criar uma imagem na minha mente.",
    "Com frequência, fico tão absorvido(a) com uma coisa, que esqueço todo o resto.",
    "Frequentemente noto pequenos ruídos que outras pessoas não ouvem.",
    "Costumo prestar atenção aos números das placas dos automóveis ou a outras sequências de informação do mesmo tipo",
    "Com frequência, as outras pessoas me dizem que falei algo indelicado, apesar de eu achar que fui delicado(a).",
    "Com frequência, as outras pessoas me dizem que falei algo indelicado, apesar de eu achar que fui delicado(a).",
    "Sou fascinado(a) por datas.",
    "Quando estou em grupo, tenho facilidade em seguir várias conversas ao mesmo tempo.",
    "Tenho facilidade em compreender situações sociais.",
    "Tenho tendência a notar detalhes que os outros não reparam.",
    "Prefiro ir a uma biblioteca do que a uma festa.",
    "Tenho facilidade em inventar histórias.",
    "Tenho maior tendência a me aproximar de pessoas do que de coisas.",
    "Tenho tendência a ter interesses fortes e fico incomodado(a) se não posso me dedicar a eles.",
    "Gosto de bater papo.",
    "Quando estou falando, as outras pessoas têm dificuldade em tomar a palavra.",
    "Os números me fascinam.",
    "Quando leio uma história, sinto dificuldade em entender as intenções dos personagens.",
    "Não aprecio ler livros de ficção.",
    "Tenho dificuldade em fazer novos amigos.",
    "Vejo, constantemente, padrões nas coisas que me rodeiam.",
    "Não gosto de ir a compras.",
    "Prefiro atividades que envolvam fazer as coisas com as minhas próprias mãos.",
    "Tenho facilidade em trabalhar com várias ideias ao mesmo tempo.",
    "Tenho tendência a repetir certas ações ou rotinas.",
    "Tenho facilidade em entender as intenções das pessoas.",
    "Tenho tendência a me concentrar em detalhes pequenos.",
    "Tenho facilidade em fazer amigos.",
    "Tenho tendência a me perder em pensamentos.",
    "Não gosto de mudanças.",
    "Tenho facilidade em fazer as pessoas rirem.",
    "Tenho tendência a planejar as coisas com antecedência.",
    "Tenho tendência a entender as regras de um jogo imediatamente.",
    "Tenho facilidade em trabalhar sozinho(a).",
    "Tenho tendência a ser organizado(a).",
    "Tenho facilidade em lidar com mudanças.",
    "Tenho tendência a reparar em detalhes que os outros não reparam.",
    "Tenho facilidade em manter uma conversa.",
    "Tenho tendência a me interessar por números.",
    "Tenho facilidade em fazer as pessoas se sentirem à vontade.",
    "Tenho tendência a gostar de rotinas.",
    "Tenho facilidade em visualizar coisas.",
    "Tenho tendência a gostar de listas de fatos.",
    "Tenho facilidade em improvisar.",
    "Tenho tendência a gostar de ordem.",
    "Tenho facilidade em entender expressões faciais.",
    "Tenho tendência a saber como as coisas funcionam.",
    "Tenho facilidade em manter o foco em uma conversa."
];

export default function BigQuestionnaire () {
    const router = useRouter();
    const { isAuthenticated, user } = useAuth();
    const { submitTest50, loading } = useTest();
    const [answers, setAnswers] = useState<number[]>(new Array(50).fill(-1));
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
            const result = await submitTest50({ answers });
            router.push(`${ROUTES.patientAQ50Result}?score=${result.score}`);
        } catch (err) {
            setError(handleApiError(err));
        }
    };

    if (!isAuthenticated) {
        return <div style={{ padding: '20px', textAlign: 'center' }}>Please log in</div>;
    }

    return(
        <div className="Questionnaire-Section">
            <HeaderHome/>

            <div className="description">
                <div className="title-wrapper">
                    <h1>Teste - Quociente do Espectro Autista</h1>
                </div>
                <p>Abaixo está o AQ-50 (Teste de Quociente do Espectro Autista), um teste mais robusto,
                    composto por 50 questões que referenciam o nível de suspeita de autismo em um indivíduo.
                    Responda de acordo com o que se identifica.</p>
            </div>

            {error && (
                <div style={{ backgroundColor: '#fee', color: '#c00', padding: '10px', borderRadius: '4px', margin: '20px' }}>
                    <p>{error}</p>
                </div>
            )}

            <h2>AQ-50</h2>

            <div className="card-questions">
                {questions.map((question, index) => (
                    <form key={index} className={`questions${index % 2 === 1 ? '-colorgreen' : ''}`}>
                        <p>{index + 1}. {question}</p>
                        <div className="questions-section">
                            <div className="label-container">
                                <label htmlFor={`q${index}-0`}>Concordo plenamente</label>
                                <input
                                    type="radio"
                                    id={`q${index}-0`}
                                    name={`q${index}`}
                                    checked={answers[index] === 0}
                                    onChange={() => handleAnswerChange(index, 0)}
                                />
                            </div>

                            <div className="label-container">
                                <label htmlFor={`q${index}-1`}>Concordo parcialmente</label>
                                <input
                                    type="radio"
                                    id={`q${index}-1`}
                                    name={`q${index}`}
                                    checked={answers[index] === 1}
                                    onChange={() => handleAnswerChange(index, 1)}
                                />
                            </div>

                            <div className="label-container">
                                <label htmlFor={`q${index}-2`}>Discordo parcialmente</label>
                                <input
                                    type="radio"
                                    id={`q${index}-2`}
                                    name={`q${index}`}
                                    checked={answers[index] === 2}
                                    onChange={() => handleAnswerChange(index, 2)}
                                />
                            </div>

                            <div className="label-container">
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
                        className='envite'
                        style={{
                            backgroundColor: loading ? '#ccc' : '#007bff',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        {loading ? 'Enviando...' : 'Enviar'}
                    </button>
                </div>
            </div>

            <Footer/>
        </div>
    )
}
