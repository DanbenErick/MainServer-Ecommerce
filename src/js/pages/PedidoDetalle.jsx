import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header.jsx'
import axios from 'axios'
import StoreContext from '../context'

const PedidoDetalle = () => {
  const strapiAPI = 'https://cms-metodos.herokuapp.com'
  const context = useContext(StoreContext)
  const { id } = useParams()
  const [ pedido, setPedido ] = useState({
    ok: false,
    data: {}
  })
  useEffect(() => {
    axios.get(`${strapiAPI}/clientes/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
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
                        <p style={{ fontSize: '12px', padding: '8px' }}>{pedidoItem.description}</p>
                        <p>S/.{pedidoItem.price * 3.50}</p>
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