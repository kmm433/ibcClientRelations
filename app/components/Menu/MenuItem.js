import React from 'react';

class MenuItem extends React.Component {
  constructor() {
    super();
    this.state = {hover: false};
    this.toggleHover = this.toggleHover.bind(this);
  }

  toggleHover() {
    this.setState({hover: !this.state.hover});
  }

  render() {
    var hoverState;
    if (this.state.hover) {
      hoverState = {backgroundColor: '#2F7AD3'};
    } else {
      hoverState = {backgroundColor: '#2462AB'};
    }
    return(<li style={hoverState}
      onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
      <a href={this.props.link}>{this.props.text}</a></li>);
  }
};

export default MenuItem;
