import React, { useState } from 'react'
import Header from '../components/Header.jsx'
import axios from 'axios'
import Spinner from '../components/Spinner.jsx'
const ReporteAnual = () => {
  const [ loader, setLoader ] = useState(false)
  const [ select, setSelect ] = useState(null)
  const [ pedidos, setPedidos ] = useState([]) 

  let repetido = {}
  
  pedidos.forEach(numero => {
    repetido[numero.name] = (repetido[numero.name] || 0) + 1
  })

  const getData = (id) => {
    axios.get(`https://cms-metodos.herokuapp.com/clientes?ano_venta=${id}`)
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
      <Header title="Reporte Anual" />
      <section className="reporte-anual">
        <div className="contenedor-reporte-anual">
          <div className="formulario">
              <label>Elige un año</label>
              <select value={select} onChangeCapture={handleSelect}>
                <option value="null">Elige una opcion...</option>
                <option value="2021">2021</option>
              </select>
              <button onClick={() =>getData(select)}>Buscar</button>
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

export default ReporteAnual