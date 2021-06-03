import React, { useState } from 'react'
import axios from 'axios'
import Header from '../components/Header.jsx' 

const ReporteMensual = () => {
  
  const [ select, setSelect ] = useState(null)
  const [ pedidos, setPedidos ] = useState([]) 

  let cantidadMensual = []
  let repetido = {}
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  pedidos.forEach(numero => {
    repetido[numero.name] = (repetido[numero.name] || 0) + 1
  })

  console.log("Llave unica: ", repetido); 

  const getData = (id) => {
    axios.get(`https://cms-metodos.herokuapp.com/clientes?mes_venta=${id}`)
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

  for(let i = 1; i <= 12; i++) {
    cantidadMensual.push(i)
  }
  
  return (
    <>
      <Header title="Reporte Mensual" />
      <section className="reporte-mensual">
        <div className="contenedor-reporte-mensual">
            <div className="formulario">
                <label>Elige un mes</label>
                <select value={select} onChangeCapture={handleSelect}>
                  <option value="null">Elige una opcion...</option>
                  {cantidadMensual.map((numero, index) => (
                    <option value={numero}>{meses[index]}</option>
                  ))}
                </select>
                <button onClick={() => getData(select)} >Buscar</button>
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

export default ReporteMensual