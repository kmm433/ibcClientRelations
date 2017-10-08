import React from 'react';
import InvoiceListItem from './InvoiceListItem.js';
import InvoicePaidOptions from './InvoicePaidOptions.js';

class InvoiceList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recent_payment: null,
    };
    this.renderInvoices = this.renderInvoices.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const invoices = nextProps.invoices;
    const details = nextProps.details;
    if (invoices) {
      invoices.forEach(invoice => {
        if(invoice.Contact.Name === details.firstname + ' ' + details.lastname) {
          // Check if the invoice has been recently paid (last 40 days)
          if (invoice.DueDate && invoice.Status === 'PAID') {
            var dateParts = invoice.FullyPaidOnDate.split('-');
            var paidDate = new Date(dateParts[0], dateParts[1] - 1 , dateParts[2]);
            var margin = new Date();
            margin.setDate(margin.getDate() - 40);
            if (paidDate > margin) {
              this.setState({recent_payment: dateParts});
            }
          }
        }
      });
    }
  }

  renderInvoices() {
    const details = this.props.details;
    const invoices = this.props.invoices;
    var invoiceParagraphs = null;
    if (invoices) {
      invoiceParagraphs = invoices.map((invoice, index) => {
        if(this.props.details) {
          if(invoice.Contact.Name === details.firstname + ' ' + details.lastname) {
            return(
              <InvoiceListItem key={index} invoice={invoice} />
            );
          }
        } else {
          return(
            <InvoiceListItem key={index} invoice={invoice} />
          );
        }
      });
    }
    return invoiceParagraphs;
  }

  render() {
    const details = this.props.details;
    return (
      <div id='invoice-list'>
        <InvoicePaidOptions
          recent_payment={this.state.recent_payment}
          user_id={this.props.user_id}
          renewal_policy={this.props.renewal_policy}
        />
        <h3>{'Existing Invoices' + (details ? ' For ' + details.firstname + ' ' + details.lastname : null)}</h3>
        <p>Click an invoice to dowload a copy.</p>
        <div className='invoice-table'>
          <div className='invoice-table-headers'>
            <div className='invoice-table-title'>Invoice Number</div>
            <div className='invoice-table-title'>Date</div>
            <div className='invoice-table-title'>Due Date</div>
            <div className='invoice-table-title'>Amount Due</div>
            <div className='invoice-table-title'>Status</div>
          </div>
          {this.renderInvoices()}
        </div>
      </div>
    );
  }
};

export default InvoiceList;
