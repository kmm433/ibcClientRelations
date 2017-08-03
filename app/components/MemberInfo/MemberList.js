import React from 'react';

class MemberList extends React.Component {

  // Initialse the list of members to contain no users
  constructor(props) {
    super(props);
    this.state = {member_list: this.props.member_list};
  }

  componentWillReceiveProps(nextProps) {
    // Update the list of members
    console.log('recieved new props');
    this.setState({member_list: nextProps.member_list});
  }

  //TODO: Create rows for every user, this doesn't work A.T.M.
  generateTableBody(){
    return (
      this.state.member_list.map(x => <td>x</td>)
    );
  }

  render() {
    return (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
              <th>Business</th>
              <th>Date Joined</th>
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
