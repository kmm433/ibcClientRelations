import React from 'react';
import MemberStore from '../Stores/MemberStore.js';
import * as MemberActions from '../Actions/MemberActions.js';
import CompleteMemberDetails from './MemberInformation/CompleteMemberDetails';
import PasswordReset from './Profile/PasswordReset.js';

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      details: {},
      editable: false,
    };
    this.updateValues = this.updateValues.bind(this);
    this.setEditMode = this.setEditMode.bind(this);
  }

  componentWillMount(props) {
    MemberStore.on('change', this.updateValues);
    MemberActions.fetchCompleteDetails(this.props.chamber_id, this.props.expiry, this.props.user_id, true);
  }

  componentWillUnmount() {
    MemberStore.removeListener('change', this.updateValues);
  }

  updateValues() {
    this.setState({
      details: MemberStore.getCompleteDetails(),
    });
  }

  // Allows the eddit mode to be toggled
  setEditMode() {
    this.setState({editable: !this.state.editable});
  }

  render() {
    return(
      <div id='profile-page' className='main-component'>
        <div className='w3-col s12'>
          <div className='w3-container w3-card-4 w3-light-grey'>
            <h2>Manage Your Profile</h2>
            <p>You have currently provided the following details to the chamber.</p>
            <p>Would you like to make any changes?</p>
            <input type='button'
              className='btn btn-primary'
              value={this.state.editable ? 'Cancel':'Update Details'}
              onClick={this.setEditMode}
            />
            <CompleteMemberDetails
              memberID={this.props.user_id}
              details={this.state.details}
              editable={this.state.editable}
              setEditMode={this.setEditMode}
            />
            <PasswordReset user_id={this.props.user_id}/>
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;
