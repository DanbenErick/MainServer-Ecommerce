import React, { useContext, useState } from 'react'
import Header from '../components/Header.jsx'
import { useParams } from 'react-router-dom'

import '../../../dist/css/style-detalle-producto.css'

import data from '../../database/data'
import StoreContext from '../context'
const Detalles = () => {
  const [ item, setItem ] = useState({})
  const { idParam } = useParams()
  const context = useContext(StoreContext)
  let productoParaCarrito = {}

  const addToCart = () => {
    context.addCarrito(productoParaCarrito)
    console.log(productoParaCarrito)
  }

  return (
    <>
      {/* <h1>ID seleccionado {idParam}</h1> */}
      <Header />
      {
        data.map(producto => {
          if(producto.id == idParam) {
            productoParaCarrito = producto
            return (
              <section className="detalles" key={producto.id}>
                <div className="detalle-producto">
                  <div className="detalle-imagen">
                    <img src={producto.image} alt="" />
                  </div>
                  <div className="detalle-informacion">
                    <h2>{producto.name}</h2>
                    <p>{producto.description}</p>
                    <p>S/. {producto.price}</p>
                    <button type="button" onClick={addToCart}>Añadir al Carrito</button>
                  </div>
                </div>
              </section>
            )
          }
        })
      }
    </>
  )
}

export default Detalles