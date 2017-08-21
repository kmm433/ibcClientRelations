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
      delete_display: false,
      selected_user: null,
      action_type: null
    };
    this.updateSearchCriteria = this.updateSearchCriteria.bind(this);
    this.toggleDeleteMode = this.toggleDeleteMode.bind(this);
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
  // Toggle delete mode
  toggleDeleteMode() {
    this.setState({delete_display: !this.state.delete_display});
  }

  setSelectedUser(user) {
    this.setState({selected_user: user});
  }

  setActionType(action) {
    this.setState({action_type: action});
  }

  render() {
    return (
      <div className="main-component">
        <MemberControlPanel
          updateSearchCriteria={this.updateSearchCriteria}
          toggleDeleteMode={this.toggleDeleteMode}
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
          delete_display={this.state.delete_display}
          setActionType={this.setActionType}
          setSelectedUser={this.setSelectedUser}
        />
      </div>
    );
  }
};

export default MemberInfo;
