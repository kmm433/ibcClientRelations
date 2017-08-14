/*
- At this stage infinite scroll works by getting ALL messages and storing them
in messages, then getting the next lot as required
*/


import React from 'react';
import Notice from './NoticeBoard/Notice.js'
import $ from 'jquery';   /*For ajax query */
import Infinite from '@srph/react-infinite-scroll'; /*For inf scroll */

var count = 0;
var hasMore = true;
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
    this.request = this.request.bind(this)
  }

  componentWillMount(){
    // get the initial load of messages (15 at a time)
    this.get_messages();
    this.request();
  }


  render(){
    return(
        <div id="notice-board" class="w-col w-col-9">
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
    if(count == messages.length){
      hasMore = false;
    }
    else{
        for(var i = 0; i < 15; i++){
            if (count != messages.length){
              getNext.push(<Notice key={messages[count].NotificationID} title={messages[count].NoticeTitle + messages[count].NotificationID} message={messages[count].Notice}/>)
              count = count + 1;
            }
        }
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
  }


};
export default NoticeBoard;
