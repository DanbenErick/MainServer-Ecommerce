import React, { useRef, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import Header from '../components/Header.jsx'
import Spinner from '../components/Spinner.jsx'

import StoreContext from '../context'

import axios from 'axios'
import moment from 'moment'

const InformacionEnvio = () => {
  
  const context = useContext(StoreContext)

  const nombreCompleto = useRef(null)
  const correoElectronico = useRef(null)
  const telefono = useRef(null)
  const direccion = useRef(null)
  const dni = useRef(null)
  const history = useHistory()

  const [ loader, setLoader ] = useState(false)

  const goToPagar = (event) => {
    event.preventDefault()
    if(nombreCompleto.current.value != "" && correoElectronico.current.value != "" && telefono.current.value != "" && direccion.current.value != "" && dni.current.value != "")  {
      const cliente = {
        name: nombreCompleto.current.value,
        email: correoElectronico.current.value,
        phone: telefono.current.value,
        address: direccion.current.value,
        dni: dni.current.value,
      }
  
      axios.post('https://cms-metodos.herokuapp.com/clientes', {
        nombre_completo: cliente.name,
        correo: cliente.email,
        telefono: cliente.phone,
        direccion: cliente.address,
        dni: cliente.dni,
        pedidos: context.carrito,
        estado_pedido: 'Pendiente',
        semana_venta: moment().isoWeek(),
        mes_venta: moment().format('M'),
        ano_venta: moment().year(),
        fecha_compra: moment().format('YYYY-MM-DD')
      })
      .then( response => {
        cliente.id_pedido = response.data.id
      })
      setLoader(true)
      
      context.addCliente(cliente)
      console.log("Informacion Envio", context)
      history.push('/carrito/confirmacion')
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Rellena todos los datos requeridos!',
      })
    }
  }

  return (
    <>
      <Header title="Rellena tus Datos Personales" />
      <section className="informacion-personal">
        <div className="contenedor-form">
          <form action="">
            <div className="input-group">
              <label htmlFor="">Nombre y Apellido</label>
                <input ref={nombreCompleto} type="text" required/>
            </div>
            <div className="input-group">
              <label htmlFor="">Correo Electronico</label>
                <input ref={correoElectronico} type="text" required/>
            </div>
            <div className="input-group">
              <label htmlFor="">Telefono (9 digitos)</label>
                <input ref={telefono} type="number" required/>
            </div>
            <div className="input-group">
              <label htmlFor="">Direccion</label>
                <input ref={direccion} type="text" required/>
            </div>
            <div className="input-group">
              <label htmlFor="">DNI (8 digitos)</label>
                <input ref={dni} type="number" required/>
            </div>
            <div className="input-group">
              <button type="submit" onClick={goToPagar}>Ir a Pagar</button>
            </div>
          </form>
        </div>
      </section>
      {
        loader
        ?
        <Spinner />
        :
        <></>
      }
    </>
  )
}

export default InformacionEnvio


// let formData = new FormData();    //formdata object

// formData.append('name', 'ABC');   //append the values with key, value pair
// formData.append('age', 20);

// const config = {     
//     headers: { 'content-type': 'multipart/form-data' }
// }

// axios.post(url, formData, config)
//     .then(response => {
//         console.log(response);
//     })
//     .catch(error => {
//         console.log(error);
//     });