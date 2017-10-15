import React from 'react';
import Menu from './Menu.js';
import ReactRouter from 'react-router-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import NoticeBoard from './NoticeBoard';
import Calendar from './Calendar';
import MemberInformation from './MemberInformation';
import EditSignup from './Signup/EditSignupParent';
import AdminMenu from './AdminMenu';
import CreateChamber from './Admin/AdminData';
import create_notice from './CreateNotice';
import DisableChamber from './Admin/DisableChamber';
import EnableChamber from './Admin/EnableChamber';
import ContactUs from './ContactUs/ContactUs';

//This component is responsibe for displaying the menu and the main item component.
class Layout extends React.Component {
    constructor(props){
        super(props);

        this.renderNormalUser = this.renderNormalUser.bind(this);
        this.renderAdmin = this.renderAdmin.bind(this);
        this.renderPage = this.renderPage.bind(this);
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
                <Route exact={true} path='/' render={()=> <NoticeBoard user_type={this.props.user_type} />}/>
                <Route exact={true} path='/index.php' render={()=> <NoticeBoard user_type={this.props.user_type} />}/>
                <Route path='/profile' component={Calendar} />
                <Route path='/member_information' render={()=> <MemberInformation chamber_id={this.props.chamber_id}/>} />
                <Route path='/upcoming_events' component={Calendar} />
                <Route path='/edit_signup' render={()=> <EditSignup usertype={this.props.user_type}/>}/>
                <Route path='/create_notice' component={create_notice} />
                <Route path='/contact_us' component={ContactUs} />
                <Route path='/help' component={Calendar} />
              </div>
            </div>

        )
    }

    renderAdmin(){
        return(
            <div>
                <AdminMenu/>
            <Route exact={true} path='/' component={Calendar}/>
            <Route exact={true} path='/index.php' component={Calendar}/>
            <Route path='/create_chamber' component={CreateChamber} />
            <Route path='/delete_chamber' component={DisableChamber} />
            <Route path='/enable_chamber' component={EnableChamber} />
            </div>
        )

    }
    renderPage(){
        if(this.props.user_type){
            return(
                this.props.user_type !== '0' ? this.renderNormalUser() : this.renderAdmin()
            )
        }
        else{
            return null;
        }
    }

  render() {
    return (
      <div className="establish-fonts">
          {this.renderPage()}
      </div>
    );
  }
};

export default Layout;
