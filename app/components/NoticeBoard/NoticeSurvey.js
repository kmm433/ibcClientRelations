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
import $ from 'jquery';             /* For ajax query */
import Slider from 'react-slick';   /* https://github.com/akiran/react-slick */

var questions = [];
var answers = [];

const Loader = () =>
  <div className="loader">
    <div />
    <div />
    <div />
  </div>

class NoticeSurvey extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          items: []
      };
    }

    componentWillMount(){
        /* get all Questions and Answers */
        this.get_SurveyQuestions();
        this.get_SurveyAnswers();
        this.setData();
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

        setData(){
            var FormattedOutput = [];
            // Cycle through questions and each set of answers
            for(var i = 0; i < questions.length; i++){
                var tmpA = [];
                for(var b = 0; b < answers.length; b++){
                    if (answers[b].questionNo == questions[i].questionNo){
                        tmpA.push(<p key={answers[b].questionNo + answers[b].answer}> {answers[b].answer} </p>);
                    }
                }
            // Add to the class
                FormattedOutput.push(<Survey
                        key={questions[i].questionNo}
                        question={questions[i].question}
                        answers={tmpA}
                />)
            }
            // Set the state with the items
            this.setState({
                items: FormattedOutput
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
      <div className="notice">
        <div className="notice-title">
          <h2>{this.props.title}</h2>
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
        </div>
      </div>
    );
    }
};

export default NoticeSurvey;

class Survey extends React.Component {
  render(){
    return(
        <div>
            <h3>{this.props.question}</h3>
            <div>{this.props.answers}</div>
        </div>
    );
  }
};
