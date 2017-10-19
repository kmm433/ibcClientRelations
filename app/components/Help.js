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
              <div className="member-list-item">
                  <Collapsible trigger={<h4>How can I syncronise groups to MailChimp lists?</h4>}>
                      <div style={{marginBottom: '15px'}}>
                          <p className='help-p'>First you will need to add the MailChimp API key on the Manage Groups page which you can do by going MailChimp
                          selecting your account options, and then account.</p>
                          <img src='/img/mailchimp_step1.png' className='help-img' />
                          <p className='help-p'>Next select Extras and API keys.</p>
                          <img src='/img/mailchimp_step2.png' className='help-img' />
                          <p className='help-p'>Createa new new API key if you do not already have one and copy the key to this site.</p>
                          <img src='/img/mailchimp_step3.png' className='help-img' />
                          <p className='help-p'>Now that MailChimp is connected you can add individual groups to syncronise.
                            To do so press Change MailChimp List IDs and then enter the List ID next to the desired group.
                            Finally press confirm. To get the List ID, on MailChimp go to your desired list (or create one if necessary).
                            Select Settings and List Name and Defaults.</p>
                          <img src='/img/mailchimp_step4.png' className='help-img' />
                          <p className='help-p'>Copy the List ID on this page.</p>
                          <img src='/img/mailchimp_step5.png' className='help-img' />
                      </div>
                  </Collapsible>
              </div>
              <div className="member-list-item">
                  <Collapsible trigger={<h4>How can I send and receive invoices using Xero?</h4>}>
                      <div style={{marginBottom: '15px'}}>
                          <p className='help-p'>On the Member Information page press the Update Xero Connection button.
                            Follow the provided link and sign into Xero. Add a new public application,
                            where the applciation name is SlaterChamber, Fill in your URL and and the callback URL
                            is the value listed on the Member Information page, then press save.
                          </p>
                          <img src='/img/xero_step1.png' className='help-img' />
                          <p className='help-p'>On the next page copy and paste the consumer key and
                            consumer secrtet into their corresponding boxes on this website.</p>
                          <img src='/img/xero_step2.png' className='help-img' />
                          <p>Xero should now be connected. When you select a user on the Member Information page,
                            click the Manage Invoices with Xero button to automatically generate invoices for that
                            user for any invoiceable item on your Xero account.</p>
                      </div>
                  </Collapsible>
              </div>
              <div className="member-list-item">
                  <Collapsible trigger={<h4>How can I approve new members of my chamber?</h4>}>
                      <div style={{marginBottom: '15px'}}>
                          <p className='help-p'>On the Member Information select the menu item "Show all memembers of this chamber awaiting approval.
                            Next xhoose the member you wish to approve. Press the Approve Member button to make the change.
                          </p>
                      </div>
                  </Collapsible>
              </div>
              <div className="member-list-item">
                  <Collapsible trigger={<h4>How can I add members to a group?</h4>}>
                      <div style={{marginBottom: '15px'}}>
                          <p className='help-p'>On the Member Information select the desired member.
                            In the Manage Groups panel type the group name that you wish to add the member to and press enter.
                            If you type a group name that does not currently exist it will be created.
                          </p>
                      </div>
                  </Collapsible>
              </div>
              <div className="member-list-item">
                  <Collapsible trigger={<h4>How can I edit a member's details?</h4>}>
                      <div style={{marginBottom: '15px'}}>
                          <p className='help-p'>On the Member Information select the desired member.
                            Press the edit member details button make the desired changes and press the Save Changes button.
                          </p>
                      </div>
                  </Collapsible>
              </div>
          </div>
      );
    }
  }
};
