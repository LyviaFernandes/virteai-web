"use client"

import './aboutus.css'
import Image from 'next/image';
import HeaderHome from "@/components/header-logout/Header";
import imagegroup from '../../assets/images/GroupPhoto.svg';
import Lyvia from '../../assets/images/LyviaImage.svg';
import Ana from '../../assets/images/AnaImage.svg';
import Ester from '../../assets/images/EsterImage.svg';
import Yuri from '../../assets/images/YuriImage.svg';
import Valdir from '../../assets/images/ValdirImage.svg';
import Teai from '../../assets/images/TEAImage.svg';
import Footer from '@/components/footer/Footer';

export default function AboutUs () {
    return(
        <div className="about-us">
            <HeaderHome/>

            <Image 
                className='about-us__banner' 
                src={imagegroup} 
                alt="Imagem com um oculos de realidade virtual e um botão escrito 'Personalize o seu' " 
            />

            <div className="about-us__intro">
                <h1>Quem somos?</h1>
                <p>A VirTEAI nasceu em 2025 com um propósito claro: 
                    tornar a tecnologia mais humana, sensível e acessível 
                    para pessoas com Transtorno do Espectro Autista (TEA). 
                    Nossa empresa surgiu da união entre estudantes apaixonados 
                    por inovação, inclusão e transformação social. 
                    Acreditamos que a tecnologia deve ser feita para todos — 
                    respeitando as diferentes formas de perceber, sentir e interagir 
                    com o mundo.</p>
            </div>

            <div className="about-us__mission">
                <h2>Nossa Missão</h2>

                <div className="mission__content">
                    <Image 
                        className='mission__image' 
                        src={Teai} 
                        alt="Arte de um garoto com simbolos do Transtorno do espectro autista" 
                    />
                    <p>Nosso principal objetivo é oferecer óculos de realidade virtual 
                        acessíveis, seguros e personalizados para pessoas com TEA, 
                        independentemente da idade ou do nível de suporte necessário. 
                        Identificamos uma lacuna no mercado: a maioria dos dispositivos 
                        tecnológicos não considera as particularidades sensoriais e cognitivas 
                        das pessoas neurodivergentes.
                        <br /><br />
                        A VirTEAI veio para mudar isso.
                        <br /><br />
                        Desenvolvemos produtos com design adaptado, funcionalidades pensadas 
                        para o conforto e a autonomia do usuário, e personalização que respeita 
                        as necessidades individuais de cada pessoa.
                        <br /><br />
                        O que nos diferencia é a escuta ativa, a empatia e o compromisso com 
                        a inclusão verdadeira. Não criamos uma solução genérica — criamos uma 
                        experiência personalizada. Nossos óculos são mais do que tecnologia: 
                        são ferramentas de conexão, aprendizagem e bem-estar
                    </p>
                </div>
            </div>

            <div className="about-us__team">
                <h2>Nosso Time</h2>

                <p>A força da VirTEAI está na colaboração. Nosso time multidisciplinar reúne 
                    talentos de diferentes áreas, comprometidos com a acessibilidade e a 
                    inovação social:
                </p>
            </div>

            <div className="team">
                <div className="team__group">
                    <div className="team__member">
                        <Image className='team__image' src={Lyvia} alt="Desenvolvedora front-end" />
                        <p>Desenvolvedora FrontEnd</p>
                    </div>

                    <div className="team__member">
                        <Image className='team__image' src={Ana} alt="Designer" />
                        <p>Designer</p>
                    </div>

                    <div className="team__member">
                        <Image className='team__image' src={Ester} alt="Desenvolvedora de Banco de Dados" />
                        <p>Desenvolvedora de Banco de Dados</p>
                    </div>
                </div>

                <div className="team__group">
                    <div className="team__member">
                        <Image className='team__image' src={Valdir} alt="Documentação" />
                        <p>Documentação</p>
                    </div>

                    <div className="team__member">
                        <Image className='team__image' src={Yuri} alt="Desenvolvedor BackEnd" />
                        <p>Desenvolvedor BackEnd</p>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
}