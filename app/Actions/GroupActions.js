import $ from 'jquery';
import dispatcher from '../dispatcher.js';

// Fetches all of a chamber's groups from the database
export function fetchGroups() {
  $.ajax({
    url: "/php/get_group_data.php",
    success: result => {
      var groups = [];
      var parsedResult = JSON.parse(result)
      parsedResult.forEach(group => {
        var emailable = true;
        var groupSize = 0;
        if (!group.mailchimp_list_id)
          emailable = false;
        // Format the data for ease of use
        var newGroup = {
          group_id: group.groupID,
          group_name: group.name,
          email_ready: emailable ? group.mailchimp_list_id : emailable,
          group_size: group['COUNT(gm.groupID)'],
          selected: false,
        };
        groups.push(newGroup);
      });
      dispatcher.dispatch({
        type: 'RETRIEVED_GROUPS',
        groups: groups,
      });
    }
  });
}

// Inserts a new group into the database,
export function createGroup(groupName) {
  $.ajax({
    url:'/php/create_group.php',
    type: 'POST',
    dataType: 'json',
    data: {
      'groupName': groupName,
    },
    success: result => {
      fetchGroups();
    }
  });
}

// Deletes a set fo groups from the database
export function deleteGroups(groupIDs) {
  $.ajax({
    url:'/php/delete_groups.php',
    type: 'POST',
    dataType: 'json',
    data: {
      'group_ids': groupIDs,
    },
    success: result => {
      var groups = [];
      updateGroupSelection(groups)
      fetchGroups();
    }
  });
}

// Updates the MailChimp API Key that is registered to a chamber.
export function updateAPIKey(apiKey) {
  $.ajax({
    url:'/php/update_mailchimp_api_key.php',
    type: 'POST',
    dataType: 'json',
    data: {
      'api_key': apiKey,
    },
    success: result => {
      if (result.status === 200) {
        alert('Successfully updated the API key.');
      }
      else {
        alert(result.value);
      }
    }
  });
}

// Updates the Mail List Id that is associated to a specified group
export function updateMailListID(groupID, mailListID) {
  $.ajax({
    url:'/php/update_mailchimp_listid.php',
    type: 'POST',
    dataType: 'json',
    data: {
      'group_id': groupID,
      'list_id': mailListID,
    },
    success: result => {
      if(result) {
        result.value.forEach(error => {
          alert(JSON.stringify(error[1]));
        });
      } else {
        alert('Successfully added all members.');
      }


      fetchGroups();
    }
  });
}

// Unregisters a saved mail list id so that it can be used for another group.
export function unregisterMailListID(groupID) {
  $.ajax({
    url:'/php/unregister_mail_list_id.php',
    type: 'POST',
    dataType: 'json',
    data: {
      'group_id': groupID,
    },
    success: result => {
      alert(result.value);
    }
  });
}

// broadcasts the addition of a change in the selection of a group
export function updateGroupSelection(groups) {
  dispatcher.dispatch({
    type: 'SELECTED_GROUPS',
    groups: groups,
  });
  getGroupMembers(groups);
}

// Retrieves a list of all members in a set of group_id's
export function getGroupMembers(groups) {
  if (groups.length > 0) {
    $.ajax({
      url:'/php/get_group_members.php',
      type: 'POST',
      dataType: 'json',
      data: {
        'groups': groups,
      },
      success: result => {
        dispatcher.dispatch({
          type: 'RETRIEVED_MEMBERS',
          members: result,
        });
      }
    });
  }
  else {
    dispatcher.dispatch({
      type: 'RETRIEVED_MEMBERS',
      members: [],
    });
  }
}

export function updateGroupAllMembers() {
  $.ajax({
    url: '/php/update_group_all_members.php',
    success: result => {
      fetchGroups();
    }
  });
}
