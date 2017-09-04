import React from 'react';
import $ from 'jquery';
import SettingsMenu from './MemberInformation/SettingsMenu.js';
import MemberList from './MemberInformation/MemberList.js';

class MemberInformation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {member_list: null};
  }

  componentWillMount(props) {
    $.ajax({url: "/php/get_chamber_members.php", success: result => {
        var members = JSON.parse(result);
        this.setState({member_list: members});
    }})
  }

  render() {
    return (
      <div className='main-component'>
        <SettingsMenu />
        <MemberList member_list={this.state.member_list} />
      </div>
    );
  }
};

export default MemberInformation;
