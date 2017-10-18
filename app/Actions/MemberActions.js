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
    }
  });
}

// Allows for the Xero callback domain to be retrieved for invoices
export function fetchXeroInoviceCallbackDomain() {
  $.ajax({
    url: "/php/get_xero_invoice_callback_domain.php",
    type: 'POST',
    dataType: 'json',
    success: result => {
      if (result.status === 200) {
        dispatcher.dispatch({
          'type': 'RETRIEVED_XERO_INVOICE_CALLBACK_DOMAIN',
          'domain': result.value['domain'],
        });
      }
      else
        alert(result.value);
    }, error: result => {
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
  var approvalMembers = [];
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
    if (member['archived'] === '1' && member['type'] < 3)
      archivedMembers.push(member);
    else {
      if (member['type'] < 3) {
        currentMembers.push(member);
        // Check if membership is about to expire
        if(expiryDate && (expiryDate < warningWindow)){
          renewalMembers.push(member);
        }
      }
      else {
        approvalMembers.push(member);
      }
    }
  });
  dispatcher.dispatch({
    type: 'FILTERED_MEMBERS',
    member_list: currentMembers,
    member_list_renewals: renewalMembers,
    member_list_archived: archivedMembers,
    member_list_approvals: approvalMembers,
    num_all: currentMembers.length,
    num_renewals: renewalMembers.length,
    num_archived: archivedMembers.length,
    num_approvals: approvalMembers.length,
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

// Allows for the retrieval of member's details from the database
export function fetchCompleteDetails(chamberId, expiry, memberId, expiryDisabled) {
  // Fetch the required fields for this chamber
  $.ajax({
    url: '/php/chamber_form.php',
    type: 'POST',
    dataType: 'json',
    data: {
      'chamber': chamberId,
    }, success: response => {
      var fields = response;
      var ignoredResults = [];
      fields.forEach((field, i)=> {
        fields[i]['disabled'] = false;
        if(field['columnname'] === 'ignore' || field['displayname'] === 'Password')
          ignoredResults.push(i);
      });
      ignoredResults.forEach(field => {
        delete fields[field];
      });
      var expiryField = {
        DataID:"1",
        columnname:"expiry",
        displayname:"Membership Expiry Date",
        inputtype:"date",
        mandatory:"1",
        maximum:"",
        minimum:"",
        ordering:"1000000",
        tablename:"USER",
        value: expiry,
        disabled: expiryDisabled,
      };
      fields.push(expiryField);
      $.ajax({
        url: "/php/get_complete_details.php",
        type: 'POST',
        dataType: 'json',
        data: {
          'fields': JSON.stringify(fields),
          'memberID': memberId
        }, success: response => {
          // Match the values to their fields
          for (var value in response) {
            fields.forEach((field) => {
              if(field['displayname'] === value) {
                field['value'] = response[value];
              }
            });
          }
          // Sort the fields by their ordering value
          fields.sort((a, b) => {
            return(a['ordering'] - b['ordering']);
          });
          dispatcher.dispatch({
            type: 'RETRIEVED_USER_DETAILS',
            details: fields,
          });
        }, error: response => {
          console.log('ERROR:', response);
        }
      });
    }
  });
}

// Allows for a member's details to be updated
export function updateDetails(memberId, details) {
  // Replace blank strings with null
  var updatedDetails = details;
  for (var detail in updatedDetails) {
    if(updatedDetails[detail][1]['value'] === '') {
      updatedDetails[detail][1]['value'] = null;
    }
  }

  // Ajax call to submission function then reload...
  updatedDetails.forEach( detail => {
    $.ajax({
      url: '/php/update_complete_detail.php',
      type: 'POST',
      dataType: 'json',
      data: {
        'member_id': memberId,
        'detail': detail,
      },
      success: result => {
        if (result.status === 200) {
          if (result.value.email_syncronized === true) {
            alert('Successfully updated details. Email address has been syncronized with MailChimp.');
          }
        }
      }, error: result => {console.log('error: ', result);}
    });
  });
  submitNote(memberId, 'Updated member\'s details.');
}

export function updateArichiveStatus(currentArchiveStatus, memberId) {
  var archived = 1;
  if (currentArchiveStatus) {
    archived = 0;
  }
  $.ajax({
    url: '/php/set_archive_member.php',
    type: 'POST',
    dataType: 'json',
    data: {
      'memberID': memberId,
      'archive_status': archived
    },
    success: response => {
      fetchChamberMembers();
    },
    error: response => {
      console.log(response);
    }
  });
}
export function approveUser(userId) {
  $.ajax({
    url: '/php/approve_member.php',
    type: 'POST',
    dataType: 'json',
    data: {
      'user_id': userId,
    },
    success: response => {
      if (response.status === 200) {
        alert("Member has been Approved");
        fetchChamberMembers();
      }
      else {
        alert(response.value);
      }
    },
    error: response => {
      console.log(response);
    }
  });
}
