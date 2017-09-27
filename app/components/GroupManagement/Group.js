import React from 'react';

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hover: false};
    this.toggleHover = this.toggleHover.bind(this);
  }

  toggleHover() {
    this.setState({hover: !this.state.hover});
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
        <div className='group-name'>{this.props.group_name}</div>
        <div className='group-size'>{this.props.group_size}</div>
        <div className='group-emailable'>{this.props.email_ready ? 'Yes': 'No'}</div>
      </div>
    );
  }
};

export default Group;
