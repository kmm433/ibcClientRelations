import React from 'react';
import $ from 'jquery';                                     /* For ajax query */

/*
This component is for individual questions and their answers when the question type is text area

<SurveyAnswerStatText
    key={x['questionNo']}
    ID={x['questionNo']}
    title={x['question']}
/>);
*/


class SurveyAnswerStatText extends React.Component {    // Represents each question
    constructor(props) {
        super(props);
        this.state = {
            Results: []
        };
        this.generateResponseList = this.generateResponseList.bind(this);
        this.getResults = this.getResults.bind(this);
    }

    componentWillMount(){
        this.getResults();   // Retrieve the list of survey results
    }

    render(){
        return(
            <div className='event-list-item'>
                <div className="w3-row" id='eventStat' style={{paddingLeft: '8px', marginBottom: '20px'}}>
                    <div><h4>Question: {this.props.title}</h4></div>
                    <div><h5>Responses:</h5></div>
                    <div>
                        <div>{this.generateResponseList()}</div>
                    </div>
                </div>
            </div>
        );
    }


    getResults(){
      $.ajax({
          url: '/php/get_QuestionResult.php',
          type:'POST',
          dataType: "json",
          async: false,
          data: {
              'surveyID': this.props.SurveyID,
              'questionNo': this.props.ID
          },
          success : function(response){
              this.setState({ Results: response });
          }.bind(this)
      });
    }

    generateResponseList() {
        var list = null;
        const rList = this.state.Results;
        if (rList) {
            list = rList.map((x, index) => {
                if(x['answer'] != ""){  // Filter out empty responses
                    return( <Answer key={x['ResultID']} answer={x['answer']}/>);
                }
            });
        }
        return list;
    }
};

export default SurveyAnswerStatText;


class Answer extends React.Component {
    render(){
    return(
        <div className="w3-row" style={{marginBottom: '5px'}}>
            <div><span>- {this.props.answer}</span></div>
        </div>
        );
    }
};
