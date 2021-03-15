import React, { useEffect, useRef } from 'react'
import axios from 'axios'
import Header from '../components/Header.jsx'

import "../../../dist/css/style-datos-personales.css"

const Empleado = () => {

  const usuario = useRef(null)
  const password = useRef(null)

  useEffect(() => {
    
    axios.post()



  }, [])

  return (
    <>
      <Header title="INGRESAR" />
      <section className="informacion-personal">
        <div className="contenedor-form">
          <form action="">
            <div className="input-group">
              <label htmlFor="">Usuario</label>
                <input ref={usuario} type="text"   />
            </div>
            <div className="input-group">
              <label htmlFor="">Contraseña</label>
                <input ref={password} type="text"/>
            </div>
            <div className="input-group">
              <button type="button" >Ingresar</button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Empleado