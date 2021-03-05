import React from 'react'
import Header from '../components/Header.jsx'
import "../../../dist/css/style-citas.css"

const Citas = () => {
  return (
    <>
      <Header title="Citas" />
      <section className="citas">
        <div className="contenedor-form">
          <form>
            <div className="input-group">
              <label>Nombre y Apellido</label>
              <input type="text" />
            </div>
            <div className="input-group">
              <label>Correo Electronico</label>
              <input type="text" />
            </div>
            <div className="input-group">
              <label>Telefono</label>
              <input type="text" />
            </div>
            <div className="input-group">
              <label>Problema con tu equipo?</label>
              <input type="text" />
            </div>
            <div className="input-group">
              <button>Reservar cita</button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Citas