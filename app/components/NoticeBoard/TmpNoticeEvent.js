import React from 'react';
import moment from "moment";                        /* https://momentjs.com/ */
import {Collapse} from 'react-collapse';            /* https://www.npmjs.com/package/react-collapse */
import $ from 'jquery';                             /* For ajax query */


class TmpNoticeEvent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          isOpened: true,
      };
      this.help = this.help.bind(this);
      this.approve = this.approve.bind(this);
      this.reject = this.reject.bind(this);
    }

    help(){
        alert("This Event has been offered to your chamber by a Parent Chamber. Parent Chambers have the ability to offer notifications, events and surveys to their child chambers, however they require approval by an executive chamber member before it is displayed to the rest of the chamber. You can approve or reject this event offering here")
    }

    reject(){
        this.setState({
            isOpened: false
        });
        $.ajax({
            url: '/php/reject_TmpEvent.php',
            type:'POST',
            dataType: "json",
            data:{
                'eventID': this.props.eventID
            },
            success : function(response){
                //console.log('reject_TmpEvent Success')
            }.bind(this),
            error: function(xhr, status, err){
                console.log('reject_TmpEvent Error ' + xhr.responseText)
            }.bind(this)
        });
    }
    approve(){
        this.setState({
            isOpened: false
        });
        $.ajax({
            url: '/php/accept_TmpEvent.php',
            type:'POST',
            dataType: "json",
            data:{
                'eventID': this.props.eventID
            },
            success : function(response){
                //console.log('accept_TmpEvent Success')
            }.bind(this),
            error: function(xhr, status, err){
                console.log('accept_TmpEvent Error ' + xhr.responseText)
            }.bind(this)
        });
        this.props.reload();
    }

    render(){
        return(
            <Collapse isOpened={this.state.isOpened}>
              <div className="notice">
                <div className="tmpnotice-title notice-title">
                  <h2>{"Upcoming event: " + this.props.title}</h2>
                </div>
                <div className="notice-content">
                  <div className="eventDiv"> <i>When: </i>
                        <span>
                            {moment(this.props.eventdate).format('dddd MMMM Do YYYY, h:mm a')} to {moment(this.props.endTime).format('MMMM Do YYYY, h:mm a')}
                        </span>
                  </div>
                  <div className="eventDiv"> <i>Where: </i> <span>{this.props.location}</span></div>
                  <div><p>{this.props.message}</p></div>
                </div>
                <div className="event-buttons">
                    {<button type="button" disabled={true} className="btn btn-default" id="btnRSVPGoing">RSVP Going"</button>}
                    {<button type="button" disabled={true} className="btn btn-default" id="btnRSVPGoing">RSVP Can't go</button>}
                    {<button type="button" disabled={true} className="btn btn-warning" id="btnHide">Hide Event</button>}
                </div>
                <div className="notice-content">
                    {<button type="button" className="btn btn-success" style={{marginLeft: '0px'}} id="btnApprove" onClick={this.approve}>Approve</button>}
                    {<button type="button" className="btn btn-danger" id="btnReject" onClick={this.reject} >Reject</button>}
                    {<button type="button" className="btn btn-primary" id="btnHelp" onClick={this.help}>Why am I seeing this?</button>}
                </div>
              </div>
          </Collapse>
        );
    }
};

export default TmpNoticeEvent;
