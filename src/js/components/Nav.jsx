import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

const Nav = () => {
  const [ menu, setMenu ] = useState('none')
  const showMenu = () => {
    menu == 'none' ? setMenu('flex') : setMenu('none')
  }

  useEffect(() => {
    window.innerWidth > 480 ? setMenu('flex') : setMenu('none')
  }, [])

  return (
      <nav>
        <ul>
          <li>
            <span><img src="dist/img/videogame.svg" /> MainServerPeru</span>
            <button className="menu-boton" onClick={showMenu}>Menu</button>
          </li>
          <li className="items-menu" style={{ display: menu }}>
            <Link to="/"><img src="dist/img/box.svg" alt="" /> Productos</Link>
            <Link to="/citas"><img src="dist/img/cita.svg" alt="" /> Citas</Link>
            <Link to="/carrito"><img src="dist/img/bag.svg" alt="" /></Link>
          </li>
        </ul>
      </nav>
  )
}

export default Nav