import React from 'react';
import Menu from './Menu.js';
import ReactRouter from 'react-router-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import NoticeBoard from './NoticeBoard';
import Calendar from './Calendar';
import Form from './Signup/form';
import MemberInfo from './MemberInfo';

//This component is responsibe for displaying the menu and the main item component.
class Layout extends React.Component {

  render() {
    return (
      <div>
        <Menu
          user_type={this.props.user_type}
          first_name={this.props.first_name}
        />
        {/*This list defines all possible location that can be navigated to*/}
          <div>
            <Route exact={true} path='/' component={NoticeBoard} />
            <Route exact={true} path='/index.php' component={NoticeBoard} />
            <Route path='/calendar' component={Calendar} />
            <Route path='/profile' component={Calendar} />
            <Route path='/member_information' component={Calendar} />
            <Route path='/upcoming_events' component={Calendar} />
            <Route path='/edit_signup' component={Form} />
            <Route path='/help' component={Calendar} />
          </div>
        <Menu />
      </div>
    );
  }
};

export default Layout;
