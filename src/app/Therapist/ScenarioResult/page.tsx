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
import { useScenario, usePatient } from '@/lib';
import type { Scenario } from '@/types';
import ProtectedRoute from '@/components/ProtectedRoute';
import { handleApiError } from '@/utils/apiErrors';

interface SessionEvent {
  pointId?: string;
  category?: string;
  eventType: string;
  timestampUtc: string;
  durationSeconds: number;
}

interface SessionData {
  events: SessionEvent[];
  startedAtUtc: string;
}

interface AreaStats {
  area: string;
  totalTime: number;
  count: number;
  averageTime: number;
}

function ScenariosResultContent () {
    const searchParams = useSearchParams();
    const scenarioId = searchParams.get('id');
    const patientIdParam = searchParams.get('patientId');
    const { getScenarioById } = useScenario();
    const { getPatientById } = usePatient();

    const [scenario, setScenario] = useState<Scenario | null>(null);
    const [patientName, setPatientName] = useState<string | null>(null);
    const [areaStats, setAreaStats] = useState<AreaStats[]>([]);
    const [sessionDuration, setSessionDuration] = useState(0);
    const [totalFocusTime, setTotalFocusTime] = useState(0);
    const [numberOfFixations, setNumberOfFixations] = useState(0);
    const [averageFixationTime, setAverageFixationTime] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [sessionsCount, setSessionsCount] = useState<number | null>(null);
    const [latestSessionCreatedAt, setLatestSessionCreatedAt] = useState<string | null>(null);
    const [latestSessionRaw, setLatestSessionRaw] = useState<string | null>(null);
    const [showRaw, setShowRaw] = useState(false);

    const formatTime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.round(seconds % 60);
        if (hours > 0) return `${hours}h ${minutes}m ${secs}s`;
        if (minutes > 0) return `${minutes}m ${secs}s`;
        return `${secs}s`;
    };

    const processSessionData = (sessions: any[]) => {
        if (!sessions || sessions.length === 0) return;

        // Get the most recent session (by array order)
        const latestSession = sessions[sessions.length - 1];
        setSessionsCount(sessions.length);
        setLatestSessionCreatedAt(latestSession?.createdAt || (latestSession?.data?.startedAtUtc ?? null));
        try {
            setLatestSessionRaw(JSON.stringify(latestSession?.data || latestSession, null, 2));
        } catch (e) {
            setLatestSessionRaw(String(latestSession));
        }
        const data: SessionData = latestSession.data;

        if (!data || !data.events) return;

        const events = data.events;
        const areaStatsMap: Record<string, { totalTime: number; count: number }> = {};
        let totalFocus = 0;
        let totalFixations = 0;
        let sessionStart: number | null = null;
        let sessionEnd: number | null = null;

        events.forEach((event: SessionEvent) => {
            if (event.eventType === 'session_start') {
                sessionStart = new Date(event.timestampUtc).getTime();
            } else if (event.eventType === 'session_end') {
                sessionEnd = new Date(event.timestampUtc).getTime();
            } else if (event.eventType === 'exit' && event.category) {
                const duration = event.durationSeconds || 0;

                if (!areaStatsMap[event.category]) {
                    areaStatsMap[event.category] = { totalTime: 0, count: 0 };
                }

                areaStatsMap[event.category].totalTime += duration;
                areaStatsMap[event.category].count += 1;
                totalFocus += duration;
                totalFixations += 1;
            }
        });

        // Calculate metrics
        const duration = sessionStart && sessionEnd ? (sessionEnd - sessionStart) / 1000 : 0;
        const avgFixationTime = totalFixations > 0 ? totalFocus / totalFixations : 0;

        setSessionDuration(Math.round(duration));
        setTotalFocusTime(Math.round(totalFocus * 100) / 100);
        setNumberOfFixations(totalFixations);
        setAverageFixationTime(Math.round(avgFixationTime * 100) / 100);

        // Convert to top areas
        const topAreas: AreaStats[] = Object.entries(areaStatsMap)
            .map(([category, stats]) => ({
                area: category,
                totalTime: Math.round(stats.totalTime * 100) / 100,
                count: stats.count,
                averageTime: Math.round((stats.totalTime / stats.count) * 100) / 100
            }))
            .sort((a, b) => b.totalTime - a.totalTime)
            .slice(0, 5);

        setAreaStats(topAreas);
    };

    useEffect(() => {
        if (!scenarioId && !patientIdParam) return;
        let cancelled = false;
        
        (async () => {
            try {
                if (scenarioId) {
                    // Get the scenario first
                    const s = await getScenarioById(Number(scenarioId));
                    if (cancelled) return;
                    setScenario(s);

                    // Get patient profile to get sessions
                    if (s.patientId) {
                        const patientProfile = await getPatientById(s.patientId);
                        if (!cancelled && patientProfile) {
                            setPatientName((patientProfile as any)?.name || null);
                            // Extract sessions from patient user object if available
                            const userSessions = (patientProfile as any)?.user?.sessions ||
                                                (patientProfile as any)?.sessions || [];
                            processSessionData(userSessions);
                        }
                    }
                } else if (patientIdParam) {
                    // Direct patient link: fetch patient and process sessions
                    const patientProfile = await getPatientById(Number(patientIdParam));
                    if (!cancelled && patientProfile) {
                        setPatientName((patientProfile as any)?.name || null);
                        const userSessions = (patientProfile as any)?.user?.sessions ||
                                            (patientProfile as any)?.sessions || [];
                        processSessionData(userSessions);
                    }
                }
            } catch (err) {
                if (!cancelled) setError(handleApiError(err));
            }
        })();

        return () => { cancelled = true; };
    }, [scenarioId, patientIdParam, getScenarioById, getPatientById]);

    const imageIcons = [one, two, three, four, five];
    const imageClasses = ['one', 'two', 'three', 'four', 'five'];

    return(
        <ProtectedRoute>
        <div className="scenarios__result">
            <HeaderEnter
                src={Return}
            />

            <div className="section-header">
                <h1>{scenario?.title || patientName || 'Cenário'}</h1>
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
                        <p>{sessionDuration > 0 ? formatTime(sessionDuration) : '—'}</p>
                    </div>
                    <div className="box__times">
                        <p className='space'>Tempo total de foco</p>
                        <p>{totalFocusTime > 0 ? formatTime(totalFocusTime) : '—'}</p>
                    </div>
                    <div className="box__times">
                        <p className='space'>Número de fixações</p>
                        <p>{numberOfFixations > 0 ? numberOfFixations : '—'}</p>
                    </div>
                    <div className="box__times">
                        <p className='space'>Tempo médio de fixação</p>
                        <p>{averageFixationTime > 0 ? `${averageFixationTime}s` : '—'}</p>
                    </div>
                </div>

                <div className="General__Statistics">
                    <h3>Áreas com mais foco</h3>
                    <div style={{ margin: '8px 0' }}>
                        <p className='space'>Sessões disponíveis</p>
                        <p>{sessionsCount !== null ? sessionsCount : '—'}</p>
                    </div>
                    <div style={{ margin: '8px 0' }}>
                        <p className='space'>Última sessão</p>
                        <p>{latestSessionCreatedAt || '—'}</p>
                    </div>
                    {latestSessionRaw && (
                        <div style={{ margin: '8px 0' }}>
                            <button onClick={() => setShowRaw(!showRaw)}>{showRaw ? 'Ocultar JSON' : 'Mostrar JSON'}</button>
                            {showRaw && (
                                <pre style={{ maxHeight: 300, overflow: 'auto', background: '#f6f6f6', padding: 8 }}>{latestSessionRaw}</pre>
                            )}
                        </div>
                    )}
                    {areaStats.length > 0 ? (
                        areaStats.map((area, index) => (
                            <div key={index} className="box__areas">
                                <Image 
                                    src={imageIcons[index]} 
                                    alt={area.area} 
                                    className={imageClasses[index]} 
                                />
                                <p className='space'>{area.area}</p>
                                <p>{formatTime(area.totalTime)}</p>
                            </div>
                        ))
                    ) : (
                        <>
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
                        </>
                    )}
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