/*
- At this stage infinite scroll works by getting ALL messages and storing them
in messages, then getting the next lot as required
Todo:
- Surveys formatting
- in each SP if given a userID check what other groups user belongs too
- in the php pages need to get the associated UserId / ChamberID / BusinessID
 / GroupID from session variables
*/


import React from 'react';
import Notice from './NoticeBoard/Notice.js';
import NoticeEvent from './NoticeBoard/NoticeEvent.js';
import NoticeSurvey from './NoticeBoard/NoticeSurvey.js';
import $ from 'jquery';   /*For ajax query */
import Infinite from '@srph/react-infinite-scroll'; /*For inf scroll */


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
    this.request = this.request.bind(this)
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
        <div>
          <Infinite callback={this.request} disabled={this.state.loading}>
            {this.state.items.map((item, i) =>
             <row key={i}>
               {item}
             </row>
           )}
          </Infinite>

          {this.state.loading && <Loader />}
        </div>
    );
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
    //console.log('getNextMessages Called')
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
          type:'GET',
          async: false,
          dataType: "json",
          success : function(response){
              notifications = response;
              console.log('get_Notifications Success')
          }.bind(this),
          error: function(xhr, status, err){
              console.log('get_Notifications Error')
          }.bind(this)
      });
      return notifications;
  }

  /* Calls the SQL query to return Events */
  get_events(){
      var events = [];
      $.ajax({
            url: '/php/get_Events.php',
            type:'GET',
            async: false,
            dataType: "json",
            success : function(response){
                events = response;
                console.log('get_Events Success')
            }.bind(this),
            error: function(xhr, status, err){
                console.log('get_Events Error')
            }.bind(this)
        });
        return events;
    }

    /* Calls the SQL query to return Surveys */
    get_surveys(){
        var surveys = [];
        $.ajax({
            url: '/php/get_Surveys.php',
            type:'GET',
            async: false,
            dataType: "json",
            success : function(response){
                surveys = response;
                console.log('get_Surveys Success')
            }.bind(this),
            error: function(xhr, status, err){
                console.log('get_Surveys Error')
            }.bind(this)
        });
        return surveys;
    }

    /* Calls each sql function, formats data as needed and adds to messages */
    get_AllNotices(){
        var notifs = this.get_notifications();
        var events = this.get_events();
        var survey = this.get_surveys();

        for(var i = 0; i < notifs.length; i++){
            messages.push(<Notice
                key={notifs[i].NotificationID}
                title={notifs[i].NoticeTitle + notifs[i].NotificationID}
                message={notifs[i].Notice}
                DatePosted={notifs[i].DatePosted}
            />)
        }
        for(var i = 0; i < events.length; i++){
            messages.push(<NoticeEvent
                key={events[i].EventID}
                title={events[i].EventTitle + events[i].EventID}
                message={events[i].Event}
                eventdate={events[i].EventDate}
                startTime={events[i].startTime}
                endTime={events[i].endTime}
                EventURL={events[i].EventURL}
                DatePosted={events[i].DatePosted}
            />)
        }
        for(var i = 0; i < survey.length; i++){
            messages.push(<NoticeSurvey
                key={survey[i].SurveyID}
                SurveyID={survey[i].SurveyID}
                title={survey[i].SurveyTitle + survey[i].SurveyID}
                DatePosted={survey[i].DatePosted}
                noQuestions={survey[i].noQuestions}
            />)
        }

        // Sort the messages based on DatePosted
        messages.sort(function(a, b) {
            a = new Date(a.props.DatePosted);
            b = new Date(b.props.DatePosted);
            return a<b ? -1 : a>b ? 1 : 0;
        });
    }

};
export default NoticeBoard;
