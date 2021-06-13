import React from 'react'

const StoreContext = React.createContext({
  carrito: [],
  cliente: {},
  token: null,
  pago: false,
  truePago: () => {},
  falsePago: () => {},
  addCarrito: (producto) => {},
  removeCarrito: (index) => {},
  addCliente: (cliente) => {},
  addToken: (token) => {},
  removeCliente : () =>{}
})

export default StoreContext