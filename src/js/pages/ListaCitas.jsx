import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'

import Header from '../components/Header.jsx'

import "../../../dist/css/style-lista-citas.css"
import StoreContext from '../context'

const ListaCitas = () => {
  const context = useContext(StoreContext)
  const strapiAPI = 'http://localhost:1337'
  const [citas, setCitas] = useState({
    ok: false,
    data: {}
  })
  useEffect(() => {
    axios.get(`${strapiAPI}/citas`,{
      headers: {
        Authorization: `Bearer ${context.token}`
      }
    })
    .then(response => {
      setCitas({
        ok: true,
        data: response.data
      })
    })
  }, [])

  return (
    <>
      <Header
        title="Lista de Citas"
      />
      <section className="section-pedidos">
        <div className="container-table">
          <table>
            <thead>
              <tr>
                <th>Nombre Completo</th>
                <th>Correo</th>
                <th>Telefono</th>
                <th>Problemeas</th>
                <th>Marca</th>
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
                    </tr>
                  ))
                :
                <tr>
                  <td colSpan="4">No hay citas por ver</td>
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