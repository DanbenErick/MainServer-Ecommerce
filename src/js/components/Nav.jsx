import React, { useContext } from 'react'
import { BrowserRouter, Switch,Route,Link} from "react-router-dom";
import StoreContext from '../context'
const Nav = () => {
  const context = useContext(StoreContext)
  return (
    // <BrowserRouter>
      <nav>
        <ul>
          <li><img src="dist/img/videogame.svg" alt="" /> MainServerPeru</li>
          <li>
            <Link to="/"><img src="dist/img/box.svg" alt="" /> Productos</Link>
            <Link to="/citas"><img src="dist/img/cita.svg" alt="" /> Citas</Link>
            <Link to="/carrito"><img src="dist/img/bag.svg" alt="" /> {context.carrito.length + 1}</Link>
          </li>
        </ul>
      </nav>
    // </BrowserRouter>
  )
}

export default Nav