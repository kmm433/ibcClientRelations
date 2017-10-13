import $ from 'jquery';
import dispatcher from '../dispatcher.js';

// Allows for a provided Xero Key and Secret to be submitted to the database
export function updateXeroAPIKeys(xeroKey, xeroSecret) {
  $.ajax({
    url: "/php/update_xero_api_keys.php",
    type: 'POST',
    data: {
      'consumer_key': xeroKey,
      'consumer_secret': xeroSecret,
    }, success: result => {
      alert('Xero connection details have been updated.');
    }, error: result => {
      console.log(result);
    }
  });
}

// Allows for the Xero callback domain to be retrieved for invoices
export function fetchXeroInoviceCallbackDomain() {
  console.log('Fetching callback domain.');
  $.ajax({
    url: "/php/get_xero_invoice_callback_domain.php",
    type: 'POST',
    dataType: 'json',
    success: result => {
      if (result.status === 200) {
        console.log('domain is: ', result.value);
        dispatcher.dispatch({
          'type': 'RETRIEVED_XERO_INVOICE_CALLBACK_DOMAIN',
          'domain': result.value['domain'],
        });
      }
      else
        alert(result.value);
    }, error: result => {
      console.log('Strange error occurred: ', result);
    }
  });
}

// Allows for the chamber member's to be retrieved from the database
export function fetchChamberMembers() {
  $.ajax({
    url: "/php/get_chamber_members.php",
    dataType: 'json',
    success: result => {
      if (result.status === 200) {
        dispatcher.dispatch({
          type: 'RETRIEVED_CHAMBER_MEMBERS',
          members: result.value,
        });
        filterMembers(result.value, '');
      }
      else {
        alert(result.value);
      }
    }
  });
}

// Allows for the members to be filtered by a search phrase
// and organises them into archived, renewals and default
export function filterMembers(members, searchPhrase) {
  var filteredMembers = [];
  if(searchPhrase !== '') {
    members.forEach((member) => {
      var foundSearchPhrase = false;
      for(var property in member) {
        if(member[property] && member[property].indexOf(searchPhrase) !== -1){
          foundSearchPhrase = true;
        }
      }
      if (foundSearchPhrase)
        filteredMembers.push(member);
    });
  }
  else {
    filteredMembers = members;
  }
  // Seperate the members into current, renewal and archived
  var currentMembers = [];
  var renewalMembers = [];
  var archivedMembers = [];
  var warningWindow = new Date();
  warningWindow.setDate(warningWindow.getDate() + 14);
  filteredMembers.forEach((member) => {

    // Splice the datestring into a usable date object
    var expiryString = member['expiry'];
    var expiryDateComponents;
    var expiryDate = null;
    if (expiryString) {
      var date = expiryString.split(' ');
      expiryDateComponents = date[0].split('-');
      expiryDate = new Date(expiryDateComponents[0], parseInt(expiryDateComponents[1]) - 1, expiryDateComponents[2]);
    }

    // Add the member to their respective group
    if (member['archived'] === '1')
      archivedMembers.push(member);
    else {
      currentMembers.push(member);
      // Check if membership is about to expire
      if(expiryDate && (expiryDate < warningWindow)){
        renewalMembers.push(member);
      }
    }
  });
  dispatcher.dispatch({
    type: 'FILTERED_MEMBERS',
    member_list: currentMembers,
    member_list_renewals: renewalMembers,
    member_list_archived: archivedMembers,
    num_all: currentMembers.length,
    num_renewals: renewalMembers.length,
    num_archived: archivedMembers.length,
  });
}

// Allows for the submission of a new note to the database
export function submitNote(memberId, note) {
  if(note !== '') {
    $.ajax({
      url: "/php/add_note.php",
      type: 'POST',
      dataType: 'json',
      data: {
        'memberID': memberId,
        'note': note
      }, success: result => {
        alert('The note was successfully recorded.');
        fetchNotes(memberId);
      }
    });
  }
  else {
    alert('Error: Cannot submit a blank note.');
  }
}

// Allows for a member's notes to be retrieved from the database
export function fetchNotes(memberId) {
  $.ajax({
    url: "/php/get_notes.php",
    type: 'POST',
    dataType: 'json',
    data: {
      'memberID': memberId,
    }, success: result => {
      dispatcher.dispatch({
        type: 'RETRIEVED_NOTES',
        notes: result,
      });
    }, error: result => {
      alert('Failed to retrieve notes.');
    }
  });
}
