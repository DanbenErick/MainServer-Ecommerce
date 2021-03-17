import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header.jsx'
import axios from 'axios'
import "../../../dist/css/style-detalle-pedidos.css"
import StoreContext from '../context'
const PedidoDetalle = () => {
  const strapiAPI = 'http://localhost:1337'
  const context = useContext(StoreContext)
  const { id } = useParams()
  const [ pedido, setPedido ] = useState({
    ok: false,
    data: {}
  })
  useEffect(() => {
    axios.get(`${strapiAPI}/clientes/${id}`, {
      headers: {
        Authorization: `Bearer ${context.token}`
      }
    })
    .then(response => {
      setPedido({
        ok: true,
        data: response.data
      })    
    })
    .catch(error => {
      console.log(error)
    })
  },[])

  return (
    <>
      <Header 
        title="Detalle de Pedido"
      />
      {
        pedido.ok
        ?
        <section className="section-pedido-detalle">
          <div className="pedidos">
            <div className="information">
              <h2>Nombre Completo</h2>
              <p>{pedido.data.nombre_completo}</p>
            </div>
            <div className="information">
              <h2>Correo</h2>
              <p>{pedido.data.correo}</p>
            </div>
            <div className="information">
              <h2>Telefono</h2>
              <p>{pedido.data.telefono}</p>
            </div>
            <div className="information">
              <h2>Direccion</h2>
              <p>{pedido.data.direccion}</p>
            </div>
            <div className="information">
              <h2>DNI</h2>
              <p>{pedido.data.dni}</p>
            </div>
            <div className="information">
              <h2>Pedidos</h2>
              <div className="pedidos-lista">
                {
                  pedido.data.pedidos.map((pedidoItem, index) => (
                    <div className="pedido-item" key={index}>
                      <div className="pedido-item-datos">
                        <b>{pedidoItem.name}</b>
                        <p>{pedidoItem.price}</p>
                      </div>
                      <div className="pedido-item-imagen">
                        <img src={strapiAPI + pedidoItem.image} alt=""/>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </section>
        :
        <section className="section-pedido-detalle">
          <p>No hay contenido</p>
        </section>
      }
    </>
  )

}

export default PedidoDetalle