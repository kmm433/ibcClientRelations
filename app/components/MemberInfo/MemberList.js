import React from 'react';
import $ from 'jquery';

class MemberList extends React.Component {

  // Initialse the list of members to contain no users
  constructor(props) {
    super(props);
    this.state = {
      member_list: this.props.member_list
    };
  }

  // Update the list of members
  componentWillReceiveProps(nextProps) {
    this.setState({member_list: nextProps.member_list});
  }

  // Topggles the display of the delete confirmation
  handleDelete(event) {
    var firstname = event.target.parentElement.nextSibling.nextSibling;
    var lastname = firstname.nextSibling;
    var email = lastname.nextSibling
    var user = {
      firstname: firstname.innerHTML,
      lastname: lastname.innerHTML,
      email: email.innerHTML
    };
    this.props.setSelectedUser(user);
    this.props.setActionType('delete');
  }

  renderDeleteColumn() {
    if (this.props.delete_display) {
      return (
        <th className='member-delete-button'></th>
      );
    }
  }

  renderDeleteButtons() {
    if (this.props.delete_display) {
      return (
        <td className='member-delete-button'>
        <button className='btn btn-danger' onClick={(event) => this.handleDelete(event)}>Delete</button>
      </td>
      );
    }
  }

  // Determines whether a member should be displayed based on the search criteriawe
  searchDisplay(search_criteria, member) {
    console.log(search_criteria);
    if (this.props.search_criteria === '') {
      return true;
    }
    if (member['firstname'].toLowerCase().includes(this.props.search_criteria.toLowerCase())){
      return true;
    }
    if (member['lastname'].toLowerCase().includes(this.props.search_criteria.toLowerCase())){
      return true;
    }
    if (member['email'].toLowerCase().includes(this.props.search_criteria.toLowerCase())){
      return true;
    }
    if (member['businessname'].toLowerCase().includes(this.props.search_criteria.toLowerCase())){
      return true;
    }
    return false;
  }

  generateTableBody() {
    if (this.state.member_list) {
      var today = new Date();
      var result =  this.state.member_list.map((x) => {
        var expDate = new Date(x['Expiry']);
        if(this.searchDisplay(this.props.search_criteria, x)) {
          return (
            <tr key={x['email']} id={x['email']}>
              {this.renderDeleteButtons()}
              <td className='member-profile-picture'><img src='img/default_profile_pic_small.png' /></td>
              <td className='member-first-name'>{x['firstname']}</td>
              <td className='member-last-name'>{x['lastname']}</td>
              <td className='member-email'>{x['email']}</td>
              <td className='member-business-name'>{x['businessname']}</td>
              <td className={'member-expiry ' + (today > expDate ? 'expiry-alert': '')}>{expDate.toDateString()}</td>
            </tr>
          );
        }
        else {
          return (null);
        }
      });
      return (result);
    } else
      return (this.state.member_list);
  }

  render() {
    return (
      <div>
        <table id='member-list' className='rounded-table'>
          <thead>
            <tr>
              {this.renderDeleteColumn()}
              <th className='member-profile-picture'>Profile Picture</th>
              <th className='member-first-name'>First Name</th>
              <th className='member-last-name'>Last Name</th>
              <th className='member-email'>Email Address</th>
              <th className='member-business-name'>Business</th>
              <th className='member-expiry'>Membership Expiry</th>
            </tr>
          </thead>
          <tbody>
            {this.generateTableBody()}
          </tbody>
        </table>
      </div>
    );
  }
};

export default MemberList;