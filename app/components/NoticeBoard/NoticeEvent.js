import React from 'react';

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
        </div>
      </div>
    );
  }
};

export default NoticeEvent;
