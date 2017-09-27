import React from 'react';
import GroupStore from '../Stores/GroupStore.js';
import * as GroupActions from '../Actions/GroupActions.js';
import Group from './GroupManagement/Group.js';

class GroupManagement extends React.Component {

  constructor(props) {
    super();
    this.state = {
      loading: true,
      mail_ready: null,
      new_group_name: '',
      duplicate_group: false,
      groups: GroupStore.getGroups(),
    };

    this.updateValues = this.updateValues.bind(this);
    this.handleCreateGroup = this.handleCreateGroup.bind(this);
  }

  componentWillMount() {
    GroupStore.on('change', this.updateValues);
    GroupActions.fetchGroups();
  }

  componentWillUnmount() {
    GroupStore.removeListener('change', this.updateValues);
  }

  // Updates the list of groups from the store
  updateValues() {
    this.setState({groups: GroupStore.getGroups()});
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
    });
  }

  // Allows for an exeutive to create a new group
  handleCreateGroup(event) {
    if(!this.state.duplicate_group) {
      GroupActions.createGroup(this.state.new_group_name);
      this.setState({new_group_name: ''});
    }
  }

  render() {
    const groups = this.state.groups;
    var groupComponents = groups.map((group, i) => {
      if (group!== undefined && group.group_id !== undefined)
        return(
          <Group
            key={i}
            group_id={group.group_id}
            group_name={group.group_name}
            email_ready={group.email_ready}
            group_size={group.group_size}
          />
        );
    });
    return (
      <div className='main-component w3-row' id='group-management'>
        <div className='w3-col s12'>
          <div className='w3-container w3-card-4 w3-light-grey'>
            <h2>Manage Groups</h2>
            <div id='create-group_inputs'>
              <input id='new-group-form'
                type='text'
                placeholder='Enter a new group name...'
                value={this.state.new_group_name}
                onChange={(e) => {this.updateNewGroupName(e)}}
              />
              <input
                type='button'
                className='btn btn-primary'
                value='Create New Group'
                onClick={e => this.handleCreateGroup(e)}
              />
            </div>
            {this.state.duplicate_group ?
              <div className='alert alert-danger'>This group name is already in use.</div> : null
              }
            <div className='groups-table'>
              <div className='groups-table-headers'>
                <div className='groups-table-title'>Group Name</div>
                <div className='groups-table-title'>Number of Members</div>
                <div className='groups-table-title'>Syncronized to Mailchimp</div>
              </div>
              {groupComponents}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default GroupManagement;
