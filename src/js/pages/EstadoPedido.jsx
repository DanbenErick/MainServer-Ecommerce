import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../components/Header.jsx'
import { useParams } from 'react-router-dom'


const EstadoPedido = () => {
  
  const [ estado, setEstado ] = useState({})
  const { idParam } = useParams()
  
  useEffect(() => {
    axios.get('https://cms-metodos.herokuapp.com/clientes/' + idParam)
    .then(response => {
      setEstado(response.data)
      console.log("Estado pedido: ", response.data)
    })
  }, [])
  
  return (
    <>
      <Header title={"Estado del pedido: " + estado.estado_pedido}/>
      <section className="section-pedido-detalle">
          <div className="pedidos">
            <div className="information">
              <h2>Nombre Completo</h2>
              <p>{estado.nombre_completo}</p>
            </div>
            <div className="information">
              <h2>Correo</h2>
              <p>{estado.correo}</p>
            </div>
            <div className="information">
              <h2>Telefono</h2>
              <p>{estado.telefono}</p>
            </div>
            <div className="information">
              <h2>Direccion</h2>
              <p>{estado.direccion}</p>
            </div>
          </div>
        </section>
    </>
  )
}

export default EstadoPedido