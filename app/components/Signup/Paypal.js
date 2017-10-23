import React from 'react';
import $ from 'jquery';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import PaypalButton from '../../../signup-app/components/Payment/Button.js';

export default class Payment extends React.Component {
    constructor(props){
        super(props)

    }

    render() {
        const onSuccess = (payment) => {
            // Congratulation, it came here means everything's fine!
            alert("Payment was a success! Your account is set up!")

            // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
        }

        const onCancel = (data) => {
            alert("You cancelled the payment")
        }

        const onError = (err) => {
            // The main Paypal's script cannot be loaded or somethings block the loading of that script!
            alert("An error occured, the payment did not go through.")
            // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
            // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
        }
        let shipping = '1';//shipping address set to 1 (not required)
        let env = 'production'; // you can set here to 'production' for production
        let currency = 'AUD'; // or you can set this value from your props or state
        let total = parseInt(this.props.amount);
        let locale = 'en_AU'
        //let total = {this.props.amount}; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
        // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

        const client = {
            //sandbox:   this.props.token,
            production: this.props.token
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
