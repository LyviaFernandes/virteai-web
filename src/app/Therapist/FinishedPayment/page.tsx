"use client"

import { useRouter } from 'next/navigation';
import './style.css'
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '../../../assets/images/return-icon.svg';
import ButtonEnter from '@/components/enter-button/Button';

export default function FinishedPayment () {
    const router = useRouter();

    return(
        <div className="finished-payment">
            <HeaderEnter
            src={Return}
            />
            
                <div className="finished-payment__container">
                    <h2>Finalizado!</h2>
                    <div className="finished-payment__card">
                        <div className="finished-payment__message">
                            <p>
                                Seu pagamento foi realizado com sucesso 
                                e seu plano já está ativo. 
                                A partir de agora, você já pode acessar 
                                todos os recursos disponíveis e começar 
                                a aproveitar a plataforma.
                            </p>

                        </div>

                        <div className="finished-payment__actions">
                            <ButtonEnter
                            label='Continuar'
                            onclick={() => router.push('/Home')}
                            />
                        </div>
                    </div>

                </div>
            </div>
    )
}