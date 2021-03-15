import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../components/Header.jsx'
import { useParams } from 'react-router-dom'

import '../../../dist/css/style-detalle-producto.css'

import data from '../../database/data'
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
    axios.get('http://localhost:1337/productos/' + idParam)
    .then(res => {
      setItem({
        ok: true,
        data: res.data
      })
    })
  },[])

  const addToCart = () => {
    productoParaCarrito = {
      id: item.data.id,
      name: item.data.nombre,
      image: item.data.imagen[0].url,
      price: item.data.precio,
      description: item.data.description
    }
    console.log("Detalles", productoParaCarrito)
    context.addCarrito(productoParaCarrito)
  }

  return (
    <>
      <Header />
      {
        item.ok ?
        // <h1>Si hay </h1>
        <section className="detalles" key={item.data.id}>
          <div className="detalle-producto">
            <div className="detalle-imagen">
              <img src={'http://localhost:1337' + item.data.imagen[0].url} alt="" />
            </div>
            <div className="detalle-informacion">
              <h2>{item.data.nombre}</h2>
              <p>{item.data.descripcion}</p>
              <p>S/. {item.data.precio}</p>
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