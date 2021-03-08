import React from 'react'

const Modal = ({nombre}) => {

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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal