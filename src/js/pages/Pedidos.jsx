import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header.jsx'

// import "../../../dist/css/style-pedidos.css"
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

  const traerPedidos = () => {
    axios.get(`${strapiAPI}/clientes`, {
      headers: {
        Authorization: `Bearer ${context.token}`
      }
    })
    // axios.get(`${strapiAPI}/clientes`)
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
  }

  useEffect(() => {
    traerPedidos()
  }, [])

  const cambiarEntregado = (id) => {
    axios.put(`${strapiAPI}/clientes/${id}`, {
      estado_pedido: 'Entregado'
    })
    .then(response => {
      traerPedidos()
      alert("Estado cambiado")
    })
  }

  const cambiarRechazado = (id) => {
    axios.put(`${strapiAPI}/clientes/${id}`, {
      estado_pedido: 'Rechazado'
    })
    .then(response => {
      traerPedidos()
      alert("Estado cambiado")
    })
  }

  const cambiarTransito = (id) => {
    axios.put(`${strapiAPI}/clientes/${id}`, {
      estado_pedido: 'En Transito'
    })
    .then(response => {
      traerPedidos()
      alert("Estado cambiado")
    })
  }

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
                <th>Cantidad de Productos</th>
                <th>Estado</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {
                pedidos.ok
                ?
                pedidos.data.map(pedido => (
                  <tr>
                    <td>{pedido.nombre_completo}</td>
                    <td>{pedido.correo}</td>
                    <td>{pedido.telefono}</td>
                    <td>{pedido.pedidos.length}</td>
                    <td>{pedido.estado_pedido}</td>
                    <td>
                      <button onClick={() => cambiarEntregado(pedido.id)}>Entregado</button>
                      <button onClick={() => cambiarRechazado(pedido.id)}>Rechazado</button>
                      <button onClick={() => cambiarTransito(pedido.id)}>En Transito</button>
                      <button onClick={() => goToDetailtPedido(pedido.id)}>Detalles</button>
                    </td>
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