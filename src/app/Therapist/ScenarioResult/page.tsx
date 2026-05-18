"use client"

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
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
import { useScenario } from '@/lib';
import type { Scenario } from '@/types';
import ProtectedRoute from '@/components/ProtectedRoute';
import { handleApiError } from '@/utils/apiErrors';

function ScenariosResultContent () {
    const searchParams = useSearchParams();
    const scenarioId = searchParams.get('id');
    const { getScenarioById } = useScenario();

    const [scenario, setScenario] = useState<Scenario | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!scenarioId) return;
        let cancelled = false;
        (async () => {
            try {
                const s = await getScenarioById(Number(scenarioId));
                if (!cancelled) setScenario(s);
            } catch (err) {
                if (!cancelled) setError(handleApiError(err));
            }
        })();
        return () => { cancelled = true; };
    }, [scenarioId, getScenarioById]);

    return(
        <ProtectedRoute>
        <div className="scenarios__result">
            <HeaderEnter
                src={Return}
            />

            <div className="section-header">
                <h1>{scenario?.title || 'Cenário'}</h1>
            </div>

            {error && (
                <div style={{ backgroundColor: '#fee', color: '#c00', padding: '10px', borderRadius: '4px', margin: '10px 16px' }}>
                    <p>{error}</p>
                </div>
            )}

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
                        <p>—</p>
                    </div>
                    <div className="box__times">
                        <p className='space'>Tempo total de foco</p>
                        <p>—</p>
                    </div>
                    <div className="box__times">
                        <p className='space'>Número de fixações</p>
                        <p>—</p>
                    </div>
                    <div className="box__times">
                        <p className='space'>Tempo médio de fixação</p>
                        <p>—</p>
                    </div>
                </div>

                <div className="General__Statistics">
                    <h3>Áreas com mais foco</h3>
                    <div className="box__areas">
                        <Image src={one} alt="" className="one" />
                        <p className='space'>—</p>
                        <p>—</p>
                    </div>
                    <div className="box__areas">
                        <Image src={two} alt="" className="two" />
                        <p className='space'>—</p>
                        <p>—</p>
                    </div>
                    <div className="box__areas">
                        <Image src={three} alt="" className="three" />
                        <p className='space'>—</p>
                        <p>—</p>
                    </div>
                    <div className="box__areas">
                        <Image src={four} alt="" className="four" />
                        <p className='space'>—</p>
                        <p>—</p>
                    </div>
                    <div className="box__areas">
                        <Image src={five} alt="" className="five" />
                        <p className='space'>—</p>
                        <p>—</p>
                    </div>
                </div>

            </div>

            <Footer/>
        </div>
        </ProtectedRoute>
    )

}

export default function ScenariosResult () {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <ScenariosResultContent />
        </Suspense>
    );
}