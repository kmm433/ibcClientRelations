import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import * as InvoiceActions from '../../Actions/InvoiceActions.js';

class InvoicePaidOptions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expiry_date: null,
    };

    this.getNewExpiryDate = this.getNewExpiryDate.bind(this);
    this.updateExpiryDate = this.updateExpiryDate.bind(this);

    moment.locale('en-au');
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      expiry_date: this.getNewExpiryDate(nextProps.recent_payment, nextProps.renewal_policy),
    });
  }

// TODO: Calculate the new expiry date based on the renewal policy and whether the member has already expired...
  getNewExpiryDate(dateParts, policy) {
    return moment();
  }

  updateExpiryDate(date) {
    this.setState({
      expiry_date: date,
    });
  }

  render() {
    const recent_payment = this.props.recent_payment;
    console.log(this.props);
    if (recent_payment) {
      return (
        <div id='invoice-paid-options' className='alert alert-info'>
          <p>It appears that this member has recently made a payment. Would you like to extend their membership?</p>
          <div className='form-inline'>
            <div className='input-group'>
              <DatePicker id='expiry-date-picker'
                selected={this.state.expiry_date}
                onChange={this.updateExpiryDate}
                placeholderText='New Expiry Date'
              />
            </div>
            <div className='input-group'>
              <input className='btn btn-primary'
                type='button'
                value='Update Membership Expiry'/>
            </div>
          </div>
        </div>
      );
    }
    else return null;
  }
};

export default InvoicePaidOptions;
