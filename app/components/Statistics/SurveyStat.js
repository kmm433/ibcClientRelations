import React from 'react';
import $ from 'jquery';                                     /* For ajax query */
import Collapsible from 'react-collapsible';                /* https://www.npmjs.com/package/react-collapsible */
import moment from "moment";                                /* https://momentjs.com/ */
import NoticeSurvey from '../NoticeBoard/NoticeSurvey.js';
import SurveyAnswerStat from './SurveyAnswerStat.js'
import SurveyAnswerStatText from './SurveyAnswerStatText.js'

/*
<SurveyStat
  key={x['SurveyID']}
  ID={x['SurveyID']}
  title={x['SurveyTitle']}
  DatePosted={x['DatePosted']}
/>
*/

class SurveyStat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: "",
            DatePosted: "",
            questions: [],
            answers: []
        };
        this.get_SurveyQuestions = this.get_SurveyQuestions.bind(this);
        this.get_SurveyAnswers = this.get_SurveyAnswers.bind(this);
        this.generateAnswerStats = this.generateAnswerStats.bind(this);
        this.deleteNotice = this.deleteNotice.bind(this);
    }

    componentWillMount(){
        this.setState({
            ID: this.props.ID,
            DatePosted: this.props.DatePosted,
            title: this.props.title
        });
        this.get_SurveyQuestions()
        this.get_SurveyAnswers()
    }


    render(){
        return(
            <div className='event-list-item'>
                <Collapsible trigger={<div className="w3-row">
                                        <div className="w3-col s9"><h4>{this.props.title}</h4></div>
                                        <div className="w3-col s3" style={{float: 'right', marginTop: '15px'}}>Posted: {moment(this.props.DatePosted).format('LLL')}</div>
                                      </div>}>

                    <div className="w3-row">
                        <NoticeSurvey
                            key={this.state.ID}
                            SurveyID={this.state.ID}
                            title={this.state.title}
                            DatePosted={this.state.DatePosted}
                            statPage={true}
                        />
                    </div>
                    <div className="w3-row" id='eventStat' style={{paddingLeft: '8px', marginBottom: '20px'}}>
                        <div><h4>Results:</h4></div>
                        <div>{this.generateAnswerStats()}</div> {/* Each Question */}
                    </div>
                    <div className="w3-row" id='eventStat' style={{paddingLeft: '8px', marginBottom: '20px', textAlign: 'center'}}>
                        <div><button type="button" className="btn btn-primary" id="btnDeleteSurvey" onClick={this.deleteNotice}>Delete Survey</button></div>
                    </div>
                </Collapsible>
            </div>
        );
    }

    generateAnswerStats() {
      var list = null;
      // For each question
      const qList = this.state.questions;
      if (qList) {
          list = qList.map((x) => {
              var answers = [];
              for(var i = 0; i < this.state.answers.length; i++){
                  if(this.state.answers[i].questionNo == x['questionNo']){
                      answers.push(this.state.answers[i]);
                  }
              }

              if(x['answerType'] == 0){ // RadioButton
                  return(
                      <SurveyAnswerStat
                          key={x['questionNo']}
                          ID={x['questionNo']}
                          SurveyID={x['SurveyID']}
                          title={x['question']}
                          answers={answers}
                      />);
              }else {                   // TextArea
                  return(
                      <SurveyAnswerStatText
                          key={x['questionNo']}
                          ID={x['questionNo']}
                          SurveyID={x['SurveyID']}
                          title={x['question']}
                      />);
              }
          })
      }
      return list;
    }


    get_SurveyQuestions(){
        $.ajax({
            url: '/php/get_SurveyQuestions.php',
            type:'POST',
            dataType: "json",
            async: false,
            data: {
                'surveyID': this.props.ID
            },
            success : function(response){
                this.setState({questions: response});
                //console.log('get_SurveyQuestions Success' + this.props.ID + ' ' + response);
            }.bind(this),
            error: function(xhr, status, err){
                console.log('get_SurveyQuestions Error');
            }.bind(this)
        });
      }
      get_SurveyAnswers(){
            $.ajax({
                url: '/php/get_SurveyAnswers.php',
                type:'POST',
                dataType: "json",
                async: false,
                data: {
                    'surveyID': this.props.ID
                },
                success : function(response){
                    this.setState({answers: response});
                    //console.log('get_SurveyAnswers Success' + this.props.ID + ' ' + response);
                }.bind(this),
                error: function(xhr, status, err){
                    console.log('get_SurveyAnswers Error');
                }.bind(this)
            });
        }
        deleteNotice(){
          if (confirm("Warning: This will permenantly remove this Survey from your chamber members and can not be undone! Are you sure?") == true){
              $.ajax({
                  url: '/php/delete_Survey.php',
                  type:'POST',
                  dataType: "json",
                  data:{
                      'SurveyID': this.state.ID
                  },
                  success : function(response){
                      //console.log('delete_Survey Success');
                  }.bind(this),
                  error: function(xhr, status, err){
                      console.log('delete_Survey Error' + xhr.responseText);
                  }.bind(this)
              });

              // Reload Parent Component
              this.props.reload();
          }
        }


};

export default SurveyStat;
