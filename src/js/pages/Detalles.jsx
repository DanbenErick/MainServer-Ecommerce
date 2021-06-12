import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../components/Header.jsx'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import StoreContext from '../context'


const Detalles = () => {
  const [ item, setItem ] = useState({
    ok: false,
    data: {}
  })
  const { idParam } = useParams()
  const context = useContext(StoreContext)
  let productoParaCarrito = {}

  useEffect(() => {
    axios.get('https://cms-metodos.herokuapp.com/productos/' + idParam)
    .then(res => {
      setItem({
        ok: true,
        data: res.data
      })
    })
  },[])

  const addToCart = () => {
    console.log("Funcion:", item.data)
    productoParaCarrito = {
      id: item.data.id,
      name: item.data.nombre,
      image: item.data.imagen,
      price: item.data.precio,
      description: item.data.descripcion
    }
    context.addCarrito(productoParaCarrito)
    Swal.fire({
      icon: 'success',
      title: 'Exito!',
      text: 'Producto agregado al carrito!',
    })
  }

  return (
    <>
      <Header />
      {
        item.ok ?
        <section className="detalles" key={item.data.id}>
          <div className="detalle-producto">
            <div className="detalle-imagen">
              <img src={'https://cms-metodos.herokuapp.com' + item.data.imagen} alt="" />
            </div>
            <div className="detalle-informacion">
              <h2>{item.data.nombre}</h2>
              <p>{item.data.descripcion}</p>
              <p>S/. {item.data.precio}</p>
              <p><b>Los envios estan disponibles para (Junin, Lima y Pasco)</b></p>
              <button type="button" onClick={addToCart}>Añadir al Carrito</button>
            </div>
          </div>
        </section> 
        :
        <h2>No hay item.data seleccionado o no se encontro</h2>
      }
    </>
  )
}

export default Detalles