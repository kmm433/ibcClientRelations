import React from 'react';
import Menu from './Menu.js';
import ReactRouter from 'react-router-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import NoticeBoard from './NoticeBoard';
import Calendar from './Calendar';
import Form from './Signup/EditSignupForm';
import MemberInfo from './MemberInfo';
import AdminMenu from './AdminMenu'
import NewChamber from './Admin/CreateChamber'

//This component is responsibe for displaying the menu and the main item component.
class Layout extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            user_type: props.user_type
        }

        console.log("The user is: ", this.props.user_type)
    }

    renderNormalUser(){
        return(
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
                  <Route path='/member_information' component={MemberInfo} />
                  <Route path='/upcoming_events' component={Calendar} />
                  <Route path='/edit_signup' component={Form} />
                  <Route path='/help' component={Calendar} />
                </div>
            </div>

        )
    }

    renderAdmin(){
        return(
            <div>
                <AdminMenu/>
                <Route path='/create_chamber' component={NewChamber} />
            </div>
        )

    }

  render() {
    return (
      <div>
          {console.log("The user is: ", this.props.user_type)}
          {(this.props.user_type != 0) ? this.renderNormalUser() : this.renderAdmin()}
      </div>
    );
  }
};

export default Layout;
