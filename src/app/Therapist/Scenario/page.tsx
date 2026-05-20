"use client"

import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import './styles.css'
import Image from 'next/image';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Footer from '@/components/footer/Footer';
import deleteicon from '@/assets/images/DeleteIcon.svg';
import plusicon from '@/assets/images/PlusIcon.svg';
import visualize from '@/assets/images/visualizeicon.svg';
import infoicon from '@/assets/images/InfoIcon.svg';
import Iconpaciente from '@/assets/images/ProfileIcon.svg';
import Input from "@/components/input/Input";
import { useScenario, usePatient, useSession, ROUTES } from '@/lib';
import type { Scenario, ScenarioStatus, PatientProfile } from '@/types';
import ProtectedRoute from '@/components/ProtectedRoute';
import { handleApiError } from '@/utils/apiErrors';

const statusLabel: Record<ScenarioStatus, string> = {
    NOT_STARTED: 'Não iniciado',
    IN_PROGRESS: 'Em progresso',
    PAUSED: 'Pausado',
    FINISHED: 'Finalizado',
};

const statusClass: Record<ScenarioStatus, string> = {
    NOT_STARTED: 'naoiniciado',
    IN_PROGRESS: 'emprogresso',
    PAUSED: 'pausado',
    FINISHED: 'finalizado',
};

function ScenariosContent () {
    const searchParams = useSearchParams();
    const patientIdParam = searchParams.get('patientId');

    const { getPatientById } = usePatient();
    const { listScenarios, createScenario, updateScenario, deleteScenario } = useScenario();
    const { generateSession } = useSession();

    const [patient, setPatient] = useState<PatientProfile | null>(null);
    const [scenarios, setScenarios] = useState<Scenario[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [title, setTitle] = useState('');
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const codeBoxRef = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState<number | null>(null);

    const loadAll = async () => {
        try {
            setLoading(true);
            setError(null);
            if (patientIdParam) {
                try {
                    const p = await getPatientById(Number(patientIdParam));
                    setPatient(p);
                } catch { /* sem permissão */ }
            }
            const list = await listScenarios();
            const filtered = patientIdParam
                ? (list || []).filter(s => s.patientId === Number(patientIdParam))
                : (list || []);
            setScenarios(filtered);
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [patientIdParam]);

    const handleGenerateId = async () => {
        if (!patientIdParam) {
            setError('ID do paciente não encontrado.');
            return;
        }

        try {
            const session = await generateSession(Number(patientIdParam));
            setSessionId(session?.sessionId || null);
        } catch (err) {
            setError(handleApiError(err));
        }
    };

    const handleCreate = async () => {
        if (!patientIdParam) { setError('Selecione um paciente.'); return; }
        if (!title.trim()) { setError('Informe o título.'); return; }
        try {
            await createScenario({
                patientId: Number(patientIdParam),
                title,
                status: 'NOT_STARTED',
            });
            setTitle('');
            setShowCodeInput(false);
            await loadAll();
        } catch (err) {
            setError(handleApiError(err));
        }
    };

    const handleChangeStatus = async (scenarioId: number, newStatus: ScenarioStatus) => {
        try {
            await updateScenario(scenarioId, { status: newStatus });
            setScenarios(prev => prev.map(s => s.scenarioId === scenarioId ? { ...s, status: newStatus } : s));
            setOpen(null);
        } catch (err) {
            setError(handleApiError(err));
        }
    };

    const handleDelete = async (scenarioId: number) => {
        try {
            await deleteScenario(scenarioId);
            setScenarios(prev => prev.filter(s => s.scenarioId !== scenarioId));
        } catch (err) {
            setError(handleApiError(err));
        }
    };

    return(
        <ProtectedRoute requiredRoles={['THERAPIST', 'ADMIN']}>
        <div className="processes-container">
            <HeaderEnter
                src={Return}
            />

            <div className="section-header">
                <h1>Cenários</h1>
            </div>

            {error && (
                <div style={{ backgroundColor: '#fee', color: '#c00', padding: '10px', borderRadius: '4px', margin: '10px 16px' }}>
                    <p>{error}</p>
                </div>
            )}

            <h3 className='section-title-responsible'>Paciente:</h3>

            <div className="account-avatar-wrapper">
                   <div className="account-avatar">
                        <Image
                            src={Iconpaciente}
                            alt="Foto do usuário"
                            fill
                            className="account-avatar-image"
                        />
                    </div>
                    <div className="account-user-info">

                        <h2>{patient?.name || (loading ? 'Carregando...' : 'Paciente não selecionado')}</h2>

                        <div className="box-ID">
                            <div className="generate-id-row">
                                {/* <h3>{ sessionId ? `ID da Sessão: ${sessionId}` : 'Gerar ID' }</h3> */}
                              <button className="generate-id-button" onClick={handleGenerateId}>
                                  {sessionId ? 'Gerar outro ID' : 'Gerar ID'}
                              </button>
                              <div className="info-wrapper">
                                  <Image
                                      src={infoicon}
                                      alt=""
                                      className="infoicon"
                                  />

                                  <div className="info-tooltip">
                                  O ID gerado será utilizado para a validação
                                  da identidade do seu paciente para o acesso
                                  dos cenários
                                  </div>
                               </div>
                            </div>
                            {sessionId && (
                                <p className="generated-id-text">{sessionId}</p>
                            )}
                        </div>
                    </div>
            </div>


            <div className="text-class">
                <h3 className='section-title-scenarios'>Cenários Terapêuticos</h3>
                    <Image
                        onClick={() => setShowCodeInput(true)}
                        src={plusicon}
                        alt=""
                        className="plus"
                    />
            </div>

            {showCodeInput && (
                    <div className="overlay" onClick={() => setShowCodeInput(false)}>
                      <div
                        className="code-container"
                        ref={codeBoxRef}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="evolution">
                          <h2>Cenário</h2>
                        </div>

                        <div className="text-evolution">
                          <p>
                            Preencha as informações abaixo, para adicionar
                            ao gráfico de evolução de seu paciente:
                          </p>
                        </div>

                        <div className="inputs-section">
                          <div className="input-box">
                            <p>Título:</p>
                            <Input
                              description="Insira aqui o título do cenário"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="button-send">
                          <button onClick={handleCreate}>Enviar</button>
                        </div>
                      </div>
                    </div>
                  )}

            <div className="scenarios-container">
                {loading && <p>Carregando cenários...</p>}
                {!loading && scenarios.length === 0 && <p>Nenhum cenário criado.</p>}
                <Link href={`${ROUTES.therapistScenarioResult}?patientId=${patientIdParam}`}>
                    <Image
                        src={visualize}
                        alt="Ver resultados"
                        className="view"
                        style={{ cursor: 'pointer' }}
                    />
                </Link>
                {scenarios.map(scenario => (
                    <div className="scenario-card" key={scenario.scenarioId}>
                        <div className="scenario-card-container">
                            <h2>{scenario.title}</h2>
                            <div className="image-container">
                                <Image
                                    src={deleteicon}
                                    alt="Excluir"
                                    className="delete"
                                    onClick={() => handleDelete(scenario.scenarioId)}
                                    style={{ cursor: 'pointer' }}
                                />
                                {/* {scenario.status === 'FINISHED' && (
                                    <Link href={`${ROUTES.therapistScenarioResult}?patientId=${patientIdParam || scenario.patientId}`}>
                                        <Image
                                            src={visualize}
                                            alt="Ver resultados"
                                            className="view"
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </Link>
                                )} */}
                            </div>
                        </div>
                        <div className="status-container">
                            <h3
                                onClick={() => setOpen(open === scenario.scenarioId ? null : scenario.scenarioId)}
                                className={`status-option status status--${statusClass[scenario.status]}`}
                            >
                                {statusLabel[scenario.status]}
                            </h3>

                            {open === scenario.scenarioId && (
                                <div className="status-dropdown">
                                    {(Object.keys(statusLabel) as ScenarioStatus[]).map((key) => (
                                        <div
                                            key={key}
                                           className="status-container"
                                            onClick={() => handleChangeStatus(scenario.scenarioId, key)}
                                        >
                                            <h3>{statusLabel[key]}</h3>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>


            <Footer/>
        </div>
        </ProtectedRoute>
    )

}

export default function Scenarios () {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <ScenariosContent />
        </Suspense>
    );
}
