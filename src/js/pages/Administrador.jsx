import React, { useState, useRef, useEffect } from 'react'
import Header from '../components/Header.jsx'
import Swal from 'sweetalert2'
import MySwal from 'sweetalert2-react-content'
import Spinner from '../components/Spinner.jsx'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const Administrador = () => {

  const history = useHistory()

  const usuario = useRef(null)
  const password = useRef(null)
  
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    
  }, [])

  const loginAdministrador = () => {
    if(usuario.current.value != "" && password.current.value != "") {
      setLoader(true)
      axios.post('https://cms-metodos.herokuapp.com/auth/local', {
        identifier: usuario.current.value,
        password: password.current.value
      })
      .then(response => {
        sessionStorage.setItem('token', response.data.jwt)
        setLoader(false)
        Swal.fire({
          icon: 'success',
          title: 'Exito!',
          text: 'Ingresaste correctamente al sistema!',
        })
        history.push('/administrador/perfil')
      })
    }else {
      alert("Rellena los Datos")
    }

  }



  return(
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
              <button type="button" onClick={loginAdministrador} >Ingresar</button>
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

export default Administrador