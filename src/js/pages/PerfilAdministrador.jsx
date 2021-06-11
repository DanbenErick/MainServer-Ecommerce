import React from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../components/Header.jsx'

const PerfilAdministrador = () => {

  const history = useHistory()

  const goToRegisterEmpleado = () => {
    history.push('/administrador/registrar-empleado')
  }

  const goToListaEmpleados = () => {
    history.push('/administrador/lista-empleados')
  }

  return (
    <>
      <Header title="Perfil Administrador" />
      <section className="section-perfil">
        <ul className="links">
          <li className="link" onClick={goToRegisterEmpleado} >Registrar Empleado</li>
          <li className="link" onClick={goToListaEmpleados} >Lista de Empleados</li>
        </ul>
      </section>
    </>
  )
}

export default PerfilAdministrador