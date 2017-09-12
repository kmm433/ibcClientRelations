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
    this.renderExpiry = this.renderExpiry.bind(this);
  }

  // Handles the selection of a member
  handleSelect(event) {
    const currentSelected = this.state.selected;
    this.setState({
      selected: !currentSelected
    });
  }

  // Allows a list item to be unselected
  unselect(event) {
    this.setState({
      selected: false
    });
    event.stopPropagation();
  }

  renderExpiry() {
    var warning=null;
    var warningWindow = new Date();

    // Splice the datestring into a usable date object
    var expiryString = this.props.expiry;
    var expiryDateComponents;
    var expiryDate = null;
    if (expiryString) {
      var date = expiryString.split(' ');
      expiryDateComponents = date[0].split('-');
      expiryDate = new Date(expiryDateComponents[0], parseInt(expiryDateComponents[1]) - 1, expiryDateComponents[2]);
    }
    // Check if in warning phase or already expired
    if(expiryDate && (expiryDate < warningWindow))
      warning='danger';
    else{
      warningWindow.setDate(warningWindow.getDate() + 14);
      if (expiryDate && (expiryDate < warningWindow))
        warning='warning';
    }
    if (warning) {
      return (<div className={'alert alert-'+warning+' member-list-item-field'}>{this.props.expiry}</div>);
    }
    else {
      return (<div className='member-list-item-field'>{this.props.expiry}</div>);
    }
  }

  render() {
    return (
      <div className='member-details-block'>
        <div className='member-list-item' onClick={(e) => this.handleSelect(e)}>
          <div className='member-list-item-field'>{this.props.first_name}</div>
          <div className='member-list-item-field'>{this.props.last_name}</div>
          <div className='member-list-item-field'>{this.props.email}</div>
          <div className='member-list-item-field'>{this.props.business}</div>
          {this.renderExpiry()}
        </div>
        <div className='details-full'>
          {this.state.selected ?
            <MemberDetails
              member={this.props.email}
              expiry={this.props.expiry}
              selected={this.state.selected}
              unselect={this.unselect}
              chamber_id={this.props.chamber_id}
              all={this.props.all}
              renewals={this.props.renewals}
              archived={this.props.archived}
              getChamberMembers={this.props.getChamberMembers}
            />
            : null
          }
        </div>
      </div>
    );
  }
};

export default MemberListItem;
