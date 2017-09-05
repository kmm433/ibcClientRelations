import React from 'react';
import ReactDOM from 'react-dom';
import Notice from './NoticeBoard/Notice.js';
import NoticeEvent from './NoticeBoard/NoticeEvent.js';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';          /* https://github.com/reactjs/react-tabs */
import moment from "moment";                                        /* https://momentjs.com/ */

class create_notice extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            NTitle: "",
            NContent: "",
            Nemail: "off",

            ETitle: "",
            EContent: "",
            EDate: moment(),
            EStart: "",
            Eend: "",
            Elocation: "",
            Elink: "",
            Eemail: "off",

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
        this.submitNotice = this.submitNotice.bind(this);
        this.submitEvent = this.submitEvent.bind(this);
    }

    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value});
        console.log(event.target.value);

        console.log(moment(value))
    }

    handleChangeCheckbox(event){
        const name = event.target.name;
        const value = event.target.value;

        if(this.state[name] == "off"){
            this.setState({[name]: "on"});
        }
        else{
            this.setState({[name]: "off"});
        }
    }
    submitNotice(){
        // Post the notice to the survey
        console.log(this.state.NTitle)
        console.log(this.state.NContent)
        console.log(this.state.Nemail)
    }
    submitEvent(){
        // Post the notice to the survey
        console.log(this.state.ETitle)
        console.log(this.state.EContent)
        console.log(this.state.EDate)
        console.log(this.state.EStart)
        console.log(this.state.Eend)
        console.log(this.state.Elocation)
        console.log(this.state.Elink)
        console.log(this.state.Eemail)
    }

    render() {
    return(
      <div className="main-component">
        <h2>Create a new Notice, Event or Survey</h2>
        <Tabs>
            <TabList>
                <Tab>New Notice</Tab>
                <Tab>New Event</Tab>
                <Tab>New Survey</Tab>
            </TabList>

            <TabPanel>
                <div className="w3-row">
                    <div><h3>Enter the notice details below:</h3></div>
                    <div className="w3-col s3">
                        <div className="CreateNoticeDiv"><label>Notice Title:</label></div>
                        <div className="CreateNoticeDiv"><label>Notice Content:</label></div>
                    </div>
                    <div className="w3-col s9 CreateNoticeDiv">
                        <div className="CreateNoticeDiv"><input type="text" name="NTitle" placeholder="My Title" value={this.state.NTitle} onChange={this.handleChange}/></div>
                        <div className="CreateNoticeDiv"><textarea rows="5" name="NContent" placeholder="My Message Content" value={this.state.NContent} onChange={this.handleChange}></textarea></div>
                    </div>
                </div>
                <div>
                    <div><h3>Preview:</h3></div>
                     <Notice
                         key="PrevNotice"
                         title={this.state.NTitle}
                         message={this.state.NContent}
                         DatePosted=""
                     />
                </div>
                <div className="event-buttons">
                    <div className="w3-row">
                        <div className="w3-col s6" id="CreateNoticeEmail"><label>Email to all</label></div>
                        <div className="w3-col s6" id="CreateNoticeEmailSwitch"><label className="switch"><input type="checkbox" name="Nemail" onChange={this.handleChangeCheckbox}/><span className="slider round"></span></label></div>
                    </div>
                    <div><button type="button" className="btn btn-primary" id="btnSubmitNotice" onClick={this.submitNotice}>Submit</button></div>
                </div>
            </TabPanel>
            <TabPanel>  {/******************************************** EVENTS *********************************************************************** */}
                <div className="w3-row">
                    <div><h3>Enter the event details below:</h3></div>
                    <div className="w3-col s3 CreateNoticeDiv"><div><label>Event Title:</label></div></div>
                    <div className="w3-col s9 CreateNoticeDiv"> <div><input type="text" name="ETitle" placeholder="My Title" value={this.state.ETitle} onChange={this.handleChange}/></div></div>

                    <div className="w3-col s3 CreateNoticeDiv"><div><label>Event Content:</label></div></div>
                    <div className="w3-col s9 CreateNoticeDiv"><div><textarea rows="5" name="EContent" placeholder="My Event Details" value={this.state.EContent} onChange={this.handleChange}></textarea></div></div>

                    <div className="w3-col s3 CreateNoticeDiv"><div><label>Date:</label></div></div>
                    <div className="w3-col s9 CreateNoticeDiv"><div><input type="text" name="EDate" placeholder="Start time: 11am" value={this.state.EDate} onChange={this.handleChange}/></div></div>

                    <div className="w3-col s3 CreateNoticeDiv"><div><label>Start Time:</label></div></div>
                    <div className="w3-col s9 CreateNoticeDiv"> <div><input type="text" name="EStart" placeholder="Start time: 11am" value={this.state.EStart} onChange={this.handleChange}/></div></div>

                    <div className="w3-col s3 CreateNoticeDiv"><div><label>End Time:</label></div></div>
                    <div className="w3-col s9 CreateNoticeDiv"> <div><input type="text" name="Eend" placeholder="End Time: 8pm" value={this.state.Eend} onChange={this.handleChange}/></div></div>

                    <div className="w3-col s3 CreateNoticeDiv"><div><label>Location:</label></div></div>
                    <div className="w3-col s9 CreateNoticeDiv"> <div><input type="text" name="Elocation" placeholder="Location" value={this.state.Elocation} onChange={this.handleChange}/></div></div>

                    <div className="w3-col s3 CreateNoticeDiv"><div><label>Link:</label></div></div>
                    <div className="w3-col s9 CreateNoticeDiv"> <div><input type="text" name="Elink" placeholder="URL or Link to more information" value={this.state.Elink} onChange={this.handleChange}/></div></div>
                </div>
                <div>
                    <div><h3>Preview:</h3></div>
                    <NoticeEvent
                        key="PrevEvent"
                        eventID=""
                        title={this.state.ETitle}
                        message={this.state.EContent}
                        eventdate={moment(this.state.EDate).format("DD MM YYYY")}
                        endTime={this.state.Eend}
                        location={this.state.Elocation}
                        EventURL={this.state.Elink}
                        DatePosted=""
                    />
                </div>
                <div className="event-buttons">
                    <div className="w3-row">
                        <div className="w3-col s6" id="CreateNoticeEmail"><label>Email to all</label></div>
                        <div className="w3-col s6" id="CreateNoticeEmailSwitch"><label className="switch"><input type="checkbox" name="Eemail" onChange={this.handleChangeCheckbox}/><span className="slider round"></span></label></div>
                    </div>
                    <div><button type="button" className="btn btn-primary" id="btnSubmitEvent" onClick={this.submitEvent}>Submit</button></div>
                </div>
            </TabPanel>
            <TabPanel>
                <h2>Suvey:</h2>
            </TabPanel>
        </Tabs>
      </div>
    );
  }


};
export default create_notice;
