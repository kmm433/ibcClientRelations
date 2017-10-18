import React from 'react';
import MemberStore from '../Stores/MemberStore.js';
import * as MemberActions from '../Actions/MemberActions.js';
import SettingsMenu from './MemberInformation/SettingsMenu.js';
import MemberList from './MemberInformation/MemberList.js';
import MemberDetails from './MemberInformation/MemberDetails.js';

class MemberInformation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      display_user_details: false,
      displayed_user: null,
      displayed_user_expiry: null,
      displayed_user_type: null,
      unfiltered_members: null,
      member_list: null,
      member_list_renewals: null,
      member_list_archived: null,
      member_list_approvals: null,
      search_phrase: '',
      all: true,
      renewals: false,
      archived: false,
      approvals: false,
      num_all: null,
      num_renewals: null,
      num_archived: null,
      num_approvals: null,
      invoice_callback_domain: null,
    };
    this.updateValues = this.updateValues.bind(this);
    this.changeSearchPhrase = this.changeSearchPhrase.bind(this);
    this.changeViewGroup = this.changeViewGroup.bind(this);
    this.setMemberView = this.setMemberView.bind(this);
    this.resetMemberView = this.resetMemberView.bind(this);
  }

  componentWillMount(props) {
    MemberStore.on('change', this.updateValues);
    MemberActions.fetchChamberMembers();
    MemberActions.fetchXeroInoviceCallbackDomain();
  }

  componentWillUnmount() {
    MemberStore.removeListener('change', this.updateValues);
  }

  updateValues() {
    this.setState({
      unfiltered_members: MemberStore.getUnfilteredMembers(),
      member_list: MemberStore.getMemberList(),
      member_list_renewals: MemberStore.getMemberListRenewals(),
      member_list_archived: MemberStore.getMemberListArchived(),
      member_list_approvals: MemberStore.getMemberListApprovals(),
      num_all: MemberStore.getNumAll(),
      num_renewals: MemberStore.getNumRenewals(),
      num_archived: MemberStore.getNumArchived(),
      num_approvals: MemberStore.getNumApprovals(),
      invoice_callback_domain: MemberStore.getInvoiceCallbackDomain(),
    });
  }

  // Function to allow the change of the selected group of members [all, renewals, archived]
  changeViewGroup(event) {
    this.setState({
      all: false,
      renewals: false,
      archived: false,
      approvals: false,
    });
    if (event.target.id === 'view-group-renewals')
      this.setState({renewals: true});
    else if (event.target.id === 'view-group-archived')
      this.setState({archived: true});
    else if (event.target.id === 'view-group-approvals')
      this.setState({approvals: true});
    else
      this.setState({all: true});
  }

  // Function allows for the change of the search phrase
  changeSearchPhrase(event) {
    this.setState({search_phrase: event.target.value});
    // Filter the groups
    MemberActions.filterMembers(this.state.unfiltered_members, event.target.value);
  }

  // Allows for the view to be switched to rendering a single member
  setMemberView(member, memberID, expiry, type) {
    this.setState({
      display_user_details: true,
      displayed_user: member,
      displayed_user_id: memberID,
      displayed_user_expiry: expiry,
      displayed_user_type: type,
    });
  }

  // Returns the view to the full member list
  resetMemberView() {
    this.setState({
      display_user_details: false,
      displayed_user: null,
      displayed_user_id: null,
      displayed_user_expiry: null,
      displayed_user_type: null,
    });
  }

  render() {
    if (this.props.user_type !== '1') {
      return (
        <div className='main-component'>
          <p>Error: Access not permitted.</p>
        </div>
      );
    }
    else {
      return (
        <div className='main-component w3-row' id='member-information'>
          {!this.state.display_user_details ?
            <div className='w3-col s12'>
              <div className='w3-container w3-card-4 w3-light-grey'>
                <h2>Member Information</h2>
                <SettingsMenu
                  search_phrase={this.state.search_phrase}
                  all={this.state.all}
                  renewals={this.state.renewals}
                  archived={this.state.archived}
                  approvals={this.state.approvals}
                  num_all={this.state.num_all}
                  num_renewals={this.state.num_renewals}
                  num_archived={this.state.num_archived}
                  num_approvals={this.state.num_approvals}
                  invoice_callback_domain={this.state.invoice_callback_domain}
                  changeSearchPhrase={this.changeSearchPhrase}
                  changeViewGroup={this.changeViewGroup}
                />
                <p>{this.props.search_phrase}</p>
                {this.state.all ?
                  <MemberList
                    member_list={this.state.member_list}
                    chamber_id={this.props.chamber_id}
                    all={this.state.all}
                    renewals={this.state.renewals}
                    archived={this.state.archived}
                    getChamberMembers={this.getChamberMembers}
                    setMemberView={this.setMemberView}
                  />
                  : null
                }

                {this.state.renewals ?
                  <MemberList
                    member_list={this.state.member_list_renewals}
                    chamber_id={this.props.chamber_id}
                    all={this.state.all}
                    renewals={this.state.renewals}
                    archived={this.state.archived}
                    getChamberMembers={this.getChamberMembers}
                    setMemberView={this.setMemberView}
                  />
                  : null
                }

                {this.state.archived ?
                  <MemberList
                    member_list={this.state.member_list_archived}
                    chamber_id={this.props.chamber_id}
                    all={this.state.all}
                    renewals={this.state.renewals}
                    archived={this.state.archived}
                    getChamberMembers={this.getChamberMembers}
                    setMemberView={this.setMemberView}
                  />
                  : null
                }

                {this.state.approvals ?
                  <MemberList
                    member_list={this.state.member_list_approvals}
                    chamber_id={this.props.chamber_id}
                    all={this.state.all}
                    renewals={this.state.renewals}
                    archived={this.state.archived}
                    getChamberMembers={this.getChamberMembers}
                    setMemberView={this.setMemberView}
                  />
                  : null
                }
              </div>
            </div>
          :
            <div className='w3-col s12'>
              <div className='details-full w3-container w3-card-4 w3-light-grey'>
                <h2>Complete Member Details</h2>
                <MemberDetails
                  member={this.state.displayed_user}
                  memberID={this.state.displayed_user_id}
                  expiry={this.state.displayed_user_expiry}
                  type={this.state.displayed_user_type}
                  unselect={this.resetMemberView}
                  chamber_id={this.props.chamber_id}
                  all={this.state.all}
                  renewals={this.state.renewals}
                  archived={this.state.archived}
                  getChamberMembers={this.getChamberMembers}
                />
              </div>
            </div>
          }
        </div>
      );
    }
  }
};

export default MemberInformation;
