import React, { useState } from 'react'
import axios from 'axios'
import Header from '../components/Header.jsx' 

const ReporteMensual = () => {
  
  const [ select, setSelect ] = useState(null)
  const [ pedidos, setPedidos ] = useState([]) 
  const [ precio, setPrecio ] = useState(0)

  let precioTotal = 0
  let cantidadMensual = []

  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

  const getData = (id) => {
    axios.get(`https://cms-metodos.herokuapp.com/clientes?mes_venta=${id}&estado_pedido=Entregado`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then(response => {
      setPedidos(response.data)
      response.data.map(pedido => {
        console.log("Precio Total", pedido.precio_total)
        precioTotal = parseInt(pedido.precio_total) + parseInt(precioTotal) 
      })
      setPrecio(precioTotal)
    })
  }

  const handleSelect = (event) => {
    setSelect(event.target.value)
  }

  for(let i = 1; i <= 12; i++) {
    cantidadMensual.push(i)
  }
  
  return (
    <>
      <Header title="Reporte Mensual" />
      <section className="reporte-mensual">
        <div className="contenedor-reporte-mensual">
            <div className="formulario">
                <label>Elige un mes</label>
                <select value={select} onChangeCapture={handleSelect}>
                  <option value="null">Elige una opcion...</option>
                  {cantidadMensual.map((numero, index) => (
                    <option value={numero}>{meses[index]}</option>
                  ))}
                </select>
                <button onClick={() => getData(select)} >Buscar</button>
              </div>
            <div className="container-table">
            <table>
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Telefono</th>
                  <th>Cantidad de Producto</th>
                  <th>Precio Total</th>
                </tr>
              </thead>
              <tbody>
              {
                  pedidos.length > 0
                  ?
                    pedidos.map((pedido, index) => {
                      console.log(pedido)
                      return (
                        <tr key={index}>
                          <td>{pedido.nombre_completo}</td>
                          <td>{pedido.telefono}</td>
                          <td>{pedido.pedidos.length}</td>
                          <td>S/.{pedido.precio_total}</td>
                        </tr>
                      )
                      
                    })
                  :
                    (<tr>
                      <td colSpan="4">No hay ventas en esa semana</td>
                    </tr>)
                }
                {
                  pedidos.length > 0
                  ?
                  <tr style={{ background: '#004643', color: 'white' }}>
                    <td><b>Ganancia de la Semana</b></td>
                    <td></td>
                    <td></td>
                    <td><b>S/.{precio}</b></td>
                  </tr>
                  :
                  <>
                  </>
                }
              </tbody>
            </table>
            </div>
          </div>
      </section>
    </>
  )
}

export default ReporteMensual