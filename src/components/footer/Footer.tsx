"use client"

import React from 'react';
import Link from 'next/link';
import './Footer.css'
import logo from '../../assets/images/logo.svg';
import email from '../../assets/images/emailIcon.svg';
import Image from 'next/image';

export default function Footer () {

    return (
        <footer>
            <Image
            className='Logo'
            src={logo}
            alt="Logo image"
            width={160}
            height={150}
            />

            <div className="container-footer">

                <div className="container-contact">
                    <h3>Contato</h3>
                    <div className="emailFooter">

                        <Image
                        className='image'
                        src={email}
                        alt="Icon Email"
                        width={30}
                        height={30}
                        />
                        <p>virteaioficial@gmail.com</p>
                    </div>
                </div>

                <div className="container-help">
                    <h3>Ajuda</h3>
                    <Link href="/FAQWeb"><p>FAQ</p></Link>
                </div>

                <div className="container-Terms">
                    <h3>Termos</h3>
                    <Link href="/TermsofServiceWeb"><p>Termos de serviço</p></Link>
                    <Link href="/LegalTermsWeb"><p>Termos Legais</p></Link>
                    <Link href="/PrivacyPolicyWeb"><p>Politica de privacidade</p></Link>
                </div>
            </div>

        </footer>

        );
}
