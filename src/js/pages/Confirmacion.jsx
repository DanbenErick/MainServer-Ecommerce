import React from 'react'
import '../../../dist/css/style-confirmacion.css'
const Confirmacion = () => {
  return (
    <>
      <header className="header-confirmacion">
        <h2>Pedido Confirmado</h2>
        <p>Pronto te llegara tu producto</p>
      </header>
      <section className="confirmacion">
        <div className="informacion">
          <h2>Datos de Envio</h2>
          <div className="informacion-cliente">
            <h3>Nombre y Apellidos</h3>
            <p>Sharon Araceli Campos Ricapa</p>
          </div>
          <div className="informacion-cliente">
            <h3>Correo Electronico</h3>
            <p>sharon@gmail.com</p>
          </div>
          <div className="informacion-cliente">
            <h3>Telefono</h3>
            <p>999 999 998</p>
          </div>
          <div className="informacion-cliente">
            <h3>Direccion</h3>
            <p>Jr San Cristobal - Cerro de Pasco - Pasco</p>
          </div>
          <div className="informacion-cliente">
            <h3>DNI</h3>
            <p>13213212</p>
          </div>
        </div>
        <div className="imagen">
          <img src="dist/img/confirmed.jpg" alt="" />
        </div>
      </section>
    </>
  )
}

export default Confirmacion