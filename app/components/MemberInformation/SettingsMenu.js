import React from 'react';

class SettingsMenu extends React.Component {
  render() {
    return (
      <div id='member-info-settings'>
        <input
          type='text'
          className='search'
          placeholder='Search members...'
          value={this.props.search_phrase}
          onChange={(e) => this.props.changeSearchPhrase(e)}
        />
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
        <input type='button' className='btn btn-primary' value='Add New User'/>
        <input type='button' className='btn btn-primary' value='Export List as CSV'/>
      </div>
    );
  }
};

export default SettingsMenu;
