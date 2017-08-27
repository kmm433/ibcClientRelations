<<<<<<< HEAD
import React from 'react';
import $ from 'jquery';   /*For ajax query */
import Slider from 'react-slick';   //https://github.com/akiran/react-slick


/*
key={survey[i].SurveyID}
SurveyID={survey[i].SurveyID}
title={survey[i].SurveyTitle + survey[i].SurveyID}
DatePosted={survey[i].DatePosted}
noQuestions={survey[i].noQuestions}
*/

var questions = [];
var answers = [];
=======
/*
Todo:
- Get different answer types, start determining which question holds which type
- Add submit functionality

Page Gets:
    key={survey[i].SurveyID}
    SurveyID={survey[i].SurveyID}
    title={survey[i].SurveyTitle + survey[i].SurveyID}
    DatePosted={survey[i].DatePosted}
    noQuestions={survey[i].noQuestions}
*/

import React from 'react';
import $ from 'jquery';                                         /* For ajax query */
import Slider from 'react-slick';                               /* https://github.com/akiran/react-slick */
import { RadioGroup, RadioButton } from 'react-radio-buttons';  /* https://www.npmjs.com/package/react-radio-buttons */

var questions = [];
var answers = [];
var userAnswers = [];

const Loader = () =>
  <div className="loader">
    <div />
    <div />
    <div />
  </div>
>>>>>>> master

class NoticeSurvey extends React.Component {
    constructor(props) {
      super(props);
<<<<<<< HEAD
=======
      this.state = {
          items: []
      };
>>>>>>> master
    }

    componentWillMount(){
        /* get all Questions and Answers */
        this.get_SurveyQuestions();
        this.get_SurveyAnswers();
<<<<<<< HEAD
=======
        this.setData();
>>>>>>> master
    }

    get_SurveyQuestions(){
          $.ajax({
              url: '/php/get_SurveyQuestions.php',
              type:'POST',
              async: false,
              dataType: "json",
              data: {
                  'surveyID': this.props.SurveyID
              },
              success : function(response){
                  questions = response;
                  console.log('get_SurveyQuestions Success')
              }.bind(this),
              error: function(xhr, status, err){
                  console.log('get_SurveyQuestions Error')
              }.bind(this)
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
                },
                success : function(response){
                    answers = response;
                    console.log('get_SurveyAnswers Success')
                }.bind(this),
                error: function(xhr, status, err){
                    console.log('get_SurveyAnswers Error')
                }.bind(this)
            });
        }

<<<<<<< HEAD
=======
        setData(){
            var FormattedOutput = [];
            // Cycle through questions and each set of answers
            for(var i = 0; i < questions.length; i++){

                //Prepare results array
                userAnswers.push({surveyID: this.props.SurveyID, questionNo: questions[i].questionNo, question: questions[i].question, AnswerID: answers[0].AnswerID, Answer: answers[0].answer});

                //Add all potential answers
                var tmpA = [];
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
                FormattedOutput.push(<Survey
                        key={questions[i].questionNo}
                        question={questions[i].question}
                        answers={tmpA}
                />)
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

>>>>>>> master

  render(){
      var settings = {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1
        };

    return(
      <div className="notice">
        <div className="notice-title">
          <h2>{this.props.title}</h2>
<<<<<<< HEAD
        </div>
        <div className="survey-content">
            <p>{this.props.DatePosted}</p>
            <div className="surveyQuestion">
                <Slider {...settings}>
                    <div>
                        <h3>{questions[0].question}</h3>
                        <p>{answers[0].answer}</p>
                        <p>{answers[1].answer}</p>
                    </div>
                    <div>
                        <h3>{questions[1].question}</h3>
                        <p>{answers[2].answer}</p>
                        <p>{answers[3].answer}</p>
                        <p>{answers[3].answer}</p>
                        <p>{answers[3].answer}</p>
                    </div>
                    <div><h3>3</h3></div>
                    <div><h3>4</h3></div>
                    <div><h3>5</h3></div>
                    <div><h3>6</h3></div>
                </Slider>
            </div>
=======
          <h2>{this.props.DatePosted}</h2>
        </div>
        <div className="survey-content">
            <Slider {...settings}>
                {this.state.items.map((item, i) =>
                 <div key={i}>
                   {item}
               </div>
               )}
            </Slider>
>>>>>>> master
        </div>
      </div>
    );
    }
};

export default NoticeSurvey;
<<<<<<< HEAD
=======

class Survey extends React.Component {
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

class SubmitPage extends React.Component {
    insert_SurveyAnswers(){
          $.ajax({
              url: '/php/insert_SurveyAnswers.php',
              type:'POST',
              dataType: "json",
              data: {
                  'data': userAnswers
              },
              success : function(response){
                  console.log(response)
                  console.log('insert_SurveyAnswers Success')
              }.bind(this),
              error: function(xhr, status, err){
                  //console.log('insert_SurveyAnswers Error')
                  console.log(status)
              }.bind(this)
          });
    }
    render(){
    return(
        <div>
            <h3>Would you like to submit?</h3>
            <div>
                {<button type="button" className="btn btn-primary" id="btnSubmitSurvey" onClick={this.insert_SurveyAnswers}>Submit</button>}
            </div>
        </div>
        );
    }

};
>>>>>>> master
