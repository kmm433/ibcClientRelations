import {EventEmitter} from 'events';
import dispatcher from '../dispatcher.js';

class MemberStore extends EventEmitter {

  constructor() {
    super();
    this.unfiltered_members = null;
    this.member_list = null;
    this.member_list_renewals = null;
    this.member_list_archived = null;
    this.member_list_approvals = null;
    this.num_all = null;
    this.num_renewals = null;
    this.num_archived = null;
    this.num_approvals = null;
    this.notes = null;
    this.invoice_callback_domain = null;
    this.complete_details = null;
    this.address_id = null;
    this.postal_id = null;
    this.address = null;
    this.postal = null;
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

  // Allows for the retrieval of the archived member list
  getMemberListArchived() {
    return this.member_list_archived;
  }

  // Allows for the retrieval of the list of members awaiting approval
  getMemberListApprovals() {
    return this.member_list_approvals;
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

  // Allows for the retrieval of the number of members in the approvals list
  getNumApprovals() {
    return this.num_approvals;
  }

  // Allows for the list of notes to be retrieved
  getNotes() {
    return this.notes;
  }

  // Allows for the retrieval of the xero invoice callback domain
  getInvoiceCallbackDomain() {
    return this.invoice_callback_domain;
  }

  // Allows for the retrieval of a complete list of a member's details
  getCompleteDetails() {
    return this.complete_details;
  }

  // Allows for the retrieval of a business' address id
  getBusinessAddressID() {
    return this.address_id;
  }

  // Allows for the retrieval of a business' postal address id
  getPostalAddressID() {
    return this.postal_id;
  }

  // Allows for the member's business address to be retrieved
  getBusinessAddress() {
    return this.address;
  }

  // Allows for the member's businesses postal address to be retrieved
  getPostalAddress() {
    return this.postal;
  }

  // Updates the current list of unfiltered members
  updateUnfilteredMembers(members) {
    this.unfiltered_members = members;
    this.emit('change');
  }

  // Updates the current list of filtered members and the view groups
  updateFilteredMembers(member_list, member_list_renewals, member_list_archived,
    member_list_approvals, num_all, num_renewals, num_archived, num_approvals)
  {
    this.member_list = member_list;
    this.member_list_renewals = member_list_renewals;
    this.member_list_archived = member_list_archived;
    this.member_list_approvals = member_list_approvals;
    this.num_all = num_all;
    this.num_renewals = num_renewals;
    this.num_archived = num_archived;
    this.num_approvals = num_approvals;
    this.emit('change');
  }

  // Updates the list of notes for a member
  updateNotes(notes) {
    this.notes = notes;
    this.emit('change');
  }

  // Updates the call back domain for xero invoices
  updateInvoiceCallbackDomain(domain) {
    this.invoice_callback_domain = domain;
    this.emit('change');
  }

  // Updates a list of a members details
  updateCompleteDetails(details) {
    this.complete_details = details;
    this.emit('change');
  }

  // Updates the members address Information
  updateMemberAddress(address, postal, addressId, postalId) {
    this.address_id = addressId;
    this.postal_id = postalId;
    this.address = address;
    this.postal = postal;
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
          action.member_list_approvals,
          action.num_all,
          action.num_renewals,
          action.num_archived,
          action.num_approvals
        );
        break;
      }
      case 'RETRIEVED_NOTES': {
        this.updateNotes(action.notes);
        break;
      }
      case 'RETRIEVED_XERO_INVOICE_CALLBACK_DOMAIN': {
        this.updateInvoiceCallbackDomain(action.domain);
        break;
      }
      case 'RETRIEVED_USER_DETAILS': {
        this.updateCompleteDetails(action.details);
        break;
      }
      case 'RETRIEVED_USER_ADDRESSES': {
        this.updateMemberAddress(action.address,
          action.postal,
          action.address_id,
          action.postal_id
        );
      }
    }
  }
};

const memberStore = new MemberStore;
dispatcher.register(memberStore.handleDispatchedActions.bind(memberStore));
export default memberStore;
