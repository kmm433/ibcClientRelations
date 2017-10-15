import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import $ from 'jquery';
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
    this.handleUpdateExpiry = this.handleUpdateExpiry.bind(this);

    moment.locale('en-au');
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      expiry_date: this.getNewExpiryDate(nextProps.recent_payment, nextProps.renewal_policy, nextProps.expiry_date),
    });
  }

  getNewExpiryDate(dateParts, policy, expiry_date) {
    var newDate = moment();
    if (policy && policy.type === 'Annual') {
      if (dateParts && expiry_date) {
        var expiry = moment(expiry_date);
        if (expiry < newDate) {
          newDate = moment(dateParts[0]+'/'+dateParts[1]+'/'+dateParts[2], 'YYYY/MM/DD').add(1, 'years');
        }
        else {
          newDate = expiry.add(1, 'years');
        }
      }
    }
    else if(policy) {
        newDate = moment(policy.expiry_date);
    }
    return newDate;
  }

  updateExpiryDate(date) {
    this.setState({
      expiry_date: date,
    });
  }

  handleUpdateExpiry() {
    InvoiceActions.updateExpiryDate(this.props.user_id, this.state.expiry_date.format());
    $('#invoice-paid-options').fadeOut('slow');
  }

  render() {
    const recent_payment = this.props.recent_payment;
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
                value='Update Membership Expiry'
                onClick={this.handleUpdateExpiry}
              />
            </div>
          </div>
        </div>
      );
    }
    else return null;
  }
};

export default InvoicePaidOptions;
