import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import moment from 'moment'


const EstadoCita = () => {
  
  const strapiAPI = 'https://cms-metodos.herokuapp.com'

  const { idParam } = useParams()
  const [ cita, setCita ] = useState({})
  
  
  useEffect(() => {
    axios.get(`${strapiAPI}/citas/${idParam}`)
    .then(respuesta => {
      setCita(respuesta.data)
    })
  }, [])

  return(
    <>
      <section className="confirmacion">
        <div className="informacion">
          <h2>Estado de tu Cita: {cita.estado_cita}</h2>
          <div className="informacion-cliente">
            <h3>Nombre y Apellidos</h3>
            <p>{cita.nombre_completo}</p>
          </div>
          <div className="informacion-cliente">
            <h3>Correo Electronico</h3>
            <p>{cita.correo}</p>
          </div>
          <div className="informacion-cliente">
            <h3>Telefono</h3>
            <p>{cita.telefono}</p>
          </div>
          <div className="informacion-cliente">
            <h3>Tipo de Equipo</h3>
            <p>{cita.tipo_producto}</p>
          </div>
          <div className="informacion-cliente">
            <h3>Problema del Equipo</h3>
            <p>{cita.problema}</p>
          </div>
          <div className="informacion-cliente">
            <h3>Fecha de Registro</h3>
            <p>{moment(cita.created_at).format('DD-MM-YYYY')}</p>
          </div>
          <div className="informacion-cliente">
            <h3>Fecha de Cita</h3>
            <p>{cita.fecha_cita != null ? moment(cita.fecha_cita).format('DD-MM-YYYY') : 'No se registra fecha aun'}</p>
          </div>
          <div className="informacion-cliente">
            <h3>Fecha de Atencion</h3>
            <p>{cita.fecha_atencion != null ? moment(cita.fecha_atencion).format('DD-MM-YYYY') : 'No se registra fecha aun'}</p>
          </div>
        </div>
        <div className="imagen">
          <img src="dist/img/confirmed.jpg" alt="" />
        </div>
      </section>
    </>
  )

}

export default EstadoCita