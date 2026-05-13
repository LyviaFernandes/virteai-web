"use client"

import './style.css'
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '../../../assets/images/return-icon.svg';
import Footer from '@/components/footer/Footer';

type Reports = {
    id: number;
    description: string;
    status: string;
    date: string;
}

export default function ReportsList () {

    const statusColors: Record<string, string> = {
    "Evoluiu": "status-green",
    "Retrocedeu": "status-send",
    "Manteve": "status-blue"
    };
    const report: Reports[] = [
    {
        id: 1,
        description: "Desenvolvimento da comunicação verbal",
        status: "Evoluiu",
        date: "12/01/2026"
    },
    {
        id: 2,
        description: "Estímulo à interação social",
        status: "Retrocedeu",
        date: "20/01/2026"
    },
    {
        id: 3,
        description: "Regulação emocional em ambientes novos",
        status: "Manteve",
        date: "20/02/2026"
    },
    {
        id: 4,
        description: "Treino de contato visual",
        status: "Evoluiu",
        date: "10/02/2026"
    },
    {
        id: 5,
        description: "Redução de comportamentos repetitivos",
        status: "Manteve",
        date: "02/02/2026"
    },
    {
        id: 6,
        description: "Compreensão de instruções simples",
        status: "Evoluiu",
        date: "27/03/2026"
    },
    {
        id: 7,
        description: "Desenvolvimento da autonomia em tarefas diárias",
        status: "Evoluiu",
        date: "12/03/2026"
    },
    {
        id: 8,
        description: "Estímulo à expressão de sentimentos",
        status: "Manteve",
        date: "20/03/2026"
    },
    {
        id: 9,
        description: "Adaptação a mudanças de rotina",
        status: "Retrocedeu",
        date: "27/04/2026"
    },
    {
        id: 10,
        description: "Interação em atividades em grupo",
        status: "Evoluiu",
        date: "21/04/2026"
    },
    {
        id: 11,
        description: "Controle de impulsividade",
        status: "Manteve",
        date: "03/05/2026"
    },
    {
        id: 12,
        description: "Generalização de habilidades sociais",
        status: "Evoluiu",
        date: "16/05/2026"
    },

];
    return(
        <div className="reports-list">
            <HeaderEnter
            src={Return}
            />

            <div className="reports-header">
                    <h1>Relatórios</h1>
            </div>

            <div className="section__list_reports">
                {report.map((report) => (
                    <div className="list-report-info" key={report.id}>
                        <div className="list-status">
                            <h2>{report.description}</h2>
                            <h3 className={statusColors[report.status]}>
                                {report.status}
                                </h3>
                        </div>
                        <p>{report.date}</p>
                    </div>
                ))}
            </div>

            <div className="new__report">
                <button>Adicionar novo relatório</button>
            </div>
            <Footer/>
        </div>
        )
}