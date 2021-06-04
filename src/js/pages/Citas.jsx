import React, { useState, useRef } from "react";
import Header from "../components/Header.jsx";
import Modal from "../components/Modal.jsx";
import { Helmet } from "react-helmet";
import axios from "axios";
import Swal from "sweetalert2";
const Citas = () => {
  const [modal, setModal] = useState({
    ok: false,
    nombre: "",
  });

  const nombre_completo = useRef(null);
  const correo = useRef(null);
  const telefono = useRef(null);
  const problema = useRef(null);
  const marca_producto = useRef(null);

  const hideModal = () => {
    setModal({ok: false, nombre: ""})
  }

  const saveCita = (event) => {
    event.preventDefault();
    if (
      nombre_completo.current.value != "" &&
      correo.current.value != "" &&
      telefono.current.value != "" &&
      problema.current.value != "" &&
      marca_producto.current.value != ""
    ) {
      const data = {
        nombre_completo: nombre_completo.current.value,
        correo: correo.current.value,
        telefono: telefono.current.value,
        problema: problema.current.value,
        marca_producto: marca_producto.current.value,
        estado_cita: "Pendiente",
      };

      axios
        .post("https://cms-metodos.herokuapp.com/citas", data)
        .then((response) => {
          setModal({
            ok: true,
            nombre: nombre_completo.current.value,
          });
          nombre_completo.current.value = "";
          correo.current.value = "";
          telefono.current.value = "";
          problema.current.value = "";
          marca_producto.current.value = "";
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No relleno todos los datos",
      });
    }
  };

  return (
    <>
      <Helmet>
        <meta charset="utf-8" />
        <link rel="stylesheet" href="../../../dist/css/style-citas.css" />
        <title>Citas | Tienda | Main Server</title>
      </Helmet>
      <Header title="Citas" />
      <section className="citas">
        <div className="contenedor-form">
          <form>
            <div className="input-group">
              <label>Nombre y Apellido</label>
              <input type="text" ref={nombre_completo} required />
            </div>
            <div className="input-group">
              <label>Correo Electronico</label>
              <input type="email" ref={correo} required />
            </div>
            <div className="input-group">
              <label>Telefono</label>
              <input type="text" pattern="[0-9]{9}" ref={telefono} required />
            </div>
            <div className="input-group">
              <label>Problema con tu equipo? max(30 caracteres)</label>
              <input type="text" ref={problema} maxLength="30" required />
            </div>
            <div className="input-group">
              <label>Marca del Producto</label>
              <input type="text" ref={marca_producto} required />
            </div>
            <div className="input-group">
              <button type="submit" onClick={saveCita}>
                Reservar cita
              </button>
            </div>
          </form>
        </div>
      </section>
      {modal.ok ? <Modal nombre={modal.nombre} onClick={hideModal} /> : null}
    </>
  );
};

export default Citas;
