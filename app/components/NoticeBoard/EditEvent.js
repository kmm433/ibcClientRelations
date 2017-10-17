import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';                                             /* For ajax query */
import moment from "moment";                                        /* https://momentjs.com/ */
import DatePicker from 'react-datepicker';                          /* https://github.com/Hacker0x01/react-datepicker */
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-bootstrap-time-picker';               /* https://github.com/yury-dymov/react-bootstrap-time-picker */

class EditEvent extends React.Component {
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
            EStart: "",
            Eend: "",
        };
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDayStart = this.handleDayStart.bind(this);
        this.handleDayEnd = this.handleDayEnd.bind(this);
        this.handleTimeStart = this.handleTimeStart.bind(this);
        this.handleTimeEnd = this.handleTimeEnd.bind(this);

        moment.locale("en-au");
    }

    componentWillMount(){
        this.setState({
          EventID: this.props.eventID,
          EventTitle: this.props.title,
          Event: this.props.message,
          EventDate: moment(this.props.eventdate),
          endTime: moment(this.props.endTime),
          Location: this.props.location,
          EventURL: this.props.EventURL,
          EStart: moment(this.props.eventdate).format('LTS'),
          Eend: moment(this.props.endTime).format('LTS')
        });
    }

    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value});
    }

    submit(){
        var sdate = moment(moment(this.state.EventDate).add(this.state.EStart, 'seconds')).format();
        var edate = moment(moment(this.state.endTime).add(this.state.Eend, 'seconds')).format();
        $.ajax({
            url: '/php/modify_Event.php',
            type:'POST',
            dataType: "json",
            data:{
                'EventID': this.state.EventID,
                'EventTitle' : this.state.EventTitle,
                'Event': this.state.Event,
                'EventDate' : sdate,
                'endTime' : edate,
                'Location' : this.state.Location,
                'EventURL' : this.state.EventURL
            },
            success : function(response){
                console.log('modify_Event success');
                this.props.reload();
            }.bind(this),
            error: function(xhr, status, err){
                console.log('modify_Event Error ' + xhr.responseText);
            }.bind(this)
        });
    }

    render(){
        return(
            <div>
                <h4>Click on the field to modify</h4>
                <div className="notice">
                    <div className="notice-title">
                        <h2><input type="text" className="editNoticeTitle" name="EventTitle" value={this.state.EventTitle} onChange={this.handleChange}/></h2>
                    </div>
                    <div className="notice-content" style={{whiteSpace: 'pre-line', wordBreak: 'break-all', display:'inline-block'}}>
                        <div><span>Event Content:</span><textarea rows="5" name="Event" style={{width:'100%'}} value={this.state.Event} onChange={this.handleChange}></textarea></div>

                        <div className="w3-col s3 CreateNoticeDiv"><div><label>Start Date:</label></div></div>
                        <div className="w3-col s9 CreateNoticeDiv"><div><DatePicker name="eventdate" selected={this.state.EventDate} onChange={this.handleDayStart} minDate={moment()} maxDate={moment().add(5, "years")}/></div></div>

                        <div className="w3-col s3 CreateNoticeDiv"><div><label>End Date:</label></div></div>
                        <div className="w3-col s9 CreateNoticeDiv"><div><DatePicker name="endTime" selected={this.state.endTime} onChange={this.handleDayEnd} minDate={moment()} maxDate={moment().add(5, "years")}/></div></div>

                        <div className="w3-col s3 CreateNoticeDiv"><div><label>Start Time:</label></div></div>
                        <div className="w3-col s9 CreateNoticeDiv"><div><TimePicker onChange={this.handleTimeStart} value={this.state.EStart} step={30}/></div></div>

                        <div className="w3-col s3 CreateNoticeDiv"><div><label>End Time:</label></div></div>
                        <div className="w3-col s9 CreateNoticeDiv"> <div><TimePicker onChange={this.handleTimeEnd} value={this.state.Eend} step={30}/></div></div>

                        <div className="w3-col s3 CreateNoticeDiv"><div><label>Location:</label></div></div>
                        <div className="w3-col s9 CreateNoticeDiv"> <div><input type="text" name="Location" value={this.state.Location} onChange={this.handleChange}/></div></div>

                        <div className="w3-col s3 CreateNoticeDiv"><div><label>Link:</label></div></div>
                        <div className="w3-col s9 CreateNoticeDiv"> <div><input type="text" name="EventURL" placeholder="" value={this.state.EventURL} onChange={this.handleChange}/></div></div>

                    </div>
                </div>
                <div style={{textAlign: 'center'}}>
                    {<button type="button" className="btn btn-primary" id="btnSubmitSurvey" onClick={this.submit}>Submit</button>}
                </div>
            </div>
        );
    }



    handleDayStart(date){           //Event Start Date (datePicker)
        this.setState({
            EventDate: date
        });
    }
    handleDayEnd(date){             //Event End Date  (datePicker)
        this.setState({
            endTime: date
        });
    }
    handleTimeStart(date){          //Event start Time (timePicker)
        this.setState({
            EStart: date
        });
    }
    handleTimeEnd(date){            //Event end Time (timePicker)
        this.setState({
            Eend: date
        });
    }

};

export default EditEvent;
