"use client"

import './styles.css'
import Image from 'next/image';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Footer from '@/components/footer/Footer';
import map from '@/assets/images/HeatmapImage.svg';
import graph from '@/assets/images/GraphBar.svg';
import one from '@/assets/images/NumberOneIcon.svg';
import two from '@/assets/images/NumberTwoIcon.svg';
import three from '@/assets/images/NumberThreeIcon.svg';
import four from '@/assets/images/NumberFourIcon.svg';
import five from '@/assets/images/NumberFiveIcon.svg';



export default function ScenariosResult () {
    return(
        <div className="scenarios__result">
            <HeaderEnter
                src={Return}
            />

            <div className="section-header">
                <h1>Interação Social Básica</h1>
            </div>
            
            <p className="paragraph">Mapa Térmico</p>

            <div className="heat__map">
                <Image 
                    src={map}
                    alt=""
                    className="map"
                    width={0}
                    height={0}
                />
            </div>

            <h3 className='section-title-responsible'>Informações gerais</h3>

            <div className="intense__focus_graph">
                <div className="box__graph">
                    <h3>Intensidade do Foco</h3>
                    <Image 
                    src={graph}
                    alt=""
                    className="graph"
                    />

                    <div className="intense_box">
                        <p>Baixo</p>
                        <p>Alto</p>
                    </div>
                </div>
            </div>

            <div className="section__info">
                <div className="General__Statistics">
                    <h3>Estatísticas Gerais</h3>
                    <div className="box__times">
                        <p className='space'>Duração da Sessão</p>
                        <p>08:42</p>
                    </div>
                    <div className="box__times">
                        <p className='space'>Tempo total de foco</p>
                        <p>06:31</p>
                    </div>
                    <div className="box__times">
                        <p className='space'>Número de fixações</p>
                        <p>38</p>
                    </div>
                    <div className="box__times">
                        <p className='space'>Tempo médio de fixação</p>
                        <p>00:10</p>
                    </div>
                </div>

                <div className="General__Statistics">
                    <h3>Estatísticas Gerais</h3>
                    <div className="box__areas">
                        <Image 
                        src={one}
                        alt=""
                        className="one"
                        />
                        <p className='space'>Duração da Sessão</p>
                        <p>08:42</p>
                    </div>
                    <div className="box__areas">
                        <Image 
                        src={two}
                        alt=""
                        className="two"
                        />
                        <p className='space'>Tempo total de foco</p>
                        <p>06:31</p>
                    </div>
                    <div className="box__areas">
                        <Image 
                        src={three}
                        alt=""
                        className="three"
                        />
                        <p className='space'>Número de fixações</p>
                        <p>38</p>
                    </div>
                    <div className="box__areas">
                        <Image 
                        src={four}
                        alt=""
                        className="four"
                        />
                        <p className='space'>Tempo médio de fixação</p>
                        <p>00:10</p>
                    </div>
                    <div className="box__areas">
                        <Image 
                        src={five}
                        alt=""
                        className="five"
                        />
                        <p className='space'>Tempo médio de fixação</p>
                        <p>00:10</p>
                    </div>
                </div>

            </div>

            <Footer/>
        </div>
    )

}