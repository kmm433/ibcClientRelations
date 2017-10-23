import React from 'react';
import {NavLink} from 'react-router-dom';

class AdminMenu extends React.Component {


  constructor(props) {
      super(props);
  }

  render() {
    return(
    <div className='admin-side-menu'>
      <ul>
        <li>
            <NavLink exact activeClassName='active-route' to='/create_chamber'>
                CREATE A NEW CHAMBER
            </NavLink>
        </li>
        <li>
            <NavLink activeClassName='active-route' to='/delete_chamber'>
                DELETE A CHAMBER
            </NavLink>
        </li>
        <li>
            <NavLink activeClassName='active-route' to='/enable_chamber'>
                ENABLE A CHAMBER
            </NavLink>
        </li>
        <li>
            <NavLink activeClassName='active-route' to='/merge_chamber'>
                MERGE A CHAMBER
            </NavLink>
        </li>
      </ul>

      <div id="bottom-options">
        <ul>
          <li>
            <a href="php/process_signout.php">Sign Out</a></li>
        </ul>
      </div>
    </div>
    );
  }
};

export default AdminMenu;
