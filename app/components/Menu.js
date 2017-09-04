import React from 'react';
import {NavLink} from 'react-router-dom';
import MenuItem from './Menu/MenuItem.js';
import MenuLogo from './Menu/MenuLogo.js';
import MenuWelcome from './Menu/MenuWelcome.js';

class Menu extends React.Component {

  // By default set the executive menu to null so none is displayed.
  constructor(props) {
      super(props);
      this.state = {exec_menu: null};

      console.log("The user type is: ", props.user_type)
  }
/*
  // If the user is an executive update the menu such that it includes member options.
  componentWillReceiveProps(nextProps) {
    if (nextProps.user_type == 1) {
      var menu_items = (
          <div>
              <li>
                <NavLink activeClassName='active-route' to='/member_information'>
                  Member Information
                </NavLink>
              </li>
              <li><NavLink activeClassName='active-route' to='/edit_signup'>
                    Edit Signup Form
                  </NavLink></li>

          </div>
      );
      this.setState({exec_menu: menu_items});
    }
}*/
  renderExecStuff(){
      return(
          <div>
              <li>
                <NavLink activeClassName='active-route' to='/member_information'>
                  Member Information
                </NavLink>
              </li>
              <li><NavLink activeClassName='active-route' to='/edit_signup'>
                    Edit Signup Form
                  </NavLink></li>
          </div>
      );
  }


  render() {
    return(
    <div className='side-menu'>
      <MenuWelcome first_name={this.props.first_name}/>
      <ul>
        <li><NavLink exact activeClassName='active-route' to='/'>
          Home
        </NavLink></li>
        <li><NavLink activeClassName='active-route' to='/profile'>
          My Profile
        </NavLink></li>
        <li><NavLink activeClassName='active-route' to='/calendar'>
          Calendar
        </NavLink></li>
        <li><NavLink activeClassName='active-route' to='/upcoming_events'>
          Upcoming Events
        </NavLink></li>

        {/*The exec_menu will only by created if the user is type 1*/}
        {this.props.usertype ? renderExecStuff() : null}
      </ul>
      <div id="bottom-options">
        <ul>
          <MenuItem text="Sign Out" link="php/process_signout.php" />
          <li>
            <NavLink activeClassName='active-route' to='/help'>
              Help
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
    );
  }
};

export default Menu;
