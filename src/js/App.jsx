import React, { useState, useContext } from 'react'
import { HashRouter, Switch,Route,Link, BrowserRouter, useParams} from "react-router-dom";

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
    // console.log(carritos)
  }

  return (
    <StoreContext.Provider value={{carrito, cliente, addCarrito, removeCarrito, addCliente, token, addToken}}>
      <React.Fragment>
          <HashRouter>
            <Nav />
            <Switch>
              <Route path="/productos" exact>
                <Productos productos={data}/>
              </Route>
              <Route path="/productos/detalles/:idParam" exact >
                <Detalles />
              </Route>
              <Route path="/empleado" exact>
                <Empleado />
              </Route>
              <Route path="/empleado/perfil" exact>
                <Perfil />
              </Route>
              <Route path="/empleado/registrar-producto" exact>
                <RegistrarProducto />
              </Route>
              <Route path="/empleado/pedidos" exact>
                <Pedidos />
              </Route>
              <Route path="/empleado/pedidos/:id" exact>
                <PedidoDetalle />
              </Route>
              <Route path="/empleado/lista-citas" exact>
                <ListaCitas />
              </Route>
              <Route path="/carrito" exact>
                <Carrito />
              </Route>
              <Route path="/carrito/informacion" exact>
                <InformacionEnvio />
              </Route>
              <Route path="/carrito/pagar" exact>
                <Pago />
              </Route>
              <Route path="/carrito/confirmacion" exact>
                <Confirmacion />
              </Route>
              <Route path="/citas" exact>
                <Citas />
              </Route>
              <Route path="/" exact>
                <Productos productos={data}/>
              </Route>
              <Route>
                <h1>No existe esta pagina</h1>
              </Route>
            </Switch>
          </HashRouter>
      </React.Fragment>
    </StoreContext.Provider>
  )
}

export default App