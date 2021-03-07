import React from 'react'
import {PayPalButton} from 'react-paypal-button-v2'

const Pago = () => {
  return (
    <>
      <section>
      <PayPalButton
          amount="10.00"
          currency="USD"
          option={{
            clientId: "AX9cSMTq1KMs1dJXT9TMkM1LnxhNGn65rIiDpK4CaixTaY7R2GRMkLKZzvDJ6T_HflCDTy3ccUSV3h-b"
          }}
        />
      </section>
    </>
  )
}

export default Pago