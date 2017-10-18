import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import SideMenu from './Menu/SideMenu.js';
import BottomMenu from './Menu/BottomMenu.js';
import ReactRouter from 'react-router-dom';
import NoticeBoard from './NoticeBoard';
import MemberInformation from './MemberInformation';
import InvoiceManagement from './InvoiceManagement';
import GroupManagement from './GroupManagement';
import EditSignup from './Signup/EditSignupParent';
import AdminMenu from './AdminMenu'
import CreateChamber from './Admin/AdminData';
import create_notice from './CreateNotice';
import UpcomingEvents from './UpcomingEvents';
import Results from './Results'
import Profile from './Profile'
import LinkSurvey from './NoticeBoard/LinkSurvey';
import LinkEvent from './NoticeBoard/LinkEvent';
import DisableChamber from './Admin/DisableChamber';
import EnableChamber from './Admin/EnableChamber';
import ContactUs from './ContactUs/ContactUs';
import Help from './Help'
import Statistics from './Statistics'
import AddUser from './ApproveNewUser/AddUser';

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
            <div id='layout'>
              <SideMenu user_type={this.props.user_type} first_name={this.props.first_name} />
              <BottomMenu user_type={this.props.user_type} first_name={this.props.first_name} />
              {/*This list defines all possible location that can be navigated to*/}
              <div>
                <Route exact={true} path='/' render={()=> <NoticeBoard user_type={this.props.user_type} />}/>
                <Route exact={true} path='/index.php' render={()=> <NoticeBoard user_type={this.props.user_type} />}/>
                <Route path='/profile' render={() => <Profile user_id={this.props.user_id} />}/>
                <Route path='/member_information' render={()=> <MemberInformation user_type={this.props.user_type} chamber_id={this.props.chamber_id}/>} />
                <Route path='/invoice/:user_id' render={(props) => <InvoiceManagement {...props} user_type={this.props.user_type}/>} />
                <Route path='/survey/:SurveyID' render={(props) => <LinkSurvey {...props} user_id={this.props.user_id}/>} />
                <Route path='/event/:EventID' render={(props) => <LinkEvent {...props} user_id={this.props.user_id}/>} />
                <Route path='/manage_groups' render={() => <GroupManagement user_type={this.props.user_type} chamber_id={this.props.chamber_id}/>} />
                <Route path='/upcoming_events' render={()=> <UpcomingEvents user_type={this.props.user_type} />} />
                <Route path='/results' component={Results} />
                <Route path='/edit_signup' render={()=> <EditSignup user_type={this.props.user_type} />} />
                <Route path='/contact_us' render={()=> <ContactUs user_type={this.props.user_type} />} />
                <Route path='/add_user' render={()=> <AddUser user_type={this.props.user_type} />} />
                <Route path='/create_notice' component={create_notice} />
                <Route path='/help' render={()=> <Help user_type={this.props.user_type} />}  />
                <Route path='/statistics' render={()=> <Statistics user_type={this.props.user_type} />}  />
              </div>
            </div>

        )
    }

    renderAdmin(){
        return(
            <div>
                <AdminMenu/>
                <Route path='/create_chamber' component={CreateChamber} />
                <Route path='/delete_chamber' component={DisableChamber} />
                <Route path='/enable_chamber' component={EnableChamber} />
            </div>
        )

    }
    renderPage(){
        if(this.props.user_type){
            return(
                (this.props.user_type !== '0') ?  this.renderNormalUser() : this.renderAdmin()
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
