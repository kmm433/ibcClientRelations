import React from 'react';

class MenuWelcome extends React.Component {

  render(){
    return(
      <div id="menu-welcome">
        {<h1>Welcome {this.props.first_name}</h1>}
      </div>
    );
  }
};

export default MenuWelcome;
