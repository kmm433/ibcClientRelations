import React from 'react';
import $ from 'jquery';
import MemberControlPanel from './MemberInfo/MemberControlPanel.js';
import MemberActionPanel from './MemberInfo/MemberActionPanel.js';
import MemberList from './MemberInfo/MemberList.js';

class MemberInfo extends React.Component {

  // Inistialise member list to empty.
  constructor(props) {
    super(props);
    this.state = {
      member_list: null,
      search_criteria: '',
      edit_display: false,
      delete_display: false,
      group_display: false,
      selected_user: null,
      action_type: null,
      comment_mode: false
    };
    this.updateSearchCriteria = this.updateSearchCriteria.bind(this);
    this.toggleMode = this.toggleMode.bind(this);
    this.setSelectedUser = this.setSelectedUser.bind(this);
    this.setActionType = this.setActionType.bind(this);
  }

  // Fetch this chamber's members
  componentWillMount(props) {
    $.ajax({url: "/php/get_chamber_members.php", success: result => {
      var members = JSON.parse(result);
      this.setState({member_list: members});
    }})
  }

  // Alows the control panel to update the list's search criteria
  updateSearchCriteria(criteria) {
    this.setState({search_criteria: criteria});
  }

  // Diables all modes that might be active
  toggleMode(mode) {
    this.setState({
      delete_display: false,
      edit_display: false,
      group_display: false
    });
    if (mode === 'edit')
      this.setState({edit_display: true});
    if (mode === 'delete')
      this.setState({delete_display: true});
  }

  // Selects a user for further action
  setSelectedUser(user) {
    this.setState({selected_user: user});
  }

  // Sets the type of action that should be performed
  setActionType(action) {
    this.setState({action_type: action});
  }

  render() {
    return (
      <div className="main-component">
        <MemberControlPanel
          updateSearchCriteria={this.updateSearchCriteria}
          toggleMode={this.toggleMode}
          setActionType={this.setActionType}
          setSelectedUser={this.setSelectedUser}
        />
        <MemberActionPanel
          action_type={this.state.action_type}
          selected_user={this.state.selected_user}
          setActionType={this.setActionType}
          setSelectedUser={this.setSelectedUser}
        />
        <MemberList
          member_list={this.state.member_list}
          search_criteria={this.state.search_criteria}
          edit_display={this.state.edit_display}
          delete_display={this.state.delete_display}
          setActionType={this.setActionType}
          setSelectedUser={this.setSelectedUser}
        />
      </div>
    );
  }
};

export default MemberInfo;
