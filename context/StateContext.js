import product from '@/sanityecommerce/schemas/product';
import {createContext, useContext, useState, useEffect} from 'react';
import {toast} from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({children}) =>{
    const [showCart, setshowCart] = useState(false)
    //lo vamos a llenar con los datos del almacenamiento loca
    const [cartItems, setcartItems] = useState([])
    const [totalPrice, settotalPrice] = useState(0)
    const [totalQuantities, settotalQuantities] = useState(0)
    const [qty, setQty] = useState(1)

    let foundProduct
    let index

    const onAdd = (product, quantity) =>{
        const checkProductInCart = cartItems.find((item) => item._id === product._id) 

        settotalPrice(totalPrice + product.price * quantity)
        settotalQuantities(totalQuantities + quantity)

        if(checkProductInCart){
            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return{
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
                return cartProduct
            })

            console.log(updatedCartItems);
            setcartItems(updatedCartItems)
        } else {
            //product representa un objeto, para agregar otra propiedad a ese abjeto escribimmos:
            //produc.("nombre de la propiedad") y le asignamos un valor con = quantity en este caso,
            //el nombre de la propiedad que queremos agregar debe ser diferente al nombre de las propiedade del objeto
            product.quantity = quantity
            setcartItems([...cartItems, {...product}])
        }
        toast.success(`${qty} ${product.name} agregado al carrito`)
    }

    const onRemove = (id) => {
        foundProduct = cartItems.find((item) => item._id === id)
        const newCartItems = cartItems.filter((item) => item._id !== id)

        settotalPrice(totalPrice - foundProduct.price * foundProduct.quantity)
        settotalQuantities(totalQuantities - foundProduct.quantity)
        setcartItems(newCartItems)
    }

    const toggleCartItemQuantity = (id, value) =>{
        foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((product) => product._id === id)

        const newCartItems = cartItems.map((item) => {
            if(item._id !== id){
                return item
            }else if(item._id === id){
                if(value === "inc"){
                    return {...foundProduct, quantity: foundProduct.quantity +1}
                    
                }else if(value === "dec"){
                    return {...foundProduct, quantity: foundProduct.quantity -1}
                }
            }
        })
        if(value === "inc"){
            setcartItems([...newCartItems])
            settotalPrice(totalPrice + foundProduct.price)
            settotalQuantities(totalQuantities + 1)
        }else if(value === "dec"){
            if (foundProduct.quantity >1){
                setcartItems([...newCartItems])
                settotalPrice(totalPrice - foundProduct.price)
                settotalQuantities(totalQuantities - 1)
            }           
        }
    }

    const incQty = () =>{
        //me pasa la version anterior del estado como parametro
        setQty(qty+1)
    }

    const decQty = () =>{
        //me pasa la version anterior del estado como parametro
        setQty((prevQty) => {
            if(prevQty -1 < 1) return 1

            return prevQty -1
        })
    }

    return (
        <Context.Provider
            value={
                {
                    showCart,
                    setshowCart,
                    cartItems,
                    totalPrice,
                    totalQuantities,
                    qty,
                    incQty,
                    decQty,
                    onAdd,
                    toggleCartItemQuantity,
                    onRemove,
                    setcartItems,
                    settotalPrice,
                    settotalQuantities          
                }
            }
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)