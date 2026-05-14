"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import './pay.css'
import Footer from '@/components/footer/Footer';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Image from 'next/image';
import cameraicon from '../../../assets/images/CameraIcon.svg';
import buyicon from '../../../assets/images/buyIcon.svg';
import clockicon from '../../../assets/images/clockIcon.svg';
import qrcode from '../../../assets/images/QRCode.svg';
import pix from '../../../assets/images/CopyIcon.svg';

export default function PixPay () {
    const router = useRouter();
    return(
        <div className="pix-payment-container">
            <HeaderEnter src={Return} />

            <div className="pix-payment-header">
                <h1>Conclua sua compra:</h1>
            </div>

            <div className="pix-steps-container">
                <div className="pix-step-item">
                    <Image 
                        className='pix-step-icon' 
                        src={cameraicon} 
                        alt="" 
                    />
                    <div className="pix-step-content">
                        <h3>Abra o seu banco digital</h3>
                        <p>Escaneie o QR code abaixo ou copie e cole a  chave PIX no seu banco digital.</p>
                    </div>
                </div>

                <div className="pix-step-item">
                    <Image 
                        className='pix-step-icon' 
                        src={buyicon} 
                        alt="" 
                    />
                    <div className="pix-step-content">
                        <h3>Aprove o pagamento</h3>
                        <p>Siga as instruções do aplicativo e finalize o pagamento.</p>
                    </div>
                </div>

                <div className="pix-step-item">
                    <Image 
                        className='pix-step-icon' 
                        src={clockicon} 
                        alt="" 
                    />
                    <div className="pix-step-content">
                        <h3>Aguarde a confirmação da compra</h3>
                        <p>A página será atualizada assim que o pagamento for confirmado.</p>
                    </div>
                </div>
            </div>

            <Image 
                className='pix-qrcode-image' 
                src={qrcode} 
                alt="" 
            />

            <div className="pix-code-box">
                <p>00020126580014BR.GOV.BCB.PIX01367f3a9c2e4b1d8a6f92c75d3e1a0b6f845204000053039865405123.455802BR5913NOMEFICTICIO6009SAOPAULO62070503***6304A1B2</p>
                <Image
                    className='pix-copy-icon'
                    src={pix}
                    alt=""
                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                <button onClick={() => router.push('/Therapist/FinishedPayment')}>
                    Já paguei
                </button>
            </div>

            <Footer/>
        </div>
    )
}