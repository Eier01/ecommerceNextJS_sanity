import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";


export const client = sanityClient({
    projectId: 'besv0g6k',
    dataset:'production',
    apiVersion:'2023-02-20',
    useCdn:true,
    token:process.env.NEXT_PUBLIC_SANITY_TOKEN
})

//esta funcion no da acceso a las url donde estan las img
const builder = imageUrlBuilder(client)

export const urlFor = (source) =>{
    return builder.image(source)
}