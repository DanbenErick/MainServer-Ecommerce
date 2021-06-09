import React from 'react'
import ReactDOM from 'react-dom'
import paypal from 'paypal-checkout'



const PaypalCheckoutButton = ({ order }) => {

  const paypalConf = {
    currency: "USD",
    env: 'sandbox',
    client: {
      sandbox: 'AX9cSMTq1KMs1dJXT9TMkM1LnxhNGn65rIiDpK4CaixTaY7R2GRMkLKZzvDJ6T_HflCDTy3ccUSV3h-b',
      production: '-- id --'
    },
    style: {
      label: 'pay',
      size: 'medium',
      shape: 'rect',
      color: 'blue'
    }
  }

  const PayPalButton = paypal.Button.driver('react', {
    React, ReactDOM
  })

  const payment = (data, actions) => {
    const payment = {
      transactions: [
        {
          amount: {
            total: order.total,
            currency: paypalConf.currency
          },
          description: 'Compra en Test App',
          custom: order.customer || '',
          item_list: {
            items: order.items
          }
        }
      ],
      note_to_payer: 'Contactanos para cualquier aclaracion'
    }
    return actions.payment.create({ payment })
  }

  const onAuthorize = (data, actions) => {
    return actions.payment.execute()
    .then(response => {
      console.log(response)
      alert('El pago fue procesado correctamente, ID:', response.id)
    })
    .catch(error => {
      console.log(error)
      alert('Ocurrio un error al procesar el pago con PayPal')
    })
  }
  const onError = (error) => {
    console.log(error)
    alert('EL pago no fue realizado')
  }
  const onCancel = (data, actions) => {
    alert('pago no realizado, el usuario cancelo el proceso')
  }

  return (
    <>
        <PayPalButton
          env={paypalConf.env}
          client={paypalConf.client}
          payment={(data, actions) => payment(data, actions)}
          onAuthorize={(data, actions) => onAuthorize(data, actions)}
          onCancel={(data, actions) => onCancel(data, actions)}
          onError={(error) => onError(error)}
          style={paypalConf.style}
          commit
          locale="es_MX"
        />
    </>
  )
}

export default PaypalCheckoutButton