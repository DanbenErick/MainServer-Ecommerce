import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import ReactDOM from 'react-dom'
import paypal from 'paypal-checkout'
import StoreContext from '../context'
import { ContextConsumer } from 'react-is'


const PaypalCheckoutButton = ({ order, informacion }) => {

  const history = useHistory()
  const context = useContext(StoreContext)
  const paypalConf = {
    currency: "USD",
    env: 'sandbox',
    client: {
      sandbox: 'AbwHN_BpiTM60KMPXWjdq-_NUdLWD3B7AsQ2S3iynJSb8LSMQ-FyijzmOaTy7FN-fKhKmuKV8p3iZ95c',
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
      context.truePago()
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