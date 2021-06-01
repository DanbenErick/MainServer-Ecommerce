import React, { useState, useEffect } from 'react'
import Header from '../components/Header.jsx'
import { Link } from 'react-router-dom'

const Productos = (props) => {
  const [ productos, setProductos ] = useState([])
  useEffect(() => { 
    props.productos.then( res => {
      setProductos(res)
    })
  }, [])
  return (
    <>
    <Header title="Productos" />
      <section className="galeria-productos">
        <div className="productos">
          {
            productos != ""
            ?
              (productos.map((producto) => (
                <Link to={`/productos/detalles/${producto.id}`} key={producto.id}>
                  <article className="producto">
                    <div className="producto_imagen">
                      <img src={"https://cms-metodos.herokuapp.com" + producto.imagen} alt="" />
                    </div>
                    <div className="informacion_producto">
                      <p className="informacion_producto_titulo">{producto.nombre}</p>
                      <p className="precio_producto_titulo">S/. {producto.precio}</p>
                    </div>
                  </article>
                </Link>
              )))
            :
            (<span>No encontramos productos</span>)
          }
        </div>
      </section>
    </>
  )
}

export default Productos