import React from 'react';
import {Collapse} from 'react-collapse';                    /* https://www.npmjs.com/package/react-collapse */
import $ from 'jquery';                                     /* For ajax query */

/*
key={notifs[i].NotificationID}
title={notifs[i].NoticeTitle + notifs[i].NotificationID}
message={notifs[i].Notice}
DatePosted={notifs[i].DatePosted}
*/

class Notice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isOpened: true
        };
        this.deleteNotice = this.deleteNotice.bind(this);
    }

    deleteNotice(){
        if (confirm("Warning: This will remove this notice from your chamber members and can not be undone! Are you sure?") == true){
            $.ajax({
                url: '/php/delete_Notification.php',
                type:'POST',
                dataType: "json",
                data:{
                    'notifID': this.props.NotificationID
                },
                success : function(response){
                    //console.log('delete_Notification Success');
                }.bind(this),
                error: function(xhr, status, err){
                    console.log('delete_Notification Error' + xhr.responseText);
                }.bind(this)
            });

            this.setState({
                isOpened: false
            });
        }
    }

    render(){

        let deleteBtn = null;
        if (this.props.user_type == 1){
            deleteBtn = <div className="w3-col s1">{<button type="button" onClick={this.deleteNotice} className="notificationDeleteBtn" id="btnDelete"><span className="glyphicon glyphicon-trash" style={{color: 'white'}}></span></button>}</div>;
        }

        return(
            <Collapse isOpened={this.state.isOpened}>
                <div className="notice">
                    <div className="notice-title">
                        <div className="w3-col s11"><h2>{this.props.title}</h2></div>
                        {deleteBtn}
                    </div>
                    <div className="notice-content" style={{whiteSpace: 'pre-line', wordBreak: 'break-all'}}>
                        <p>{this.props.message}</p>
                    </div>
                </div>
            </Collapse>
        );
    }
};

export default Notice;
