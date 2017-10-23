import $ from 'jquery';
import dispatcher from '../dispatcher.js';


// Used to retrieve all existing invoices from Xero
export function fetchInvoices() {
  $.ajax({
    url: "/php/xero_invoice.php?operation=fetch_invoices",
    type: 'POST',
    dataType: 'json',
    success: result => {
      var invoices = [];
      for (var invoice in result) {
        invoices.push(result[invoice]);
      };
      dispatcher.dispatch({
        type: 'RETRIEVED_INVOICES',
        invoices: invoices,
      });
    },
    error: result => {
      if (JSON.stringify(result.responseText).indexOf('UnauthorizedException') !== -1) {
        unsetSession();
      }
    }
  });
}

// Used to retrieve all possible invoicable items from Xero
export function fetchItems() {
  $.ajax({
    url: "/php/xero_invoice.php?operation=fetch_items",
    type: 'POST',
    dataType: 'json',
    success: result => {
      var items = [];
      for (var item in result) {
        items.push(result[item]);
      };
      dispatcher.dispatch({
        type: 'RETRIEVED_ITEMS',
        items: items,
      });
    },
    error: result => {
      if (JSON.stringify(result.responseText).indexOf('UnauthorizedException') !== -1) {
        unsetSession();
      }
    }
  });
}

// Used to create a new invoice on Xero
export function createNewInvoice(firstname, lastname, email, listItem, dueDate) {
  $.ajax({
    url: "/php/xero_invoice.php?operation=create_invoice",
    type: 'POST',
    dataType: 'json',
    data: {
      first_name: firstname,
      last_name: lastname,
      email_address: email,
      item_id: listItem.ItemID,
      unit_price: listItem.SalesDetails.UnitPrice,
      item_code: listItem.Code,
      item_description: listItem.Name,
      due_date: dueDate,
    },
    success: result => {
      if (result.status === 200) {
        fetchInvoices();
        dispatcher.dispatch({
          'type': 'INVOICE_CREATED',
          'invoice': result.value,
        });
      }
    },
    error: result => {
      if (JSON.stringify(result.responseText).indexOf('UnauthorizedException') !== -1) {
        unsetSession();
      }
    }
  });
}

// Retrieves data from the database to use when filling out an invoice
export function fetchUserDetails(userId) {
  $.ajax({
    url: "/php/get_member_invoice_data.php",
    type: 'POST',
    dataType: 'json',
    data: {
      user_id: userId,
    },
    success: result => {
      if(result.status == 200)
        dispatcher.dispatch({
          type: 'RETRIEVED_USER_DETAILS',
          details: result.value,
        });
      else {
        alert(JSON.stringify(result));
      }
    }
  });
}

// Determines what type of reneal policy this chamber has, such as annual or pro-rata
export function fetchRenewalPolicy() {
  $.ajax({
    url: "/php/get_renewal_policy.php",
    type: 'POST',
    dataType: 'json',
    success: result => {
      if(result.status == 200)
        dispatcher.dispatch({
          type: 'RETRIEVED_RENEWAL_POLICY',
          policy: result.value,
        });
      else {
        alert(result.value);
      }
    }
  });
}

// Retireves a user's expiry date from the database
export function fetchExpiryDate(userId) {
  $.ajax({
    url: "/php/get_member_expiry_date.php",
    type: 'POST',
    dataType: 'json',
    data: {
      user_id: userId,
    }, success: result => {
      dispatcher.dispatch({
        type: 'RETRIEVED_EXPIRY_DATE',
        date: result.value,
      });
    }
  });
}

// Updates a member's expiry date in the database
export function updateExpiryDate(userId, date) {
  $.ajax({
    url: "/php/update_member_expiry_date.php",
    type: 'POST',
    dataType: 'json',
    data: {
      user_id: userId,
      date: date,
    }, success: result => {
      if (result.status === 200)
        alert('Successfully updated membership expiry date.');
      else
        alert(result.value);
    }
  });
}

// When the Xero session has expired some variables will need to be unset an the user alerted
export function unsetSession() {
  $.ajax({
    url: "/php/xero_invoice.php?operation=unset_session",
    type: 'POST',
    success: result => {
      alert('Connection to Xero has been lost, you will need to reconnect.');
      dispatcher.dispatch({
        type: 'CONNECTION_CHANGE',
        connection: false,
      });
    },
    error: result => {
      alert('Error: ' + JSON.stringify(result));
    }
  });
}

// When the page is first visited we probably have a conneciton,
// so set the connection default in case the page is reloaded.
export function initialConnection() {
  dispatcher.dispatch({
    type: 'CONNECTION_CHANGE',
    connection: true,
  });
}
