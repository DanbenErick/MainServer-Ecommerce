import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Header from '../components/Header.jsx'
import '../../../dist/css/style-carrito.css'
import StoreContext from '../context'
const Carrito = () => {
  const context = useContext(StoreContext)
  const [ precioTotal, setPrecioTotal ] = useState(0)
  const [carrito, setCarrito] = useState(context.carrito)

  useEffect(() => {
    let sumatoria = 0
    carrito.map(item => {
      console.log(item.price)
      sumatoria = parseInt(item.price) + parseInt(sumatoria)
      setPrecioTotal(sumatoria)
    })
    console.log("Estado", carrito)
  })

  const removeToCart = (index) => {
    console.log("estado", carrito)
    context.removeCarrito(index)
    setCarrito(context.carrito)
  }

  return (
    <>
      <Header title="Carrito"/>
      <section className="carrito">
        <div className="productos">
          {carrito.map((itemCarrito, index) => (
            <article className="producto" key={index}>
              <div className="producto-imagen">
                <img src={'http://localhost:1337' + itemCarrito.image} alt="" />
              </div>
              <div className="producto-informacion">
                <h2>{itemCarrito.name}</h2>
                <p>S/. {itemCarrito.price}</p>
                <p>{itemCarrito.description}</p>
              </div>
              <div className="producto-boton">
                <img src="dist/img/cancel.svg" alt="" onClick={() => removeToCart(index)}/>
              </div>
            </article>
          ))}
          <div className="total">
            <div className="total-informacion">
              <h2>Subtotal</h2>
              <p>S/. {precioTotal}</p>
            </div>
            <button type="button">
              <Link to="/carrito/informacion" style={{ color: 'white', textDecoration: 'none' }}>
                Siguiente Paso
              </Link>
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Carrito