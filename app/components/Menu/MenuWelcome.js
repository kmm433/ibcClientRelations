import React from 'react';

class MenuWelcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {greeting: <h1>Welcome</h1>};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({greeting: <h1>Welcome {nextProps.first_name}</h1>});
  }

  render(){
    return(
      <div id="menu-welcome">
          <h1>NSW BUSINESS CHAMBER</h1>
        {this.state.greeting}
      </div>
    );
  }
};

export default MenuWelcome;
