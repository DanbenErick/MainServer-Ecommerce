import React, { useContext, useEffect, useState } from 'react'
import '../../../dist/css/style-confirmacion.css'

import StoreContext from '../context'
const Confirmacion = () => {
  // const [ cliente, setCliente ] = useState({})
  const { cliente } = useContext(StoreContext)
  // console.log("Confirmacion",context)

  // useEffect(() => {
  //   setCliente({
  //     name: context.cliente.name || '',
  //     email: context.cliente.email || '',
  //     phone: context.cliente.phone || '',
  //     address: context.cliente.address || '',
  //     dni: context.cliente.dni || '',
  //   })
  // })

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
            <p>{cliente.name}</p>
          </div>
          <div className="informacion-cliente">
            <h3>Correo Electronico</h3>
            <p>{cliente.email}</p>
          </div>
          <div className="informacion-cliente">
            <h3>Telefono</h3>
            <p>{cliente.phone}</p>
          </div>
          <div className="informacion-cliente">
            <h3>Direccion</h3>
            <p>{cliente.address}</p>
          </div>
          <div className="informacion-cliente">
            <h3>DNI</h3>
            <p>{cliente.dni}</p>
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