import React from 'react';
import {NavLink} from 'react-router-dom';
import MenuItem from './MenuItem.js';
import MenuLogo from './MenuLogo.js';
import MenuWelcome from './MenuWelcome.js';

class SideMenu extends React.Component {

  render() {
    return (
      <div className='side-menu'>
        <MenuLogo/>
          <hr className = "welcome-divider" />
        <MenuWelcome first_name={this.props.first_name}/>
        <ul>
          <li>
            <NavLink exact activeClassName='active-route' to='/'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName='active-route' to='/profile'>
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName='active-route' to='/upcoming_events'>
              Upcoming Events
            </NavLink>
          </li>
          <li>
              <NavLink activeClassName='active-route' to='/contact_us'>
                    Contact Us
              </NavLink>
          </li>
          <ExecSideMenu user_type={this.props.user_type} />
        </ul>
        <div id="bottom-options">
          <ul>
            <MenuItem text="Sign Out" link="/php/process_signout.php" />
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

class ExecSideMenu extends React.Component {
  render() {
    if (this.props.user_type !== '1'){
      return null;
    }
    else {
      return (
        <div>
            <li>
              <NavLink activeClassName='active-route' to='/statistics'>
                  Statistics
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName='active-route' to='/create_notice'>
                  Create New Notice
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName='active-route' to='/results'>
                  Event / Survey Results
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName='active-route' to='/member_information'>
                Member Information
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName='active-route' to='/manage_groups'>
                Manage Groups
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName='active-route' to='/edit_signup'>
                  Edit Signup Form
              </NavLink>
            </li>
        </div>
      );
    }
  }
};

export default SideMenu;
