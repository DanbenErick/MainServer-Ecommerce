import React, { useState, useContext } from 'react'
import { HashRouter, Switch,Route,Link, BrowserRouter, useParams} from "react-router-dom";

//Componentes
import Nav from './components/Nav.jsx'
import Header from './components/Header.jsx'

//Paginas
import Productos from './pages/Productos.jsx'
import Citas from './pages/Citas.jsx'
import Carrito from './pages/Carrito.jsx'
import Confirmacion from './pages/Confirmacion.jsx'
import Detalles from './pages/Detalles.jsx'
import InformacionEnvio from './pages/InformacionEnvio.jsx'
import Pago from './pages/Pago.jsx'
import RegistrarProducto from './pages/RegistrarProducto.jsx';

// Data Inicial
import data from '../database/data'

//Context
import StoreContext from './context'

const App = () => {

  const [carrito, setCarrito] = useState([])
  const [cliente, setCliente] = useState({})

  const context = useContext(StoreContext)

  const addCarrito = (producto) => {
    setCarrito(prevCarrito => [...prevCarrito, producto])
  }

  const addCliente = (cliente) => {
    context.cliente = cliente
    console.log("ADD Cliente", context)
    setCliente(prevCliente => cliente)
  }

  const removeCarrito = (index) => {
    let carritos = carrito
    carritos.splice(index, 1)
    setCarrito(carritos)
    // console.log(carritos)
  }

  return (
    <StoreContext.Provider value={{carrito, cliente, addCarrito, removeCarrito, addCliente}}>
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
              <Route path="/usuario">
              </Route>
              <Route path="/usuario/registrar-producto">
                <RegistrarProducto />
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
            </Switch>
          </HashRouter>
      </React.Fragment>
    </StoreContext.Provider>
  )
}

export default App