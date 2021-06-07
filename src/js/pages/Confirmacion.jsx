import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import StoreContext from "../context";
const Confirmacion = () => {
  const { cliente } = useContext(StoreContext);
  const history = useHistory();

  const goToDetails = (idParam) => {
    history.push("../../estado-pedido/" + idParam);
  };

  return (
    <>
      <header className="header-confirmacion">
        <h2>Pedido Confirmado</h2>
        <p>Pronto te llegara tu producto</p>
      </header>
      <section className="confirmacion">
        <div className="informacion">
          <h2>Datos de Envio</h2>
          <div className="informacion-cliente">
            <h3>Nombre y Apellidos</h3>
            <p>{cliente.name}</p>
          </div>
          <div className="informacion-cliente">
            <h3>Correo Electronico</h3>
            <p>{cliente.email}</p>
          </div>
          <div className="informacion-cliente">
            <h3>Telefono</h3>
            <p>{cliente.phone}</p>
          </div>
          <div className="informacion-cliente">
            <h3>Direccion</h3>
            <p>{cliente.address}</p>
          </div>
          <div className="informacion-cliente">
            <h3>DNI</h3>
            <p>{cliente.dni}</p>
          </div>
          <div className="informacion-cliente">
            <h3>Estado de Pedido</h3>
            <button onClick={() => goToDetails(cliente.id_pedido)}>
              {" "}
              Ver el estado del pedido
            </button>
          </div>
        </div>
        <div className="imagen">
          <img src="dist/img/confirmed.jpg" alt="" />
        </div>
      </section>
    </>
  );
};

export default Confirmacion;
