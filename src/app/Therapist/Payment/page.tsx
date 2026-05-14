"use client"

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import './pay.css'
import Footer from '@/components/footer/Footer';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Input from '@/components/input/Input';

export default function Payment () {
    const router = useRouter();
    const searchParams = useSearchParams();
    const preselectedPlan = searchParams.get('plan');

    const [expiry, setExpiry] = useState("")

    const [form, setForm] = useState({
        name: "",
        email: ""
    })

    const [birthDate, setBirthDate] = useState("")
    const [plan, setPlan] = useState("")
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('card')
    const [isPlanOpen, setIsPlanOpen] = useState(false)
    const [charge, setCharge] = useState("")
    const [isChargeOpen, setIsChargeOpen] = useState(false)

    useEffect(() => {
        if (preselectedPlan === 'common') setPlan('Plano Comum');
        if (preselectedPlan === 'corporative') setPlan('Plano Corporativo');
    }, [preselectedPlan]);

    const handleCheckout = () => {
        if (!plan) { alert('Selecione um plano.'); return; }
        if (paymentMethod === 'pix') {
            router.push('/Therapist/PIXPayment');
        } else {
            router.push('/Therapist/FinishedPayment');
        }
    };

    const [card, setCard] = useState({
        cpf: "",
        number: "",
        cvv: ""
    })

    const handleCPF = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "").slice(0, 11)

        value = value
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2")

        setCard({ ...card, cpf: value })
    }

    const handleCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "").slice(0, 16)
        value = value.replace(/(\d{4})(?=\d)/g, "$1 ")
        setCard({ ...card, number: value })
    }

    const handleCVV = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "").slice(0, 4)

        if (value.length >= 3) {
            value = value.replace(/(\d{2})(\d{1,2})/, "$1/$2")
        }

        setCard({ ...card, cvv: value })
    }

    const handleExpiry = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "").slice(0, 4)

        if (value.length >= 3) {
            value = value.replace(/(\d{2})(\d{1,2})/, "$1/$2")
        }

        setExpiry(value)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return(
        <div className="payment-container">

            <HeaderEnter src={Return} />

            <div className="payment-header">
                <h1>Você está a um passo de começar!</h1>
            </div>

            <div className="payment-content">

                <h3 className='payment-title-plan'>Plano:</h3>

                <div className="custom-select">
                    <div className="select-trigger" onClick={() => setIsPlanOpen(!isPlanOpen)}>
                        {plan || "Selecione um plano"}
                    </div>

                    {isPlanOpen && (
                        <div className="select-options">
                            <div onClick={() => { setPlan("Plano Comum"); setIsPlanOpen(false) }}>
                                Plano Comum - R$49,90
                            </div>

                            <div onClick={() => { setPlan("Plano Corporativo"); setIsPlanOpen(false) }}>
                                Plano Corporativo - R$199,00
                            </div>
                        </div>
                    )}
                </div>

                <h3 className='payment-title-charge'>Cobrança:</h3>

                <div className="custom-select">
                    <div 
                        className="select-trigger"
                        onClick={() => setIsChargeOpen(!isChargeOpen)}
                    >
                        {charge || "Selecione o dia de cobrança"}
                    </div>

                    {isChargeOpen && (
                        <div className="select-options">
                            <div onClick={() => { setCharge("1° dia do mês"); setIsChargeOpen(false) }}>1° dia</div>
                            <div onClick={() => { setCharge("5° dia do mês"); setIsChargeOpen(false) }}>5° dia</div>
                            <div onClick={() => { setCharge("10° dia do mês"); setIsChargeOpen(false) }}>10° dia</div>
                            <div onClick={() => { setCharge("15° dia do mês"); setIsChargeOpen(false) }}>15° dia</div>
                            <div onClick={() => { setCharge("20° dia do mês"); setIsChargeOpen(false) }}>20° dia</div>
                        </div>
                    )}
                </div>

                <h3 className='payment-title-data'>Dados Pessoais:</h3>

                <div className="form-field">
                    <p>Nome:</p>
                    <input name="name" value={form.name} onChange={handleChange}/>
                </div>

                <div className="form-field">
                    <p>Email:</p>
                    <input name="email" value={form.email} onChange={handleChange}/>
                </div>

                <div className="form-field">
                    <p>Data de nascimento:</p>
                    <input 
                        type="date"
                        value={birthDate}
                        max={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                </div>

                <div className="payment-method-section">

                    <h3 className='payment-title-method'>Pagamento:</h3>

                    <div className="payment-card">

                        <label>
                            <input
                                type="radio"
                                name="tea"
                                checked={paymentMethod === 'card'}
                                onChange={() => setPaymentMethod('card')}
                            />
                            Cartão de crédito
                        </label>

                        <p>Nome:</p>
                        <div className="input-wrapper">
                            <input name="name" value={form.name} onChange={handleChange}/>
                        </div>

                        <p>Email:</p>
                        <div className="input-wrapper">
                            <input name="email" value={form.email} onChange={handleChange}/>
                        </div>

                        <p>CPF:</p>
                        <div className="input-wrapper">
                            <Input description="000.000.000-00" value={card.cpf} onChange={handleCPF}/>
                        </div>

                        <p>Número do cartão:</p>
                        <div className="input-wrapper-card">
                            <Input description="0000 0000 0000 0000" value={card.number} onChange={handleCardNumber}/>
                        </div>

                        <div className="card-extra-fields">

                            <div className="card-field-group">
                                <p>Validade:</p>
                                <div className="input-wrapper-expiry">
                                    <Input description="MM/AA" value={expiry} onChange={handleExpiry} maxLength={5}/>
                                </div>
                            </div>

                            <div className="card-field-group">
                                <p>CVV:</p>
                                <div className="input-wrapper-cvv">
                                    <Input description="CVV" value={card.cvv} onChange={handleCVV} maxLength={4}/>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="payment-card">
                        <label>
                            <input
                                type="radio"
                                name="tea"
                                checked={paymentMethod === 'pix'}
                                onChange={() => setPaymentMethod('pix')}
                            />
                            PIX
                        </label>

                        <p>Nome:</p>
                        <div className="input-wrapper">
                            <input name="name" value={form.name} onChange={handleChange}/>
                        </div>

                        <p>Email:</p>
                        <div className="input-wrapper">
                           <input name="email" value={form.email} onChange={handleChange}/>
                        </div>

                        <p>CPF:</p>
                        <div className="input-wrapper">
                            <Input description="000.000.000-00" value={card.cpf} onChange={handleCPF}/>
                        </div>
                    </div>

                </div>

                <div className="order-summary">

                    <h3 className='summary-title'>Resumo:</h3>
                    <p>Itens:</p>

                    <div className="summary-items">
                        {plan === "Plano Comum" && (
                            <div className='summary-plan'>
                                <p>Plano Comum</p>
                                <p>R$ 49,90 / mês</p>
                            </div>
                        )}

                        {plan === "Plano Corporativo" && (
                            <div className='summary-plan'>
                                <p>Plano Corporativo</p>
                                <p>R$ 199,00 / mês</p>
                            </div>
                        )}

                        {!plan && <p>Nenhum plano selecionado</p>}
                    </div>

                    <p>• Cancele quando quiser</p>
                </div>

                <div className="checkout-action">
                    <button onClick={handleCheckout}>Concluir Compra</button>
                </div>

            </div>

            <Footer/>
        </div>
    )
}