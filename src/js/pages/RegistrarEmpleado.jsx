import React, { useReducer, useRef } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import widthReactContent from 'sweetalert2-react-content'
import Header from '../components/Header.jsx'

const RegistrarEmpleado = () => {
  
  const strapiAPI = 'https://cms-metodos.herokuapp.com'
  const usuario = useRef()
  const email = useRef()
  const password = useRef()
  const new_password = useRef()

  const MySwal = widthReactContent(Swal)

  const registrarEmpleado = () => {
    if(
      usuario.current.value != "" &&
      email.current.value != "" &&
      password.current.value != "" &&
      new_password.current.value != ""
    ) {
      if(password.current.value == new_password.current.value) {
        axios.post(`${strapiAPI}/users`, {
          username: usuario.current.value,
          email: email.current.value,
          password: password.current.value,
          confirmed: true,
          blocked: false,
        },
        {
          headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        })
        .then(respuesta => {
          if(respuesta.statusText == 'Created') {
            usuario.current.value = ''
            email.current.value = ''
            password.current.value = ''
            new_password.current.value = ''
            MySwal.fire({
              title:"Exito!",
              icon: 'success',
              text: "Se registro el usuario correctamente"
            })
          }else {
            MySwal.fire({
              title:"Error!",
              icon: 'error',
              text: "Ocurrio un error al momento de registro"
            })
          }
          console.log(respuesta)
        })
      } else {
        MySwal.fire({
          title: 'Error',
          icon: 'error',
          text: 'No coinciden las constraseñas'
        })
      }
    } else {
      MySwal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Rellena todos los campos'
      })
    }
  }

  return (
    <>
      <Header title="Registrar Producto" />
      <section className="registrar-producto">
        <div className="contenedor-form">
          <form>
            <div className="input-group">
              <label>Usuario</label>
              <input type="text" ref={usuario} />
            </div>
            <div className="input-group">
              <label>Correo Electronico</label>
              <input type="email" ref={email} />
            </div>
            <div className="input-group">
              <label>Contraseña</label>
              <input type="password" ref={password} />
            </div>
            <div className="input-group">
              <label>Repite Contraseña</label>
              <input type="password" ref={new_password} />
            </div>
            <div className="input-group">
              <button type="button" onClick={registrarEmpleado}>Guardar Producto</button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default RegistrarEmpleado