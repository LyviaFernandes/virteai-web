"use client"

import './Button.css'
import React from 'react';

type IButtonEnter = {
    onclick: () => void 
    label : string
}
export default function ButtonEnter ({label, onclick} : IButtonEnter){
    return(
        <button onClick={onclick}>
           {label}
        </button>
    )
}