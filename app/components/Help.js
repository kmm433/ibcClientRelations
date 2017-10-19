import React from 'react';
import Collapsible from 'react-collapsible';                /* https://www.npmjs.com/package/react-collapsible */

class Help extends React.Component {
    render(){
        return(
            <div className="main-component w3-row">
                <div className='w3-container w3-card-4 w3-light-grey'>
                    <h2>Help and FAQ</h2>
                    <div className="member-list-item">
                        <Collapsible trigger={<h4 style={{paddingTop:'5px',paddingBottom:'5px'}}>I hid an event on the home page, where did it go?</h4>}>
                            <div style={{marginBottom: '25px'}}>
                                That event has been hidden from your noticeboard, but dont worry, you can still
                                view it via the 'Upcoming Events' page you can navigate to from the menu bar.
                            </div>
                        </Collapsible>
                    </div>
                    <div className="member-list-item">
                        <Collapsible trigger={<h4 style={{paddingTop:'5px',paddingBottom:'5px'}}>How do I change my details?</h4>}>
                            <div style={{marginBottom: '25px'}}>
                                To update your details, simply navigate to 'My Profile' using the menu bar,
                                select 'Update Details' and when you're done, press 'Save Changes'.
                            </div>
                        </Collapsible>
                    </div>
                    <div className="member-list-item">
                        <Collapsible trigger={<h4 style={{paddingTop:'5px',paddingBottom:'5px'}}>How do I change my password?</h4>}>
                            <div style={{marginBottom: '25px'}}>
                                You can update your password by navigatating to the 'My Profile' using the menu bar,
                                and filling out your old and new password under the 'Change Your Password' section.
                            </div>
                        </Collapsible>
                    </div>




                    <ExecHelp user_type = {this.props.user_type}/>
                </div>
            </div>
        );
    }
};
export default Help;


class ExecHelp extends React.Component {
  render() {
    if (this.props.user_type !== '1'){
      return null;
    }
    else {
      return (
          <div>
              <div className="member-list-item">
                  <Collapsible trigger={<h4 style={{paddingTop:'5px',paddingBottom:'5px'}}>How do I post a new Notice / Survey / Event to my Chamber Members?</h4>}>
                      <div style={{marginBottom: '25px'}}>
                          You can create a new notification by selecting 'Create New Notice' from the side menu, and
                          choosing between a Notice, Event or Survey from the tabbed menu. As you fill out the form,
                          a preview will appear showing you what your notice will look like for your members.
                          <br/><br/>
                          Once you have finished filling out the details you can choose who will recieve your notification.
                          Under the 'Choose Recipients' section, you can choose to post to your entire chamber, or choose individual
                          businesses and groups. A further option is available to offer the notification to any child chambers
                          your chamber may have, but an Executive Member from that chamber will have to approve it before it
                          displayed to their members.
                          <br/><br/>
                          You also have the ability to send receiving members an Email alerting them to the new notification by selecting
                          "Email to all", which will supply a direct link to your members.
                      </div>
                  </Collapsible>
              </div>
              <div className="member-list-item">
                  <Collapsible trigger={<h4 style={{paddingTop:'5px',paddingBottom:'5px'}}>Who can see my Notifications / Events / Surveys?</h4>}>
                      <div style={{marginBottom: '25px'}}>
                          You can offer a new notification to either your entire chamber, individual members and / or buisnessess
                          or any child chambers your chamber may have.
                          <br/><br/>
                          Only members of your chamber and any child chambers (if offered) can see notifications, you can not post
                          a notification to members outside of your own chamber.
                      </div>
                  </Collapsible>
              </div>
              <div className="member-list-item">
                  <Collapsible trigger={<h4 style={{paddingTop:'5px',paddingBottom:'5px'}}>How do I see the results of my Event / Survey?</h4>}>
                      <div style={{marginBottom: '25px'}}>
                          You can view Event and Survey results by selecting 'Event / Survey' results from the side menu,
                          where you will be able to choose between viewing a complete list of Events or Surveys via the
                          tabbed menu. From there you can choose which Event / Survey you would like to view by clicking
                          on the name, where you will be able to see all details such as Event RSVP, and Survey Responses.
                      </div>
                  </Collapsible>
              </div>
              <div className="member-list-item">
                  <Collapsible trigger={<h4 style={{paddingTop:'5px',paddingBottom:'5px'}}>How can I see membership statistics for my chamber?</h4>}>
                      <div style={{marginBottom: '25px'}}>
                          To view statistics, navigate to the 'Statistics' page using the menu bar. At this stage you can
                          view a timeline of New Memberships (any time a member is joining for the first time) and Member
                          renewals (any time an existing member renews their membership) for your chamber.
                          <br/><br/>
                          Did you know? You can scroll and zoom in on the membership statistics by clicking and dragging,
                          and scrolling your mouse.
                      </div>
                  </Collapsible>
              </div>

          </div>
      );
    }
  }
};
