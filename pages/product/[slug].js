import React, {useState} from "react";
import { client, urlFor } from "../../lib/client";
import {AiOutlineMinus,AiOutlinePlus,AiFillStar,AiOutlineStar} from 'react-icons/ai'
import {Product} from '../../components'
import {useStateContext} from '../../context/StateContext';

const PrdouctDetails = ({product,products}) => {
    const {image, name, details, price} = product
    const [index, setIndex] = useState(0)

    const {qty,incQty,decQty, onAdd, setshowCart} = useStateContext()

    const handleBuyNow = () =>{
        onAdd(product, qty)
        setshowCart(true)
    }

    return (
        <div>
            <div className="product-detail-container">
                <div>
                    <div className="image-container">
                        <img src={urlFor(image && image[index])}
                        className="product-detail-image"
                        />
                    </div>
                    <div className="small-images-container">
                        {image?.map((item, i) => (
                            <img
                                key={i}
                                src={urlFor(item)}
                                className={i === index ? 'small-image selected-image':  'small-image'}
                                onMouseEnter={() => setIndex(i)}
                            />
                        ))}
                    </div>                    
                </div>
                <div className="product-detail-desc">
                    <h1>{name}</h1>
                    <div className="reviews">
                        <div>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiOutlineStar/>
                        </div>
                        <p>
                            (20)
                        </p>
                    </div>
                    <h4>Details:</h4>
                    <p>{details}</p>
                    <p className="price">${price}</p>
                    <div className="quantity">
                        <p className="quantity-desc">
                            <span className="minus" onClick={decQty}>
                                <AiOutlineMinus/>
                            </span>
                            <span className="num">
                                {qty}
                            </span>
                            <span className="plus" onClick={incQty}>
                                <AiOutlinePlus/>
                            </span>
                        </p>
                    </div>
                    <div className="buttons">
                        <button type="button" className="add-to-cart" onClick={() => onAdd(product,qty)}>
                            Agregar al carrito
                        </button>
                        <button type="button" className="buy-now" onClick={handleBuyNow}>
                            Comprar ahora
                        </button>
                    </div>
                </div>
            </div>

            <div className="maylike-products-wrapper">
                <h2>también te puede gustar</h2>
                {/* Desplazamiento */}
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {products.map((item) => (
                            <Product key={item._id} product={item}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

//crea todos los archivos. De [slug].js se forman multiples archivos como [auriculares].js,[auriculares].js
//[altavoz].js. tiene esos nombres porque estamos consultando en la bbdd los productos y obtenemos lo que hay en su propiedad
//slug y asignamos ello a la variable path la cual crea los multiples archivos en base a eso
export const getStaticPaths = async ()=>{
    const query = `*[_type == "product"] {
        slug {
            current
        }
    }`

    const products = await client.fetch(query) 

    const paths = products.map((p) => {
        return ({
            params:{
                slug: p.slug.current
            }
        })
    })

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({params:{slug}}) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]';
    
    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);

    return {
        props: {
            product,
            products,
        },
    };
};

export default PrdouctDetails;
