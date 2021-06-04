import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Header from '../components/Header.jsx'
import StoreContext from '../context'

const Carrito = () => {
  const history = useHistory()
  const context = useContext(StoreContext)
  const [ precioTotal, setPrecioTotal ] = useState(0)
  const [ carrito, setCarrito ] = useState({ok: false, data: null})

  useEffect(() => {
    let sumatoria = 0
    // localStorage.setItem('productos', )
    setCarrito({ ok: true, data: context.carrito})
    if(carrito.data != null) {
      carrito.data.map(item => {
        sumatoria = parseInt(item.price) + parseInt(sumatoria)
        setPrecioTotal(sumatoria)
      })
    }
  }, [carrito.data])

  const removeToCart = (index) => {
    context.removeCarrito(index)
    setCarrito(context.carrito)
  }

  const goToConfirmation = _ => carrito.data.length > 0 ? history.push("/carrito/informacion") : alert("No se encuentra productos")

  return (
    <>
      <Header title="Carrito"/>
      <section className="carrito">
        <div className="productos">
          {carrito.ok ?
            carrito.data.map((itemCarrito, index) => (
              <article className="producto" key={index}>
                <div className="producto-imagen">
                  <img src={'https://cms-metodos.herokuapp.com' + itemCarrito.image} alt="" />
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
            ))
            :
            (<p>No hay productos agregados al carrito</p>)
          }
          {carrito.ok ?
            (<div className="total">
              <div className="total-informacion">
                <h2>Subtotal</h2>
                <p>S/. {precioTotal}</p>
              </div>
              <button type="button" onClick={goToConfirmation}>Siguiente Paso</button>
            </div>)
            :
            (<p>No hay contenido que mostrar</p>)
          }
          
        </div>
      </section>
    </>
  )
}

export default Carrito