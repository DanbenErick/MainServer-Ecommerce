import React, { useState, useContext } from 'react'
import { Helmet } from 'react-helmet'
import { HashRouter, Switch,Route} from "react-router-dom";

//Componentes
import Nav from './components/Nav.jsx'

//Paginas
import Productos from './pages/Productos.jsx'
import Citas from './pages/Citas.jsx'
import Carrito from './pages/Carrito.jsx'
import Confirmacion from './pages/Confirmacion.jsx'
import Detalles from './pages/Detalles.jsx'
import InformacionEnvio from './pages/InformacionEnvio.jsx'
import Pago from './pages/Pago.jsx'
import RegistrarProducto from './pages/RegistrarProducto.jsx';
import Empleado from './pages/Empleado.jsx'
import ListaCitas from './pages/ListaCitas.jsx'
import Perfil from './pages/Perfil.jsx'
import Pedidos from './pages/Pedidos.jsx'
import PedidoDetalle from './pages/PedidoDetalle.jsx'
import ReporteSemanal from './pages/ReporteSemanal.jsx'
import ReporteMensual from './pages/ReporteMensual.jsx'
import ReporteAnual from './pages/ReporteAnual.jsx'
import EstadoPedido from './pages/EstadoPedido.jsx'


// Data Inicial
import data from '../database/data'

//Context
import StoreContext from './context'

const App = () => {

  const [carrito, setCarrito] = useState([])
  const [cliente, setCliente] = useState({})
  const [token, setToken] = useState(null)

  const context = useContext(StoreContext)

  const addCarrito = (producto) => {
    setCarrito(prevCarrito => [...prevCarrito, producto])
  }

  const addCliente = (cliente) => {
    context.cliente = cliente
    console.log("ADD Cliente", context)
    setCliente(prevCliente => cliente)
  }

  const addToken = (token) => {
    context.token = token
    console.log("TOKEN AGREGADO")
    setToken(prevToken => token)
  }

  const removeCarrito = (index) => {
    let carritos = carrito
    carritos.splice(index, 1)
    setCarrito(carritos)
  }

  return (
    <StoreContext.Provider value={{carrito, cliente, addCarrito, removeCarrito, addCliente, token, addToken}}>
      <React.Fragment>
          <HashRouter>
            <Nav />
            <Switch>
              <Route path="/productos" exact>
                <Helmet>
                  <meta charset="utf-8"/>
                  <link rel="stylesheet" href="./dist/css/style-index.css" />
                  <title>Productos | Tienda | MainServer</title>
                </Helmet>
                <Productos productos={data} loader={true}/>
              </Route>
              <Route path="/productos/detalles/:idParam" exact >
                <Helmet>
                  <meta charset="utf-8"/>
                  <link rel="stylesheet" href="./dist/css/style-detalle-producto.css" />
                  <title>Citas | Tienda | MainServer</title>
                </Helmet>
                <Detalles />
              </Route>
              <Route path="/empleado" exact>
                <Helmet>
                  <meta charset="utf-8"/>
                  <link rel="stylesheet" href="./dist/css/style-datos-personales.css" />
                  <title>Empleados | Tienda | MainServer</title>
                </Helmet>
                <Empleado />
              </Route>
              <Route path="/empleado/perfil" exact>
                <Helmet>
                  <meta charset="utf-8"/>
                  <link rel="stylesheet" href="./dist/css/style-perfil.css" />
                  <title>Perfil</title>
                </Helmet>
                <Perfil />
              </Route>
              <Route path="/empleado/registrar-producto" exact>
                <Helmet>
                  <meta charset="utf-8"/>
                  <link rel="stylesheet" href="./dist/css/style-registrar-producto.css" />
                  {/* Este si no tiene un css propio */}
                  <title>Registrar Producto | Tienda | MainServer</title>
                </Helmet>
                <RegistrarProducto />
              </Route>
              <Route path="/empleado/pedidos" exact>
                <Helmet>
                  <meta charset="utf-8"/>
                  <link rel="stylesheet" href="./dist/css/style-pedidos.css" />
                  <title>Pedidos | Tienda | MainServer</title>
                </Helmet>
                <Pedidos />
              </Route>
              <Route path="/empleado/pedidos/:id" exact>
                <Helmet>
                  <meta charset="utf-8"/>
                  <link rel="stylesheet" href="./dist/css/style-detalle-pedidos.css" />
                  <title>Detalle de Pedido | Tienda | MainServer</title>
                </Helmet>
                <PedidoDetalle />
              </Route>
              <Route path="/empleado/lista-citas" exact>
                <Helmet>
                  <meta charset="utf-8"/>
                  <link rel="stylesheet" href="./dist/css/style-lista-citas.css" />
                  <title>Lista de Citas</title>
                </Helmet>
                <ListaCitas />
              </Route>
              <Route path="/empleado/reporte-semanal" exact>
                <Helmet>
                  <meta charset="utf-8"/>
                  <link rel="stylesheet" href="./dist/css/style-reporte-semanal.css" />
                  <title>Lista de Citas</title>
                </Helmet>
                <ReporteSemanal />
              </Route>
              <Route path="/empleado/reporte-mensual" exact>
                <Helmet>
                  <meta charset="utf-8"/>
                  <link rel="stylesheet" href="./dist/css/style-reporte-mensual.css" />
                  <title>Lista de Citas</title>
                </Helmet>
                <ReporteMensual />
              </Route>
              <Route path="/empleado/reporte-anual" exact>
                <Helmet>
                  <meta charset="utf-8"/>
                  <link rel="stylesheet" href="./dist/css/style-reporte-anual.css" />
                  <title>Lista de Citas</title>
                </Helmet>
                <ReporteAnual />
              </Route>
              <Route path="/carrito" exact>
                <Helmet>
                  <meta charset="utf-8"/>
                  <link rel="stylesheet" href="./dist/css/style-carrito.css" />
                  <title>Carrito</title>
                </Helmet>
                <Carrito />
              </Route>
              <Route path="/carrito/informacion" exact>
                <Helmet>
                  <meta charset="utf-8"/>
                  <link rel="stylesheet" href="./dist/css/style-datos-personales.css" />
                  <title>Informacion de Envio</title>
                </Helmet>
                <InformacionEnvio />
              </Route>
              <Route path="/carrito/pagar" exact>
                <Helmet>
                  <meta charset="utf-8"/>
                  <link rel="stylesheet" href="./dist/css/style-index.css" />
                  <title>Pago</title>
                </Helmet>
                <Pago />
              </Route>
              <Route path="/carrito/confirmacion" exact>
                <Helmet>
                  <meta charset="utf-8"/>
                  <link rel="stylesheet" href="./dist/css/style-confirmacion.css" />
                  <title>Confirmacion</title>
                </Helmet>
                <Confirmacion />
              </Route>
              <Route path="/citas" exact>
                <Helmet>
                  <meta charset="utf-8"/>
                  <link rel="stylesheet" href="./dist/css/style-citas.css" />
                  <title>Citas | Tienda | MainServer</title>
                </Helmet>
                <Citas />
              </Route>
              <Route path="/" exact>
                <Helmet>
                  <meta charset="utf-8"/>
                  <link rel="stylesheet" href="./dist/css/style-index.css" />
                  <title>Productos | Tienda | MainServer</title>
                </Helmet>
                <Productos productos={data}/>
              </Route>
              <Route path="/estado-pedido/:idParam" exact>
                <Helmet>
                  <meta charset="utf-8"/>
                  <link rel="stylesheet" href="./dist/css/style-detalle-pedidos.css" />
                  <title>Estado del Pedido | Tienda | MainServer</title>
                </Helmet>
                <EstadoPedido />
              </Route>
              <Route>
                <Helmet>
                  <meta charset="utf-8"/>
                  <link rel="stylesheet" href="./dist/style-index.css" />
                  <title>La pagina que buscaste no existe</title>
                </Helmet>
                <h1>No existe esta pagina</h1>
              </Route>
            </Switch>
          </HashRouter>
      </React.Fragment>
    </StoreContext.Provider>
  )
}

export default App