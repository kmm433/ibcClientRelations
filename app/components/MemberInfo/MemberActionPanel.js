import React from 'react';

class MemberActionPanel extends React.Component {

  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
  }

  // Unselect the previously chosen user and hide the confirmation menu.
  handleCancel() {
    this.props.setSelectedUser(null);
    this.props.setActionType(null);
  }


  // Determines whether the delete confirmation box should be shown, and the user selected.
  renderControlPanel(user) {
    // If edit mode is entered render editable user details
    if (this.props.action_type === 'edit') {
      return (
        <div className='alter alert-warning'>
          <button className='btn btn-warning confirmation-button'>Confirm</button>
          <button className='btn confirmation-button' onClick={this.handleCancel}>Cancel</button>
        </div>
      );
    }
    // If delete mode is entered render delete confirmation
    else if (this.props.action_type === 'delete') {
      return (
        <div className='alert alert-danger'>
          <p>
            Are you sure that you want to delete {this.props.selected_user['firstname']} {this.props.selected_user['lastname']}?
          </p>
          <button className='btn btn-danger confirmation-button'>Delete User</button>
          <button className='btn confirmation-button' onClick={this.handleCancel}>Cancel</button>
        </div>
      );
    }
    else if (this.props.action_type === 'comment') {
      return (
        <div className = 'alert alert-info'>
          <p>Comment Section Placeholder {this.props.user}</p>
        </div>
      );
    }
  }

  render () {
    return (
      <div>
        {this.renderControlPanel()}
      </div>
    );
  }
};

export default MemberActionPanel;
