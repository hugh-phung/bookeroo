import React from 'react'
import { useRef, useEffect } from 'react'
import PayPalExpressBtn from 'react-paypal-express-checkout'
import axios from 'axios'
import { Success } from './Success'

export const PayPal = ({sessionUser, cartData, markItemsAsSold, checkout, calculatedPrice, clearCart}) => {

    const onSuccess = async (payment) => {
        console.log("Passing throguh session user", sessionUser)
        console.log('The payment was successful!', payment);
        await checkout(sessionUser)
        // await markItemsAsSold(cartData)
        await clearCart()

    }

    const onCancel = (data) => {
        console.log("The payment was cancelled", data);
    }

    const onError = (err) => {
        console.log("Error: ", err);
    }

    let env = 'sandbox';
    let currency = 'AUD'
    let total = calculatedPrice

    const client = {
        sandbox: 'AaDJo-1H7tjLan83IPe1cwaTro-zI_Gn-_o_ds8T7SV-sB1sQRS87EwhqjcSW_R_hVjVX3ETE4Xoa6se'
    }




    return (
        <PayPalExpressBtn
         env={env}
         client={client}
         currency={currency}
         total={total}
         onError={onError}
         onSuccess={onSuccess}
         onCancel={onCancel}
         />

    )
    
}
