import React from 'react';

class MemberActionPanel extends React.Component {

  constructor(props) {
    super(props);
    this.handleCancelDelete = this.handleCancelDelete.bind(this);
  }
  // Unselect the previously chosen user and hide the confirmation menu.
  handleCancelDelete() {
    this.props.setSelectedUser(null);
    this.props.setActionType(null);
  }

  // Determines whether the delete confirmation box should be shown, and the user selected.
  renderDeleteConfirmation(user) {
    if (this.props.action_type === 'delete') {
      return (
        <div className='alert alert-danger'>
          <p>
            Are you sure that you want to delete {this.props.selected_user['firstname']} {this.props.selected_user['lastname']}?
          </p>
          <button className='btn btn-danger confirmation-button'>Delete User</button>
          <button className='btn confirmation-button' onClick={this.handleCancelDelete}>Cancel</button>
        </div>
      );
    }
  }

  render () {
    return (
      <div>
        {this.renderDeleteConfirmation()}
      </div>
    );
  }
};

export default MemberActionPanel;
