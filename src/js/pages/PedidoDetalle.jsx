import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header.jsx'

const PedidoDetalle = () => {

  return (
    <>
      <Header 
        title="Detalle de Pedido"
      />
      <section className="section-pedido-detalle">
        <div className="information">
          <h2>Nombre Completo</h2>
          <p>Daniel Benjamin</p>
        </div>
        <div className="information">
          <h2>Correo</h2>
          <p>Daniel Benjamin</p>
        </div>
        <div className="information">
          <h2>Telefono</h2>
          <p>Daniel Benjamin</p>
        </div>
        <div className="information">
          <h2>Direccion</h2>
          <p>Daniel Benjamin</p>
        </div>
        <div className="information">
          <h2>DNI</h2>
          <p>Daniel Benjamin</p>
        </div>
        <div className="information">
          <h2>Pedidos</h2>
          <p>Daniel Benjamin</p>
        </div>
      </section>
    </>
  )

}

export default PedidoDetalle