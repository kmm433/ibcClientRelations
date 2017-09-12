import React from 'react';
import $ from 'jquery';
import SettingsMenu from './MemberInformation/SettingsMenu.js';
import MemberList from './MemberInformation/MemberList.js';

class MemberInformation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      unfiltered_members: null,
      member_list: null,
      member_list_renewals: null,
      member_list_archived: null,
      search_phrase: '',
      all: true,
      renewals: false,
      archived: false,
      num_all: null,
      num_renewals: null,
      num_archived: null
    };
    this.getChamberMembers = this.getChamberMembers.bind(this);
    this.filterMembers = this.filterMembers.bind(this);
    this.sortMemberViewGroups = this.sortMemberViewGroups.bind(this);
    this.changeSearchPhrase = this.changeSearchPhrase.bind(this);
    this.changeViewGroup = this.changeViewGroup.bind(this);
  }

  componentWillMount(props) {
    // Load all of the chamber members from the database
    this.getChamberMembers();
  }

  // Retrieves all members from the database
  getChamberMembers() {
    $.ajax({url: "/php/get_chamber_members.php", success: result => {
        var members = JSON.parse(result);
        this.setState({unfiltered_members: members});
        this.filterMembers(members, this.state.search_phrase);
    }});
  }

  // Filters the members based on a provided search term
  filterMembers(members, searchPhrase){
    var filteredMembers = [];
    if(searchPhrase !== '') {
      members.forEach((member) => {
        var foundSearchPhrase = false;
        for(var property in member) {
          if(member[property] && member[property].indexOf(searchPhrase) !== -1){
            foundSearchPhrase = true;
          }
        }
        if (foundSearchPhrase)
          filteredMembers.push(member);
      });
    }
    else {
      filteredMembers = members;
    }
    this.sortMemberViewGroups(filteredMembers);
  }

  // Sorts the members into their respective view groups
  sortMemberViewGroups(members) {
    // Seperate the members into current, renewal and archived
    var currentMembers = [];
    var renewalMembers = [];
    var archivedMembers = [];
    var warningWindow = new Date();
    warningWindow.setDate(warningWindow.getDate() + 14);
    members.forEach((member) => {

      // Splice the datestring into a usable date object
      var expiryString = member['expiry'];
      var expiryDateComponents;
      var expiryDate = null;
      if (expiryString) {
        var date = expiryString.split(' ');
        expiryDateComponents = date[0].split('-');
        expiryDate = new Date(expiryDateComponents[0], parseInt(expiryDateComponents[1]) - 1, expiryDateComponents[2]);
      }

      // Add the member to their respective group
      if (member['archived'] === '1')
        archivedMembers.push(member);
      else {
        currentMembers.push(member);
        // Check if membership is about to expire
        if(expiryDate && (expiryDate < warningWindow)){
          renewalMembers.push(member);
        }
      }
    });

    // Update all the respective states
    this.setState({
      member_list: currentMembers,
      member_list_renewals: renewalMembers,
      member_list_archived: archivedMembers,
      num_all: currentMembers.length,
      num_renewals: renewalMembers.length,
      num_archived: archivedMembers.length
    });
  }

  // Function to allow the change of the selected group of members [all, renewals, archived]
  changeViewGroup(event) {
    this.setState({
      all: false,
      renewals: false,
      archived: false
    });
    if (event.target.id === 'view-group-renewals')
      this.setState({renewals: true});
    else if (event.target.id === 'view-group-archived')
      this.setState({archived: true});
    else
      this.setState({all: true});
  }

  // Function allows for the change of the search phrase
  changeSearchPhrase(event) {
    this.setState({search_phrase: event.target.value});
    // Filter the groups
    this.filterMembers(this.state.unfiltered_members, event.target.value);
  }


  render() {
    return (
      <div className='main-component'>
        <h2>Member Information</h2>
        <SettingsMenu
          search_phrase={this.state.search_phrase}
          all={this.state.all}
          renewals={this.state.renewals}
          archived={this.state.archived}
          num_all={this.state.num_all}
          num_renewals={this.state.num_renewals}
          num_archived={this.state.num_archived}
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
          />
          : null
        }

      </div>
    );
  }
};

export default MemberInformation;
