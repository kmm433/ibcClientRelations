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
            </TabPanel>
            <TabPanel>  {/******************************************** Surveys *********************************************************************** */}
                <div><h3>Click on a survey to view details:</h3></div>
                <div>
                    <SurveyStatList
                      survey_list={this.state.surveys}
                      reload={this.reload}
                    />
                </div>
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
                //console.log('get_AllEvents Success')
            }.bind(this),
            error: function(xhr, status, err, response){
                console.log('get_AllEvents Error' + xhr.responseText);
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
                 console.log('get_AllSurveys Success')
             }.bind(this),
             error: function(xhr, status, err, response){
                 console.log('get_AllSurveys Error' + xhr.responseText);
             }.bind(this)
         });
    }

    reload(){
        console.log("reload");
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
