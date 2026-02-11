import React from 'react';
import './HeaderEnter.css'
import logo from '../../assets/images/logo.svg';
import Image from 'next/image';

export default function HeaderEnter () {

    return (
        <header>
            <Image className='image' src={logo} alt="Logo image" />
            
        </header>

        );
}