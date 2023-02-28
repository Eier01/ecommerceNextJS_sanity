import React,{useRef} from "react";
import Link from 'next/link';
import {AiOutlineMinus,AiOutlinePlus,AiOutlineLeft,AiOutlineShopping } from 'react-icons/ai';
import {TiDeleteOutline} from 'react-icons/ti';
import toast from 'react-hot-toast'
import {useStateContext} from '../context/StateContext'
import {urlFor} from "../lib/client"
import getStripe from '../lib/getStripe'

function Cart() {
    //hacemos uso del objeto de useRef, podemos usar useRef en la propiedad ref de cualquier etiqueta, para poder guardar
    //la ubicacion del dowm de la etiqueta y asi manipiularlo, en este caso atravez de la variable cartRef 
    const cartRef = useRef()
    const {totalPrice,totalQuantities,cartItems,setshowCart, toggleCartItemQuantity, onRemove} = useStateContext()

    const handleCheckout = async() =>{
        const stripe = await getStripe()

        const response = await fetch('/api/stripe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartItems)
        })
        if(response.statusCode === 500) return

        const data = await response.json()

        toast.loading('Redirecting...')
        stripe.redirectToCheckout({sessionId: data.id})
    }

    return (
        <div className="cart-wrapper">
            <div className="cart-container">
                <button
                type="button"
                className="cart-heading"
                onClick={() => setshowCart(false)}>
                    <AiOutlineLeft />
                    <span className="heading">Tu Cartito</span>
                    <span className="cart-num-items">({totalQuantities} items)</span>
                </button>

                {cartItems.length <1 && (
                    <div className="empty-cart">
                        <AiOutlineShopping size={150}/>
                        <h3>Su bolsa de la compra está vacía</h3>
                        <Link href="/">
                            <button
                            type="button"
                            onClick={() => setshowCart(false)}
                            className="btn"
                            >
                                Continuar comprando
                            </button>
                        </Link>
                    </div>
                )}

                <div className="product-container">
                    {cartItems.length >=1 && cartItems.map((item) => (
                        <div className="product" key={item._id}>
                            <img src={urlFor(item?.image[0])} className="cart-product-image"/>
                            <div className="item-desc">
                                <div className="flex top">
                                    <h5>{item.name}</h5>
                                    <h4>${item.price}</h4>
                                </div>
                                <div className="flex bottom">
                                    <div>
                                        <p className="quantity-desc">
                                            <span className="minus" 
                                            onClick={() => toggleCartItemQuantity(item._id, 'dec')}>
                                                <AiOutlineMinus/>
                                            </span>
                                            <span className="num">
                                                {item.quantity}
                                            </span>
                                            <span className="plus" 
                                            onClick={() => toggleCartItemQuantity(item._id, 'inc')}>
                                                <AiOutlinePlus/>
                                            </span>
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        className="remove-item"
                                        onClick={() => onRemove(item._id)}
                                    >
                                        <TiDeleteOutline/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {cartItems.length >=1 && (
                    <div className="cart-bottom">
                        <div className="total">
                            <h3>Subtotal:</h3>
                            <h3>${totalPrice}</h3>
                        </div>
                        <div className="btn-container">
                            <button type="button" className="btn" onClick={handleCheckout}>
                                Pagra con Stripe
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart;
