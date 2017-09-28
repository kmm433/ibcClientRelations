import {EventEmitter} from 'events';
import dispatcher from '../dispatcher.js';

class GroupStore extends EventEmitter {
  constructor() {
    super();
    this.groups = [];
    this.selectedGroups = [];
    this.groupMembers = [];
  }

  // Allows the grouplist to be (re-)initiallised
  initialiseGroupList(groups) {
    this.groups = groups;
    this.emit('change');
  }

  // Can be used to update the available groups
  createGroup(group) {
    this.groups.push(group);
    this.emit('change');
  }

  // Can be used to update the selected groups with a newly selected item
  updateSelectedGroups(groups) {
    this.selectedGroups = groups;
    console.log('SELECTED_GROUPS: ', this.selectedGroups);
    this.emit('change');
  }

  // Allows for the list of members in the selected groups to be updated.
  updateGroupMembers(members) {
    this.groupMembers = members;
    this.emit('change');
  }

  // Can be used by a component to get a list of all the groups in the store
  getGroups() {
    return this.groups;
  }

  // Can be used by a comppnenet to get selected groups
  getSelectedGroups() {
    return this.selectedGroups;
  }

  // Returns an array of members in the selected groups
  getGroupMembers() {
    var groupMembers = '';
    if (this.groupMembers.length > 0) {
      groupMembers = groupMembers + this.groupMembers[0];
      this.groupMembers.forEach((member, index) => {
        if (index > 0) {
          groupMembers = groupMembers + ', ' + member;
        }
      });
    }
    return groupMembers;
  }

  // The handler for any fired actions
  handleDispatchedActions(action) {
    switch(action.type) {
      case 'RETRIEVED_GROUPS': {
        this.initialiseGroupList(action.groups);
        break;
      }
      case 'CREATE_GROUP': {
        this.createGroup(action.group);
        break;
      }
      case 'SELECTED_GROUPS': {
        this.updateSelectedGroups(action.groups)
        break;
      }
      case 'RETRIEVED_MEMBERS': {
        this.updateGroupMembers(action.members);
        break;
      }
    }
  }

};

const groupStore = new GroupStore;
dispatcher.register(groupStore.handleDispatchedActions.bind(groupStore));
export default groupStore;
