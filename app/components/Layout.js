import React from 'react';
import Menu from './Menu.js';
import ReactRouter from 'react-router-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import NoticeBoard from './NoticeBoard';
import Calendar from './Calendar';
import BusinessProfile from './BusinessProfile';
import Form from './Signup/form';
import MemberInfo from './MemberInfo';
import Help from './Help';

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
          <div id="content">
            <Route exact={true} path='/' component={NoticeBoard} />
            <Route exact={true} path='/index.php' component={NoticeBoard} />
            <Route path='/calendar' component={Calendar} />
            <Route path='/my_business' component={BusinessProfile} />
            <Route path='/business/:businessId' component={BusinessProfile} />
            <Route path='/member_information' component={MemberInfo} />
            <Route path='/upcoming_events' component={Calendar} />
            <Route path='/edit_signup' component={Form} />
            <Route path='/help' component={Help} />
          </div>
      </div>
    );
  }
};

export default Layout;
