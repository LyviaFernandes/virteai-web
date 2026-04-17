"use client"

import './style.css'
import Image from 'next/image';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Iconpaciente from '@/assets/images/ProfileIcon.svg';
import Footer from '@/components/footer/Footer';
import Upload from '@/assets/images/UploadField.svg';


export default function SheetsAndTests () {
    return(
        <div className="tests-page">
            <HeaderEnter
                src={Return}
            />
            <div className="page-header">
                <h1>Fichas e Testes</h1>
            </div>

            <div className="page-description">
                <p>Abaixo estão disponibilizados nossos testes avaliativos. 
                Ao realizá-los, você facilita para que nossos profissionais parceiros analisem seu caso com maior precisão</p>
            </div>

            <div className="test-card">
                <h2>Teste AQ-10</h2>
                <p>Um teste curto, para auxiliar na avaliação e identificação de TEA em pacientes </p>
                <h3>Finalizado</h3>
            </div>

            <div className="test-card">
                <h2>Teste AQ-50</h2>
                <p>Um teste curto, para auxiliar na avaliação e identificação de TEA em pacientes </p>
                <h3>Finalizado</h3>
            </div>

            <h3 className='form-title'>Ficha:</h3>

            <div className="form-section">
                <p>Se já possui um laudo e deseja disponibilizá-lo para a análise de nossos terapeutas, pode anexá-lo no campo abaixo. (Opcional)</p>
            </div>

            <div className="upload-container">
                <Image 
                    src={Upload}
                    alt=""
                    className="upload-image"
                />
            </div>

            <Footer/>
        </div>
    )
}