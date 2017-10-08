import React from 'react';
import Menu from './Menu.js';
import ReactRouter from 'react-router-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import NoticeBoard from './NoticeBoard';
import Calendar from './Calendar';
import MemberInformation from './MemberInformation';
import GroupManagement from './GroupManagement';
import EditSignup from './Signup/EditSignupParent';
import AdminMenu from './AdminMenu'
import NewChamber from './Admin/CreateChamber'
import create_notice from './CreateNotice';

//This component is responsibe for displaying the menu and the main item component.
class Layout extends React.Component {
    constructor(props){
        super(props);

        console.log("The user in Layout is: ", this.props.user_type)
        this.renderNormalUser = this.renderNormalUser.bind(this);
        this.renderAdmin = this.renderAdmin.bind(this);
        this.renderPage = this.renderPage.bind(this);
    }

    renderNormalUser(){
        console.log("Rendering should be normal user: ", this.props.first_name)
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
                <Route path='/manage_groups' render={() => <GroupManagement chamber_id={this.props.chamber_id}/>} />
                <Route path='/upcoming_events' component={Calendar} />
                <Route path='/edit_signup' component={EditSignup} />
                <Route path='/create_notice' component={create_notice} />
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
    renderPage(){
        if(this.props.user_type === "1" || this.props.user_type === "0"){
            console.log("Checking: ", this.props.user_type)
            return(
                (this.props.user_type === '1') ?  this.renderNormalUser() : this.renderAdmin()
            )
        }
        else{
            return null;
        }
    }

  render() {
    console.log('User type is: ', this.props.user_type)
    return (
      <div className="establish-fonts">
          {this.renderPage()}
      </div>
    );
  }
};

export default Layout;
