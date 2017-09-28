import React from 'react';
import * as GroupActions from '../../Actions/GroupActions.js';

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hover: false};
    this.toggleHover = this.toggleHover.bind(this);
    this.updateChecked = this.updateChecked.bind(this);
  }

  toggleHover() {
    this.setState({hover: !this.state.hover});
  }

  updateChecked(event) {
    this.props.updateSelectedGroups(this.props.group_id, event.target.checked);
  }

  render() {
    var hoverState;
    if (this.state.hover) {
      hoverState = {backgroundColor: '#E5E5E5'};
    } else {
      hoverState = {backgroundColor: '#FFFFFF'};
    }
    return(
      <div className='group' style={hoverState} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
        <div className='group-selected'>
          <input type='checkbox'
            defaultChecked={this.props.selected}
            onClick={e => this.updateChecked(e)}
          />
        </div>
        <div className='group-name'>{this.props.group_name}</div>
        <div className='group-size'>{this.props.group_size}</div>
        <div className='group-emailable'>{this.props.email_ready ? 'Yes': 'No'}</div>
      </div>
    );
  }
};

export default Group;
