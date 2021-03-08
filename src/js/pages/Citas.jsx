import React, { useState, useRef } from 'react'
import Header from '../components/Header.jsx'
import Modal from '../components/Modal.jsx'
import "../../../dist/css/style-citas.css"

import axios from 'axios'

const Citas = () => {

  const [ modal, setModal ] = useState({
    ok: false,
    nombre: ''
  })

  const nombre_completo = useRef(null)
  const correo = useRef(null)
  const telefono = useRef(null)
  const problema = useRef(null)
  const marca_producto = useRef(null)
  const saveCita = () => {
    // const formData = new FormData()
    // formData.append('nombre_completo', nombreCompleto)
    // formData.append('correo', correo)
    // formData.append('telefono', telefono)
    // formData.append('problema', problema)
    // const config = {
    //   headers: {
    //     'content-type': 'multipart/form-data'
    //   }
    // }
    // const config = {
    //   headers: {
    //     'content-type': 'x-www-form-urlencoded'
    //   }
    // }
    const data = {
      nombre_completo: nombre_completo.current.value,
      correo: correo.current.value,
      telefono: telefono.current.value,
      problema : problema.current.value,
      marca_producto: marca_producto.current.value
    }
    console.log("DATOS", data)
    axios.post('http://localhost:1337/citas', data)
      .then(response => {
        setModal({
          ok: true,
          nombre: nombre_completo.current.value
        })
        console.log(response)
        nombre_completo.current.value = ''
        correo.current.value = ''
        telefono.current.value = ''
        problema.current.value = ''
        marca_producto.current.value = ''
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <>
      <Header title="Citas" />
      <section className="citas">
        <div className="contenedor-form">
          <form>
            <div className="input-group">
              <label>Nombre y Apellido</label>
              <input type="text" ref={nombre_completo} />
            </div>
            <div className="input-group">
              <label>Correo Electronico</label>
              <input type="text" ref={correo}/>
            </div>
            <div className="input-group">
              <label>Telefono</label>
              <input type="text" ref={telefono}/>
            </div>
            <div className="input-group">
              <label>Problema con tu equipo?</label>
              <input type="text" ref={problema}/>
            </div>
            <div className="input-group">
              <label>Marca del Producto</label>
              <input type="text" ref={marca_producto}/>
            </div>
            <div className="input-group">
              <button type="button" onClick={saveCita}>Reservar cita</button>
            </div>
          </form>
        </div>
      </section>
      {modal.ok ?
        <Modal nombre={modal.nombre}/>
        :
        null
      }
    </>
  )
}

export default Citas