"use client"

import Link from 'next/link';
import { ROUTES } from '@/lib/routes';
import './services.css'
import Image from 'next/image';
import Footer from '@/components/footer/Footer';
import ImageCenter from '@/assets/images/Banner.svg';
import Check from '@/assets/images/check.svg';
import XIcon from '@/assets/images/XIcon.svg';
import CheckIcon from '@/assets/images/CheckIcon.svg';
import HeaderHome from '@/components/header-login/Header';


type Feature = {
  name: string;
  basic: boolean;
  premium: boolean;
};

const features: Feature[] = [
    { name: "Acesso à plataforma", basic: true, premium: true },
    { name: "Materiais terapêuticos", basic: true, premium: true },
    { name: "Acompanhamento de pacientes", basic: true, premium: true },
    { name: "Relatórios individuais", basic: true, premium: true },
    { name: "Múltiplos usuários", basic: false, premium: true },
    { name: "Gestão centralizada", basic: false, premium: true },
    { name: "Relatórios consolidados", basic: false, premium: true },
    { name: "Suporte dedicado", basic: false, premium: true },
];

export default function OurServices () {
    return(
        <div className="services-section">
            <HeaderHome/>
    
            <Image 
                className='services-banner' 
                src={ImageCenter} 
                alt="" 
            />

            <div className="services-intro">
                <h1>Transforme o seu atendimento!</h1>

                <p>Nossos planos oferecem ferramentas inteligentes, 
                    materiais especializados e uma plataforma pensada para profissionais que fazem a diferença no cuidado com o TEA. Escolha o ideal para você!</p>
            </div>

            <div className="plans-section">
                <div className="plan-card-basic">
                    <h2>Plano comum</h2>

                    <h3>Para quem atende com profundidade, caso a caso.</h3>

                    <div className="plan-features">
                        <div className="feature-item">
                            <Image className='feature-icon' src={Check} alt="" />
                            <p>Acesso completo à plataforma VirTEAi</p>
                        </div>

                        <div className="feature-item">
                            <Image className='feature-icon' src={Check} alt="" />
                            <p>Biblioteca de materiais terapêuticos atualizados</p>
                        </div>

                        <div className="feature-item">
                            <Image className='feature-icon' src={Check} alt="" />
                            <p>Ferramentas de acompanhamento de pacientes</p>
                        </div>

                        <div className="feature-item">
                            <Image className='feature-icon' src={Check} alt="" />
                            <p>Relatórios automatizados de evolução</p>
                        </div>

                        <div className="feature-item">
                            <Image className='feature-icon' src={Check} alt="" />
                            <p>Suporte técnico prioritário</p>
                        </div>
                    </div>

                    <div className="plan-price">
                        <p>R$49,90/mês</p>
                    </div>

                    <Link href={ROUTES.therapistCommonPlan}>
                        <button>
                            <p>saiba mais</p>
                        </button>
                    </Link>
                </div>

                 <div className="plan-card-premium">
                    <h2>Plano corporativo</h2>

                    <h3>Para quem precisa escalar o cuidado sem perder a qualidade.</h3>

                    <div className="plan-features">
                        <div className="feature-item">
                            <Image className='feature-icon' src={Check} alt="" />
                            <p>Tudo do Plano Comum</p>
                        </div>

                        <div className="feature-item">
                            <Image className='feature-icon' src={Check} alt="" />
                            <p>Múltiplos acessos para equipes</p>
                        </div>

                        <div className="feature-item">
                            <Image className='feature-icon' src={Check} alt="" />
                            <p>Painel de gestão centralizado</p>
                        </div>

                        <div className="feature-item">
                            <Image className='feature-icon' src={Check} alt="" />
                            <p>Relatórios consolidados por unidade/profissional</p>
                        </div>

                        <div className="feature-item">
                            <Image className='feature-icon' src={Check} alt="" />
                            <p>Suporte dedicado e onboarding personalizado</p>
                        </div>
                    </div>

                    <div className="plan-price">
                        <p>R$199,00/mês</p>
                    </div>

                    <Link href={ROUTES.therapistCorporativePlan}>
                        <button>
                            <p>saiba mais</p>
                        </button>
                    </Link>
                </div>
            </div>

            <div className="comparison-section">
                <h3>Tabela de Comparação</h3>

                <div className="comparison-table-container">
                    <table>
                        <thead>
                        <tr>
                            <th>Funcionalidades</th>
                            <th>Básico</th>
                            <th>Premium</th>
                        </tr>
                        </thead>

                        <tbody>
                        {features.map((item, index) => (
                            <tr key={index}>
                            <td>{item.name}</td>

                            <td>
                                {item.basic ? (
                                <span className="icon-check">
                                    <Image className='icon-check-img' src={CheckIcon} alt="" />
                                </span>
                                ) : (
                                <span className="icon-cross">
                                     <Image className='icon-cross-img' src={XIcon} alt="" />
                                </span>
                                )}
                            </td>

                            <td>
                                {item.premium ? (
                                <span className="icon-check">
                                    <Image className='icon-check-img' src={CheckIcon} alt="" />
                                </span>
                                ) : (
                                <span className="icon-cross">
                                    <Image className='icon-cross-img' src={XIcon} alt="" />
                                </span>
                                )}
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Footer/>
        </div>
    )
}