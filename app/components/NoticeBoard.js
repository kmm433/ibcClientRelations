import React from 'react';
import Notice from './NoticeBoard/Notice.js'
import $ from 'jquery';   /*For ajax query */
import Infinite from '@srph/react-infinite-scroll';

var count = 0;
var singleMessage = []
var messages = []

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
    //this.request = this.request.bind(this)
  }

  componentWillMount(){
    this.get_messages();
    this.request();
  }


  render(){
    return(
        <div id="notice-board">
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


  request(){
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({
        loading: false,
        items: this.state.items.concat(this.get_nextMessages())
      });
    }, 500);

  }

  get_nextMessages(){
    console.log('getNextMessages Called')
    var getNext = []
    for(var i = 0; i < 10; i++){
      if(count == messages.length){
        count = 0;
        console.log('count set to 0', messages.length)
      }
      getNext.push(<Notice key={messages[count].NotificationID} title={messages[count].NoticeTitle + messages[count].NotificationID} message={messages[count].Notice}/>)
      count = count + 1;
    }

    return getNext;

  }


  get_messages(){
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

      /* Cycle through all messages, setup to display on noticeboard */
      //for (var i = 0; i < messages.length; i++) {
      //  singleMessage.push(<Notice key={messages[i].NotificationID} title={messages[i].NoticeTitle + messages[i].NotificationID} message={messages[i].Notice}/>);
      //}
  }


};
export default NoticeBoard;
