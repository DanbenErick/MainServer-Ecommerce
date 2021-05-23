import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Header from '../components/Header.jsx'
import StoreContext from '../context'

const ListaCitas = () => {
  const context = useContext(StoreContext)
  const strapiAPI = 'http://localhost:1337'
  const [citas, setCitas] = useState({
    ok: false,
    data: {}
  })
  
  const traerCitas = () => {
    axios.get(`${strapiAPI}/citas`)
    .then(response => {
      setCitas({
        ok: true,
        data: response.data
      })
    })
  }

  useEffect(() => {
    // axios.get(`${strapiAPI}/citas`,{
    //   headers: {
    //     Authorization: `Bearer ${context.token}`
    //   }
    // })
    
    traerCitas()
  }, [])

  const citaAceptada = (id) => {
    const data = {
      estado_cita: 'Aceptada'
    }
    axios.put(`${strapiAPI}/citas/${id}`, data)
    .then(response => {
      traerCitas()
      alert("Se cambio el estado")
    })
  }

  const citaRechazada = (id) => {
    const data = {
      estado_cita: 'Rechazada'
    }
    axios.put(`${strapiAPI}/citas/${id}`, data)
    .then(response => {
      traerCitas()
      alert("Se cambio el estado")
    })
  }
  const citaAtendida = (id) => {
    const data = {
      estado_cita: 'Atendida'
    }
    axios.put(`${strapiAPI}/citas/${id}`, data)
    .then(response => {
      traerCitas()
      alert("Se cambio el estado")
    })
  }
    
  return (
    <>
      <Header
        title="Lista de Citas"
      />
      <section className="section-lista-pedidos">
        <div className="container-table">
          <table>
            <thead>
              <tr>
                <th>Nombre Completo</th>
                <th>Correo</th>
                <th>Telefono</th>
                <th>Problemas</th>
                <th>Marca</th>
                <th>Estado</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {
                citas.ok
                ?
                  citas.data.map(cita => (
                    <tr>
                      <td>{cita.nombre_completo}</td>
                      <td>{cita.correo}</td>
                      <td>{cita.telefono}</td>
                      <td>{cita.problema}</td>
                      <td>{cita.marca_producto}</td>
                      <td>{cita.estado_cita}</td>
                      <td>
                        <button className="aceptada" onClick={() => citaAceptada(cita.id)}>Aceptada</button>
                        <button className="rechazada" onClick={() => citaRechazada(cita.id)}>Rechazada</button>
                        <button className="atendida" onClick={() => citaAtendida(cita.id)}>Atendida</button>
                      </td>
                    </tr>
                  ))
                :
                <tr>
                  <td colSpan="7">No hay citas por ver</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export default ListaCitas