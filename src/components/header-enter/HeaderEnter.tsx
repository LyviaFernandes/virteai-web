"use client"

import React, { useEffect, useState } from 'react';
import './HeaderEnter.css'
import logo from '../../assets/images/logo.svg';
import Image from 'next/image';
import Link from "next/link";

type ICard = {
    src: string
}

export default function HeaderEnter ({src} : ICard) {

    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                // rolando pra baixo → esconde
                setShowHeader(false);
            } else {
                // rolando pra cima → mostra
                setShowHeader(true);
            }

            setLastScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <header className={showHeader ? "header show" : "header hide"}>
            <Image 
                className='logo-header' 
                src={logo} 
                alt="Logo image" 
                width={160}
                height={150}
            />
            
            <Link href="/Home">
                <button className='container-return'>
                    <Image 
                        className='return-enter' 
                        src={src} 
                        alt='Home'
                        width={50}
                        height={50}
                    />
                </button>
            </Link>
        </header>
    );
}