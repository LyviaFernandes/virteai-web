"use client"

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ROUTES } from '@/lib/routes';
import './pay.css'
import Footer from '@/components/footer/Footer';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '@/assets/images/return-icon.svg';
import Input from '@/components/input/Input';
import {
    validateEmail,
    validateCPF,
    validateCardNumber,
    validateCardExpiry,
    validateCVV,
    required,
} from '@/utils/validators';

function PaymentContent () {
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

    const [fieldErrors, setFieldErrors] = useState<Record<string, string | undefined>>({});
    const [formError, setFormError] = useState<string | null>(null);

    const validateCheckout = (): boolean => {
        const errs: Record<string, string | undefined> = {};
        if (!plan) errs.plan = 'Selecione um plano.';
        if (!charge) errs.charge = 'Selecione o dia de cobrança.';
        const nameErr = required(form.name, 'Nome'); if (nameErr) errs.name = nameErr;
        const emailErr = validateEmail(form.email); if (emailErr) errs.email = emailErr;
        const birthErr = required(birthDate, 'Data de nascimento'); if (birthErr) errs.birthDate = birthErr;

        const cpfValue =
            paymentMethod === 'card'
                ? cardData.cpf
                : pixData.cpf;

        const cpfErr = validateCPF(cpfValue);
        if (cpfErr) errs.cpf = cpfErr;

        if (paymentMethod === 'card') {
            const numErr = validateCardNumber(cardData.number);
            if (numErr) errs.number = numErr;

            const expErr = validateCardExpiry(expiry);
            if (expErr) errs.expiry = expErr;

            const cvvErr = validateCVV(cardData.cvv);
            if (cvvErr) errs.cvv = cvvErr;
        }
        setFieldErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleCheckout = () => {
        setFormError(null);
        if (!validateCheckout()) {
            setFormError('Corrija os campos destacados antes de continuar.');
            return;
        }
        if (paymentMethod === 'pix') {
            router.push(ROUTES.therapistPixPayment);
        } else {
            router.push(ROUTES.therapistFinishedPayment);
        }
    };

    const clearField = (k: string) => {
        if (fieldErrors[k]) setFieldErrors({ ...fieldErrors, [k]: undefined });
    };

    const [cardData, setCardData] = useState({
    name: "",
    email: "",
    cpf: "",
    number: "",
        cvv: ""
    })

    const [pixData, setPixData] = useState({
        name: "",
        email: "",
        cpf: ""
    })

    const handleCardCPF = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 11)

    value = value
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")

    setCardData({ ...cardData, cpf: value })
    }

    const handlePixCPF = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 11)

    value = value
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")

    setPixData({ ...pixData, cpf: value })
}

    const handleCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 16)
    value = value.replace(/(\d{4})(?=\d)/g, "$1 ")

    setCardData({
        ...cardData,
        number: value
    })
}

    const handleCVV = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4)

    setCardData({
        ...cardData,
        cvv: value
    })
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

                        <div className="payment-label">
                            <label>
                                <input
                                    type="radio"
                                    name="tea"
                                    checked={paymentMethod === 'card'}
                                    onChange={() => setPaymentMethod('card')}
                                />
                                Cartão de crédito
                            </label>

                        </div>

                        <p>Nome:</p>
                        <div className="input-wrapper">
                            <input
                                value={cardData.name}
                                onChange={(e) =>
                                    setCardData({
                                        ...cardData,
                                        name: e.target.value
                                    })
                                }
                            />
                        </div>

                        <p>Email:</p>
                        <div className="input-wrapper">
                            <input
                                value={cardData.email}
                                onChange={(e) =>
                                    setCardData({
                                        ...cardData,
                                        email: e.target.value
                                    })
                                }
                            />
                        </div>

                        <p>CPF:</p>
                        <div className="input-wrapper">
                            <Input
                                description="000.000.000-00"
                                value={cardData.cpf}
                                onChange={(e) => { handleCardCPF(e); clearField('cpf'); }}
                                onBlur={() => setFieldErrors({ ...fieldErrors, cpf: validateCPF(cardData.cpf) || undefined })}
                                error={fieldErrors.cpf}
                            />
                        </div>

                        <p>Número do cartão:</p>
                        <div className="input-wrapper-card">
                            <Input
                                description="0000 0000 0000 0000"
                                value={cardData.number}
                                onChange={(e) => { handleCardNumber(e); clearField('number'); }}
                                onBlur={() => setFieldErrors({ ...fieldErrors, number: validateCardNumber(cardData.number) || undefined })}
                                error={fieldErrors.number}
                            />
                        </div>

                        <div className="card-extra-fields">

                            <div className="card-field-group">
                                <p>Validade:</p>
                                <div className="input-wrapper-expiry">
                                    <Input
                                        description="MM/AA"
                                        value={expiry}
                                        onChange={(e) => { handleExpiry(e); clearField('expiry'); }}
                                        onBlur={() => setFieldErrors({ ...fieldErrors, expiry: validateCardExpiry(expiry) || undefined })}
                                        error={fieldErrors.expiry}
                                        maxLength={5}
                                    />
                                </div>
                            </div>

                            <div className="card-field-group">
                                <p>CVV:</p>
                                <div className="input-wrapper-cvv">
                                    <Input
                                        description="CVV"
                                        value={cardData.cvv}
                                        onChange={(e) => { handleCVV(e); clearField('cvv'); }}
                                        onBlur={() => setFieldErrors({ ...fieldErrors, cvv: validateCVV(cardData.cvv) || undefined })}
                                        error={fieldErrors.cvv}
                                        maxLength={4}
                                    />
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
                            <input
                                value={pixData.name}
                                onChange={(e) =>
                                    setPixData({
                                        ...pixData,
                                        name: e.target.value
                                    })
                                }
                            />
                        </div>

                        <p>Email:</p>
                        <div className="input-wrapper">
                           <input
                                value={pixData.email}
                                onChange={(e) =>
                                    setPixData({
                                        ...pixData,
                                        email: e.target.value
                                    })
                                }
                            />
                        </div>

                        <p>CPF:</p>
                        <div className="input-wrapper">
                            <Input description="000.000.000-00" value={pixData.cpf} onChange={handlePixCPF}/>
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

                {formError && (
                    <div style={{ backgroundColor: '#fee', color: '#c00', padding: '10px', borderRadius: '4px', margin: '10px 16px', textAlign: 'center' }}>
                        <p>{formError}</p>
                    </div>
                )}

                <div className="checkout-action">
                    <button onClick={handleCheckout}>Concluir Compra</button>
                </div>

            </div>

            <Footer/>
        </div>
    )
}

export default function Payment () {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <PaymentContent />
        </Suspense>
    );
}