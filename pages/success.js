import React, {useState, useEffect} from "react";
import Link from 'next/link';
import {BsBagCheckFill} from 'react-icons/bs';

import {useStateContext} from '../context/StateContext';
import {runFireworks} from '../lib/utils';

const Success = () => {
    const {setcartItems,settotalPrice,settotalQuantities} = useStateContext()

    useEffect(() => {
        //almacenamiento local
        localStorage.clear()
        setcartItems([])
        settotalPrice(0)
        settotalQuantities(0)
        runFireworks()
    }, [])

    return (
        <div className="success-wrapper">
            <div className="success">
                <p className="icon">
                    <BsBagCheckFill/>
                </p>
                <h2>Gracias por su compra</h2>
                <p className="email-msg">Compruebe su bandeja de entrada de correo electrónico para el recibo.</p>
                <p className="description">
                    Si tienes alguna pregunta, porfavor envianos un email
                    <a className="email" href="">AtomicJpg@gmail.com </a>
                </p>
                <Link href="/">
                    <button type="button" width="300px" className="btn">
                        Continuar Comprando
                    </button>
                </Link>
            </div>
        </div>
    )
};

export default Success;
