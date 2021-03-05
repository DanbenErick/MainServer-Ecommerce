import React from 'react'
import '../../../dist/css/style-index.css';
import Header from '../components/Header.jsx'
import { Link } from 'react-router-dom'


const Productos = ({ productos }) => {
  return (
    <>
    <Header title="Productos" />
      <section className="galeria-productos">
        <div className="productos">

          {productos.map((producto) => (
            <Link to={`/productos/detalles/${producto.id}`} key={producto.id}>
              <article className="producto">
                <div className="producto_imagen">
                  <img src={producto.image} alt="" />
                </div>
                <div className="informacion_producto">
                  <p className="informacion_producto_titulo">{producto.name}</p>
                  <p className="precio_producto_titulo">S/. {producto.price}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

export default Productos