"use client"

import './styles.css'
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Footer from '@/components/footer/Footer';
import CalendarVirteai from '@/components/calendar/page';

type Reports = {
    id: number;
    description: string;
    date: string;
    time: string;
}


export default function CalendarHistory () {

    const report: Reports[] = [
    {
        id: 1,
        description: "Desenvolvimento da comunicação verbal",
        date: "14/01/2026 •",
        time: "14:00",
    },
    {
        id: 2,
        description: "Estímulo à interação social",
        date: "22/01/2026 •",
        time: "15:10",
    },
    {
        id: 3,
        description: "Regulação emocional em ambientes novos",
        date: "06/02/2026 •",
        time: "13:30",
    },
    {
        id: 4,
        description: "Treino de contato visual",
        date: "12/02/2026 •",
        time: "16:00",
    },
    {
        id: 5,
        description: "Redução de comportamentos repetitivos",
        date: "26/02/2026 •",
        time: "14:15",
    },
    {
        id: 6,
        description: "Compreensão de instruções simples",
        date: "05/03/2026 •",
        time: "15:30",
    },
];

    return (
        <div className="Appointments__section">
            <HeaderEnter src={Return} />

            <div className="section-header">
            <h1>Consultas</h1>
            </div>

            <p className="paragraph">Calendário</p>

            <div className="Calendar__Section">
                <CalendarVirteai/>
            </div>

            <h3 className='section-title-responsible'>Histórico de consultas</h3>


            <div className="consult__history">
                
                <div className="section__list_reports">
                {report.map((report) => (
                    <div className="list-report-info" key={report.id}>
                            <h2>{report.description}</h2>
                        <div className="list-status">
                            <p>{report.date}</p>
                            <p>{report.time}</p>
                        </div>

                    </div>
                ))}
            </div>
            </div>

            <Footer />
        </div>
    );
}