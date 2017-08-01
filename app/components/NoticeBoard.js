import React from 'react';
import Notice from './NoticeBoard/Notice.js'

class NoticeBoard extends React.Component {
  render(){
    return(
      <div id="notice-board">
        <Notice title="New General Message" message="  Ongoing Advocacy Campaigns: In the lead up to an election, it is important that that the concerns of business' are represented. We need to ensure that the potential leaders have the business concerns at the forefront of their minds to..."/>
      </div>
    );
  }
};

export default NoticeBoard;
