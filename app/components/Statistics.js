import React from 'react';
import $ from 'jquery';                                     /* For ajax query */
import RenewStat from './Statistics/RenewStat.js'
import NewMemberStat from './Statistics/NewMemberStat.js'

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render(){
        return(
            <div className="main-component w3-row">
                <div className='w3-container w3-card-4 w3-light-grey'>
                    <h2>Live Statistics</h2>
                    <div><NewMemberStat/></div>
                    <div><RenewStat/></div>
                </div>
            </div>
        );
    }
};

export default Statistics;
