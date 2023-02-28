import React from "react";
import Link from "next/link"

import { urlFor } from "@/lib/client";
import product from "@/sanityecommerce/schemas/product";

const Product = ({product:{image, name, slug, price}}) => {
    return (
        <div>
            {/* slug: es un elemento unico esencialmente un nombre, pero si tenemos multiples productos de el mismo nombre
            entoces ese slug va tener algo de caractere adicionales agregados a el, para diferenciarce de los demas */}
            <Link href={`/product/${slug.current}`}>
                <div className="product-card">
                    <img
                        src={urlFor(image && image[0])}
                        width={250}
                        height={250}    
                        className="product-image"
                    />
                    <p className="product-name">{name}</p>
                    <p className="product-price">${price}</p>
                </div>
            </Link>
        </div>
    )
};

export default Product;
