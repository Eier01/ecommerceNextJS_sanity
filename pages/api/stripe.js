//manejamos las solicitudes de tipo post a la ruta /stripe porque el archivo se llama stripe.js
//es el mismo enrutamiento antiguo basado en archivos, pero esta vez para backend
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {    
    if (req.method === "POST") {
        console.log(req.body);
        try {
            const params = {
                submit_type:'pay',
                payment_method_types: ['card'],
                //cobro_direcciones_facturación
                billing_address_collection: 'auto',
                shipping_options:[
                    //tarifa de envio
                    {shipping_rate: 'shr_1MgC0SDHG6I8gmo7sdewFWtz'},
                ],
                line_items: req.body.map((item) =>{
                    const img =  item.image[0].asset._ref
                    const newImage = img.replace('image-','https://cdn.sanity.io/images/besv0g6k/production/').replace('-webp', '.webp')
                    
                    return {
                        price_data:{
                            currency: 'usd',
                            product_data:{
                                name: item.name,
                                images: [newImage]
                            },
                            unit_amount: item.price * 100,
                        },
                        adjustable_quantity: {
                            enabled:true,
                            minimum:1,
                        },
                        quantity: item.quantity
                    }
                }),
                mode: "payment",
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/canceled`,
            }
            // Crear sesiones de pago a partir de los parámetros del cuerpo.
            const session = await stripe.checkout.sessions.create(params);
            res.status(200).json(session)
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}
