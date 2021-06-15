import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../components/Header.jsx'
import { useParams } from 'react-router-dom'


const EstadoPedido = () => {
  
  const [ estado, setEstado ] = useState({
    ok: false,
    data: {}
  })
  const { idParam } = useParams()
  const strapiAPI = 'https://cms-metodos.herokuapp.com'


  useEffect(() => {
    axios.get(`${strapiAPI}/clientes/${idParam}`)
    .then(response => {
      setEstado({
        ok: true,
        data: response.data
      })
    })
    .catch(error => {
      console.error("Ocurrio un error")
    })
  }, [])


  // estado.pedidos.map(pedido => {
  //   console.log("Pedido Independiente: ", pedido)
  // })
  // console.log("Indice", estado.pedidos)

  return (
    <>
    {
      estado.ok ?
      (
        <>
          <Header title={"Estado del pedido: " + estado.data.estado_pedido}/>
          <section className="section-pedido-detalle">
              <div className="pedidos">
                <div className="information">
                  <h2>Nombre Completo</h2>
                  <p>{estado.data.nombre_completo}</p>
                </div>
                <div className="information">
                  <h2>Correo</h2>
                  <p>{estado.data.correo}</p>
                </div>
                <div className="information">
                  <h2>Telefono</h2>
                  <p>{estado.data.telefono}</p>
                </div>
                <div className="information">
                  <h2>Direccion</h2>
                  <p>{estado.data.direccion}</p>
                </div>
                <div className="information pedidos-lista">
                  <h2>Productos</h2>
                  {
                    estado.data.pedidos.map((pedidoItem, index) => (
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
            </section>
          </>
      )
      :
      (
        <Header title="No se encontro un pedido con esta id" />
      )
    }
    </>
  )
}

export default EstadoPedido