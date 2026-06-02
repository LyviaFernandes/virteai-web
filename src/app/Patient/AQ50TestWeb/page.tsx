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
    "Quando leio uma história, consigo imaginar facilmente a aparência dos personagens.",
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
    "Prefiro ir ao teatro do que ir a um museu.",
    "Não fico incomodado(a) se minha rotina diária for alterada.",
    "Com frequência sinto que não sei manter uma conversa.",
    "Tenho facilidade em “ler nas entrelinhas” quando falam comigo.",
    "Geralmente me concentro mais no todo do que nos detalhes.",
    "Não sou muito bom/boa em lembrar números de telefone.",
    "Geralmente não noto pequenas mudanças em uma situação",
    "Consigo dizer quando a pessoa com quem estou conversando fica entediada.",
    "Consigo facilmente fazer mais do que uma coisa ao mesmo tempo.",
    "Quando falo no telefone, não tenho a certeza quando é a minha vez de falar.",
    "Gosto de fazer as coisas de forma espontânea.",
    "Com frequência sou o(a) último(a) que entende uma piada.",
    "Tenho facilidade em entender o que uma pessoa está pensando ou sentindo apenas olhando para o seu rosto.",
    "Se sou interrompido(a), consigo rapidamente voltar ao que estava fazendo.",
    "Sou bom/boa de papo.",
    "Os outros frequentemente me dizem que eu insisto muito nas mesmas coisas.",
    "Quando era criança, gostava de brincar de faz-de-conta com as outras crianças.",
    "Gosto de colecionar informação sobre categorias de coisas (ex., tipos de carros, de aves, de trens, de plantas, etc.).",
    "Tenho dificuldade de me imaginar na pele de outra pessoa.",
    "Gosto de planejar com cuidado todas as atividades em que participo.",
    "Aprecio eventos sociais.",
    "Tenho dificuldade em entender as intenções das outras pessoas.",
    "Situações novas me deixam ansioso(a).",
    "Gosto de conhecer pessoas novas.",
    "Tenho uma postura conciliadora em situações de interação social.",
    "Tenho dificuldade em lembrar o dia de aniversário dos outros.",
    "Tenho muita facilidade em brincar de faz-de-conta com as crianças."
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

            

            <h2>AQ-50</h2>

            <div className="questionnaire-card">
                {questions.map((question, index) => (
                    <form
                        key={index}
                        className={`questionnaire-item ${
                            index % 2 === 0
                                ? 'questionnaire-white'
                                : 'questionnaire-green'
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
                {error && (
                <div style={{ backgroundColor: '#9CB4D3', color: '#c00', padding: '10px', borderRadius: '4px', margin: '20px' }}>
                    <p>{error}</p>
                </div>
            )}
            </div>

            <Footer/>
        </div>
    )
}
