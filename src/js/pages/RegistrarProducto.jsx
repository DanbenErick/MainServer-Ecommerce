import React, { useContext, useRef, useState } from 'react'

import Header from '../components/Header.jsx'

import axios from 'axios'
import StoreContext from '../context'

const RegistrarProducto = () => {

  const context = useContext(StoreContext)
  const [ file, setFile ] = useState({})

  const form = useRef(null)
  const nombre = useRef(null)
  const descripcion = useRef(null)
  const precio = useRef(null)
  const imagen = useRef(null)
  
  const sendData = () => {
    const formData = new FormData(form.current)
    axios.post('http://localhost:1337/upload', formData, {
      headers: {
        Authorization: `Bearer ${context.token}`
      }
    })

    .then(res => {
      formData.delete('files')
      console.log("URL de Imagen", res.data[0].url)
      formData.set('imagen', res.data[0].url)
      axios.post('http://localhost:1337/productos', {
        nombre: formData.get('nombre'),
        descripcion: formData.get('descripcion'),
        precio: formData.get('precio'),
        imagen: formData.get('imagen'),
      }, {
        headers: {
          Authorization: `Bearer ${context.token}`
        }
      })
      .then(res => {
        alert("Producto creado")
        nombre.current = ''
        descripcion.current = ''
        precio.current = ''
        imagen.current = ''
      })
      .catch(err => {
        console.log(err)
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      <Header title="Registrar Producto" />
      <section className="registrar-producto">
        <div className="contenedor-form">
          <form ref={form}>
            <div className="input-group">
              <label>Nombre del Producto</label>
              <input type="text" name="nombre" ref={nombre} />
            </div>
            <div className="input-group">
              <label>Descripcion del Producto</label>
              <input type="text" name="descripcion" ref={descripcion} />
            </div>
            <div className="input-group">
              <label>Precio del Producto</label>
              <input type="text" name="precio" ref={precio} />
            </div>
            <div className="input-group">
              <label>Imagen del Producto</label>
              <input
                name="files"
                type="file"
                ref={imagen}
                accept="image/*"
                onChange= {e => {
                  setFile(e.target.files[0])
                }}  
              />
            </div>
            <div className="input-group">
              <button type="button" onClick={sendData}>Guardar Producto</button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default RegistrarProducto