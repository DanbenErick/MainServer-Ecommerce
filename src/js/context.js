import React from 'react'

const StoreContext = React.createContext({
  carrito: [],
  cliente: {},
  addCarrito: (producto) => { },
  removeCarrito: (index) => {},
  addCliente: (cliente) => {},
  removeCliente : () =>{}
})

export default StoreContext