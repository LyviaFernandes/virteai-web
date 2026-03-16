"use client"

import Image from 'next/image';
import './Card.css'
import React from 'react';
import Line from '../../assets/images/Line.svg'

type ICard = {
    title: string
    description: string
    src: string
}

export default function Card ({src, title, description} : ICard) {
    return(
        <article className="CardGeneral">
            <Image className='imageContainer' src={src} alt='Imagem paciente'/>
            <div className="cardContainer">
                <h5>{title}</h5>
                <Image className='line' src={Line} alt='linha'/>
                <p>{description}</p>
            </div>
        </article>
    )
}