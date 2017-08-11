import React from 'react';

class MemberList extends React.Component {

  // Initialse the list of members to contain no users
  constructor(props) {
    super(props);
    this.state = {member_list: this.props.member_list};
  }

  componentWillReceiveProps(nextProps) {
    // Update the list of members
    this.setState({member_list: nextProps.member_list});
  }

  //TODO: Create rows for every user, this doesn't work A.T.M.
  generateTableBody(){
    if (this.state.member_list) {
      var today = new Date();
      var result =  this.state.member_list.map((x) => {
        var expDate = new Date(x['Expiry']);
        console.log(today, ' : ', expDate, ' : ', x['Expiry']);
        return (
          <tr key='member'>
            <td className='member-first-name'>{x['firstname']}</td>
            <td className='member-last-name'>{x['lastname']}</td>
            <td className='member-email'>{x['email']}</td>
            <td className='member-business-name'>{x['businessname']}</td>
            <td className={'member-expiry ' + (today > expDate ? 'expiry-alert': '')}>{expDate.toDateString()}</td>
          </tr>
        );
      });
      return (result);
    } else
      return (this.state.member_list);
  }

  render() {
    return (
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
    );
  }
};

export default MemberList;
