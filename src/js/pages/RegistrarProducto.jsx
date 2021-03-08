import React from 'react'

import Header from '../components/Header.jsx'

const RegistrarProducto = () => {
  return (
    <>
      <Header title="Registrar Producto" />
      <section className="registrar-producto">
        <div className="contenedor-form">
          <form>
            <div className="input-group">
              <label>Nombre del Producto</label>
              <input type="text" />
            </div>
            <div className="input-group">
              <label>Descripcion del Producto</label>
              <input type="text" />
            </div>
            <div className="input-group">
              <label>Precio del Producto</label>
              <input type="text" />
            </div>
            <div className="input-group">
              <label>Imagen del Producto</label>
              <input type="file" />
            </div>
            <div className="input-group">
              <button>Guardar Producto</button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default RegistrarProducto