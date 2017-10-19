import React from 'react';
import {Collapse} from 'react-collapse';                    /* https://www.npmjs.com/package/react-collapse */
import $ from 'jquery';                                     /* For ajax query */
import SkyLight from 'react-skylight';                      /* http://marcio.github.io/react-skylight/ */
import EditNotice from './EditNotice.js'

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
                }.bind(this)
            });

            this.setState({
                isOpened: false
            });
        }
    }

    render(){

        let ExecBtns = null;
        if (this.props.user_type == 1){
            ExecBtns = <div className="w3-col s1">
                {<button type="button" onClick={this.deleteNotice} className="notificationDeleteBtn" id="btnDelete"><span className="glyphicon glyphicon-trash" style={{color: 'white'}}></span></button>}
                {<button type="button" onClick={() => this.simpleDialog.show()} className="notificationDeleteBtn" id="btnEdit"><span className="glyphicon glyphicon-pencil" style={{color: 'white'}}></span></button>}
            </div>;
        }

        return(
            <Collapse isOpened={this.state.isOpened}>
                <div className="notice">
                    <div className="notice-title">
                        <div className="w3-col s11"><h2>{this.props.title}</h2></div>
                        {ExecBtns}
                    </div>
                    <div className="notice-content" style={{whiteSpace: 'pre-line'}}>
                        <p>{this.props.message}</p>
                    </div>
                </div>
                <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Edit Notification">
                    <EditNotice title={this.props.title} message={this.props.message} id={this.props.NotificationID} reload={this.props.reload}/>
                </SkyLight>
            </Collapse>
        );
    }
};

export default Notice;
