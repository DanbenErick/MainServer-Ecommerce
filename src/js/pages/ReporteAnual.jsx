import React, { useState } from 'react'
import Header from '../components/Header.jsx'
import axios from 'axios'
import Spinner from '../components/Spinner.jsx'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import moment from 'moment'


const ReporteAnual = () => {

  const MySwal = withReactContent(Swal)
  const [ loader, setLoader ] = useState(false)
  const [ select, setSelect ] = useState(null)
  const [ pedidos, setPedidos ] = useState([]) 
  const [ precio, setPrecio ] = useState(0)
  const strapiAPI = 'https://cms-metodos.herokuapp.com'
  let precioTotal = 0

  const getData = (id) => {
    axios.get(`${strapiAPI}/clientes?ano_venta=${id}&estado_pedido=Entregado`, {
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

  const getDetails = (id) => {
    axios.get(`${strapiAPI}/clientes/${id}`, {
      headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then(respuesta => {
      const { data } = respuesta
      MySwal.fire({
        title: 'Informacion Completa',
        html: `<div class="informacion">
                <b>Nombre Completo</b>
                <p>${data.nombre_completo}</p>
              </div>
              <br />
              <div class="informacion">
                <b>Correo</b>
                <p>${data.correo}</p>
              </div>
              <br />
              <div class="informacion">
                <b>Telefono</b>
                <p>${data.telefono}</p>
              </div>
              <br />
              <div class="informacion">
                <b>Direccion</b>
                <p>${data.direccion}</p>
              </div>
              <br />
              <div class="informacion">
                <b>DNI</b>
                <p>${data.dni}</p>
              </div>
              <br />
              <div class="informacion">
                <b>Estado del Pedido</b>
                <p>${data.estado_pedido}</p>
              </div>
              <br />
              <div class="informacion">
                <b>Fecha de Registro</b>
                <p>${moment(data.fecha_compra).format('DD-MM-YYYY')}</p>
              </div>
              <br />
              <div class="informacion">
                <b>Fecha de confirmacion de pedido</b>
                <p>${moment(data.updated_at).format('DD-MM-YYYY') || 'Sin registro'}</p>
              </div>
              <br />
              <div class="informacion">
                <b>Productos</b>
                <p>${data.pedidos.map(pedido => "<p>"+ pedido.name + "</p>" + "<b> S/." + pedido.price +"</b>")}</p>
              </div>`
      })
    })
  }

  return (
    <>
      <Header title="Reporte Anual" />
      <section className="reporte-anual">
        <div className="contenedor-reporte-anual">
          <div className="formulario">
              <label>Elige un año</label>
              <select value={select} onChangeCapture={handleSelect}>
                <option value="null">Elige una opcion...</option>
                <option value="2021">2021</option>
              </select>
              <button onClick={() =>getData(select)}>Buscar</button>
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
                          <td onClick={() => getDetails(pedido.id)}>{pedido.nombre_completo}</td>
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
      {
        loader
        ?
        <Spinner />
        :
        <></>
      }
      </>
  )
}

export default ReporteAnual