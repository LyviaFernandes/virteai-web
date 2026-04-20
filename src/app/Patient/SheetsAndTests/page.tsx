"use client"

import { useRef, useState } from 'react';
import './style.css'
import Image from 'next/image';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Footer from '@/components/footer/Footer';
import Upload from '@/assets/images/UploadField.svg';

export default function SheetsAndTests () {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [preview, setPreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>("");

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setFileName(file.name);

            // se for imagem → mostra preview
            if (file.type.startsWith("image/")) {
                const imageUrl = URL.createObjectURL(file);
                setPreview(imageUrl);
            } else {
                setPreview(null);
            }
        }
    };

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

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept="image/*,application/pdf"
            />

           <div className="upload-container" onClick={handleClick}>
    {preview ? (
        <img 
            src={preview}
            alt="Preview"
            className="upload-image"
        />
    ) : (
        <Image 
            src={Upload}
            alt="Upload"
            className="upload-image"
        />
    )}
</div>
            {/* 👇 feedback pro usuário */}
            {fileName && (
                <p className="file-name">
                    Arquivo selecionado: {fileName}
                </p>
            )}

            <Footer/>
        </div>
    )
}