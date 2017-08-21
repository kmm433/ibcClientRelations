import React from 'react';

class MemberList extends React.Component {

  // Initialse the list of members to contain no users
  constructor(props) {
    super(props);
    this.state = {member_list: this.props.member_list,
                  search_criteria: this.props.search_criteria};
  }

  componentWillReceiveProps(nextProps) {
    // Update the list of members
    this.setState({member_list: nextProps.member_list});
    this.setState({search_criteria: nextProps.search_criteria});
  }

  // Determines whether a member should be displayed based on the search criteriawe
  searchDisplay(search_criteria, member) {
    console.log('Checking member: '+member['firstname']);
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
    console.log('not displaying them.');
    return false;
  }

  generateTableBody(){
    if (this.state.member_list) {
      var today = new Date();
      var result =  this.state.member_list.map((x) => {
        var expDate = new Date(x['Expiry']);
        console.log(today, ' : ', expDate, ' : ', x['Expiry']);
        if(this.searchDisplay(this.props.search_criteria, x)) {
          return (
            <tr key={x['email']}>
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
        <p>Searching for: {this.props.search_criteria}</p>
        <table id='member-list' className='rounded-table'>
          <thead>
            <tr>
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
