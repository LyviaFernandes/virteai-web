"use client"

import React, { useEffect, useState } from 'react';
import './pacientprofile.css'
import Image from 'next/image';
import HeaderEnter from '@/components/header-enter/HeaderEnter';
import Return from '../../assets/images/return-icon.svg';
import Iconpaciente from '../../assets/images/ProfileIcon.svg';

type User = {
    id: number;
    name: string;
    profileImage?: string;
    status: string;
}

export default function PacientProfile () {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {

        fetch("http://localhost:3000/profile/1")
        .then(res => res.json())
        .then((data: User) => setUser(data));

    }, []);

    if(!user){
        return <p>Carregando...</p>
    }

    return(
        <div className="section-profile">

            <HeaderEnter
            src={Return}
            />

            <div className="Container-profile">

                <div>
                    <Image 
                    className='IconPaciente' 
                    src={user.profileImage || Iconpaciente} 
                    alt="Foto do usuário"
                    width={200}
                    height={200}
                    />
                </div>

                <div className="profile-info">

                    <h1>{user.name}</h1>

                    <div className="status-user">
                        <p>{user.status}</p>
                    </div>

                </div>

            </div>

        </div>
    )
}