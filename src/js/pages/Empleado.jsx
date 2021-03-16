import React, { useEffect, useRef, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header.jsx'

import "../../../dist/css/style-datos-personales.css"
import StoreContext from '../context'
const Empleado = () => {

  const context = useContext(StoreContext)
  const history = useHistory()

  const usuario = useRef(null)
  const password = useRef(null)
  
  useEffect(() => {
    
  }, [])

  const sendEmpleado = () => {
    if(usuario.current.value != "" && password.current.value != "") {
      axios.post('http://localhost:1337/auth/local', {
        identifier: usuario.current.value,
        password: password.current.value
      })
      .then(response => {
        console.log(response.data)
        context.addToken(response.data.jwt)
        alert("Autenticacion Correcta")
        history.push('/empleado/perfil')
      })
    }else {
      alert("Rellena los Datos")
    }

  }

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
                <input ref={password} type="password"/>
            </div>
            <div className="input-group">
              <button type="button" onClick={sendEmpleado} >Ingresar</button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Empleado