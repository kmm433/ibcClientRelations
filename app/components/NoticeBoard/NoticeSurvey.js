import React from 'react';

/*

key={survey[i].SurveyID}
title={survey[i].SurveyTitle + survey[i].SurveyID}
DatePosted={survey[i].DatePosted}
noQuestions={survey[i].noQuestions}

*/

class NoticeSurvey extends React.Component {
  render(){
    return(
      <div className="notice">
        <div className="notice-title">
          <h2>{this.props.title}</h2>
        </div>
        <div className="notice-content">
          <p>{this.props.DatePosted}</p>
          <p>{this.props.noQuestions}</p>
        </div>
      </div>
    );
  }
};

export default NoticeSurvey;
