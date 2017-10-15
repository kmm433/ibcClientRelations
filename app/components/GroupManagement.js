import React from 'react';
import $ from 'jquery';
import GroupStore from '../Stores/GroupStore.js';
import * as GroupActions from '../Actions/GroupActions.js';
import Group from './GroupManagement/Group.js';

class GroupManagement extends React.Component {

  constructor(props) {
    super();
    this.state = {
      loading: true,
      mail_ready: null,
      create_button_text: 'Create New Group',
      key_button_text: 'Update MailChimp API Key',
      new_group_name: '',
      api_key_input: '',
      duplicate_group: false,
      duplicate_warning: false,
      search_phrase: '',
      groups: GroupStore.getGroups(),
      selected_groups:GroupStore.getSelectedGroups(),
      group_members: '',
      edit_mode: false,
    };

    this.updateValues = this.updateValues.bind(this);
    this.updateAPIKey = this.updateAPIKey.bind(this);
    this.toggleDisplayCreateGroup = this.toggleDisplayCreateGroup.bind(this);
    this.toggleDisplayEnterKey = this.toggleDisplayEnterKey.bind(this);
    this.handleCreateGroup = this.handleCreateGroup.bind(this);
    this.deleteSelectedGroups = this.deleteSelectedGroups.bind(this);
    this.updateSelectedGroups = this.updateSelectedGroups.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.renderGroupMembers = this.renderGroupMembers.bind(this);
    this.renderGroups = this.renderGroups.bind(this);
  }

  componentWillMount() {
    GroupStore.on('change', this.updateValues);
    GroupActions.fetchGroups();
    GroupActions.updateGroupAllMembers();
  }

  componentWillUnmount() {
    GroupStore.removeListener('change', this.updateValues);
  }

  // Updates the list of groups from the store
  updateValues() {
    this.setState({
      groups: GroupStore.getGroups(),
      selected_groups: GroupStore.getSelectedGroups(),
      group_members: GroupStore.getGroupMembers(),
    });
  }

  // Allows the new group form to update
  updateNewGroupName(event) {
    var duplicate = false;
    const groups = this.state.groups;
    groups.forEach(group => {
      if (group !== undefined && group.group_name === event.target.value)
        duplicate = true;
    });
    this.setState({
      new_group_name: event.target.value,
      duplicate_group: duplicate,
      duplicate_warning: duplicate,
    });
  }

  // Allows the API Key form to be updated
  updateAPIKey(event) {
    this.setState({api_key_input: event.target.value});
  }

  // Toggles the dispay of the group createion form
  toggleDisplayCreateGroup() {
    if(this.state.create_button_text === 'Create New Group') {
      var duplicate = false;
      const groups = this.state.groups;
      const searchPhrase = this.state.search_phrase;
      $('#submit-create-group').fadeIn('slow');
      $('#new-group-form').fadeIn('slow');
      groups.forEach(group => {
        if (group !== undefined && group.group_name === searchPhrase)
          duplicate = true;
      });
      this.setState({
        create_button_text: 'Cancel',
        duplicate_warning: duplicate,
      });
    }
    else {
      $('#submit-create-group').fadeOut('slow');
      $('#new-group-form').fadeOut('slow');
      this.setState({
        create_button_text: 'Create New Group',
        duplicate_warning: false,
      });
    }
  }

  // Allows for the display of the API Key editor to be toggle
  toggleDisplayEnterKey() {
    if(this.state.key_button_text === 'Update MailChimp API Key') {
      $('#mailchimp-api-key-form').fadeIn('slow');
      $('#submit-api-key').fadeIn('slow');
      this.setState({key_button_text: 'Cancel'});
    }
    else {
      $('#mailchimp-api-key-form').fadeOut('slow');
      $('#submit-api-key').fadeOut('slow');
      this.setState({key_button_text: 'Update MailChimp API Key'});
    }
  }

  // Allows for an exeutive to create a new group
  handleCreateGroup(event) {
    if(!this.state.duplicate_group && this.state.new_group_name !== '') {
      GroupActions.createGroup(this.state.new_group_name);
      this.setState({new_group_name: ''});
      this.toggleDisplayCreateGroup();
    }
  }

  // Allows for an executive to delete a set of groups
  deleteSelectedGroups() {
    const groups = this.state.selected_groups;
    var decision = confirm('Are you sure you want to delete the selected groups?');
    if (decision) {
      GroupActions.deleteGroups(groups);
    }
  }

  handleSubmitKey(event) {
    const apiKey = this.state.api_key_input;
    GroupActions.updateAPIKey(apiKey);
    this.toggleDisplayEnterKey();
  }

  // Alllows for the search phrase to be updated when the input form changes
  updateSearchPhrase(event) {
    this.setState({search_phrase: event.target.value});
  }

  // Allows for a group to be selected or unslected
  updateSelectedGroups(group, selected) {
     var selectedGroups = this.state.selected_groups;
     if (selected) {
       selectedGroups.push(group);
     }
     else {
       var index = selectedGroups.indexOf(group);
       selectedGroups.splice(index, 1);
     }
     GroupActions.updateGroupSelection(selectedGroups);
  }

  // Allows for the enabling/disabling of the mail list id edit mode.
  toggleEditMode() {
    this.setState({edit_mode: !this.state.edit_mode});
  }

  renderGroupMembers() {
    const groupMembers = this.state.group_members;
    if (groupMembers !== '') {
      return(
        <div>
          <h3>The following users are in the selected groups:</h3>
          <div id='group-members'>
            <p>{groupMembers}</p>
          </div>
        </div>
      );
    }
  }

  // Allows for the list of groups to be rendered.
  renderGroups() {
    const groups = this.state.groups;
    const searchPhrase = this.state.search_phrase.toLowerCase();
    var groupComponents = groups.map((group, i) => {
      // Remove any undefined entries  and filter the groups by the search term
      if (group!== undefined && group.group_id !== undefined)
        if (searchPhrase === '' || group.group_name.toLowerCase().indexOf(searchPhrase) !== -1) {
          return(
            <Group
              key={i}
              group_id={group.group_id}
              group_name={group.group_name}
              email_ready={group.email_ready}
              group_size={group.group_size}
              selected={group.selected}
              editable={this.state.edit_mode}
              updateSelectedGroups={this.updateSelectedGroups}
            />
          );
        }
    });
    return groupComponents;
  }

  render() {
    if (this.props.user_type !== '1') {
      return (
        <div className='main-component'>
          <p>Error: Access not permitted.</p>
        </div>
      );
    }
    else {
      return (
        <div className='main-component w3-row' id='group-management'>
          <div className='w3-col s12'>
            <div className='w3-container w3-card-4 w3-light-grey'>
              <h2>Manage Groups</h2>
              <div className='group-management-options'>
                <input id='new-group-form'
                  type='text'
                  placeholder='Enter a new group name...'
                  value={this.state.new_group_name}
                  onChange={(e) => {this.updateNewGroupName(e)}}
                />
                <input id='submit-create-group'
                  type='button'
                  className='btn btn-success'
                  value='Create'
                  onClick={e => this.handleCreateGroup(e)}
                />
                <input id='create-group-button'
                  type='button'
                  className='btn btn-primary'
                  value={this.state.create_button_text}
                  onClick={() => this.toggleDisplayCreateGroup()}
                />
                <a className='btn btn-primary' href={'mailto:?bcc=' + this.state.group_members}>Email Selected Groups</a>
                <input id='mailchimp-api-key-form'
                  type='text'
                  placeholder='Enter MailChimp API key...'
                  onChange={e => this.updateAPIKey(e)}
                  value={this.state.api_key_input}
                />
                <input id='submit-api-key'
                  type='button'
                  className='btn btn-success'
                  value='Submit'
                  onClick={e => this.handleSubmitKey(e)}
                />
                <input type='button'
                  className='btn btn-primary'
                  value={this.state.key_button_text}
                  onClick={() => this.toggleDisplayEnterKey()}
                />
                <input id='group-edit-mode'
                  type='button'
                  className='btn btn-primary'
                  value={this.state.edit_mode ? 'Stop Changing List IDs' : 'Change MailChimp List IDs'}
                  onClick={() => this.toggleEditMode()}
                />
                <input id='delete-group-button'
                  type='button'
                  className='btn btn-danger'
                  value='Delete Selected Groups'
                  onClick={() => this.deleteSelectedGroups()}
                />
              </div>
              {(this.state.duplicate_group && this.state.duplicate_warning) ?
                <div id='duplicate-group-warning' className='alert alert-danger'>This group name is already in use.</div> : null
              }
              {this.renderGroupMembers()}
              <input id='group_search_form'
                type='text'
                placeholder='Search groups by name...'
                value={this.state.search_phrase}
                onChange={e => this.updateSearchPhrase(e)}
              />
              <div className='groups-table'>
                <div className='groups-table-headers'>
                  <div className='groups-table-title'>Selected Groups</div>
                  <div className='groups-table-title'>Group Name</div>
                  <div className='groups-table-title'>Number of Members</div>
                  <div className='groups-table-title'>MailChimp List ID</div>
                </div>
                {this.renderGroups()}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
};

export default GroupManagement;
