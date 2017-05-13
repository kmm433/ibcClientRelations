import React from 'react';
import MenuItem from './Menu/MenuItem.js';
import MenuLogo from './Menu/MenuLogo.js';
import MenuWelcome from './Menu/MenuWelcome.js';

class Menu extends React.Component {
  render() {
    return(
      <div className='side-menu'>
        <MenuLogo />
        <MenuWelcome />
        <ul>
          <MenuItem text="My Profile" link="http://www.google.com"/>
          <MenuItem text="Calendar" link="http://www.google.com"/>
          <MenuItem text="Member Information" link="http://www.google.com"/>
          <MenuItem text="Upcoming Events" link="http://www.google.com"/>
        </ul>
        <div id="bottom-options">
          <ul>
            <MenuItem text="Sign Out" link="php/process_signout.php" />
            <MenuItem text="Help" link="https://facebook.com" />
          </ul>
        </div>
      </div>
    );
  }
};

export default Menu;
