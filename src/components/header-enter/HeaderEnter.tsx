"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './HeaderEnter.css'
import logo from '../../assets/images/logo.svg';
import Image from 'next/image';

type ICard = {
    src: string
}

export default function HeaderEnter ({src} : ICard) {
    const router = useRouter();

    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setShowHeader(false);
            } else {
                setShowHeader(true);
            }

            setLastScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const handleBack = () => {
        if (typeof window !== 'undefined' && window.history.length > 1) {
            router.back();
        } else {
            router.push('/Home');
        }
    };

    return (
        <header className={showHeader ? "header show" : "header hide"}>
            <Image
                className='logo-header'
                src={logo}
                alt="Logo image"
                width={160}
                height={150}
            />

            <button className='container-return' onClick={handleBack} aria-label="Voltar">
                <Image
                    className='return-enter'
                    src={src}
                    alt='Voltar'
                    width={50}
                    height={50}
                />
            </button>
        </header>
    );
}
