import React, { useState } from 'react'
import Header from '../components/Header.jsx'
import axios from 'axios'
import { object } from 'prop-types'

const ReporteSemanal = () => {

  const [ select, setSelect ] = useState(null)
  const [ pedidos, setPedidos ] = useState([]) 

  let cantidadSemanas = []
  let repetido = {}
  
  pedidos.forEach(numero => {
    repetido[numero.name] = (repetido[numero.name] || 0) + 1
  })


  for(let i = 1; i <= 52; i++) {
    cantidadSemanas.push(i)
  }

  const getData = (id) => {
    axios.get(`https://cms-metodos.herokuapp.com/clientes?semana_venta=${id}`)
    .then(response => {
      let lista_pedidos_arreglo = []
      response.data.map(item => {
        lista_pedidos_arreglo.push(...item.pedidos)
      })
      setPedidos(lista_pedidos_arreglo)
    })
  }

  const handleSelect = (event) => {
    setSelect(event.target.value)
  }

  return (
    <>
      <Header title="Reporte Semanal" />
      <section className="reporte-semanal">
        <div className="contenedor-reporte-semanal">
          <div className="formulario">
            <label>Numero de Semana</label>
            <select value={select} onChangeCapture={handleSelect}>
              <option value="null">Elige una opcion...</option>
              {cantidadSemanas.map(numero => (
                <option key={numero} value={numero}>Semana: {numero}</option>
              ))}
            </select>
            <button onClick={() => getData(select)}>Buscar</button>
            </div>
          <div className="container-table">
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {
                  pedidos.length > 0
                  ?
                    Object.keys(repetido).map((llave,i)=>{
                      return (
                        <tr key={i}>
                          <td>{llave}</td>
                          <td>{repetido[llave]}</td>
                        </tr>
                        )
                    })
                  :
                    (<tr>
                      <td colSpan="2">No hay ventas en esa semana</td>
                    </tr>)
                }
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}

export default ReporteSemanal