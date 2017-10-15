import React from 'react';
import $ from 'jquery';                                     /* For ajax query */
import NoticeEvent from './NoticeEvent.js';


class LinkEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            EventID: "",
            EventTitle: "",
            Event: "",
            EventDate: "",
            endTime: "",
            Location: "",
            EventURL: "",
            DatePosted: ""
        };
        this.confirmUser = this.confirmUser.bind(this);
    }

    componentWillMount(){
        this.setState({
            EventID: this.props.match.params.EventID
        });
        this.confirmUser()
    }

    confirmUser(){
        $.ajax({
            url: '/php/get_UserConfirmEvent.php',
            type:'POST',
            dataType: "json",
            data:{
                'EventID': this.props.match.params.EventID
            },
            success : function(response){
                console.log('get_UserConfirmEvent Success');
                console.log(response);
                if(response.length != 0){
                    this.setState({
                        EventTitle: response[0].EventTitle,
                        Event: response[0].Event,
                        EventDate: response[0].EventDate,
                        endTime: response[0].endTime,
                        Location: response[0].Location,
                        EventURL: response[0].EventURL,
                        DatePosted: response[0].DatePosted
                    });
                }
            }.bind(this),
            error: function(xhr, status, err){
                console.log('get_UserConfirmEvent Error' + xhr.responseText);
            }.bind(this)
        });
    }

    render(){

        var renderThis = "";
        if (this.state.EventTitle != ""){
            renderThis = (<NoticeEvent
                key={this.state.EventID}
                eventID={this.state.EventID}
                title={this.state.EventTitle}
                message={this.state.Event}
                eventdate={this.state.EventDate}
                endTime={this.state.endTime}
                location={this.state.Location}
                EventURL={this.state.EventURL}
                DatePosted={this.state.DatePosted}
            />)
        } else {
            renderThis = <div style={{textAlign:'center',marginLeft: '25px',marginTop:'25%'}}><h4>Theres nothing here! Its possible the event you are looking for has been deleted, or you don't have permission to view it</h4></div>
        }

        return(
            <div id="notice-board">
                <div>
                    {renderThis}
                </div>
            </div>
        );
    }
};

export default LinkEvent;
