import React from 'react';
import Notice from './NoticeBoard/Notice.js'
import $ from 'jquery';   /*For ajax query */

var messages = []

class NoticeBoard extends React.Component {
  constructor(props) {
    super(props);
  }

componentWillMount(){
  $.ajax({
      url: '/php/get_messages.php',
      type:'GET',
      async: false,
      dataType: "json",
      success : function(response){
        messages = response;
        console.log('get_messages Success')
      }.bind(this),
      error: function(xhr, status, err){
        console.log('get_messages Error')
      }.bind(this)
    });
  }

  render(){
    /* Cycle through all messages, setup to display on noticeboard */
    var singleMessage = [];
    for (var i = 0; i < messages.length; i++) {
      singleMessage.push(<Notice key={messages[i].NotificationID} title={messages[i].NoticeTitle} message={messages[i].Notice}/>);
      console.log('count ' , i)
    }

    return(
      <div id="notice-board">
            {singleMessage}
      </div>
    );
  }
};


export default NoticeBoard;
