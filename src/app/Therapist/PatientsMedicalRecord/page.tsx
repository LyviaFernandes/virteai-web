"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "./style.css";
import Image from "next/image";
import HeaderEnter from "@/components/header-enter/HeaderEnter";
import Return from "@/assets/images/return-icon.svg";
import Iconpaciente from "@/assets/images/ProfileIcon.svg";
import plusicon from "@/assets/images/PlusIcon.svg";
import progess from "@/assets/images/ProgressDiagram.svg";
import visualize from "@/assets/images/visualizeicon.svg";
import deleteicon from "@/assets/images/DeleteIcon.svg";
import edit from "@/assets/images/editicon.svg";
import Footer from "@/components/footer/Footer";
import Input from "@/components/input/Input";
import { usePatient, useConsultation, useObjective } from "@/lib";
import type {
  PatientProfile,
  Consultation,
  Objective,
  PatientCareStatus,
} from "@/types";
import ProtectedRoute from "@/components/ProtectedRoute";
import { handleApiError } from "@/utils/apiErrors";

const careStatusLabel: Record<PatientCareStatus, string> = {
  NOT_STARTED: "Não iniciado",
  IN_PROGRESS: "Em acompanhamento",
  PAUSED: "Pausado",
  FINISHED: "Finalizado",
};

export default function PatientsMedicalRecord() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const patientIdParam = searchParams.get("patientId") || searchParams.get("id");

  const { getPatientById, updateCareStatus } = usePatient();
  const { listConsultations, createConsultation } = useConsultation();
  const { listObjectives, createObjective, deleteObjective } = useObjective();

  const [patient, setPatient] = useState<PatientProfile | null>(null);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [objectives, setObjectives] = useState<Objective[]>([]);

  const [date, setDate] = useState("");
  const [goal, setGoal] = useState("");
  const [pontuation, setPontuation] = useState("");
  const [newObjective, setNewObjective] = useState("");

  const [showCodeInput, setShowCodeInput] = useState(false);
  const [showModalInput, setShowModalInput] = useState(false);
  const [showAddObjective, setShowObjective] = useState(false);
  const codeBoxRef = useRef<HTMLDivElement>(null);
  const codeModalRef = useRef<HTMLDivElement>(null);
  const codeAddObjective = useRef<HTMLDivElement>(null);

  const [error, setError] = useState<string | null>(null);

  const patientIdNum = patientIdParam ? Number(patientIdParam) : null;

  const loadAll = async () => {
    if (!patientIdNum) return;
    try {
      const p = await getPatientById(patientIdNum);
      setPatient(p);

      const [cs, os] = await Promise.all([listConsultations(), listObjectives()]);
      setConsultations((cs || []).filter(c => c.patientId === patientIdNum));
      setObjectives((os || []).filter(o => o.patientId === patientIdNum));
    } catch (err) {
      setError(handleApiError(err));
    }
  };

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientIdNum]);

  const handleCreateConsultation = async () => {
    if (!patientIdNum) return;
    try {
      await createConsultation({
        patientId: patientIdNum,
        consultationDate: date ? new Date(date).toISOString() : new Date().toISOString(),
        objective: goal,
        score: Number(pontuation) || 0,
      });
      setDate(""); setGoal(""); setPontuation("");
      setShowCodeInput(false);
      await loadAll();
    } catch (err) {
      setError(handleApiError(err));
    }
  };

  const handleAddObjective = async () => {
    if (!patientIdNum || !newObjective.trim()) return;
    try {
      await createObjective({ patientId: patientIdNum, title: newObjective });
      setNewObjective("");
      setShowObjective(false);
      document.body.style.overflow = "unset";
      await loadAll();
    } catch (err) {
      setError(handleApiError(err));
    }
  };

  const handleDeleteObjective = async (id: number) => {
    try {
      await deleteObjective(id);
      setObjectives(prev => prev.filter(o => o.objectiveId !== id));
    } catch (err) {
      setError(handleApiError(err));
    }
  };

  const handleChangeCareStatus = async (newStatus: PatientCareStatus) => {
    try {
      await updateCareStatus(newStatus);
      setPatient(prev => prev ? { ...prev, careStatus: newStatus } : prev);
    } catch (err) {
      setError(handleApiError(err));
    }
  };

  return (
    <ProtectedRoute requiredRoles={["THERAPIST", "ADMIN"]}>
    <div className="patients-medical-record">
      <HeaderEnter src={Return} />

      {error && (
        <div style={{ backgroundColor: '#fee', color: '#c00', padding: '10px', borderRadius: '4px', margin: '10px 16px' }}>
            <p>{error}</p>
        </div>
      )}

      <div className="profile-container">
        <div className="profile-avatar-wrapper">
          <div className="profile-avatar-container">
            <Image
              src={Iconpaciente}
              alt="Foto do usuário"
              fill
              className="profile-avatar-image"
            />
          </div>
        </div>

        <div className="profile-info">
          <h2>{patient?.name || "Carregando..."}</h2>

          <div className={`profile-status ${(patient?.careStatus || '').toLowerCase()}`}>
            <h3>{patient ? careStatusLabel[patient.careStatus] : ''}</h3>
          </div>
        </div>
      </div>

      <div className="DiagramTitle">
        <p>Evolução geral ({consultations.length} consultas)</p>
        <Image
          onClick={() => setShowCodeInput(true)}
          src={plusicon}
          alt=""
          className="plus-image"
        />
      </div>
      <div className="EvolutionDiagram">
        <Image src={progess} alt="" className="progess-image" />
      </div>

      {showCodeInput && (
        <div className="overlay" onClick={() => setShowCodeInput(false)}>
          <div
            className="code-box"
            ref={codeBoxRef}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="evolution">
              <h2>Evolução Geral</h2>
            </div>

            <div className="text-evolution">
              <p>
                Preencha as informações abaixo, para adicionar ao gráfico de
                evolução de seu paciente:
              </p>
            </div>

            <div className="inputs-section">
              <div className="input-box">
                <p>Data da consulta:</p>
                <Input
                  description="Insira a data da consulta realizada"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="input-box">
                <p>Objetivo da consulta:</p>
                <Input
                  description="Insira o objetivo da consulta realizada"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                />
              </div>

              <div className="input-box">
                <p>Pontuação</p>
                <Input
                  description="Avalie a evolução do paciente de 0-100  "
                  value={pontuation}
                  onChange={(e) => setPontuation(e.target.value)}
                />
              </div>
            </div>

            <div className="button-send">
              <button onClick={handleCreateConsultation}>Enviar</button>
            </div>
          </div>
        </div>
      )}

      <div className="therapeutic-goals">
        <div className="therapeutic-goals-container">
          <div className="therapeutic-goals__content">
            <h2>Objetivos terapeuticos</h2>
          </div>

          <Image
            onClick={() => { setShowModalInput(true); document.body.style.overflow = "hidden"; }}
            className="therapeutic-goals__action-icon"
            src={edit}
            alt=""
          />
        </div>

        <div className="Goals">
          {objectives.length === 0 && <p>Nenhum objetivo</p>}
          {objectives.map(o => (
            <p key={o.objectiveId}>{o.title}</p>
          ))}
        </div>
      </div>

      <div
        className="therapeutic-goals-relatorios"
        onClick={() => router.push(`/Therapist/ReportsList?patientId=${patientIdNum}`)}
        style={{ cursor: 'pointer' }}
      >
        <div className="therapeutic-goals-container">
          <div className="therapeutic-goals__content">
            <h2>Relatórios</h2>
          </div>

          <Image
            className="therapeutic-goals__action-icon"
            src={visualize}
            alt=""
          />
        </div>
      </div>

      <div
        className="therapeutic-goals-cenarios"
        onClick={() => router.push(`/Therapist/Scenario?patientId=${patientIdNum}`)}
        style={{ cursor: 'pointer' }}
      >
        <div className="therapeutic-goals-container">
          <div className="therapeutic-goals__content">
            <h2>Cenários</h2>
          </div>

          <Image
            className="therapeutic-goals__action-icon"
            src={visualize}
            alt=""
          />
        </div>
      </div>

      <div className="account-status-section">
                <div className="account-status-box">
                    <div className="account-status-item">
                        <p>Status do paciente</p>
                        <Image
                                src={edit}
                                alt=""
                                className="edit-icon"
                            />
                    </div>

                    <div className="status-options">

                      <div className="status-option">
                      <input
                        type="radio"
                        id="in-progress"
                        name="care-status"
                        checked={patient?.careStatus === "IN_PROGRESS"}
                        onChange={() => handleChangeCareStatus("IN_PROGRESS")}
                      />
                      <label htmlFor="in-progress">Em acompanhamento</label>
                    </div>

                    <div className="status-option">
                      <input
                        type="radio"
                        id="paused"
                        name="care-status"
                        checked={patient?.careStatus === "PAUSED"}
                        onChange={() => handleChangeCareStatus("PAUSED")}
                      />
                      <label htmlFor="paused">Pausado</label>
                    </div>

                    <div className="status-option">
                      <input
                        type="radio"
                        id="finished"
                        name="care-status"
                        checked={patient?.careStatus === "FINISHED"}
                        onChange={() => handleChangeCareStatus("FINISHED")}
                      />
                      <label htmlFor="finished">Finalizado</label>
                    </div>
                    </div>
                </div>
            </div>

      {showModalInput && (
        <div
          className="modal"
          onClick={() => {
              setShowModalInput(false);
              setShowObjective(false);
            document.body.style.overflow = "unset";
          }}
        >
          <div
            className="modal-box"
            ref={codeModalRef}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="therapeutic-modal">
              <h2>Objetivos terapeuticos</h2>
            </div>

            <div className="Goals-modal">
                <div className="container-goal">
                  {objectives.map(o => (
                    <div className="delete-goal" key={o.objectiveId}>
                        <Image
                            src={deleteicon}
                            alt=""
                            className="delete"
                            onClick={() => handleDeleteObjective(o.objectiveId)}
                            style={{ cursor: 'pointer' }}
                        />
                        <p>{o.title}</p>
                    </div>
                  ))}
                </div>
              <Image
                onClick={() => { setShowObjective(true); document.body.style.overflow = "hidden"; }}
                src={plusicon}
                alt=""
                className="plus-modal"
              />
            </div>
          </div>
        </div>
      )}

      {showAddObjective && (
        <div className="objectives" onClick={() => setShowObjective(false)}>
          <div
            className="Add-box"
            ref={codeAddObjective}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="add-objectives">
              <h2>Adicionar Objetivo</h2>
            </div>

            <div className="input-section">
              <div className="input-add">
                <p>Objetivo terapêutico:</p>
                <Input
                  description="Insira o novo objetivo do paciente"
                  value={newObjective}
                  onChange={(e) => setNewObjective(e.target.value)}
                />
              </div>
            </div>

            <div className="button-send">
              <button onClick={handleAddObjective}>Enviar</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
    </ProtectedRoute>
  );
}
