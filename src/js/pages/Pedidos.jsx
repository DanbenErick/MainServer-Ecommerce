import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header.jsx'

import "../../../dist/css/style-pedidos.css"
import StoreContext from '../context'
const Pedidos = () => {

  const strapiAPI = 'http://localhost:1337'
  const context = useContext(StoreContext)
  const history = useHistory()
  const [pedidos, setPedidos] = useState({
    ok: false,
    data: {}
  })

  const goToDetailtPedido = (id) => {
    history.push('/empleado/pedidos/' +  id)
  }

  useEffect(() => {
    axios.get(`${strapiAPI}/clientes`, {
      headers: {
        Authorization: `Bearer ${context.token}`
      }
    })
    .then(response => {
      setPedidos({
        ok: true,
        data: response.data
      })
    })
    .catch(err => {
      setPedidos({
        ok: false,
        data: {}
      })
    })
  }, [])

  return (
    <>
      <Header
        title="Pedidos"
      />
      <section className="section-pedidos">
        <div className="container-table">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Telefono</th>
                <th>Correo</th>
                <th>Cantidad de Pedidos</th>
              </tr>
            </thead>
            <tbody>
              {
                pedidos.ok
                ?
                pedidos.data.map(pedido => (
                  <tr onClick={() => { goToDetailtPedido(pedido.id) }}>
                    <td>{pedido.nombre_completo}</td>
                    <td>{pedido.correo}</td>
                    <td>{pedido.telefono}</td>
                    <td>{pedido.pedidos.length}</td>
                  </tr>
                ))
                :
                <tr>
                  <td colSpan="4">No hay pedidos por mostrar</td>
                </tr>
              }
              
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export default Pedidos