import React from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../components/Header.jsx'

// import "../../../dist/css/style-perfil.css"

const Perfil = () => {

  const history = useHistory()

  const goToRegisterProduct = () => {
    history.push('/empleado/registrar-producto')
  }

  const goToRegisterCitas = () => {
    history.push('/empleado/lista-citas')
  }

  const goToPedidos = () => {
    history.push('/empleado/pedidos')
  }
  const goToReporteSemanal = () => {
    history.push('/empleado/reporte-semanal')
  }
  const goToReporteMensual = () => {
    history.push('/empleado/reporte-mensual')
  }
  const goToReporteAnual = () => {
    history.push('/empleado/reporte-anual')
  }

  return (
    <>
      <Header title="Perfil" />
      <section className="section-perfil">
        <ul className="links">
          <li className="link" onClick={goToRegisterProduct} >Registrar Productos</li>
          <li className="link" onClick={goToRegisterCitas} >Lista de Citas</li>
          <li className="link" onClick={goToPedidos} >Pedidos</li>
          <li className="link" onClick={goToPedidos} >Pedidos</li>
          <li className="link" onClick={goToReporteSemanal} >Reporte Semanal</li>
          <li className="link" onClick={goToReporteMensual} >Reporte Mensual</li>
          <li className="link" onClick={goToReporteAnual} >Reporte Anual</li>
        </ul>
      </section>
    </>
  )
}

export default Perfil