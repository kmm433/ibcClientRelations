import React from 'react';
import ReactDOM from 'react-dom';
import Notice from './NoticeBoard/Notice.js';
import NoticeEvent from './NoticeBoard/NoticeEvent.js';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';          /* https://github.com/reactjs/react-tabs */
import moment from "moment";                                        /* https://momentjs.com/ */


var mysurveyItems = [];
var mysurveyCount = 0;
var Questions = [];
var Answers = [];

// Called when user changes Survey Answer type to written
function switchTypeText(qNumber){
    RemoveAnswers(qNumber);
    // Sets the questions type to textArea
    for(var i = Questions.length-1; i > -1; i--) {
        if(Questions[i]['qType'] == "radio" & Questions[i]['qNum'] == qNumber) {
            Questions[i]['qType'] = "textArea";
        }
    }
}

// Called when user changes Survey Answer type to Radio
function switchTypeRadio(qNumber){
    // Sets the questions type to radio
    for(var i = Questions.length-1; i > -1; i--) {
        if(Questions[i]['qType'] == "textArea" & Questions[i]['qNum'] == qNumber) {
            Questions[i]['qType'] = "radio";
        }
    }
}

// Removes any answers they had already entered
function RemoveAnswers(qNumber){
    for(var i = Answers.length-1; i > -1; i--) {
        if(Answers[i]['qNum'] == qNumber) {
            Answers.splice(i,1);
        }
    }
}

class create_notice extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            NTitle: "",
            NContent: "",
            Nemail: "off",

            ETitle: "",
            EContent: "",
            EDate: "",
            EStart: "",
            Eend: "",
            Elocation: "",
            Elink: "",
            Eemail: "off",

            STitle: "",
            SItems: [],
            Semail: ""

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
        this.submitNotice = this.submitNotice.bind(this);
        this.submitEvent = this.submitEvent.bind(this);
        this.submitSurvey = this.submitSurvey.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.remQuestion = this.remQuestion.bind(this);
        this.handleAnswerReturn = this.handleAnswerReturn.bind(this);
        this.handleQuestionReturn = this.handleQuestionReturn.bind(this);
        this.getQuestionIndex = this.getQuestionIndex.bind(this);
        this.getAnswerIndex = this.getAnswerIndex.bind(this);

    }

    componentWillMount(){
        this.addQuestion();   // Push in the first survey answer
    }

    /* Generic function for all text areas */
    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value});
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
        // Post the notice to the DB
        console.log(this.state.NTitle)
        console.log(this.state.NContent)
        console.log(this.state.Nemail)
    }
    submitEvent(){
        // Post the Event to the DB
        console.log(this.state.ETitle)
        console.log(this.state.EContent)
        console.log(this.state.EDate)
        console.log(this.state.EStart)
        console.log(this.state.Eend)
        console.log(this.state.Elocation)
        console.log(this.state.Elink)
        console.log(this.state.Eemail)
    }
    submitSurvey(){
        // Post the Sruvey to the DB
        console.log(this.state.STitle);
        console.log(Questions);
        console.log(Answers);
    }

    addQuestion(){
        // Add a blank question to the screen
        mysurveyItems.push(<Question
            key={mysurveyCount}
            count={mysurveyCount + 1}
            handleReturn={this.handleAnswerReturn}
            handleQReturn={this.handleQuestionReturn}
        />)
        mysurveyCount++;
        this.setState({SItems: mysurveyItems});
    }

    remQuestion(){
        // Remove the question from the submission array
        var index = this.getQuestionIndex(mysurveyCount);
        if (index != -1){
            Questions.splice(index,1);
        }
        // Remove the answers fromt the submission array
        RemoveAnswers(mysurveyCount);

        // Remove the question from the display
        mysurveyItems.pop()
        mysurveyCount--;
        this.setState({SItems: mysurveyItems});
    }

    /* An answer has been passed back up  */
    handleAnswerReturn(value, aNumber, qNumber){
        // See if its already got a record in the submissions array
        var index = this.getAnswerIndex(aNumber,qNumber);

        // Find the Q# A# that matches, if no match push new
        if (index == -1){
            Answers.push({aNum: aNumber, qNum: qNumber, Answer: value});
        }
        else{
            Answers[index].Answer = value;
        }
    }

    /* A Question has been passed back up */
    handleQuestionReturn(value, qNumber, qType){
        // See if its already got a record in the submissions array
        var index = this.getQuestionIndex(qNumber);

        // Find the Q# that matches, if no match push new
        if (index == -1){
            Questions.push({qNum: qNumber, qType: qType, Question: value});
        }
        else{
            Questions[index].Question = value;
            Questions[index].qType = qType;
        }
    }

    /* Submission Array Answers and Questions Search functions */
    getAnswerIndex(aNumber, qNumber) {
        for(var i = 0; i < Answers.length; i++) {
            if((Answers[i]['aNum'] == aNumber) & (Answers[i]['qNum'] == qNumber)) {
                return i;
            }
        }
        return -1;
    }
    getQuestionIndex(qNumber){
        for(var i = 0; i < Questions.length; i++) {
            if(Questions[i]['qNum'] == qNumber) {
                return i;
            }
        }
        return -1;
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

            <TabPanel>  {/******************************************** Notifications *********************************************************************** */}
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
                        Disabled={true}
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
            <TabPanel>  {/******************************************** SURVEYS *********************************************************************** */}
                <div className="w3-row">
                    <div><h3>Enter the Surveys Questions and Answers below:</h3></div>
                    <div className="w3-col s3 CreateNoticeDiv"><div><label>Survey Title:</label></div></div>
                    <div className="w3-col s9 CreateNoticeDiv"> <div><input type="text" name="STitle" placeholder="My Title" value={this.state.STitle} onChange={this.handleChange}/></div></div>

                    {this.state.SItems.map((item, i) =>
                     <div key={i}>
                       {item}
                     </div>
                    )}

                    <div className="event-buttons">
                        <button type="button" className="btn btn-default" id="btnAddQA" onClick={this.addQuestion}>Add</button>
                        <button type="button" className="btn btn-default" id="btnRemQA" onClick={this.remQuestion}>Remove</button>
                    </div>


                </div>
                <div>
                    <div><h3>Preview:</h3></div>

                </div>
                <div className="event-buttons">
                    <div className="w3-row">
                        <div className="w3-col s6" id="CreateNoticeEmail"><label>Email to all</label></div>
                        <div className="w3-col s6" id="CreateNoticeEmailSwitch"><label className="switch"><input type="checkbox" name="Semail" onChange={this.handleChangeCheckbox}/><span className="slider round"></span></label></div>
                    </div>
                    <div><button type="button" className="btn btn-primary" id="btnSubmitSurvey" onClick={this.submitSurvey}>Submit</button></div>
                </div>
            </TabPanel>
        </Tabs>
      </div>
    );
  }


};
export default create_notice;

/* Used only by Surveys */
class Question extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          question: "",
          questionType: "radio",
          answers: [],
          answersCount: 0,
          hide: false          // For hiding and displaying add/remove buttons
      };
      this.addA = this.addA.bind(this);
      this.remA = this.remA.bind(this);
      this.setText = this.setText.bind(this);
      this.setRadio = this.setRadio.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
      this.handleAnswerReturn = this.handleAnswerReturn.bind(this);
    }

    componentWillMount(){
        this.addA();
    }

    // Adds an answer
    addA(){
        var newArray = this.state.answers.slice();
        newArray.push(<Answer
            key={this.state.answersCount}
            count={this.state.answersCount + 1}
            handleReturn = {this.handleAnswerReturn}
        />)
        this.setState({
            answers: newArray,
            answersCount: this.state.answersCount + 1
        });
    }

    // Removes the last answer
    remA(){
        var newArray = this.state.answers.slice();
        newArray.pop()
        this.setState({
            answers: newArray,
            answersCount: this.state.answersCount - 1
        });
    }

    // Removes all answers, changes answer to a written one
    setText(){
        switchTypeText(this.props.count);   // Modify the sumbission array
        var newArray = [];
        newArray.push(<AnswerWritten
            key={0}
        />)
        this.setState({
            answers: newArray,
            answersCount: 1,
            hide: true  // Disable the add/remove buttons
        });
    }

    // Removes the textArea answer, adds a new answer
    setRadio(){
        switchTypeRadio(this.props.count);   // Modify the sumbission array
        var newArray = [];
        newArray.push(<Answer
            key={0}
            count={1}
            handleReturn = {this.handleAnswerReturn}
        />)
        this.setState({
            answers: newArray,
            answersCount: 1,
            hide: false     // Enable add/remove buttons
        });
    }

    /* Pass back the new question */
    handleChange(event){
        this.setState({question: event.target.value});
        this.props.handleQReturn(event.target.value, this.props.count, this.state.questionType);
    }
    /* Pass back the new answer (from Answer)*/
    handleAnswerReturn(value, AnswerNumber){
        this.props.handleReturn(value,AnswerNumber,this.props.count);
    }

    handleChangeCheckbox(event){
        if(this.state.questionType == "radio"){
            this.setState({questionType: "textArea"});
            this.setText()
        }
        else{
            this.setState({questionType: "radio"});
            this.setRadio()
        }
    }

    render(){
    return(
        <div>
            <div>
                <div className="w3-col s3 CreateNoticeDiv surveyAddQuestions"><div><label>Question: {this.props.count}</label></div></div>
                <div className="w3-col s7 CreateNoticeDiv surveyAddQuestions"> <div><input type="text" name="SQ" placeholder="Question" value={this.state.question} onChange={this.handleChange}/></div></div>
                <div className="w3-col s2 questionSwitch"><label className="switch"><input type="checkbox" name="questionType" onChange={this.handleChangeCheckbox}/><span className="slider round"></span></label></div>

                {this.state.answers.map((item, i) =>
                 <div key={i}>
                   {item}
                 </div>
                )}

            </div>
            <div className="event-buttons" hidden={this.state.hide}>
                <button type="button" className="btn btn-default" id="btnAddA" onClick={this.addA}>+</button>
                <button type="button" className="btn btn-default" id="btnRemA" onClick={this.remA}>-</button>
            </div>
        </div>
        );
    }
};

class Answer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          Answer: ""
      };
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({Answer: event.target.value});
        this.props.handleReturn(event.target.value, this.props.count);
    }

    render(){
    return(
        <div>
            <div className="w3-col s3 CreateNoticeDiv"><div><label>Answer:</label></div></div>
            <div className="w3-col s9 CreateNoticeDiv"> <div><input type="text" name="SA" placeholder="Answer" value={this.state.Answer} onChange={this.handleChange}/></div></div>
        </div>
        );
    }
};

class AnswerWritten extends React.Component {
    render(){
    return(
        <div>
            <div className="w3-col s3 CreateNoticeDiv"><div><label>Answer:</label></div></div>
            <div className="w3-col s9 CreateNoticeDiv"><div><textarea rows="5" name="SContent" disabled={true} placeholder="The user will be able to enter their own answer here"></textarea></div></div>
        </div>
        );
    }
};