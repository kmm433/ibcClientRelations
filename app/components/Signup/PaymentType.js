import React from 'react';
import {Table, Button, ButtonGroup} from 'react-bootstrap';         /*https://react-bootstrap.github.io/*/
import DatePicker from 'react-datepicker';                          /* https://github.com/Hacker0x01/react-datepicker */
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class PaymentType extends React.Component {
    constructor(props){
        super(props)

        console.log("Expiry", this.props.expiry)
        this.state = {
            expiryDate: moment(this.props.expiry)
        }

        this.renderAnnual = this.renderAnnual.bind(this);
        this.renderProrata = this.renderProrata.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePaymentChange = this.handlePaymentChange.bind(this);
    }

    handlePaymentChange(){
        this.props.updatePaymentType(this.props.paymentType, this.props.expiry);
    }

    handleChange(date){
        console.log("Checking date:", moment(date).get('date'))
        this.setState({
            expiryDate: moment(date)
        });
    }

    renderAnnual(){
        return(
            <Button onClick = {this.handlePaymentChange}>
                Switch to ProRata
            </Button>
        )
    }


    renderProrata(){
        return(
            <span>
                <label>
                    The date that memberships will expire is {this.state.expiryDate.format("LLL")}
                </label>
                <DatePicker
                    dateFormat="DD-MM-YYYY"
                    selected={this.state.expiryDate}
                    onChange={this.handleChange}
                 />
                 <Button onClick = {this.handlePaymentChange}>
                    Switch to Annual
                </Button>
            </span>
        )
    }

    render(){
        return(
            <div>
                Your payment type is currently set to: {this.props.paymentType}
                {this.props.paymentType === "Annual" ? this.renderAnnual() : this.renderProrata()}

            </div>
        )
    }
}

export default PaymentType;
