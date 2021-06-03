import React, { useEffect, useRef, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header.jsx'
import Spinner from '../components/Spinner.jsx'
// import "../../../dist/css/style-datos-personales.css"
import StoreContext from '../context'
const Empleado = () => {

  const context = useContext(StoreContext)
  const history = useHistory()

  const usuario = useRef(null)
  const password = useRef(null)
  
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    
  }, [])

  const sendEmpleado = () => {
    if(usuario.current.value != "" && password.current.value != "") {
      setLoader(true)
      axios.post('https://cms-metodos.herokuapp.com/auth/local', {
        identifier: usuario.current.value,
        password: password.current.value
      })
      .then(response => {
        context.addToken(response.data.jwt)
        sessionStorage.setItem('token', response.data.jwt)
        setLoader(false)
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
      {
        loader 
        ?
          <Spinner />
        :
          <></>
      }
    </>
  )
}

export default Empleado