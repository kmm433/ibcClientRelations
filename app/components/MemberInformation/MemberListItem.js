import React from 'react';

class MemberListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
    this.toggleHover = this.toggleHover.bind(this);
    this.renderExpiry = this.renderExpiry.bind(this);
  }

  // Toggles the hover indicator
  toggleHover() {
    this.setState({hover: !this.state.hover});
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
    var hoverState;
    if (this.state.hover) {
      hoverState = {backgroundColor: '#E5E5E5'};
    } else {
      hoverState = {backgroundColor: '#FFFFFF'};
    }

    return (

      <div className='member-details-block' style={hoverState}
        onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
        <div className='member-list-item' onClick={() => {this.props.setMemberView(this.props.email, this.props.memberID, this.props.expiry), this.toggleHover()}}>
          <div className='member-list-item-field'>{this.props.first_name}</div>
          <div className='member-list-item-field'>{this.props.last_name}</div>
          <div className='member-list-item-field'>{this.props.email}</div>
          <div className='member-list-item-field'>{this.props.business}</div>
          {this.renderExpiry()}
        </div>
      </div>
    );
  }
};

export default MemberListItem;
