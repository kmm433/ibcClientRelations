import React from 'react';
import {ButtonGroup, DropdownButton, Button, MenuItem} from 'react-bootstrap';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import InvoiceStore from '../../Stores/InvoiceStore.js';
import * as InvoiceActions from '../../Actions/InvoiceActions.js';


class InvoiceCreator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: null,
      list_item: null,
      due_date: '',
      created_invoice: null,
    };
    this.updateValues = this.updateValues.bind(this);
    this.updateListItem = this.updateListItem.bind(this);
    this.handleCreateInvoice = this.handleCreateInvoice.bind(this);
    this.updateDueDate = this.updateDueDate.bind(this);

    moment.locale('en-au');
  }

  componentWillMount() {
    InvoiceStore.on('change', this.updateValues);
    InvoiceActions.fetchItems();
  }

  componentWillUnmount() {
    InvoiceStore.removeListener('change', this.updateValues);
  }

  updateValues() {
    this.setState({
      items: InvoiceStore.getItems(),
      created_invoice: InvoiceStore.getCreatedInvoice(),
    });
  }

  updateListItem(item) {
    this.setState({
      list_item: item,
    });
  }

  handleCreateInvoice() {
    const firstname = this.props.details.firstname;
    const lastname = this.props.details.lastname;
    const email = this.props.details.email;
    const listItem = this.state.list_item;
    const date = this.state.due_date;
    if(listItem) {
      var dueDate = [];
      dueDate.push(date.format('YYYY'));
      dueDate.push(date.format('MM'));
      dueDate.push(date.format('DD'));
      InvoiceActions.createNewInvoice(firstname, lastname, email, listItem, dueDate);
    }
  }

  updateDueDate(date) {
    this.setState({
      due_date: date,
    });
  }

  render() {
    return (
      <div id='invoice-creator'>
        <div className='form-inline'>
          <div className='input-group'>
            <InvoiceItems items={this.state.items} updateListItem={this.updateListItem} />
          </div>
          <div className='input-group'>
            <DatePicker id='due-date-picker'
              selected={this.state.due_date}
              onChange={this.updateDueDate}
              placeholderText='Invoice Due Date'
            />
          </div>
          <div className='input-group'>
            <input id='create-invoice-btn'
              type='button'
              className='btn btn-primary'
              value='Create Invoice'
              onClick={() => this.handleCreateInvoice()}
            />
          </div>
        </div>
        <CreatedInvoiceNotice invoice={this.state.created_invoice} />
      </div>
    );
  }
};


class InvoiceItems extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected : null
    };
    this.renderOptions = this.renderOptions.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  renderOptions() {
    const items = this.props.items;
    var options = null;
    if (items) {
      options = items.map((item) => {
        return (
          <MenuItem
              key = {item.ItemID}
              eventKey={item}>
              {item.Name}
          </MenuItem>)
      });
    }
    return options;
  }

  handleSelect(selected) {
    this.setState({selected: selected.Name});
    this.props.updateListItem(selected);
  }

  render() {
    return (
      <ButtonGroup>
          <DropdownButton
              id="dropdown-btn"
              bsSize="sm"
              title={this.state.selected ? this.state.selected : 'Select Invoice Item'}
              onSelect={this.handleSelect}>
          {this.renderOptions()}
          </DropdownButton>
        </ButtonGroup>
    );
  }
};


class CreatedInvoiceNotice extends React.Component {
  render() {
    if (this.props.invoice) {
      return (
        <div id='created-invoice-notice' className='alert alert-info'>
          <p>A new invoice has been created.</p>
          <p><a href={'/php/xero_invoice.php?operation=download_invoice&invoice_number=' + this.props.invoice.InvoiceNumber}>
            Click here to download a copy as a PDF
          </a></p>
          <p><a href={'https://go.xero.com/AccountsReceivable/View.aspx?InvoiceID=' + this.props.invoice.InvoiceID} target='_blank'>
            Click here to manage the invoice on Xero
          </a></p>
        </div>
      );
    }
    else return null;
  }
};


export default InvoiceCreator;
