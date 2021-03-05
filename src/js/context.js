import React from 'react'

const StoreContext = React.createContext({
  carrito: [],
  addCarrito: (producto) => { }
})

export default StoreContext