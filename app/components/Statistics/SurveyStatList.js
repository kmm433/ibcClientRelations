import React from 'react';
import SurveyStat from './SurveyStat.js'

class SurveyStatList extends React.Component {

  constructor(props) {
    super(props);
    this.generateSurveyList = this.generateSurveyList.bind(this);
  }

  generateSurveyList() {
    const surveyList = this.props.survey_list;
    var list = null;
    if (surveyList) {
      list = surveyList.map((x) => {
        return(
          <SurveyStat
            key={x['SurveyID']}
            ID={x['SurveyID']}
            title={x['SurveyTitle']}
            DatePosted={x['DatePosted']}
            reload={this.props.reload}
          />
        );
      })
    }
    return list;
  }

  render() {
    return (
        <div>
            {this.generateSurveyList()}
        </div>
    );
  }
};

export default SurveyStatList;
