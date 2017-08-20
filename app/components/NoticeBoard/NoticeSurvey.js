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

class NoticeSurvey extends React.Component {
    constructor(props) {
      super(props);
    }

    componentWillMount(){
        /* get all Questions and Answers */
        this.get_SurveyQuestions();
        this.get_SurveyAnswers();
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
        </div>
      </div>
    );
    }
};

export default NoticeSurvey;
