import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Header from '../components/Header.jsx'
import StoreContext from '../context'
import Swal from 'sweetalert2'
import widthReactContent from 'sweetalert2-react-content'
import moment from 'moment'


const ListaCitas = () => {
  const context = useContext(StoreContext)
  const strapiAPI = 'https://cms-metodos.herokuapp.com'
  const MySwal = widthReactContent(Swal)
  const [citas, setCitas] = useState({
    ok: false,
    data: {}
  })
  
  const traerCitas = () => {
    axios.get(`${strapiAPI}/citas`, {
      headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then(response => {
      setCitas({
        ok: true,
        data: response.data
      })
    })
  }

  const traerDetalles = (id) => {

    axios.get(`${strapiAPI}/citas/${id}`, {
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
                <b>Problema</b>
                <p>${data.problema}</p>
              </div>
              <br />
              <div class="informacion">
                <b>Tipo de Producto</b>
                <p>${data.tipo_producto}</p>
              </div>
              <br />
              <div class="informacion">
                <b>Estado de la Cita</b>
                <p>${data.estado_cita}</p>
              </div>
              
              <br />
              <div class="informacion">
                <b>Fecha de Registro</b>
                <p>${moment(data.created_at).format('DD-MM-YYYY')}</p>
              </div>
              <br />
              <div class="informacion">
                <b>Fecha de la Cita</b>
                <p>${data.fecha_cita || 'sin registro'}</p>
              </div>
              <br />
              <div class="informacion">
                <b>Fecha de Atencion</b>
                <p>${data.fecha_atencion || 'sin registro'}</p>
              </div>`
      })
    })
  }

  useEffect(() => {
    traerCitas()
  }, [])

  const citaAceptada = (id) => {
    MySwal.fire({
      title: 'Establecer fecha de atencion',
      html: '<input type="date" id="swal-input1" class="swal2-input">'+'<input type="time" id="swal-input2" class="swal2-input">',
      showCancelButton: true,
      confirmButtonText: 'Establecer la fecha',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        axios.put(`${strapiAPI}/citas/${id}`, {
          estado_cita: 'Aceptada',
          fecha_cita: document.querySelector('#swal-input1').value,
          hora_cita: document.querySelector("#swal-input2").value
        })
        .then(response => {
          console.log('response estado cita: ', response)
          if (response.status != 200) {
            throw new Error(response.statusText)
          }
          traerCitas()
          MySwal.fire({
            icon: 'success',
            title: 'Cambios Realizados',
          })
        })
        .catch(error => {
          Swal.showValidationMessage(
            `Fallo en la peticion: ${error}`
          )
        })
      },
      allowOutsideClick: () => !MySwal.isLoading()
    })
  }

  const citaRechazada = (id) => {
    const data = {
      estado_cita: 'Rechazada'
    }
    axios.put(`${strapiAPI}/citas/${id}`, data)
    .then(response => {
      traerCitas()
      Swal.fire({
        icon: 'success',
        title: 'Exito!',
        text: 'Se cambio correctamente el estado de la cita!',
      })
    })
  }
  const citaAtendida = (id) => {
    MySwal.fire({
      title: 'Establecer fecha de atencion',
      html: '<input type="date" id="swal-input1" class="swal2-input">'+'<input type="time" id="swal-input2" class="swal2-input">',
      showCancelButton: true,
      confirmButtonText: 'Establecer la fecha',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        axios.put(`${strapiAPI}/citas/${id}`, {
          estado_cita: 'Atendida',
          fecha_atencion: document.querySelector('#swal-input1').value,
          hora_atencion: document.querySelector("#swal-input2").value
        })
        .then(response => {
          console.log('response estado cita: ', response)
          if (response.status != 200) {
            throw new Error(response.statusText)
          }
          traerCitas()
          MySwal.fire({
            icon: 'success',
            title: 'Cambios Realizados',
          })
        })
        .catch(error => {
          Swal.showValidationMessage(
            `Fallo en la peticion: ${error}`
          )
        })
      },
      allowOutsideClick: () => !MySwal.isLoading()
    })
  }
    
  return (
    <>
      <Header
        title="Lista de Citas"
      />
      <section className="section-lista-pedidos">
        <div className="container-table">
          <table>
            <thead>
              <tr>
                <th>Nombre Completo</th>
                <th>Estado</th>
                <th>Telefono</th>
                <th>Fecha de Registro</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {
                citas.ok
                ?
                  citas.data.map(cita => (
                    <tr key={cita.id}>
                      <td onClick={() => traerDetalles(cita.id)} >{cita.nombre_completo}</td>
                      <td>{cita.estado_cita}</td>
                      <td>{cita.telefono}</td>
                      <td>{moment(cita.created_at).format('DD-MM-YYYY')}</td>
                      <td>
                        <button className="aceptada" onClick={() => citaAceptada(cita.id)}>Aceptada</button>
                        <button className="rechazada" onClick={() => citaRechazada(cita.id)}>Rechazada</button>
                        <button className="atendida" onClick={() => citaAtendida(cita.id)}>Atendida</button>
                      </td>
                    </tr>
                  ))
                :
                <tr>
                  <td colSpan="7">No hay citas por ver</td>
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