"use client"

import './home.css'
import Image from 'next/image';
import HeaderHome from '@/components/header-login/Header';
import HeaderLogout from '@/components/header-logout/Header';
import ImageCenter from '../../assets/images/personalize-your-glasses.svg';
import Julio from '../../assets/images/patient-julio.svg';
import Lucas from '../../assets/images/patient-mariana.svg';
import Rafael from '../../assets/images/patient-rafael.svg';
import Beatriz from '../../assets/images/patient-beatriz.svg';
import Carlos from '../../assets/images/patient-carlos.svg';
import Andddes from '../../assets/images/AndddesLogo.svg';
import Card from '@/components/card-carrosel/Card';
import Footer from '@/components/footer/Footer';
import { useRef, useEffect } from 'react';
import { useAuth } from '@/lib';


export default function HomePage () {
    const { isAuthenticated } = useAuth();
    const containerRef = useRef<HTMLDivElement>(null);

    // Scroll listener for carousel
    useEffect(() => {
      const container = containerRef.current;

      const handleWheel = (e: WheelEvent) => {
        if (!container) return;

        e.preventDefault();
        container.scrollLeft += e.deltaY;
      };

      container?.addEventListener("wheel", handleWheel);

      return () => {
        container?.removeEventListener("wheel", handleWheel);
      };
    }, []);

    return(

        <div className="home-page">
            {isAuthenticated ? <HeaderHome/> : <HeaderLogout/>}

            <Image
                className='home-banner'
                src={ImageCenter}
                alt="Imagem com um oculos de realidade virtual e um botão escrito 'Personalize o seu' "
            />


            <div className="home-testimonials">
                <h1>Relatos</h1>

                <p>Alguns de nossos clientes relataram suas experiências com nossos produtos. Dê uma olhada:</p>
            </div>

            <div ref={containerRef} className="home-carousel">
                <Card
                src={Julio}
                title='Julio C. - Programador (26 anos, TEA nível 1 e ansiedade social)'
                description='Sempre tive dificuldade em interações sociais e ambientes
                desconhecidos. Com os óculos, consegui treinar situações como entrevistas
                de emprego e apresentações em público sem o medo de errar.
                Isso me deu mais confiança para encarar o mundo real no meu próprio ritmo.
                Foi um divisor de águas para mim!'
                />

                <Card
                src={Lucas}
                title='Mariana S. - Mãe do Lucas (7 anos, TEA nível 2)'
                description='Meu filho sempre teve dificuldades com lugares novos e interações
                sociais. Com os óculos conseguimos criar simulações controladas que ajudaram
                ele a se sentir mais seguro antes de sair para ambientes diferentes.
                Ele adora os momentos de imersão e até melhorou na escola! Foi uma das melhores
                decisões que tomamos.'
                />

                <Card
                src={Rafael}
                title='Rafael M. - Psicólogo infantil'
                description='Trabalho com crianças no espectro autista e sempre busco ferramentas
                que possam ajudá-las no desenvolvimento das habilidades sociais e emocionais.
                Esses óculos são incríveis porque permitem personalizar estímulos e tornar a terapia
                mais envolvente. Meus pacientes adoram e vejo resultados positivos no dia a dia!'
                />

                <Card
                src={Beatriz}
                title='Beatriz L. - Estudante Universitária (21 anos, TEA nível 1)'
                description='Trabalho com crianças no espectro autista e sempre busco ferramentas que
                possam ajudá-las no desenvolvimento das habilidades sociais e emocionais.
                Esses óculos são incríveis porque permitem personalizar estímulos e tornar a terapia
                mais envolvente. Meus pacientes adoram e vejo resultados positivos no dia a dia!'
                />

                <Card
                src={Carlos}
                title='Carlos F. - Pai do Henrique (12 anos, TEA nível 3)'
                description='O Henrique tem dificuldades para lidar com mudanças na rotina e se sente
                facilmente sobrecarregado. Com os óculos de realidade virtual personalizados, conseguimos
                criar um ambiente seguro onde ele pode explorar novos desafios de forma gradual.
                Isso tem feito uma diferença enorme na nossa vida!'
                />


            </div>

            <div className="home-partners">
                <h2>Empresas Parceiras</h2>

                <Image
                className='home-partners__logo'
                src={Andddes}
                alt="Logo da empresa Andddes"
                />
            </div>

            <Footer/>
        </div>

    );
}
