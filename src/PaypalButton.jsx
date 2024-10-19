import React, { useEffect } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount }) => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: "USD",
      },
    });
  }, [dispatch, options]);

  return (
    <>
      { isPending ? <div>Loading...</div> : null }
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount,
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            const name = details.payer.name.given_name;
            alert(`Transaction completed by ${name}`);
            // Here you can call your backend to save the transaction
          });
        }}
      />
    </>
  )
}

export default PayPalButton;