import React from 'react';
import $ from 'jquery';                                     /* For ajax query */
import PieChart from 'react-minimal-pie-chart';             /* https://github.com/toomuchdesign/react-minimal-pie-chart */

/*
This component is for individual questions and their answers when the question type is Radio Buttons

<SurveyAnswerStat
    key={x['questionNo']}
    ID={x['questionNo']}
    title={x['question']}
    answers={answers}
/>);
*/


var colourlist = ["#2462AB","#C3423F","#FDE74C","#9BC53D","#211A1E","#F7B267","#A8C686","#DCCCFF","#99907D","#194d12","#5e2fc3","#e915f5","#93720a","#fdb760","#8998de",
                  "#ed7f7a","#8492b5","#f56499","#c8dd3b","#73446c","#94dbd4","#2bb86b","#5a48cb","#280141","#70eef7","#dbe658","#d8f9f2","#88abbb","#d44114","#c8f0b7"];

class SurveyAnswerStat extends React.Component {    // Represents each question
    constructor(props) {
        super(props);
        this.state = {
            PieChartData: [],
            PieChartEmpty: true,
            ResultsCount: []
        };
        this.generateAnswerList = this.generateAnswerList.bind(this);
        this.getResults = this.getResults.bind(this);
        this.setupPieChart = this.setupPieChart.bind(this);
    }

    componentWillMount(){
        this.getResults();   // Retrieve the list of survey results
    }


    setupPieChart(results){
        // Setup Pie Chart Data
        var tmpAnswerStats = [];
        var tmpResultsCount = [];
        var noResults = true;
        for(var i = 0; i<this.props.answers.length; i++){               // For each answer
            var value = 0;
            for(var b = 0; b<results.length; b++){                      // for each result
                if(results[b].AnswerID == this.props.answers[i].AnswerID){
                    value++;
                    noResults = false;
                }
            }
            tmpAnswerStats.push({value: value, key: i, color: colourlist[i%30]});
            tmpResultsCount.push({AnswerID: this.props.answers[i].AnswerID, Count: value});
        }
        this.setState({
            PieChartData: tmpAnswerStats,
            PieChartEmpty: noResults,
            ResultsCount: tmpResultsCount
        });
    }


    render(){
        var pieChart = ""
        if (this.state.PieChartEmpty == false){
            pieChart = <PieChart data={this.state.PieChartData}/>
        }else {
            pieChart = <div style={{marginTop: '16%', textAlign: 'center'}}><h4>It appears nobody has responded to this question yet!</h4></div>
        }


        return(
            <div className='event-list-item'>
                <div className="w3-row" id='eventStat' style={{paddingLeft: '8px', marginBottom: '20px'}}>
                    <div><h4>Question: {this.props.title}</h4></div>
                    <div className="w3-col s6">
                        {pieChart}
                    </div>
                    <div className="w3-col s6" style={{marginTop: '15%'}}>
                        <div>
                            <div>{this.generateAnswerList()}</div>
                        </div>
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
              console.log('get_QuestionResult Success');
              for(var i=0; i< response.length; i++){
                  console.log(response[i]);
              }
              this.setupPieChart(response);
          }.bind(this),
          error: function(xhr, status, err){
              console.log('get_QuestionResult Error');
          }.bind(this)
      });
    }

    generateAnswerList() {
        var list = null;
        const aList = this.props.answers;
        if (aList) {
            list = aList.map((x, index) => {
            return(
                <Answer
                    key={x['AnswerID']}
                    ID={x['AnswerID']}
                    answer={x['answer']}
                    colourIndex={index}
                    results={this.state.ResultsCount}
                />);
            });
        }
        return list;
    }
};

export default SurveyAnswerStat;


class Answer extends React.Component {
    constructor(props) {
      super(props);
      this.getCount = this.getCount.bind(this);
    }

    getCount(id){
        for(var i = 0; i < this.props.results.length; i++){
            if (this.props.results[i].AnswerID == id){
                return this.props.results[i].Count;
            }
        }
        console.log("ERROR IN GETCOUNT, RESULT NOT FOUND");
    }

    render(){
    return(
        <div className="w3-row" style={{marginBottom: '5px'}}>
            <div className="w3-col s4"><div className="circle" style={{background: colourlist[this.props.colourIndex%30]}}></div></div>
            <div className="w3-col s8"><span>{this.getCount(this.props.ID)} {this.props.answer}</span></div>
        </div>
        );
    }
};
