import React, { useRef, useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import Header from '../components/Header.jsx'
import Spinner from '../components/Spinner.jsx'
import PaypalCheckoutButton from '../components/PaypalCheckoutButton.jsx'
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
  let new_carrito = []
  let total_precio = 0
  context.carrito.map(item => {
    new_carrito.push({
      sku: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      currency: 'USD'
    })
    total_precio = parseInt(item.price) + parseInt(total_precio)
  })

  const order= {
    customer: '123456',
    total: total_precio.toString(),
    items:[ 
      ... new_carrito
    ]
  }

  const [ loader, setLoader ] = useState(false)
  const [ precioTotal, setPrecioTotal] = useState(null)
  const [ pago, setPago ] = useState(false)

  const goToPagar = (event) => {
    event.preventDefault()
    alert("Click enviadn datos")
    if(nombreCompleto.current.value != "" && correoElectronico.current.value != "" && telefono.current.value != "" && direccion.current.value != "" && dni.current.value != "")  {
      const cliente = {
        name: nombreCompleto.current.value,
        email: correoElectronico.current.value,
        phone: telefono.current.value,
        address: direccion.current.value,
        dni: dni.current.value
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
        fecha_compra: moment().format('YYYY-MM-DD'),
        precio_total: precioTotal
      })
      .then( response => {
        cliente.id_pedido = response.data.id
      })
      setLoader(true)
      context.addCliente(cliente)
      history.push('/carrito/confirmacion')
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Rellena todos los datos requeridos!',
      })
    }
  }

  useEffect(() => {
    
    setPago(context.pago)

    let sumatoria = 0
    if(context.carrito != null) {
      context.carrito.map(item => {
        sumatoria = parseInt(item.price) + parseInt(sumatoria)
      })
    }
    setPrecioTotal(sumatoria.toString())
  },[])

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
              {
                !context.pago
                ?
                  (
                    <PaypalCheckoutButton
                      order={order}
                    />
                  )
                :
                (
                  <button onClick={goToPagar}>Continuar</button>
                )
              }
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