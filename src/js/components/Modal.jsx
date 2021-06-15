import React from 'react'
import { useHistory } from 'react-router'

const Modal = ({nombre, id}) => {

  const history = useHistory()

  const goToDetailCita = (id) => {
    history.push(`estado-cita/${id}`)
  }

  return (
    <div className="modal">
      <div className="contenedor-modal">
        <div className="modal-titulo">
          <h1>Gracias!!</h1>
        </div>
        <div className="modal-informacion">
          <div className="informacion-imagen">
            <img src="dist/img/confirm-cite.svg" alt="" />
          </div>
          <div className="informacion-texto">
            <p>Le llamaremos para confirmar su cita</p>
            <p className="informacion-nombre">{nombre}</p>
            <button onClick={() => goToDetailCita(id)} style={{ color: '#004643' }}>Ver estado de cita</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal