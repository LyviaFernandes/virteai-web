'use client';

import Link from 'next/link';
import './Plan.css';
import HeaderHome from '@/components/header-login/Header';
import Footer from '@/components/footer/Footer';

export default function CorporativePlan() {
    return (
        <div className="plan-container">
            <HeaderHome />

            <div className="plan-hero">
                <h1>Plano Corporativo</h1>
            </div>

            <div className="plan-subtitle">
                <p>
                    Quando sua operação cresce,
                    <br />
                    sua gestão precisa acompanhar.
                </p>
            </div>

            <div className="plan-description">
                <p>Cuidar de múltiplos pacientes com múltiplos profissionais exige mais do que organização. Exige visão.</p>
                <p>  
                    Sem isso, o que surge é um cenário comum: informações espalhadas, processos desalinhados e dificuldade real de acompanhar o que está acontecendo.
                </p>
                <p> O Plano Corporativo da VirTEAi resolve esse problema na raiz.</p>
            </div>

            <div className="plan-section">
                <h2>Uma operação conectada</h2>

                <p>A plataforma funciona como um centro de comando da sua instituição.
                <br/>
                <br/>
                Tudo se integra:</p>

                <div className="feature-card-primary">
                    <p>Profissionais</p>
                </div>
                <div className="feature-card-secondary">
                    <p>Pacientes</p>
                </div>
                <div className="feature-card-tertiary">
                    <p>Atendimentos</p>
                </div>
                <div className="feature-card-success">
                    <p>Dados</p>
                </div>

                <p>Você deixa de operar no escuro e passa a enxergar o todo com clareza.</p>
            </div>

            <div className="plan-section">
                <h2>Gestão com visão estratégica</h2>

                <p>Não se trata apenas de organizar informações, mas de transformar dados em decisões.
                <br/>
                <br/>
                Com relatórios consolidados e visão ampla da operação, você consegue:</p>

                <div className="feature-card-primary-sub">
                    <p>Acompanhar desempenho de equipes</p>
                </div>
                <div className="feature-card-secondary-sub">
                    <p>Identificar padrões e oportunidades</p>
                </div>
                <div className="feature-card-tertiary-sub">
                    <p>Garantir qualidade nos atendimentos</p>
                </div>
                <div className="feature-card-success-sub">
                    <p>Tomar decisões baseadas em dados reais</p>
                </div>

            </div>

            <div className="plan-section">
                <h2>Escala com qualidade</h2>

                <p>Crescer sem estrutura gera caos.
                <br/>
                <br/>
                Crescer com a VirTEAi gera consistência.
                <br/>
                <br/>
                O plano corporativo permite expandir sua operação mantendo controle, padronização e alinhamento entre profissionais.
                <br />
                <br />
                Cada pessoa da equipe sabe o que fazer, como fazer e onde registrar.
                </p>

            </div>

            <div className="plan-section">
                <h2>Para quem é esse plano?</h2>

                <p>Desenvolvido para organizações que precisam de estrutura para crescer:</p>

                <div className="feature-card-primary-alt">
                    <p>Clínicas multidisciplinares</p>
                </div>
                <div className="feature-card-secondary-alt">
                    <p>Escolas</p>
                </div>
                <div className="feature-card-tertiary-alt">
                    <p>Centros terapêuticos</p>
                </div>
                <div className="feature-card-success-alt">
                    <p>Instituições de saúde</p>
                </div>
                <div className="feature-card-grey-alt">
                    <p>Empresas com programas de inclusão</p>
                </div>

            </div>

            <div className="plan-section-alt">
                <h2>Implementação sem fricção</h2>

                <p>A adoção de uma nova ferramenta pode ser um desafio.
                <br/>
                <br/>
                Por isso, a VirTEAi oferece suporte dedicado e onboarding personalizado, garantindo que sua equipe se adapte com segurança e eficiência desde o início.
                <br />
                <br />
                O Plano Corporativo transforma uma operação fragmentada em um sistema integrado, organizado e escalável.
                <br />
                <br />
                Mais controle. Mais clareza. Mais resultado.</p>

            </div>

            

            <Link href="/Therapist/Payment?plan=corporative">
                <button className='plan-cta-button'>
                    <h3>Assine Agora!</h3>
                </button>
            </Link>
            
            <Footer />
        </div>
    );
}