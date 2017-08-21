import React from 'react';
import $ from 'jquery';
import MemberControlPanel from './MemberInfo/MemberControlPanel.js';
import MemberList from './MemberInfo/MemberList.js';

class MemberInfo extends React.Component {

  // Inistialise member list to empty.
  constructor(props) {
    super(props);
    this.state = {
      member_list: null,
      search_criteria: '',
      delete_display: false
    };
    this.updateSearchCriteria = this.updateSearchCriteria.bind(this);
    this.toggleDeleteMode = this.toggleDeleteMode.bind(this);
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

  render() {
    console.log('delete_display is '+ this.state.delete_display);
    return (
      <div className="main-component">
        <MemberControlPanel updateSearchCriteria={this.updateSearchCriteria}
          toggleDeleteMode={this.toggleDeleteMode} />
        <MemberList member_list={this.state.member_list}
          search_criteria={this.state.search_criteria}
          delete_display={this.state.delete_display} />
      </div>
    );
  }
};

export default MemberInfo;
