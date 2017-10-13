import React from 'react';
import {NavLink} from 'react-router-dom';

class BottomMenu extends React.Component {
  render() {
    return (
      <div id='bottom-menu'>
        <div id='bottom-menu-list'>
          <ul>
            <li>
              <NavLink exact activeClassName='active-route' to='/'>
                <span className='glyphicon glyphicon-home'></span>
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName='active-route' to='/profile'>
                <span className='glyphicon glyphicon-user'></span>
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName='active-route' to='/upcoming_events'>
                <span className='glyphicon glyphicon-calendar'></span>
              </NavLink>
            </li>
            <ExecBottomMenu user_type={this.props.user_type} />
          </ul>
          <div>
            <ul>
              <a href='/php/process_signout.php'><span className='glyphicon glyphicon-log-out'></span></a>
              <li>
                <NavLink activeClassName='active-route' to='/help'>
                  <span className='glyphicon glyphicon-question-sign'></span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
};

class ExecBottomMenu extends React.Component {
  render() {
    if (this.props.user_type !== '1'){
      return null;
    }
    else {
      return (
        <div>
            <li>
              <NavLink activeClassName='active-route' to='/create_notice'>
                  <span className='glyphicon glyphicon-plus'></span>
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName='active-route' to='/results'>
                  <span className='glyphicon glyphicon-signal'></span>
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName='active-route' to='/member_information'>
                <span className='glyphicon glyphicon-th-list'></span>
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName='active-route' to='/manage_groups'>
                <span className='glyphicon glyphicon-list-alt'></span>
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName='active-route' to='/edit_signup'>
                  <span className='glyphicon glyphicon-text-height'></span>
              </NavLink>
            </li>
        </div>
      );
    }
  }
};

export default BottomMenu;
