"use client"

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import './style.css'
import Image from 'next/image';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Footer from '@/components/footer/Footer';
import Upload from '@/assets/images/UploadField.svg';
import { useTest } from '@/lib';
import ProtectedRoute from '@/components/ProtectedRoute';
import { handleApiError } from '@/utils/apiErrors';

export default function SheetsAndTests () {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [preview, setPreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>("");

    const { checkTest10, checkTest50 } = useTest();
    const [test10Done, setTest10Done] = useState<boolean | null>(null);
    const [test50Done, setTest50Done] = useState<boolean | null>(null);
    const [statusError, setStatusError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const [r10, r50] = await Promise.all([checkTest10(), checkTest50()]);
                if (!cancelled) {
                    setTest10Done(!!r10?.completed);
                    setTest50Done(!!r50?.completed);
                }
            } catch (err) {
                if (!cancelled) setStatusError(handleApiError(err));
            }
        })();
        return () => { cancelled = true; };
    }, [checkTest10, checkTest50]);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setFileName(file.name);

            if (file.type.startsWith("image/")) {
                const imageUrl = URL.createObjectURL(file);
                setPreview(imageUrl);
            } else {
                setPreview(null);
            }
        }
    };

    const statusLabel = (done: boolean | null) => {
        if (done === null) return 'Carregando...';
        return done ? 'Finalizado' : 'Não realizado';
    };

    return(
        <ProtectedRoute requiredRoles={['PATIENT']}>
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

            {statusError && (
                <div style={{ backgroundColor: '#fee', color: '#c00', padding: '10px', borderRadius: '4px', margin: '10px 0' }}>
                    <p>{statusError}</p>
                </div>
            )}

                <div className="test-card">
                    <h2>Teste AQ-10</h2>
                    <p>Um teste curto, para auxiliar na avaliação e identificação de TEA em pacientes </p>
                    <Link href={test10Done ? '/Patient/AQ10ResultTest' : '/Patient/AQ10TestWeb'}>
                        <h3>{statusLabel(test10Done)}</h3>
                    </Link>
                </div>

                <div className="test-card">
                    <h2>Teste AQ-50</h2>
                    <p>Um teste curto, para auxiliar na avaliação e identificação de TEA em pacientes </p>
                    <Link href={test50Done ? '/Patient/AQ50ResultTest' : '/Patient/AQ50TestWeb'}>
                        <h3>{statusLabel(test50Done)}</h3>
                    </Link>
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
            {fileName && (
                <p className="file-name">
                    Arquivo selecionado: {fileName}
                </p>
            )}

            <Footer/>
        </div>
        </ProtectedRoute>
    )
}
