import React from 'react';
import InvoiceStore from '../Stores/InvoiceStore.js';
import * as InvoiceActions from '../Actions/InvoiceActions.js';
import InvoiceCreator from './InvoiceManagement/InvoiceCreator.js';
import InvoiceList from './InvoiceManagement/InvoiceList.js';

class InvoiceManagement extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      invoices: null,
      details: null,
      invoice_creator: false,
      connection: true,
      renewal_policy: null,
    };
    this.updateValues = this.updateValues.bind(this);
    this.toggleInvoiceCreator = this.toggleInvoiceCreator.bind(this);
  }

  componentWillMount() {
    InvoiceStore.on('change', this.updateValues);
    InvoiceActions.fetchUserDetails(this.props.match.params.user_id);
    InvoiceActions.fetchInvoices();
    InvoiceActions.fetchRenewalPolicy();
    InvoiceActions.initialConnection();
  }

  componentWillUnmount() {
    InvoiceStore.removeListener('change', this.updateValues);
  }

  updateValues() {
    this.setState({
      invoices: InvoiceStore.getInvoices(),
      details: InvoiceStore.getDetails(),
      connection: InvoiceStore.getConnection(),
      renewal_policy: InvoiceStore.getRenewalPolicy(),
    });
  }

  toggleInvoiceCreator() {
    this.setState({invoice_creator: !this.state.invoice_creator});
  }

  render() {
    if (this.props.user_type !== '1') {
      return (
        <div className='main-component'>
          <p>Error: Access not permitted.</p>
        </div>
      );
    }
    else {
      return (
        <div className='main-component w3-row' id='invoice-management'>
          <div className='w3-col s12'>
            <div className='w3-container w3-card-4 w3-light-grey'>
              <h2>Invoice Management</h2>
              <input type='button'
                className='btn btn-primary'
                value={this.state.invoice_creator ? 'Cancel Create Invoice' : 'Create New Invoice' }
                onClick={() => this.toggleInvoiceCreator()}
              />
              {!this.state.connection ?
                  <a className='btn btn-primary'
                    href={'/php/xero_invoice.php?user_id=' + this.props.match.params.user_id}>
                    Reconnect to Xero
                  </a>
                  : null
              }
              {this.state.invoice_creator ? <InvoiceCreator details={this.state.details} /> : null}
              <InvoiceList
                invoices={this.state.invoices}
                details={this.state.details}
                user_id={this.props.match.params.user_id}
                renewal_policy={this.state.renewal_policy}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default InvoiceManagement;
