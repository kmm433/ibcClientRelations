import React from 'react';
import NoticeEvent from './NoticeBoard/NoticeEvent.js';
import Infinite from '@srph/react-infinite-scroll';             /*For inf scroll */
import $ from 'jquery';                                         /*For ajax query */
import moment from "moment";                                    /* https://momentjs.com/ */

var count = 0;          // Used by inf scroll to know which to display next
var hasMore = true;     // Sets to false when all data has been displayed
var messages = [];      // Stores all upcoming events

const Loader = () =>
  <div className="loader">
    <div />
    <div />
    <div />
  </div>

class UpcomingEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        items: [],
        loading: false
    };
    this.request = this.request.bind(this);
  }

  componentWillMount(){
    /* get the initial load of messages (15 at a time) */
    count = 0;
    messages = [];
    this.get_AllEvents();
    this.request();
    }

  render(){
    return(

        //<div className="main-component w3-row">
            //<div className='w3-container w3-card-4 w3-light-grey'>
            <div className="main-component">
                <div className="transparent w3-light-grey" style={{marginLeft:'20px'}}><h2>Upcoming Events</h2></div>
                <div id="UpcomingEvents">
                  <Infinite callback={this.request} disabled={this.state.loading}>
                    {this.state.items.map((item, i) =>
                     <div key={i}>
                       {item}
                     </div>
                   )}
                  </Infinite>
                  {this.state.loading && <Loader />}
                </div>
            </div>
            //</div>
        //</div>
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


  /* Calls the SQL query to return Events */
  get_events(){
      var events = [];
      $.ajax({
            url: '/php/get_Events.php',
            type:'POST',
            async: false,
            dataType: "json",
            success : function(response){
                events = response;
            }.bind(this)
        });
        return events;
    }


    /* Calls each sql function, formats data as needed and adds to messages */
    get_AllEvents(){
        var events = this.get_events();
        var emptyNotifications = true;

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
                remHide={true}
            />)
        }

        // Sort the messages based on DatePosted
        messages.sort(function(a, b) {
            a = new moment(a.props.DatePosted);
            b = new moment(b.props.DatePosted);
            return a>b ? -1 : a<b ? 1 : 0;
        });

        // Nothing to display message
        if(emptyNotifications == true){
            messages.push(<EmptyNotification
                key="EmptyNotification"
                user_type={this.props.user_type}
            />)
        }
    }

};
export default UpcomingEvents;

class EmptyNotification extends React.Component {
    constructor(props) {
      super(props);
    }
    render(){
        let txt = null;
        if (this.props.user_type == 1){
            txt = "As an Executive, you can create Events to display to your chamber by using the Create New Notice Page";
        }
        else {
            txt = "You don't have any upcoming events!";
        }
        return(
            <div className="emptyNotices">
                <h4>Theres nothing to display!</h4>
                <h4>{txt}</h4>
            </div>
        );
    }
};
