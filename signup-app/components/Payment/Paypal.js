import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import PaypalButton from './Button.js';

export default class Payment extends React.Component {
    constructor(props){
        super(props)
        console.log("payment getting", this.props.amount, this.props.token)
    }
    render() {
        const onSuccess = (payment) => {
            // Congratulation, it came here means everything's fine!
            console.log("The payment was succeeded!", payment);

            $.ajax({url: '/php/approve_payment.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    'userid': this.props.userid,
                    'amount': this.props.amount
                },
            success: response => {
              console.log('Ajax call occured', response);
              if(confirm("Successful payment, thank you for joining!")){
                  window.location.href = "/signin.php";
              }

            },
            error: (xhr, status, err) => {
                console.log("error",xhr, status, err)
                ("An error occured")
            }});
            // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
        }

        const onCancel = (data) => {
            // User pressed "cancel" or close Paypal's popup!
            console.log('The payment was cancelled!', data);
            // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
        }

        const onError = (err) => {
            // The main Paypal's script cannot be loaded or somethings block the loading of that script!
            console.log("Error!", err);
            alert("An error occured, the payment did not go through.")
            // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
            // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
        }
        let shipping = '1';//shipping address set to 1 (not required)
        let env = 'sandbox'; // you can set here to 'production' for production
        let currency = 'AUD'; // or you can set this value from your props or state
        let total = this.props.amount;
        let locale = 'en_AU'
        //let total = {this.props.amount}; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
        // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

        const client = {
            sandbox:   this.props.token,
            production: 'YOUR-PRODUCTION-APP-ID',
        }
        // In order to get production's app-ID, you will have to send your app to Paypal for approval first
        // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
        //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
        // For production app-ID:
        //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/

        // . You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
        return (
            <PaypalButton
                env={env}
                client={client}
                currency={currency}
                total={this.props.amount}
                onError={onError}
                onSuccess={onSuccess}
                onCancel={onCancel}
                locale = {locale}/>
        );
    }
}
