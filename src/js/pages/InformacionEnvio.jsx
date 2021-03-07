import React, { useRef, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../components/Header.jsx'
import "../../../dist/css/style-datos-personales.css"
import StoreContext from '../context'

const InformacionEnvio = () => {
  
  const context = useContext(StoreContext)

  const nombreCompleto = useRef(null)
  const correoElectronico = useRef(null)
  const telefono = useRef(null)
  const direccion = useRef(null)
  const dni = useRef(null)
  const history = useHistory()

  const goToPagar = () => {
    
    const cliente = {
      name: nombreCompleto.current.value,
      email: correoElectronico.current.value,
      phone: telefono.current.value,
      address: direccion.current.value,
      dni: dni.current.value,
    }
    
    context.addCliente(cliente)
    console.log("Informacion Envio", context)
    history.push('/carrito/confirmacion')
  }

  return (
    <>
      <Header title="Rellena tus Datos Personales" />
      <section className="informacion-personal">
        <div className="contenedor-form">
          <form action="">
            <div className="input-group">
              <label htmlFor="">Nombre y Apellido</label>
                <input ref={nombreCompleto} type="text"   />
            </div>
            <div className="input-group">
              <label htmlFor="">Correo Electronico</label>
                <input ref={correoElectronico} type="text"/>
            </div>
            <div className="input-group">
              <label htmlFor="">Telefono</label>
                <input ref={telefono} type="text"/>
            </div>
            <div className="input-group">
              <label htmlFor="">Direccion</label>
                <input ref={direccion} type="text"/>
            </div>
            <div className="input-group">
              <label htmlFor="">DNI</label>
                <input ref={dni} type="text"/>
            </div>
            <div className="input-group">
              <button type="button" onClick={goToPagar}>Ir a Pagar</button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default InformacionEnvio