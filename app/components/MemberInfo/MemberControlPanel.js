import React from 'react';
import $ from 'jquery';

class MemberControlPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {search_criteria: ''};
  }

  // Changes the available control component
  toggleControlView(target) {
    if (target === 'add')
      console.log('add mode.');
    if (target === 'edit') {
      this.props.toggleMode('edit');
      this.props.setSelectedUser(null);
      this.props.setActionType(null);
    }
    if (target === 'delete') {
      this.props.toggleMode('delete');
      this.props.setSelectedUser(null);
      this.props.setActionType(null);
    }
  }

  handleSearch(event) {
    this.setState({search_criteria: event.target.value});
    this.props.updateSearchCriteria(event.target.value);
  }

  render() {
    return(
      <div id='member-control-panel'>
        <ul>
          <li onClick={() => this.toggleControlView('add')}>Add New Member</li>
          <li onClick={() => this.toggleControlView('edit')}>Edit Member Details</li>
          <li onClick={() => this.toggleControlView('delete')}>Delete Member</li>
          <li onClick={() => this.toggleControlView('group')}>Manage Groups</li>
          <li onClick={() => this.toggleControlView('export')}>Export Information</li>
        </ul>
        <div className='search'>
          <input id='search-box' type='text' placeholder='Search...'
            value={this.state.search_criteria} onChange={(e) => this.handleSearch(e)}/>
        </div>
      </div>
    );
  }
}

export default MemberControlPanel;
