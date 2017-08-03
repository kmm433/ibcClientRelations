import React from 'react';
import $ from 'jquery';
import MemberList from './MemberInfo/MemberList.js';

class MemberInfo extends React.Component {

  // Inistialise member list to empty.
  constructor(props) {
    super(props);
    this.state = {member_list: null};
  }

  // Fetch this chamber's members
  componentWillMount(props) {
    $.ajax({url: "/php/get_chamber_members.php", success: result => {
      var members = JSON.parse(result);
      this.setState({member_list: members});
    }})
  }

  render() {
    return (
      <div className="main-component">
        <MemberList member_list={this.state.member_list}/>
      </div>
    );
  }
};

export default MemberInfo;
