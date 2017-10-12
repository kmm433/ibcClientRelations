import React from 'react';
import $ from 'jquery';
import * as MemberActions from '../../Actions/MemberActions.js';

class SettingsMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      key_button_text: 'Update Xero Connection',
      consumer_key: '',
      consumer_secret: '',
    }
    this.toggleDisplayKeysXero = this.toggleDisplayKeysXero.bind(this);
    this.updateConsumerKey = this.updateConsumerKey.bind(this);
    this.updateConsumerSecret = this.updateConsumerSecret.bind(this);
    this.submitXeroAPIKeys = this.submitXeroAPIKeys.bind(this);
  }

  // Hides or shows the Xero details editor
  toggleDisplayKeysXero() {
    if(this.state.key_button_text == 'Update Xero Connection') {
      $('#xero-manager').fadeIn('slow');
      this.setState({key_button_text: 'Cancel Update Xero Connection'});
    }
    else {
      $('#xero-manager').fadeOut('slow');
      this.setState({key_button_text: 'Update Xero Connection'});
    }
  }

  // Allows for the typing of the consumer key
  updateConsumerKey(event) {
    this.setState({consumer_key: event.target.value});
  }

  // Allows for the typing of the consumer secret
  updateConsumerSecret(event) {
    this.setState({consumer_secret: event.target.value});
  }

  // Allows for the user's Xero Keys to be sent to the database
  submitXeroAPIKeys() {
    MemberActions.updateXeroAPIKeys(this.state.consumer_key, this.state.consumer_secret);
  }

  render() {
    return (
      <div id='member-info-settings'>
        <input type='button' className='btn btn-primary' value='Add New User'/>
        <a className='btn btn-primary' href='/php/create_member_csv.php' target='_blank'>Export List as CSV</a>
        <input type='button'
          className='btn btn-primary'
          value={this.state.key_button_text}
          onClick={this.toggleDisplayKeysXero}
        />
        <div id='xero-manager'>
          <p>If you have not already, you will need to create an application on Xero by following this link:</p>
          <p><a href='https://app.xero.com/Application' target='_blank'>https://app.xero.com/Application</a></p>
          <p>Once you have created an application copy the Consumer Key and Secret into the following fields and press submit.</p>
          <input id='xero-consumer-key'
            type='text'
            placeholder='Enter Consumer Key...'
            value={this.state.consumer_key}
            onChange={e => this.updateConsumerKey(e)}
          />
          <input id='xero-consumer-secret'
            type='text'
            placeholder='Enter Consumer Secret...'
            value={this.state.consumer_secret}
            onChange={e => this.updateConsumerSecret(e)}
          />
          <input id='xero-submit'
            type='button'
            className='btn btn-success'
            value='Submit'
            onClick={this.submitXeroAPIKeys}
          />
        </div>
        <ul>
          <li><label>
            <input
              id='view-group-all'
              type='radio'
              checked={this.props.all}
              onChange={(e) => this.props.changeViewGroup(e)}
            />
            Show all {this.props.num_all} members of this chamber
          </label></li>
          <li><label>
            <input
              id='view-group-renewals'
              type='radio'
              checked={this.props.renewals}
              onChange={(e) => this.props.changeViewGroup(e)}
            />
            Show all {this.props.num_renewals} members of this chamber with upcoming renewals.
          </label></li>
          <li><label>
            <input
              id='view-group-archived'
              type='radio'
              checked={this.props.archived}
              onChange={(e) => this.props.changeViewGroup(e)}
            />
            Show all {this.props.num_archived} archived members
          </label></li>
        </ul>
        <input
          type='text'
          className='search'
          placeholder='Search members...'
          value={this.props.search_phrase}
          onChange={(e) => this.props.changeSearchPhrase(e)}
        />
      </div>
    );
  }
};

export default SettingsMenu;
