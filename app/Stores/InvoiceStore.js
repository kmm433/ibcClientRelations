import {EventEmitter} from 'events';
import dispatcher from '../dispatcher.js';

class InvoiceStore extends EventEmitter {

  constructor() {
    super();
    this.invoices = null;
    this.items = null;
    this.details = null;
    this.connection = true;
    this.createdInvoice = null;
    this.renewalPolicy = null;
  }

  // Allows for the invoices to be retrieved
  getInvoices() {
    return this.invoices;
  }

  // Allows for the sales items to be retrieved
  getItems() {
    return this.items;
  }

  // Allows for the user's details to be retrieved
  getDetails() {
    return this.details;
  }

  // Allows for the chambers renewal policy to be retrieved
  getRenewalPolicy() {
    return this.renewalPolicy;
  }

  // Allows for the details of a created invoice to be retrieved
  getCreatedInvoice() {
    return this.createdInvoice;
  }

  // Allows for the connection to xero to be checked
  getConnection() {
    return this.connection;
  }

  // Updates the current list of invoices
  updateInvoices(invoices) {
    this.invoices = invoices;
    this.emit('change');
  }

  // Updates the current list of slases items
  updateItems(items) {
    this.items = items;
    this.emit('change');
  }

  // Updates the current user details
  updateUserDetails(details) {
    this.details = details;
    this.emit('change');
  }

  // Updates the chamber's renewal policy
  updateRenewalPolicy(policy) {
    this.renewalPolicy = policy;
  }

  // Updates the details of the newly created invoice
  updateCreatedInvoice(invoice) {
    this.createdInvoice = invoice;
    this.emit('change');
  }

  // Updates the current connection status
  updateConnection(connection) {
    this.connection = connection;
    this.emit('change');
  }

  // The handler for any fired actions
  handleDispatchedActions(action) {
    switch(action.type) {
      case 'RETRIEVED_INVOICES': {
        this.updateInvoices(action.invoices);
        break;
      }
      case 'RETRIEVED_ITEMS': {
        this.updateItems(action.items);
        break;
      }
      case 'RETRIEVED_USER_DETAILS': {
        this.updateUserDetails(action.details);
        break;
      }
      case 'RETRIEVED_RENEWAL_POLICY': {
        this.updateRenewalPolicy(action.policy);
      }
      case 'INVOICE_CREATED': {
        this.updateCreatedInvoice(action.invoice);
        break;
      }
      case 'CONNECTION_CHANGE': {
        this.updateConnection(action.connection);
        break;
      }
    }
  }

};

const invoiceStore = new InvoiceStore;
dispatcher.register(invoiceStore.handleDispatchedActions.bind(invoiceStore));
export default invoiceStore;
