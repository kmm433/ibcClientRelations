/*
- At this stage infinite scroll works by getting ALL messages and storing them
in messages, then getting the next lot as required
Todo:
- in each SP if given a userID check what other groups user belongs too
- in the php pages need to get the associated UserId / ChamberID / BusinessID
 / GroupID from session variables
*/


import React from 'react';
import Notice from './NoticeBoard/Notice.js';
import NoticeEvent from './NoticeBoard/NoticeEvent.js';
import NoticeSurvey from './NoticeBoard/NoticeSurvey.js';
import $ from 'jquery';                                         /*For ajax query */
import Infinite from '@srph/react-infinite-scroll';             /*For inf scroll */
import moment from "moment";                                    /* https://momentjs.com/ */

import TmpNotice from './NoticeBoard/TmpNotice.js';
import TmpNoticeEvent from './NoticeBoard/TmpNoticeEvent.js';
import TmpNoticeSurvey from './NoticeBoard/TmpNoticeSurvey.js'


var count = 0;          // Used by inf scroll to know which to display next
var hasMore = true;     // Sets to false when all data has been displayed
var messages = [];      // Stores all notice info, notifications / events / surveys

const Loader = () =>
  <div className="loader">
    <div />
    <div />
    <div />
  </div>

class NoticeBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        items: [],
        loading: false
    };
    this.request = this.request.bind(this);
    this.reload = this.reload.bind(this);
  }

  componentWillMount(){
    /* get the initial load of messages (15 at a time) */
    count = 0;
    messages = [];
    this.get_AllNotices();
    this.request();
    }

  render(){
    return(
        <div id="notice-board">
          <Infinite callback={this.request} disabled={this.state.loading}>
            {this.state.items.map((item, i) =>
             <div key={i}>
               {item}
           </div>
           )}
          </Infinite>

          {this.state.loading && <Loader />}
        </div>
    );
  }

  reload(){
      this.setState({
        items: []
      });
      count = 0;
      messages = [];
      this.get_AllNotices();
      this.request();
  }

  /* Sets the state items[] with next load of messages */
  request(){
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({
        loading: false,
        items: this.state.items.concat(this.get_nextMessages())
      });
    }, 500);
  }

  /* Returns the next 15 messages */
  get_nextMessages(){
    //console.log('getNextMessages Called');
    var getNext = []
    if(count == messages.length){
      hasMore = false;
    }
    else{
        for(var i = 0; i < 15; i++){
            if (count != messages.length){
              getNext.push(messages[count])
              count = count + 1;
            }
        }
    }
    return getNext;
  }

  /* Calls the SQL query to return Notifications */
  get_notifications(){
      var notifications = [];
      $.ajax({
          url: '/php/get_Notifications.php',
          type:'POST',
          async: false,
          dataType: "json",
          success : function(response){
              notifications = response;
              //console.log('get_Notifications Success' + notifications)
          }.bind(this),
          error: function(xhr, status, err){
              console.log('get_Notifications Error')
          }.bind(this)
      });
      return notifications;
  }

  /* Calls the SQL query to return Notifications passed down from a parent */
  get_notificationsTEMP(){
      var notifications = [];
      $.ajax({
          url: '/php/get_NotificationsTEMP.php',
          type:'POST',
          async: false,
          dataType: "json",
          success : function(response){
              notifications = response;
              //console.log('get_NotificationsTEMP Success ' + response)
          }.bind(this),
          error: function(xhr, status, err){
              console.log('get_NotificationsTEMP Error')
          }.bind(this)
      });
      return notifications;
  }
  /* Calls the SQL query to return Events */
  get_events(){
      var events = [];
      $.ajax({
            url: '/php/get_EventsNoticeBoard.php',
            type:'POST',
            async: false,
            dataType: "json",
            success : function(response){
                events = response;
                //console.log('get_Events Success')
            }.bind(this),
            error: function(xhr, status, err, response){
                console.log('get_Events Error' + xhr.responseText);

            }.bind(this)
        });
        return events;
    }
    get_eventsTEMP(){
        var events = [];
        $.ajax({
              url: '/php/get_EventsNoticeBoardTEMP.php',
              type:'POST',
              async: false,
              dataType: "json",
              success : function(response){
                  events = response;
                  console.log('get_EventsNoticeBoardTEMP Success');
              }.bind(this),
              error: function(xhr, status, err, response){
                  console.log('get_EventsNoticeBoardTEMP Error' + xhr.responseText);
              }.bind(this)
          });
          return events;
      }

    /* Calls the SQL query to return Surveys */
    get_surveys(){
        var surveys = [];
        $.ajax({
            url: '/php/get_Surveys.php',
            type:'POST',
            async: false,
            dataType: "json",
            success : function(response){
                surveys = response;
                //console.log('get_Surveys Success')
            }.bind(this),
            error: function(xhr, status, err){
                console.log('get_Surveys Error')
            }.bind(this)
        });
        return surveys;
    }get_surveysTEMP(){
        var surveys = [];
        $.ajax({
            url: '/php/get_SurveysTEMP.php',
            type:'POST',
            async: false,
            dataType: "json",
            success : function(response){
                surveys = response;
                console.log('get_surveysTEMP Success')
            }.bind(this),
            error: function(xhr, status, err){
                console.log('get_surveysTEMP Error')
            }.bind(this)
        });
        return surveys;
    }

    /* Calls each sql function, formats data as needed and adds to messages */
    get_AllNotices(){
        var notifs = this.get_notifications();
        var events = this.get_events();
        var survey = this.get_surveys();
        var emptyNotifications = true;

        for(var i = 0; i < notifs.length; i++){
            emptyNotifications = false;
            messages.push(<Notice
                key={notifs[i].NotificationID}
                title={notifs[i].NoticeTitle}
                message={notifs[i].Notice}
                DatePosted={notifs[i].DatePosted}
                user_type={this.props.user_type}
                NotificationID={notifs[i].NotificationID}
                reload = {this.reload}
            />)
        }
        for(var i = 0; i < events.length; i++){
            emptyNotifications = false;
            messages.push(<NoticeEvent
                key={events[i].EventID}
                eventID={events[i].EventID}
                title={events[i].EventTitle}
                message={events[i].Event}
                eventdate={events[i].EventDate}
                endTime={events[i].endTime}
                location={events[i].Location}
                EventURL={events[i].EventURL}
                DatePosted={events[i].DatePosted}
            />)
        }
        for(var i = 0; i < survey.length; i++){
            emptyNotifications = false;
            messages.push(<NoticeSurvey
                key={survey[i].SurveyID}
                SurveyID={survey[i].SurveyID}
                title={survey[i].SurveyTitle}
                DatePosted={survey[i].DatePosted}
            />)
        }

        // Sort the messages based on DatePosted
        messages.sort(function(a, b) {
            a = new moment(a.props.DatePosted);
            b = new moment(b.props.DatePosted);
            return a>b ? -1 : a<b ? 1 : 0;
        });

        // ONLY IF USER IS EXECUTIVES
        // Get all the temp notices, surveys and events being passed down from a parent chamber
        if (this.props.user_type == 1){
            var tmpNotifs = this.get_notificationsTEMP();
            for(var i = 0; i < tmpNotifs.length; i++){
                emptyNotifications = false;
                messages.unshift(<TmpNotice
                    key={tmpNotifs[i].NotificationID + tmpNotifs[i].NoticeTitle}
                    NotificationID={tmpNotifs[i].NotificationID}
                    title={tmpNotifs[i].NoticeTitle}
                    message={tmpNotifs[i].Notice}
                    DatePosted={tmpNotifs[i].DatePosted}
                    reload = {this.reload}
                />)
            }

            var tmpEvents = this.get_eventsTEMP();
            for(var i = 0; i < tmpEvents.length; i++){
                emptyNotifications = false;
                messages.unshift(<TmpNoticeEvent
                    key={tmpEvents[i].EventID}
                    eventID={tmpEvents[i].EventID}
                    title={tmpEvents[i].EventTitle}
                    message={tmpEvents[i].Event}
                    eventdate={tmpEvents[i].EventDate}
                    endTime={tmpEvents[i].endTime}
                    location={tmpEvents[i].Location}
                    EventURL={tmpEvents[i].EventURL}
                    DatePosted={tmpEvents[i].DatePosted}
                    reload = {this.reload}
                />)
            }

            var tmpSurveys = this.get_surveysTEMP();
            for(var i = 0; i < tmpSurveys.length; i++){
                emptyNotifications = false;
                messages.unshift(<TmpNoticeSurvey
                    key={tmpSurveys[i].SurveyID}
                    SurveyID={tmpSurveys[i].SurveyID}
                    title={tmpSurveys[i].SurveyTitle}
                    DatePosted={tmpSurveys[i].DatePosted}
                    reload = {this.reload}
                />)
            }

        }



        // Nothing to display message
        if(emptyNotifications == true){
            console.log("EMPTY");
            messages.push(<EmptyNotification
                key="EmptyNotification"
                user_type={this.props.user_type}
            />)
        }
    }

};
export default NoticeBoard;

class EmptyNotification extends React.Component {
    constructor(props) {
      super(props);
    }
    render(){
        let txt = null;
        if (this.props.user_type == 1){
            txt = "As an Executive, you can create Notices, Events and Surveys to display to your chamber by using the Create New Notice Page "
        }
        else {
            txt = "This section gets filled with relevant Notices, Events and Surveys for your chamber, so check back again soon!"
        }
        return(
            <div className="emptyNotices">
                <h4>Theres nothing to display!</h4>
                <div>
                    {txt}
                </div>
            </div>
        );
    }
};
