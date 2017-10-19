import React from 'react';
import {Collapse} from 'react-collapse';                        /* https://www.npmjs.com/package/react-collapse */
import $ from 'jquery';                                         /* For ajax query */

class TmpNotice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isOpened: true
        };
        this.help = this.help.bind(this);
        this.approve = this.approve.bind(this);
        this.reject = this.reject.bind(this);
    }

    help(){
        alert("This Notice has been offered to your chamber by a Parent Chamber. Parent Chambers have the ability to offer notifications, events and surveys to their child chambers, however they require approval by an executive chamber member before it is displayed to the rest of the chamber. You can approve or reject this notification here")
    }

    reject(){
        this.setState({
            isOpened: false
        });
        $.ajax({
            url: '/php/reject_TmpNotifications.php',
            type:'POST',
            dataType: "json",
            data:{
                'notifID': this.props.NotificationID
            }
        });
    }
    approve(){
        this.setState({
            isOpened: false
        });
        $.ajax({
            url: '/php/accept_TmpNotifications.php',
            type:'POST',
            dataType: "json",
            data:{
                'notifID': this.props.NotificationID
            }
        });
        this.props.reload();
    }

    render(){
        return(
            <Collapse isOpened={this.state.isOpened}>
                <div className="notice">
                  <div className="tmpnotice-title notice-title">
                    <h2>{this.props.title}</h2>
                  </div>
                  <div className="notice-content" style={{whiteSpace: 'pre-line'}}>
                    <p>{this.props.message}</p>
                    <div>
                        {<button type="button" className="btn btn-success" style={{marginLeft: '0px'}} id="btnApprove" onClick={this.approve}>Approve</button>}
                        {<button type="button" className="btn btn-danger" id="btnReject" onClick={this.reject} >Reject</button>}
                        {<button type="button" className="btn btn-primary" id="btnHelp" onClick={this.help}>Why am I seeing this?</button>}
                    </div>
                  </div>
                </div>
            </Collapse>
        );
    }
};

export default TmpNotice;
