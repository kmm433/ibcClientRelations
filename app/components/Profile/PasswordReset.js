import React from 'react';
import * as ProfileActions from '../../Actions/ProfileActions.js';
import {FormControl, ControlLabel, FormGroup, HelpBlock} from 'react-bootstrap';

class PasswordReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_password: '',
      new_password: '',
      confirm_password: '',
      error_message: '',
      valid_state_current: null,
      valid_state_new: null,
    };
    this.updateCurrentPassword = this.updateCurrentPassword.bind(this);
    this.updateNewPassword = this.updateNewPassword.bind(this);
    this.updateConfirmPassword = this.updateConfirmPassword.bind(this);
    this.checkErrors = this.checkErrors.bind(this);
    this.updateUserPassword = this.updateUserPassword.bind(this);
  }

  // Updates the current state of the new password field
  // Also ensure that there is some input and sets the error flags
  updateCurrentPassword(event) {
    if (event.target.value === '') {
      this.setState({valid_state_current: 'error'});
    }
    else {
      this.setState({valid_state_current: 'success'});
    }
    this.setState({current_password: event.target.value});
  }

  // Updates the current state of the new password field
  // Also validates the input and sets the error flags
  updateNewPassword(event) {
    const confirmPassword = this.state.confirm_password;
    if (event.target.value != confirmPassword) {
      this.setState({
        valid_state_new: 'error',
        error_message: 'Passwords do not match'
      });
    }
    else if (event.target.value === '') {
      this.setState({
        valid_state_new: 'error',
        error_message: 'Password cannot be blank.',
      });
    }
    else {
      this.setState({
        valid_state_new: 'success',
        error_message: '',
    });
    }
    this.setState({new_password: event.target.value});
  }

  // Updates teh current state of the confirmastion of the new password
  // Also validates the input and sets the error flags
  updateConfirmPassword(event) {
    const newPassword = this.state.new_password;
    if (event.target.value != newPassword) {
      this.setState({
        valid_state_new: 'error',
        error_message: 'Passwords do not match',
      });
    }
    else if (event.target.value === '') {
      this.setState({
        valid_state_new: 'error',
        error_message: 'Password cannot be blank.',
      });
    }
    else {
      this.setState({valid_state_new: 'success'});
    }
    this.setState({confirm_password: event.target.value});
  }

  // Checks to see if any of the input forms are currently in an error state
  checkErrors() {
    if (this.state.valid_state_new  && this.state.valid_state_current) {
      if (this.state.valid_state_new === 'success' && this.state.valid_state_current === 'success') {
        return false;
      }
    }
    return true;
  }

  // Used to submit the password to the database
  updateUserPassword() {
    ProfileActions.updateUserPassword(this.props.user_id, this.state.current_password, this.state.new_password);
  }

  render() {
    return (
      <div id='passwordRest'>
        <h3>Change Your Password</h3>
        <FormGroup
          controlId='current_password'
          validationState={this.state.valid_state_current}
        >
          <ControlLabel>Current Password</ControlLabel>
          <FormControl
            type='password'
            value={this.state.current_password}
            onChange={e => this.updateCurrentPassword(e)}
          />
        </FormGroup>
        <FormGroup
          controlId='new_password'
          validationState={this.state.valid_state_new}
        >
          <ControlLabel>New Password</ControlLabel>
          <FormControl
            type='password'
            value={this.state.new_password}
            onChange={e => this.updateNewPassword(e)}
          />
        </FormGroup>
        <FormGroup
          controlId='confirm_password'
          validationState={this.state.valid_state_new}
        >
          <ControlLabel>Confirm New Password</ControlLabel>
          <FormControl
            type='password'
            value={this.state.confirm_password}
            onChange={e => this.updateConfirmPassword(e)}
          />
          <HelpBlock>{this.state.error_message}</HelpBlock>
        </FormGroup>
        <input className='btn btn-primary'
          type='button'
          value='Update Password'
          disabled={this.checkErrors()}
          onClick={this.updateUserPassword}
        />
      </div>
    );
  }
};

export default PasswordReset;
