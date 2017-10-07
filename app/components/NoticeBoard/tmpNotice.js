import React from 'react';

/*
key={notifs[i].NotificationID}
title={notifs[i].NoticeTitle + notifs[i].NotificationID}
message={notifs[i].Notice}
DatePosted={notifs[i].DatePosted}
*/

class tmpNotice extends React.Component {
  render(){
    return(
      <div className="notice">
        <div className="notice-title">
          <h2>{this.props.title}</h2>
        </div>
        <div className="notice-content" style={{whiteSpace: 'pre-line', wordBreak: 'break-all'}}>
          <p>{this.props.message}</p>
          <p>WJAT TJE FICK</p>
        </div>
      </div>
    );
  }
};

export default tmpNotice;
