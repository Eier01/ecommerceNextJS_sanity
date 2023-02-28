import React from 'react'
import {Toaster} from 'react-hot-toast'
import '@/styles/globals.css'
import { Layout } from '../components'
import {StateContext} from '../context/StateContext'

export default function App({ Component, pageProps }) {
  //este Component significa el componente en el que estamos actualmente puede ser
  // el componente de la pagina de inicio o el componente de detalle de venta depende en el que estemo
  return(
    <StateContext>
      <Layout>
        <Toaster/>
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
  
}

