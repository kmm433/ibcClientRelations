import React from 'react';
import moment from "moment";                        /* https://momentjs.com/ */
import {Collapse} from 'react-collapse';            /* https://www.npmjs.com/package/react-collapse */

/*
key={events[i].EventID}
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
          hidden: true
      };
      this.hide = this.hide.bind(this);
      this.going = this.going.bind(this);
      this.cantgo = this.cantgo.bind(this);
    }

    hide(){
        this.setState({
            hidden: false
        });
    }
    going(){
        console.log("TODO")
        // Set the user to attending event, still allow to display
    }
    cantgo(){
        console.log("TODO")
        // Set the user to not attending, remove from diplay list

        this.hide();
    }

    render(){
        return(
            <Collapse isOpened={this.state.hidden}>
              <div className="notice">
                <div className="notice-title">
                  <h2>{"Upcoming event: " + this.props.title}</h2>
                </div>
                <div className="notice-content">
                  <div className="eventDiv"> <i>When: </i> <span>{moment(this.props.eventdate).format("dddd")} at {moment(this.props.eventdate).format('LT')} - {moment(this.props.endTime).format('LT')} </span></div>
                  <div className="eventDiv"> <i>Where: </i> <span>{this.props.location}</span></div>
                  <div><p>{this.props.message}</p></div>
                </div>
                <div className="event-buttons">
                    {<button type="button" className="btn btn-default" onClick={this.going} id="btnRSVPGoing">RSVP Going</button>}
                    {<button type="button" className="btn btn-default" onClick={this.cantgo} id="btnRSVPGoing">RSVP Can't go</button>}
                    {<button type="button" className="btn btn-warning" onClick={this.hide} id="btnHide">Hide Event</button>}
                </div>
              </div>
          </Collapse>
        );
    }
};

export default NoticeEvent;
