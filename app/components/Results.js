import React from 'react';
import $ from 'jquery';                                             /* For ajax query */
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';          /* https://github.com/reactjs/react-tabs */

class Results extends React.Component {

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
                <div><h3>Enter the event details below:</h3></div>

            </TabPanel>
            <TabPanel>  {/******************************************** Surveys *********************************************************************** */}
                <div><h3>Enter the event details below:</h3></div>
            </TabPanel>
        </Tabs>
      </div>
  </div>
    );
  }


};
export default Results;
