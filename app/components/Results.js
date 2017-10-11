import React from 'react';
import $ from 'jquery';                                             /* For ajax query */
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';          /* https://github.com/reactjs/react-tabs */
import EventStatList from './Statistics/EventStatList.js'

class Results extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          events: []
      };
    }

    componentWillMount(){
      this.get_events();
    }

    /* Returns all events for this chamber */
    get_events(){
        $.ajax({
              url: '/php/get_Events.php',
              type:'POST',
              dataType: "json",
              success : function(response){
                  this.setState({events: response});
                  //console.log('get_Events Success')
              }.bind(this),
              error: function(xhr, status, err, response){
                  console.log('get_Events Error' + xhr.responseText);
              }.bind(this)
          });
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
                    />
                </div>
            </TabPanel>
            <TabPanel>  {/******************************************** Surveys *********************************************************************** */}
                <div><h3>Choose survey from the list below:</h3></div>
            </TabPanel>
        </Tabs>
      </div>
  </div>
    );
  }


};
export default Results;
