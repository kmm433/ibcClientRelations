import {EventEmitter} from 'events';
import dispatcher from '../dispatcher.js';

class MemberStore extends EventEmitter {

  constructor() {
    super();
    this.unfiltered_members = null;
    this.member_list = null;
    this.member_list_renewals = null;
    this.member_list_archived = null;
    this.num_all = null;
    this.num_renewals = null;
    this.num_archived = null;
    this.notes = null;
  }

  // Allows for the list of unfiltered members to be retrieved
  getUnfilteredMembers() {
    return this.unfiltered_members;
  }

  // Allows for the member list to be retrieved
  getMemberList() {
    return this.member_list;
  }

  // Allows for the retrieval of the renewals member list
  getMemberListRenewals() {
    return this.member_list_renewals;
  }

  // Allows for the retrieval od the archived member list
  getMemberListArchived() {
    return this.member_list_archived;
  }

  // Allows for the retrieval of the number of members in the all list
  getNumAll() {
    return this.num_all;
  }

  // Allows for the retrieval of the number of members in the renewals list
  getNumRenewals() {
    return this.num_renewals;
  }

  // Allows for the retrieval of the number of members in the archived list
  getNumArchived() {
    return this.num_archived;
  }

  // Allows for the list of notes to be retrieved
  getNotes() {
    return this.notes;
  }

  // Updates the current list of unfiltered members
  updateUnfilteredMembers(members) {
    this.unfiltered_members = members;
    this.emit('change');
  }

  // Updates the current list of filtered members and the view groups
  updateFilteredMembers(member_list, member_list_renewals, member_list_archived,
    num_all, num_renewals, num_archived)
  {
    this.member_list = member_list;
    this.member_list_renewals = member_list_renewals;
    this.member_list_archived = member_list_archived;
    this.num_all = num_all;
    this.num_renewals = num_renewals;
    this.num_archived = num_archived;
    this.emit('change');
  }

  // Updates the list of notes for a member
  updateNotes(notes) {
    this.notes = notes;
    this.emit('change');
  }

  // The handler for any fired actions
  handleDispatchedActions(action) {
    switch(action.type) {
      case 'RETRIEVED_CHAMBER_MEMBERS': {
        this.updateUnfilteredMembers(action.members);
        break;
      }
      case 'FILTERED_MEMBERS': {
        this.updateFilteredMembers(
          action.member_list,
          action.member_list_renewals,
          action.member_list_archived,
          action.num_all,
          action.num_renewals,
          action.num_archived
        );
        break;
      }
      case 'RETRIEVED_NOTES': {
        this.updateNotes(action.notes);
        break;
      }
    }
  }
};

const memberStore = new MemberStore;
dispatcher.register(memberStore.handleDispatchedActions.bind(memberStore));
export default memberStore;
