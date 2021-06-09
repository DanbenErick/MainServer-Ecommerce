import React from 'react'
import PaypalCheckoutButton from '../components/PaypalCheckoutButton.jsx'


const Pago = () => {

  const order= {
    customer: '123456',
    total: '20.00',
    items:[ 
      {
        sku: '123',
        name: 'Camisa ReactJS',
        price: '251.00',
        quantity: 2,
        currency: 'USD'
      },
      {
        sku: '12',
        name: 'Camisa JS',
        price: '251.00',
        quantity: 2,
        currency: 'USD'
      },
      {
        sku: '1243',
        name: 'Camisa Pipm',
        price: '251.00',
        quantity: 2,
        currency: 'USD'
      },
    ]
  }
  return (
    <>
      <section>
        <PaypalCheckoutButton
            order={order}
        />
      </section>
    </>
  )
}

export default Pago
