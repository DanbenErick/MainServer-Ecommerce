import React, { useEffect, useState, useContext, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import Header from '../components/Header.jsx'

// import "../../../dist/css/style-pedidos.css"
import StoreContext from '../context'
const Pedidos = () => {

  const input_nombre = useRef('')
  const input_estado = useRef('')

  const strapiAPI = 'https://cms-metodos.herokuapp.com'
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
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
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
      Swal.fire({
        icon: 'success',
        title: 'Exito!',
        text: 'Se cambio correctamente el estado del pedido!',
      })
    })
  }

  const cambiarRechazado = (id) => {
    axios.put(`${strapiAPI}/clientes/${id}`, {
      estado_pedido: 'Rechazado'
    })
    .then(response => {
      traerPedidos()
      Swal.fire({
        icon: 'success',
        title: 'Exito!',
        text: 'Se cambio correctamente el estado del pedido!',
      })
    })
  }

  const cambiarTransito = (id) => {
    axios.put(`${strapiAPI}/clientes/${id}`, {
      estado_pedido: 'En Transito'
    })
    .then(response => {
      traerPedidos()
      Swal.fire({
        icon: 'success',
        title: 'Exito!',
        text: 'Se cambio correctamente el estado del pedido!',
      })
    })
  }

  const filtroNombre = () => {
    if(input_nombre.current.value == "") {
      traerPedidos()
    }
    // console.log("input nombre:", input_nombre.current.value)
    let new_pedido = pedidos.data.filter(pedido =>  pedido.nombre_completo.includes(input_nombre.current.value))
    setPedidos({
      ok: true,
      data: [...new_pedido]
    })
  }

  const filtroEstado = () => {
    if(input_estado.current.value == "Todos") {
      traerPedidos()
    }else {
      axios.get(`${strapiAPI}/clientes/?estado_pedido=${input_estado.current.value}`)
      .then(respuesta => {
        console.log("Respuesta", respuesta)
        if(respuesta.data.length != 0) {
          setPedidos({
            ok: true,
            data: respuesta.data
          })
        }else {
          setPedidos({
            ok: false,
            data: []
          })
        }
      })
    }
  }

  return (
    <>
      <Header
        title="Pedidos"
      />
      <section className="section-pedidos">
        <div className="container">
          <div className="container-form">
            <div className="input_group">
              <label htmlFor="">Nombre del cliente</label>
              <input type="text" onChange={filtroNombre} ref={input_nombre} />
            </div>
            <div className="input_group">
              <label htmlFor="">Seleccion el estado de pedido</label>
              <select ref={input_estado} onChange={filtroEstado}>
                <option value="Todos">Todos</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Entregado">Entregado</option>
                <option value="Rechazado">Rechazado</option>
                <option value="En Transito">En Transito</option>
              </select>
            </div>
          </div>
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
                    <tr key={pedido.id}>
                      <td onClick={() => goToDetailtPedido(pedido.id)} >{pedido.nombre_completo}</td>
                      <td>{pedido.correo}</td>
                      <td>{pedido.telefono}</td>
                      <td>{pedido.pedidos.length}</td>
                      <td>{pedido.estado_pedido}</td>
                      <td>
                        <button onClick={() => cambiarEntregado(pedido.id)}>Entregado</button>
                        <button onClick={() => cambiarRechazado(pedido.id)}>Rechazado</button>
                        <button onClick={() => cambiarTransito(pedido.id)}>En Transito</button>
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
          </div>
      </section>
    </>
  )
}

export default Pedidos