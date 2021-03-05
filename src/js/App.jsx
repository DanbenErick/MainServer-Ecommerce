import React, { useState } from 'react'
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

// Data Inicial
import data from '../database/data'

//Context
import StoreContext from './context'

const App = () => {

  const [carrito, setCarrito] = useState([])

  const addCarrito = (producto) => {
    setCarrito(prevCarrito => [...prevCarrito, producto])
  }

  return (
    <StoreContext.Provider value={{carrito, addCarrito}}>
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
              <Route path="/carrito" exact>
                <Carrito />
              </Route>
              <Route path="/citas" exact>
                <Citas />
              </Route>
              <Route path="/confirmacion" exact>
                <Confirmacion />
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