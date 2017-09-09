import React from 'react';
import moment from "moment";                        /* https://momentjs.com/ */
import {Collapse} from 'react-collapse';            /* https://www.npmjs.com/package/react-collapse */
import $ from 'jquery';                             /* For ajax query */

/*
key={events[i].EventID}
eventID={events[i].EventID}
title={events[i].EventTitle}
message={events[i].Event}
eventdate={events[i].EventDate}
endTime={events[i].endTime}
location={events[i].Location}
EventURL={events[i].EventURL}
DatePosted={events[i].DatePosted}
*/

class NoticeEvent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          hidden: true,
          going: "btn btn-default",
          goingText: "RSVP Going",
          cantgo: "btn btn-default",
          cantgoText: "RSVP Can't go",
          Disabled: false
      };
      this.hide = this.hide.bind(this);
      this.going = this.going.bind(this);
      this.cantgo = this.cantgo.bind(this);
    }

    componentWillMount(){
        this.setEventStatus(); // Set the buttons to pre-fill attending or not
        if (this.props.Disabled == true){
            this.setState({
                Disabled: true
            });
        }

    }

    setEventStatus(){
        // Check if the user is already going to the event
        var going = [];
        var cantgo = [];
        $.ajax({
            url: '/php/get_EventStatusGoing.php',
            type:'POST',
            async: false,
            dataType: "json",
            data: {
                'EventID': this.props.eventID
            },
            success : function(response){
                console.log('get_EventStatusGoing Success')
                going = response;
            }.bind(this),
            error: function(xhr, status, err){
                console.log('get_EventStatusGoing Error')
            }.bind(this)
        });

        if (going.length > 0){  //User is already going
            this.setState({
                 going: "btn btn-success",
                 goingText: "You're attending",
                 cantgo: "btn btn-default",
                 cantgoText: "RSVP Can't go"
            });
        }
        else{
            // Check if the user is NOT going to the event
            $.ajax({
                url: '/php/get_EventStatusCantGo.php',
                type:'POST',
                async: false,
                dataType: "json",
                data: {
                    'EventID': this.props.eventID
                },
                success : function(response){
                    console.log('get_EventStatusCantGo Success')
                    cantgo = response;
                }.bind(this),
                error: function(xhr, status, err){
                    console.log('get_EventStatusCantGo Error')
                }.bind(this)
            });
            if (cantgo.length > 0){ // User is already going
                this.setState({
                     cantgo: "btn btn-danger",
                     cantgoText: "You're not attending",
                     going: "btn btn-default",
                     goingText: "RSVP Going"
                });
            }
        }
    }

    hide(){
        // Remove the display then mark the event as hidden for this user
        console.log(this.props.eventID);
        this.setState({
            hidden: false
        });
        /*$.ajax({      // READY, UNCOMMENT WHEN RELEASE
            url: '/php/hide_Event.php',
            type:'POST',
            async: false,
            dataType: "json",
            data: {
                'EventID': this.props.eventID
            },
            success : function(response){
                //console.log('hide_Event Success')
            }.bind(this),
            error: function(xhr, status, err){
                console.log('hide_Event Error')
            }.bind(this)
        });*/

    }
    going(){
        // Set the user to attending event, still allow to display
        this.setState({
             going: "btn btn-success",
             goingText: "You're attending",
             cantgo: "btn btn-default",
             cantgoText: "RSVP Can't go"
        });
        $.ajax({
            url: '/php/set_EventGoing.php',
            type:'POST',
            async: false,
            dataType: "json",
            data: {
                'EventID': this.props.eventID
            },
            success : function(response){
                //console.log('set_EventGoing Success')
            }.bind(this),
            error: function(xhr, status, err){
                console.log('set_EventGoing Error')
            }.bind(this)
        });
    }
    cantgo(){
        // Set the user to not attending, remove from diplay list
        this.setState({
             cantgo: "btn btn-danger",
             cantgoText: "You're not attending",
             going: "btn btn-default",
             goingText: "RSVP Going"
        });
        $.ajax({
            url: '/php/set_EventCantgo.php',
            type:'POST',
            async: false,
            dataType: "json",
            data: {
                'EventID': this.props.eventID
            },
            success : function(response){
                //console.log('set_EventCantgo Success')
            }.bind(this),
            error: function(xhr, status, err){
                console.log('set_EventCantgo Error')
            }.bind(this)
        });

    }

    render(){
        return(
            <Collapse isOpened={this.state.hidden}>
              <div className="notice">
                <div className="notice-title">
                  <h2>{"Upcoming event: " + this.props.title}</h2>
                </div>
                <div className="notice-content">
                  <div className="eventDiv"> <i>When: </i> <span>{moment(this.props.eventdate).format("dddd")} {moment(this.props.eventdate).format("MMMM Do YYYY")} at {moment(this.props.eventdate).format('LT')} - {moment(this.props.endTime).format('LT')} </span></div>
                  <div className="eventDiv"> <i>Where: </i> <span>{this.props.location}</span></div>
                  <div><p>{this.props.message}</p></div>
                </div>
                <div className="event-buttons">
                    {<button type="button" disabled={this.state.Disabled} className={this.state.going} onClick={this.going} id="btnRSVPGoing">{this.state.goingText}</button>}
                    {<button type="button" disabled={this.state.Disabled} className={this.state.cantgo} onClick={this.cantgo} id="btnRSVPGoing">{this.state.cantgoText}</button>}
                    {<button type="button" disabled={this.state.Disabled} className="btn btn-warning" onClick={this.hide} id="btnHide">Hide Event</button>}
                </div>
              </div>
          </Collapse>
        );
    }
};

export default NoticeEvent;
