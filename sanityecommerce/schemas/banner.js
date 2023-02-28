export default {
    name: 'banner',
    title: 'Banner',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Imagen',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'buttonText',
            title: 'Texto del botón',
            type: 'string',
        },
        {
            name: 'product',
            title: 'Producto',
            type: 'string',
        },
        {
            name: 'desc',
            title: 'Descripción',
            type: 'string',
        },
        {
            name: 'smallText',
            title: 'Texto Pequeño',
            type: 'string',
        },
        {
            name: 'midText',
            title: 'Texto medio',
            type: 'string',
        },
        {
            name: 'largeText1',
            title: 'Texto grande1',
            type: 'string',
        },
        {
            name: 'largeText2',
            title: 'Texto grande2',
            type: 'string',
        },
        {
            name: 'discount',
            title: 'Descuento',
            type: 'string',
        },
        {
            name: 'saleTime',
            title: 'Tiempo de Venta',
            type: 'string',
        },
    ],
};