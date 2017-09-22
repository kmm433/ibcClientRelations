import React from 'react';
import $ from 'jquery';

class SettingsMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {downloading: false};
    this.downloadCSV = this.downloadCSV.bind(this);
  }

  // Fucntion to handle the dowload of a CSV
  // Sends a field in th epost method for checking on the server side.
  downloadCSV(event) {
    console.log('Exporting');
    window.open('/php/create_member_csv.php');
  }

  render() {
    return (
      <div id='member-info-settings'>
        <input type='button' className='btn btn-primary' value='Add New User'/>
        <input
          type='button'
          className='btn btn-primary'
          value='Export List as CSV'
          onClick={e => this.downloadCSV(e)}
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
        <input
          type='text'
          className='search'
          placeholder='Search members...'
          value={this.props.search_phrase}
          onChange={(e) => this.props.changeSearchPhrase(e)}
        />
      </div>
    );
  }
};

export default SettingsMenu;
