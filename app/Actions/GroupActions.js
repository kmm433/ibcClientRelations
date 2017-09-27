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
      console.log(result.groupID);
      fetchGroups();
    },
    error: result => {
      console.log('Failed', result);
    }
  });
}
