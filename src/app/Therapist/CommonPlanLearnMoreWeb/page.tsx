'use client';

import Link from 'next/link';
import './Plan.css';
import HeaderHome from '@/components/header-login/Header';
import Footer from '@/components/footer/Footer';

export default function CommonPlan() {
    return (
        <div className="plan-container">
            <HeaderHome />

            <div className="plan-hero">
                <h1>Plano Comum</h1>
            </div>

            <div className="plan-subtitle">
                <p>
                    Mais controle na sua rotina.
                    <br />
                    Mais qualidade no seu cuidado.
                </p>
            </div>

            <div className="plan-description">
                <p>Cuidar de pessoas exige presença, mas a rotina clínica, muitas vezes, exige algo diferente: organização constante, registros detalhados e tempo.</p>
                <p>  
                    O Plano Comum da VirTEAi foi criado para equilibrar essa equação.
                </p>
                <p> Ele organiza sua prática sem engessar seu trabalho, estrutura seu atendimento sem tirar sua autonomia e, principalmente, devolve tempo para o que realmente importa: o paciente.</p>
            </div>

            <div className="plan-section">
                <h2>O que muda na sua rotina?</h2>

                <p>Com a VirTEAi, você deixa de depender de anotações soltas, ferramentas separadas e processos manuais.
                <br/>
                <br/>
                Tudo passa a acontecer dentro de um único fluxo:</p>

                <div className="feature-card-primary">
                    <p>Seus pacientes organizados e acessíveis</p>
                </div>
                <div className="feature-card-secondary">
                    <p>Evoluções registradas de forma clara e contínua</p>
                </div>
                <div className="feature-card-tertiary">
                    <p>Relatórios gerados automaticamente</p>
                </div>
                <div className="feature-card-success">
                    <p>Materiais terapêuticos prontos para uso</p>
                </div>

                <p>O que antes era fragmentado… agora conversa entre si.</p>
            </div>

            <div className="plan-section">
                <h2>Clareza para decidir melhor</h2>

                <p>A evolução de um paciente não precisa ser subjetiva ou difícil de visualizar.
                <br/>
                <br/>
                A plataforma transforma registros em insights claros, permitindo que você acompanhe progresso, identifique padrões e tome decisões com mais segurança.
                <br/>
                <br/>
                Menos dúvida. Mais precisão.
                </p>

            </div>

            <div className="plan-section-alt">
                <h2>Para quem é esse plano?</h2>

                <p>Ideal para profissionais que atuam de forma independente e valorizam autonomia com estrutura:
                <br/>
                <br/>
                Psicólogos, terapeutas ocupacionais, fonoaudiólogos e especialistas que atendem individualmente encontram aqui um suporte sólido, sem complexidade desnecessária.</p>

            </div>

            <div className="plan-section-alt">
                <h2>O impacto no dia a dia</h2>

                <p>Você não trabalha mais para organizar o atendimento, o sistema trabalha para você!  Isso significa:</p>

                <div className="feature-card-primary-alt">
                    <p>Mais tempo livre na sua rotina</p>
                </div>
                <div className="feature-card-secondary-alt">
                    <p>Menos retrabalho</p>
                </div>
                <div className="feature-card-tertiary-alt">
                    <p>Mais consistência nos atendimentos</p>
                </div>
                <div className="feature-card-success-alt">
                    <p>Mais confiança nas decisões clínicas</p>
                </div>

                <p>O Plano Comum é para quem quer evoluir como profissional sem aumentar o peso da rotina.
                <br />
                <br />
                Uma estrutura invisível, mas poderosa, que sustenta o seu trabalho todos os dias.</p>
            </div>

            <Link href="/Therapist/Payment?plan=common">
                <button className='plan-cta-button'>
                    <h3>Assine Agora!</h3>
                </button>
            </Link>
            
            <Footer />
        </div>
    );
}