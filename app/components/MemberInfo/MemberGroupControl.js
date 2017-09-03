import React from 'react';
import $ from 'jquery';

class MemberGroupControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      display_add_group: false,
      display_delete_group: false,
      selected_groups: []
    }
    this.handleCreateGroup = this.handleCreateGroup.bind(this);
    this.handleDeleteGroup = this.handleDeleteGroup.bind(this);
    this.updateChecklist = this.updateChecklist.bind(this);
    this.renderGroups = this.renderGroups.bind(this);
  }

  // Toggle the display of adding a group
  handleCreateGroup() {
    this.setState({
      display_add_group: true,
      display_delete_group: false
    });
  }

  // Allows an executive to delete an exisitng group
  handleDeleteGroup() {
    this.setState({
      display_add_group: false,
      display_delete_group: true
    });
  }

  // Updates the state of the user's selected gorups
  updateChecklist(event) {
    var selectedGroups = this.state.selected_groups;
    if (event.target.checked) {
      selectedGroups.push(event.target.id);
    }
    else {
      for(var i=0; i < selectedGroups.length; i++)
        if (selectedGroups[i] === event.target.id)
          selectedGroups.splice(i, 1);
    }
    this.setState({groups: selectedGroups});
    //this.props.updateSelectedGroups(selectedGroups);
  }

  renderGroups() {
    if (this.props.groups !== null) {
      var groups = this.props.groups.map((group) =>
        <li key={group}>
          <input type='checkbox' id={group} onChange={(e) => this.updateChecklist(e)}/> {group}
        </li>
      );
      return(
          <ul>
            {groups}
          </ul>
      );
    }
    return null;
  }

  render() {
    return (
      <div className='panel panel-body' id='member-group-control'>
        <button className='btn' onClick={this.handleCreateGroup}>Create New Group</button>
        <button className='btn' onClick={this.handleDeleteGroup}>Delete Groups</button>
        <AddGroupControls
          display={this.state.display_add_group}
          updateGroups={this.props.updateGroups}
        />
        <DeleteGroupControls
          display={this.state.display_delete_group}
          selected_groups={this.state.selected_groups}
          updateGroups={this.props.updateGroups}
        />
        <p>Current Groups:</p>
        {this.renderGroups()}
      </div>
    );
  }
};

// This component has the input field and confirmation button for adding a group
class AddGroupControls extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      groupName:'',
      status: ''
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleNameChange(event) {
    this.setState({groupName: event.target.value});
  }

  //TODO: Add a visual indication success / failure
  // Allows an exectutive to greate a new group
  handleCreate() {
    $.ajax({
      url: '/php/create_group.php',
      type: 'POST',
      dataType: 'json',
      data: {
        'groupName': this.state.groupName
      },
      success: function(response) {
        if(response === 'Successfully created group')
          this.setState({status: 'success'});
        else
          this.setState({status: 'failure'});
      }.bind(this),
      error: function(response) {
        this.setState({status: 'failure'});
      }.bind(this)
    });
    this.props.updateGroups();
  }

  render() {
    return (
      <div>
        {this.props.display ?
          <div>
            <input type='text' id='group-name' value={this.state.groupName} onChange={(e) => this.handleNameChange(e)}/>
            <button className='btn btn-success' onClick={this.handleCreate}>Create</button>
          </div>
        : null}
        {(this.state.status === 'success' && this.props.display) ?
          <div className='alert alert-success'>Successfully created group.</div>:null}
        {(this.state.status === 'failure' && this.props.display) ?
          <div className='alert alert-danger'>Failed to created group.</div>:null}
      </div>
    );
  }
};

class DeleteGroupControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {status: ''};
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(props) {
    const selectedGroups = this.props.selected_groups;
    $.ajax({
      url: '/php/delete_group.php',
      type: 'POST',
      dataType: 'json',
      data: {
        'groupNames': selectedGroups
      },
      success: function(response) {
        if(response === 'Successfully deleted groups')
          this.setState({status: 'success'});
        else
          this.setState({status: 'failure'});
      }.bind(this),
      error: function(response) {
        this.setState({status: 'failure'});
      }.bind(this)
    });
    this.props.updateGroups();
  }

  render() {
    return (
      <div>
        {this.props.display ?
          <div>
            <p>Select the groups that you wish to delete then press the delete button.<br/>
              <b>This action can not be undone. Please ensure you have the correct selection.</b>
            </p>
            <button className='btn btn-danger' onClick={this.handleDelete}>Delete Selected Groups</button>
          </div>
        : null}
        {(this.state.status === 'success' && this.state.display) ?
          <div className='alert alert-success'>Successfully deleted groups.</div>:null}
        {(this.state.status === 'failure' && this.state.display) ?
          <div className='alert alert-danger'>Failed to delete groups.</div>:null}
      </div>
    );
  }
};

export default MemberGroupControl;
