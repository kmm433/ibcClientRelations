import React from 'react';
import MemberDetails from './MemberDetails.js'

class MemberListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      complete_details: null
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.unselect = this.unselect.bind(this);
  }

  // Handles the selection of a member
  handleSelect(event) {
    if (!this.state.selected)
      this.setState({
        selected: true,
      });
  }

  // Allows a list item to be unselected
  unselect(event) {
    this.setState({
      selected: false
    });
    event.stopPropagation();
  }

  render() {
    return (
      <div className='member-list-item' onClick={(e) => this.handleSelect(e)}>
        <div className='member-list-item-field'>{this.props.first_name}</div>
        <div className='member-list-item-field'>{this.props.last_name}</div>
        <div className='member-list-item-field'>{this.props.email}</div>
        <div className='member-list-item-field'>{this.props.business}</div>
        <div className='member-list-item-field'>{this.props.expiry}</div>
        {this.state.selected ?
          <MemberDetails
            member={this.props.email}
            selected={this.state.selected}
            unselect={this.unselect}
          />
          : null
        }
      </div>
    );
  }
};

export default MemberListItem;
