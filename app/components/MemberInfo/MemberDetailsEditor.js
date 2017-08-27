import React from 'react';

class MemberDetailsEditor extends React.Component {
  render () {
    return (
      <div className='panel panel-body'>
        <form>
          <label>
            First Name:
            <input type='text' />
          </label>
          <label>
            Last Name:
            <input type='text' />
          </label>
          <input type='submit' className='btn btn-warning confirmation-button' value='Confirm' />
          <button className='btn confirmation-button' onClick={this.handleCancel}>Cancel</button>
        </form>
      </div>
    );
  }
};

export default MemberDetailsEditor;
