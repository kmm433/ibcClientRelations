import React from 'react';
import $ from 'jquery';
import MemberControlPanel from './MemberInfo/MemberControlPanel.js';
import MemberList from './MemberInfo/MemberList.js';

class MemberInfo extends React.Component {

  // Inistialise member list to empty.
  constructor(props) {
    super(props);
    this.state = {member_list: null};
    this.state = {search_criteria: ''}
    this.updateSearchCriteria = this.updateSearchCriteria.bind(this);
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

  render() {
    return (
      <div className="main-component">
        <MemberControlPanel updateSearchCriteria={this.updateSearchCriteria}/>
        <MemberList member_list={this.state.member_list}
          search_criteria={this.state.search_criteria}/>
      </div>
    );
  }
};

export default MemberInfo;
