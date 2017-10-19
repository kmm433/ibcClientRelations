import React from 'react';
import $ from 'jquery';                                         /* For ajax query */
import Slider from 'react-slick';                               /* https://github.com/akiran/react-slick */
import { RadioGroup, RadioButton } from 'react-radio-buttons';  /* https://www.npmjs.com/package/react-radio-buttons */
import {TextArea} from 'react-text-input';                      /* https://github.com/smikhalevski/react-text-input */
import moment from "moment";                                    /* https://momentjs.com/ */
import {Collapse} from 'react-collapse';                        /* https://www.npmjs.com/package/react-collapse */

var questions = [];
var answers = [];
var userAnswers = [];

const Loader = () =>
  <div className="loader">
    <div />
    <div />
    <div />
  </div>

class TmpNoticeSurvey extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          items: [],
          isOpened: true
      };
      this.collapse = this.collapse.bind(this);
      this.help = this.help.bind(this);
      this.approve = this.approve.bind(this);
      this.reject = this.reject.bind(this);
    }

    componentWillMount(){
        /* get all Questions and Answers */
        this.get_SurveyQuestions();
        this.get_SurveyAnswers();
        this.setData();
    }

    componentWillReceiveProps(nextProps){
        this.setData();
    }

    help(){
        alert("This Survey has been offered to your chamber by a Parent Chamber. Parent Chambers have the ability to offer notifications, events and surveys to their child chambers, however they require approval by an executive chamber member before it is displayed to the rest of the chamber. You can approve or reject this Survey offering here")
    }

    reject(){
        this.setState({
            isOpened: false
        });
        $.ajax({
            url: '/php/reject_TmpSurvey.php',
            type:'POST',
            dataType: "json",
            data:{
                'SurveyID': this.props.SurveyID
            }
        });
    }
    approve(){
        this.setState({
            isOpened: false
        });
        $.ajax({
            url: '/php/accept_TmpSurvey.php',
            type:'POST',
            dataType: "json",
            data:{
                'SurveyID': this.props.SurveyID
            }
        });
        this.props.reload();
    }

    get_SurveyQuestions(){
      $.ajax({
          url: '/php/get_SurveyQuestions.php',
          type:'POST',
          async: false,
          dataType: "json",
          data: {
              'surveyID': this.props.SurveyID
          }
      });
  }

  get_SurveyAnswers(){
        $.ajax({
            url: '/php/get_SurveyAnswers.php',
            type:'POST',
            async: false,
            dataType: "json",
            data: {
                'surveyID': this.props.SurveyID
            }
        });
    }
        /* Format the Questions and Answers properly, push into list that will
        be used by the slider                                               */
    setData(){
        var FormattedOutput = [];
        // Cycle through questions and each set of answers
        for(var i = 0; i < questions.length; i++){

            var tmpA = [];
            if (questions[i].answerType == 0 && answers.length > 0){ // Type is RadioButton
                //Prepare results array
                userAnswers.push({surveyID: this.props.SurveyID, questionNo: questions[i].questionNo, question: questions[i].question, AnswerID: answers[0].AnswerID, Answer: answers[0].answer});
                //Add all potential answers
                for(var b = 0; b < answers.length; b++){
                    if (answers[b].questionNo == questions[i].questionNo){
                        tmpA.push(
                            <RadioButton key={answers[b].AnswerID + answers[b].answer}
                                rootColor="#4d4c4c"
                                value={questions[i].questionNo + ";" + answers[b].AnswerID + ";" + answers[b].answer}>
                                {answers[b].answer}
                            </RadioButton>);
                    }
                }
                // Add final question / answer pairs
                FormattedOutput.push(<SurveyRadio
                        key={questions[i].questionNo}
                        question={questions[i].question}
                        answers={tmpA}
                />)
            }
            else if (questions[i].answerType == 1){ // Type is TextBox
                //Prepare results array
                userAnswers.push({surveyID: this.props.SurveyID, questionNo: questions[i].questionNo, question: questions[i].question, AnswerID: -1, Answer: ""});
                // Add final question / answer pairs
                FormattedOutput.push(<SurveyText
                        key={questions[i].questionNo}
                        qID={questions[i].questionNo}
                        question={questions[i].question}
                        answers={tmpA}
                />)
            }
        }

        // Add the submit page
        FormattedOutput.push(<SubmitPage
                key="Submit"
        />)

        // Set the state to completed question/answer pairs + submit page
        this.setState({
            items: FormattedOutput
        });
    }

    collapse(){
        this.setState({
            isOpened: false
        });
    }


    render(){
        var settings = {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1
        };
        return(
            <Collapse isOpened={this.state.isOpened}>
                <div className="notice">
                    <div className="tmpnotice-title notice-title">
                        <h2>{"New Survey: " + this.props.title}</h2>
                        <h2>{"Posted " + moment(this.props.DatePosted).format("Do MMM YYYY")}</h2>
                    </div>
                    <div className="survey-content">
                        <Slider {...settings}>
                            {this.state.items.map((item, i) =>
                             <div key={i}>
                               {item}
                            </div>
                           )}
                        </Slider>
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

export default TmpNoticeSurvey;

class SurveyRadio extends React.Component {
    constructor(props) {
      super(props);
      this.getIndex = this.getIndex.bind(this);
      this.onChange = this.onChange.bind(this);
  }
    getIndex(id) {
        for(var i = 0; i < userAnswers.length; i++) {
            if(userAnswers[i].questionNo == id) {
                return i;
            }
        }
    }
    onChange(value) {
        // Extract data
        var QuestionNo = value.split(";")[0];
        var AnswerID = value.split(";")[1];
        var answer = value.split(";")[2];

        // Set result
        var index = this.getIndex(QuestionNo);
        userAnswers[index].AnswerID = AnswerID;
        userAnswers[index].Answer = answer;
    }
    render(){
        return(
            <div>
                <h3>{this.props.question}</h3>
                <div id="SurveyAnswers">
                    <RadioGroup onChange={ this.onChange }>
                        {this.props.answers}
                    </RadioGroup>
                </div>
            </div>
        );
    }
};

class SurveyText extends React.Component {
    constructor(props) {
      super(props);
      this.getIndex = this.getIndex.bind(this);
      this.onChange = this.onChange.bind(this);
  }
    getIndex(id) {
        for(var i = 0; i < userAnswers.length; i++) {
            if(userAnswers[i].questionNo == id) {
                return i;
            }
        }
    }
    onChange(value) {
        // Set result
        var index = this.getIndex(this.props.qID);
        userAnswers[index].Answer = value;
    }
    render(){
        return(
            <div>
                <h3>{this.props.question}</h3>
                <div>
                    <TextArea fitLineLength={true}
                        onChange={e => this.onChange(e.target.value)}
                    />
                </div>
            </div>
        );
    }
};

class SubmitPage extends React.Component {
    render(){
    return(
        <div>
            <h3><label htmlFor="title">Would you like to submit?</label></h3>
            <div>
                {<button type="button" className="btn btn-primary" id="btnSubmitSurvey" disabled={true}>Submit</button>}
            </div>
        </div>
        );
    }

};
