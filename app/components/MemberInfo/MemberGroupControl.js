import React from 'react';
import $ from 'jquery';

class MemberGroupControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      display_add_group: false
    }
    this.handleCreateGroup = this.handleCreateGroup.bind(this);
    this.handleDeleteGroup = this.handleDeleteGroup.bind(this);
  }

  // Toggle the display of adding a group
  handleCreateGroup() {
    this.setState({display_add_group: true});
  }

  // Allows an executive to delete an exisitng group
  handleDeleteGroup() {
    console.log('Deleting Stuff');
  }

  render() {
    return (
      <div className='panel panel-body'>
        <p>Current Groups:</p>
        <ul>
          <li>Some Group</li>
        </ul>
        <button className='btn' onClick={this.handleCreateGroup}>Create Group</button>
        <button className='btn' onClick={this.handleDeleteGroup}>Delete Group</button>
        <AddGroupControls display={this.state.display_add_group} />
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
        {this.state.status === 'success' ? <div className='alert alert-success'>Successfully created group.</div>:null}
        {this.state.status === 'failure' ? <div className='alert alert-danger'>Failed to created group.</div>:null}
      </div>
    );
  }
};

export default MemberGroupControl;
