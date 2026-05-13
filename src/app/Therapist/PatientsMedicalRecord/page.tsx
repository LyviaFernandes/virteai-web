"use client";

import { useRef, useState, useEffect } from "react";
import "./style.css";
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

type User = {
  id: number;
  name: string;
  profileImage?: string;
  status: string;
};

export default function PatientsMedicalRecord() {
  const [date, setDate] = useState("");
  const [goal, setGoal] = useState("");
  const [objective, setObjective] = useState("");
  const [pontuation, setPontuation] = useState("");

  const user: User = {
  id: 1,
  name: "João Lucas Vega",
  profileImage:"",
  status: "",
};

  const [status, setStatus] = useState("Não iniciado");

  const [showCodeInput, setShowCodeInput] = useState(false);
  const [showModalInput, setShowModalInput] = useState(false);
  const [showAddObjective, setShowObjective] = useState(false);
  const codeBoxRef = useRef<HTMLDivElement>(null);
  const codeModalRef = useRef<HTMLDivElement>(null);
  const codeAddObjective = useRef<HTMLDivElement>(null);

  const handleAccessScenario = () => {
    setShowCodeInput(true);
  };

  const handleAccessObjectives = () => {
    setShowModalInput(true);
    document.body.style.overflow = "hidden";
  };

  const handleAccessAddObjectives = () => {
    setShowObjective(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <div className="patients-medical-record">
      <HeaderEnter src={Return} />

      <div className="profile-container">
        <div className="profile-avatar-wrapper">
          <div className="profile-avatar-container">
            <Image
              src={user.profileImage || Iconpaciente}
              alt="Foto do usuário"
              fill
              className="profile-avatar-image"
            />
          </div>
        </div>

        <div className="profile-info">
          <h2>{user.name}</h2>

          <div className={`profile-status ${status.toLowerCase().replace(" ", "-")}`}>
            <h3>{status}</h3>
          </div>
        </div>
      </div>

      <div className="DiagramTitle">
        <p>Evolução geral</p>
        <Image
          onClick={handleAccessScenario}
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
              <button>Enviar</button>
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
            onClick={handleAccessObjectives}
            className="therapeutic-goals__action-icon"
            src={edit}
            alt=""
          />
        </div>

        <div className="Goals">
          <p>Comunicação Verbal</p>
          <p>Interação Social</p>
          <p>Regulação Emocional</p>
        </div>
      </div>

      <div className="therapeutic-goals-relatorios">
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

      <div className="therapeutic-goals-cenarios">
        <div className="therapeutic-goals-container">
          <div className="therapeutic-goals__content">
            <h2>Cenarios</h2>
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
                        id="agree"
                        name="tea"
                        checked={status === "Em acompanhamento"}
                        onChange={() => setStatus("Em acompanhamento")}
                      />
                      <label htmlFor="agree">Em acompanhamento</label>
                    </div>

                    <div className="status-option">
                      <input
                        type="radio"
                        id="completely-disagree"
                        name="tea"
                        checked={status === "Pausado"}
                        onChange={() => setStatus("Pausado")}
                      />
                      <label htmlFor="completely-disagree">Pausado</label>
                    </div>

                    <div className="status-option">
                      <input
                        type="radio"
                        id="disagree"
                        name="tea"
                        checked={status === "Finalizado"}
                        onChange={() => setStatus("Finalizado")}
                      />
                      <label htmlFor="disagree">Finalizado</label>
                    </div>
                    </div>
                </div>
            </div>

      {showModalInput && (
        <div
          className="modal"
          onClick={() => {
            {
              setShowModalInput(false);
              setShowObjective(false);
            }
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
                <div className="delete-goal">
                    <Image src={deleteicon} alt="" className="delete" />
                    <p>Comunicação Verbal</p>
                </div>
                <div className="delete-goal">
                    <Image src={deleteicon} alt="" className="delete" />
                    <p>Interação Social</p>
                </div>

                <div className="delete-goal">
                    <Image src={deleteicon} alt="" className="delete" />
                    <p>Regulação Emocional</p>
                </div>

                </div>
              <Image
                onClick={handleAccessAddObjectives}
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
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            <div className="button-send">
              <button>Enviar</button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}
