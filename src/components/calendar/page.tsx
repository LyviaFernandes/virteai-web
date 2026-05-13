"use client"

import { useState } from "react"
import "./styles.css"

export default function CalendarVirteai() {
  const [currentDate, setCurrentDate] = useState(new Date())

  // datas com consulta
  const appointments = [
    "2026-01-14",
    "2026-01-22",
    "2026-02-04",
    "2026-02-12",
    "2026-02-04",
    "2026-02-26",
    "2026-03-05",
  ]

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const monthName = currentDate.toLocaleString("pt-BR", {
    month: "long",
  })

  const days = []

  // espaços vazios antes do primeiro dia
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="empty"></div>)
  }

  // dias do mês
  for (let day = 1; day <= daysInMonth; day++) {
    const formattedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`

    const hasAppointment = appointments.includes(formattedDate)

    days.push(
      <div
        key={day}
        className={`day ${hasAppointment ? "appointment" : ""}`}
      >
        {day}
      </div>
    )
  }

  return (
    <div className="calendar">
      <div className="calendar-header">

        <h2>
          {monthName} de {year}
        </h2>

        <button onClick={prevMonth}>{"<"}</button>
        <button onClick={nextMonth}>{">"}</button>
      </div>

      <div className="week-days">
        <span>Dom</span>
        <span>Seg</span>
        <span>Ter</span>
        <span>Qua</span>
        <span>Qui</span>
        <span>Sex</span>
        <span>Sáb</span>
      </div>

      <div className="calendar-grid">{days}</div>
    </div>
  )
}