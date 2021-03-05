import React from 'react'

import Header from '../components/Header.jsx'
import '../../../dist/css/style-carrito.css'

const Carrito = () => {
  return (
    <>
      <Header title="Carrito"/>
      <section className="carrito">
        <div className="productos">
          <article className="producto">
            <div className="producto-imagen">
              <img src="https://image.freepik.com/foto-gratis/grabacion-estereo-inalambrico-icono-humana_1232-3551.jpg" alt="" />
            </div>
            <div className="producto-informacion">
              <h2>Telefono Celular</h2>
              <p>15 * S/. 10.00</p>
              <p>Es un celular huawei de ultima generacion....</p>
            </div>
            <div className="producto-boton">
              <img src="dist/img/cancel.svg" alt="" />
            </div>
          </article>
          <article className="producto">
            <div className="producto-imagen">
              <img src="https://image.freepik.com/foto-gratis/grabacion-estereo-inalambrico-icono-humana_1232-3551.jpg" alt="" />
            </div>
            <div className="producto-informacion">
              <h2>Telefono Celular</h2>
              <p>15 * S/. 10.00</p>
              <p>Es un celular huawei de ultima generacion....</p>
            </div>
            <div className="producto-boton">
              <img src="dist/img/cancel.svg" alt="" />
            </div>
          </article>
          <article className="producto">
            <div className="producto-imagen">
              <img src="https://image.freepik.com/foto-gratis/grabacion-estereo-inalambrico-icono-humana_1232-3551.jpg" alt="" />
            </div>
            <div className="producto-informacion">
              <h2>Telefono Celular</h2>
              <p>15 * S/. 10.00</p>
              <p>Es un celular huawei de ultima generacion....</p>
            </div>
            <div className="producto-boton">
              <img src="dist/img/cancel.svg" alt="" />
            </div>
          </article>
          <article className="producto">
            <div className="producto-imagen">
              <img src="https://image.freepik.com/foto-gratis/grabacion-estereo-inalambrico-icono-humana_1232-3551.jpg" alt="" />
            </div>
            <div className="producto-informacion">
              <h2>Telefono Celular</h2>
              <p>15 * S/. 10.00</p>
              <p>Es un celular huawei de ultima generacion....</p>
            </div>
            <div className="producto-boton">
              <img src="dist/img/cancel.svg" alt="" />
            </div>
          </article>
          <div className="total">
            <div className="total-informacion">
              <h2>Subtotal</h2>
              <p>S/. 120.00</p>
            </div>
            <button>Siguiente Paso</button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Carrito