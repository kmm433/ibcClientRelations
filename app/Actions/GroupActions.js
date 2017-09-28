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
        var emailable = false;
        var groupSize = 0;
        if (group.mailchimp_list_id)
          emailable = true;
        // Format the data for ease of use
        var newGroup = {
          group_id: group.groupID,
          group_name: group.name,
          email_ready: emailable,
          group_size: group['COUNT(gm.groupID)'],
          selected: false,
        };
        groups.push(newGroup);
      });
      console.log('dispatching retrieval');
      dispatcher.dispatch({
        type: 'RETRIEVED_GROUPS',
        groups: groups,
      });
    }
  });
}

// Inserts a new group into the database,
// Dispatches CREATE_GROUP action on success.
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
    },
    error: result => {
      console.log('Failed', result);
    }
  });
}

// Inserts or updates the MailChimp API Key that is registede to a chamber.
export function updateAPIKey(newKey) {
  console.log('New Key is: ', newKey);
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
        console.log('Groups are: ', groups, '. Group Members are: ', result);
        dispatcher.dispatch({
          type: 'RETRIEVED_MEMBERS',
          members: result,
        });
      },
      error: result => {
        console.log('Error: ', result);
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
