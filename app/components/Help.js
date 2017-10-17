import React from 'react';
import Collapsible from 'react-collapsible';                /* https://www.npmjs.com/package/react-collapsible */

class Help extends React.Component {
    render(){
        return(
            <div className="main-component w3-row">
                <div className='w3-container w3-card-4 w3-light-grey'>
                    <h2>Help and FAQ</h2>
                    <div className="member-list-item">
                        <Collapsible trigger={<h4>I hid an event on the home page, where did it go?</h4>}>
                            <div style={{marginBottom: '15px'}}>
                                That event has been hidden from your noticeboard, but dont worry, you can still
                                view it via the 'Upcoming Events' page you can navigate to from the menu bar
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
                  <Collapsible trigger={<h4>How do I post a new Notice / Survey / Event to my Chamber Members?</h4>}>
                      <div style={{marginBottom: '15px'}}>
                          You can create a new notification by selecting "Create New Notice" from the side menu, and
                          choosing between a Notice, Event or Survey from the tabbed menu. As you fill out the form,
                          a preview will appear showing you what your notice will look like for your members.
                          <br/><br/>
                          Once you have finished filling out the details you can choose who will recieve your notification.
                          Under the "Choose Recipients" section, you can choose to post to your entire chamber, or choose individual
                          businesses and groups. A further option is available to offer the notification to any child chambers
                          your chamber may have, but an Executive Member from that chamber will have to approve it before it
                          displayed to their members.
                          <br/><br/>
                          You also have the ability to send receiving members an Email alerting them to the new notification by selecting
                          "Email to all"
                      </div>
                  </Collapsible>
              </div>
              <div className="member-list-item">
                  <Collapsible trigger={<h4>How do I see the results of my Event / Survey?</h4>}>
                      <div style={{marginBottom: '15px'}}>
                          You can view Event and Survey results by selecting "Event / Survey" results from the side menu,
                          where you will be able to choose between viewing a complete list of Events or Surveys via the
                          tabbed menu. From there you can choose which Event / Survey you would like to view by clicking
                          on the name, where you will be able to see all details such as Event RSVP, and Survey Responses.
                      </div>
                  </Collapsible>
              </div>

          </div>
      );
    }
  }
};
