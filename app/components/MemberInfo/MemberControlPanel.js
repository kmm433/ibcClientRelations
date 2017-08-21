import React from 'react';
import $ from 'jquery';

class MemberControlPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search_criteria: '',
      delete_mode: false,
      add_mode: false
    };
  }

  // Changes the available control component
  toggleControlView(target) {
    console.log('Toggling the display.' + target);
    this.setState({
      delete_mode: false,
      add_mode: false
    });
    if (target === 'add')
      this.setState({add_mode: true});
    if (target === 'delete') {
      this.props.toggleDeleteMode();
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
          <li onClick={() => this.toggleControlView('export')}>Export List</li>
          <li onClick={() => this.toggleControlView('delete')}>Delete Member</li>
        </ul>
        <div className='search'>
          <input id='search-box' type='text' placeholder='Search...'
            value={this.state.search_criteria} onChange={(e) => this.handleSearch(e)}/>
        </div>
        {this.state.add_mode ? <p>Enter the users details to continue.</p>:''}
        {this.state.delete_mode ? <p>Click a member to remove them.</p> : ''}
      </div>
    );
  }
}

export default MemberControlPanel;
