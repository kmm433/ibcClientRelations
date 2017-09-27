import {EventEmitter} from 'events';
import dispatcher from '../dispatcher.js';

class GroupStore extends EventEmitter {
  constructor() {
    super();
    this.groups = [];
  }

  // Allows the grouplist to be (re-)initiallised
  initialiseGroupList(groups) {
    this.groups = groups;
  }

  // Can be used to update the available groups
  createGroup(group_name) {
    this.groups.push({
      group_name,
      email_ready: false,
    });
    this.emit('change');
  }

  // Can be used by a component to get a list of all the groups in the store
  getGroups() {
    return this.groups;
  }

  // The handler for any fired actions
  handleDispatchedActions(action) {
    switch(action.type) {
      case 'RETRIEVED_GROUPS': {
        this.initialiseGroupList(action.groups);
      }
      case 'CREATE_GROUP': {
        this.createGroup(action.group_name);
      }
    }
  }

};

const groupStore = new GroupStore;
dispatcher.register(groupStore.handleDispatchedActions.bind(groupStore));
export default groupStore;
