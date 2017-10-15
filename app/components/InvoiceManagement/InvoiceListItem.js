import React from 'react';
import moment from 'moment';
import * as InvoiceActions from '../../Actions/InvoiceActions.js';

class InvoiceListItem extends React.Component {

  constructor(props) {
    super(props);
    this.determinePaymentStatus = this.determinePaymentStatus.bind(this);
  }

  determinePaymentStatus() {
    // Check if the invoice has been paid or not
    if (this.props.invoice.AmountDue === '0') {
      return ' alert alert-success';
    }
    else if (this.props.invoice.DueDate < moment().format('YYYY-MM-DD')) {
      return ' alert alert-danger';
    }
    else {
      return '';
    }
  }

  render() {
    return (
      <a className={'invoice-list-item' + this.determinePaymentStatus()}
        href={'/php/xero_invoice.php?operation=download_invoice&invoice_number=' + this.props.invoice.InvoiceNumber}
      >
        <div className='invoice-list-item-cell'>{this.props.invoice.InvoiceNumber}</div>
        <div className='invoice-list-item-cell'>{this.props.invoice.Date}</div>
        <div className='invoice-list-item-cell'>{this.props.invoice.DueDate}</div>
        <div className='invoice-list-item-cell'>${this.props.invoice.AmountDue}</div>
        <div className='invoice-list-item-cell'>{this.props.invoice.Status}</div>
      </a>
    );
  }
};

export default InvoiceListItem;
