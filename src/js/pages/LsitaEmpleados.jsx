import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../components/Header.jsx'
import Spinner from '../components/Spinner.jsx'

const ListaEmpleados = () => {

  const strapiAPI = 'https://cms-metodos.herokuapp.com'
  const [ empleados, setEmpleados ] = useState({
    ok: false,
    loader: false,
    data: []
  })


  const getEmpleados = () => {
    setEmpleados({
      ok: false,
      laoder: true,
      data: []
    })
    axios.get(`${strapiAPI}/users`, {
      headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then(respuesta => {
      setEmpleados({
        ok: true,
        loader: false,
        data: respuesta.data
      })
    })
  }

  const activarCuenta = (id) => {
    setEmpleados({
      ok: false,
      loader: true,
      data: []
    })
    axios.put(`${strapiAPI}/users/${id}`, {
      blocked: false
    },
    {
      headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then(respuesta => {
      getEmpleados()
    })
  }

  const desactivarCuenta = (id) => {
    setEmpleados({
      ok: false,
      loader: true,
      data: []
    })
    axios.put(`${strapiAPI}/users/${id}`, {
      blocked: true
    },
    {
      headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then(respuesta => {
      getEmpleados()
    })
  }

  const eliminarCuenta = (id) => {
    if(confirm("Quieres Eliminar la cuenta")) {
      axios.delete(`${strapiAPI}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      })
      .then(respuesta => {
        getEmpleados()
      })
    }else {
      alert("Operacion abortada")
    }
  }

  useEffect(() => {
    getEmpleados()
  }, [])

  return(
    <>
      <Header
        title="Lista de Empleados"
      />
      <section className="section-lista-pedidos">
        <div className="container">
          <div className="container-table">
            <table>
              <thead>
                <tr>
                  <th>Nombre Completo</th>
                  <th>Direccion</th>
                  <th>Celular</th>
                  <th>DNI</th>
                  <th>Usuario</th>
                  <th>Email</th>
                  <th>Activo</th>
                  <th>Accion</th>
                </tr>
              </thead>
              <tbody>
                {
                  empleados.ok
                  ?
                    empleados.data.map(empleado => {
                      if(empleado.role.name != "Administrador") {
                        return (
                          <tr key={empleado.id}>
                            <td>{empleado.nombres + empleado.apellidos}</td>
                            <td>{empleado.direccion}</td>
                            <td>{empleado.celular}</td>
                            <td>{empleado.dni}</td>
                            <td>{empleado.username}</td>
                            <td>{empleado.email}</td>
                            <td>{empleado.confirmed ? 'Activo': 'Inactivo'}</td>
                            <td>
                              <button onClick={() => activarCuenta(empleado.id)} >Activar</button>
                              <button onClick={() => desactivarCuenta(empleado.id)}>Desactivar</button>
                              <button onClick={() => eliminarCuenta(empleado.id)}>Eliminar</button>
                            </td>
                          </tr>
                        )
                      }
                    })
                  :
                  <tr>
                    <td colSpan="7">No hay empleados por ver</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )

}

export default ListaEmpleados