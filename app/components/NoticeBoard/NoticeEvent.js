import React from 'react';

/*
key={events[i].EventID}
title={events[i].EventTitle + events[i].EventID}
message={events[i].Event}
eventdate={events[i].EventDate}
startTime={events[i].startTime}
endTime={events[i].endTime}
EventURL={events[i].EventURL}
DatePosted={events[i].DatePosted}
*/

class NoticeEvent extends React.Component {
  render(){
    return(
      <div className="notice">
        <div className="notice-title">
          <h2>{this.props.title}</h2>
        </div>
        <div className="notice-content">
          <p>{this.props.message}</p>
        </div>
        <div className="notice-content">
          <p>{this.props.eventdate}</p>
          <p>startTime: {this.props.startTime}</p>
          <p>endTime: {this.props.endTime}</p>
          <p>EventURL: {this.props.EventURL}</p>
          <p>DatePosted: {this.props.DatePosted}</p>
        </div>
      </div>
    );
  }
};

export default NoticeEvent;
