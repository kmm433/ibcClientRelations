import React from 'react';
import $ from 'jquery';                                             /* For ajax query */
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';          /* https://github.com/reactjs/react-tabs */
import EventStatList from './Statistics/EventStatList.js'
import SurveyStatList from './Statistics/SurveyStatList.js'

class Results extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          events: [],
          surveys: [],
          Reload: false
      };
      this.reload = this.reload.bind(this);
    }

    componentWillMount(){
      this.get_Allevents();
      this.get_AllSurveys();
    }

    render() {

    var noEventsMessage = ""
    var noSurveyMessage = ""
    if (this.state.events.length == 0){
        noEventsMessage = <div style={{textAlign: 'center', marginTop:'50px', marginBottom:'50px'}}><h4>Theres nothing to display!</h4>As an Executive, you can create Notices, Events and Surveys to display to your chamber by using the Create New Notice Page</div>
    }
    if (this.state.surveys.length == 0){
        noSurveyMessage = <div style={{textAlign: 'center', marginTop:'50px', marginBottom:'50px'}}><h4>Theres nothing to display!</h4>As an Executive, you can create Notices, Events and Surveys to display to your chamber by using the Create New Notice Page</div>
    }

    return(
    <div className="main-component w3-row">
        <div className='w3-container w3-card-4 w3-light-grey'>
        <h2>See Event and Survey Results</h2>
        <Tabs>
            <TabList>
                <Tab>Events</Tab>
                <Tab>Surveys</Tab>
            </TabList>

            <TabPanel>  {/******************************************** Events *********************************************************************** */}
                <div><h3>Click on an event to view details:</h3></div>
                <div>
                    <EventStatList
                      event_list={this.state.events}
                      reload={this.reload}
                    />
                </div>
                {noEventsMessage}
            </TabPanel>
            <TabPanel>  {/******************************************** Surveys *********************************************************************** */}
                <div><h3>Click on a survey to view details:</h3></div>
                <div>
                    <SurveyStatList
                      survey_list={this.state.surveys}
                      reload={this.reload}
                    />
                </div>
                {noSurveyMessage}
            </TabPanel>
        </Tabs>
      </div>
  </div>
    );
  }

  /* Returns all events for this chamber */
  get_Allevents(){
      $.ajax({
            url: '/php/get_AllEvents.php',
            type:'POST',
            dataType: "json",
            success : function(response){
                this.setState({events: response});
            }.bind(this)
        });
   }

   /* Returns all Surveys for this chamber */
   get_AllSurveys(){
       $.ajax({
             url: '/php/get_AllSurveys.php',
             type:'POST',
             dataType: "json",
             success : function(response){
                 this.setState({surveys: response});
             }.bind(this)
         });
    }

    reload(){
        if(this.state.Reload == false){
            this.setState({
                Reload: true
            });
        }else {
            this.setState({
                Reload: false
            });
        }
        this.get_Allevents();
        this.get_AllSurveys();
    }


};
export default Results;
