import React from 'react';
import $ from 'jquery';                                     /* For ajax query */
import Collapsible from 'react-collapsible';                /* https://www.npmjs.com/package/react-collapsible */
import PieChart from 'react-minimal-pie-chart';             /* https://github.com/toomuchdesign/react-minimal-pie-chart */
//import PieChart from "react-svg-piechart"                   /* https://www.npmjs.com/package/react-svg-piechart */
import NoticeEvent from '../NoticeBoard/NoticeEvent.js';


/*<EventStat
  key={x['EventID']}
  ID={x['EventID']}
  title={x['EventTitle']}
  message={x['Event']}
  eventdate={x['EventDate']}
  endTime={x['endTime']}
  location={x['Location']}
  EventURL={x['EventURL']}
  DatePosted={x['DatePosted']}


  style={{whiteSpace: 'pre-line', wordBreak: 'break-all'}}

/>*/

class EventStat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 1,
            going: 0,
            notGoing: 0
        };
    }

    componentWillMount(){
      this.get_eventResults();
    }


    render(){

        var going = ((this.state.going) ? parseInt(this.state.going, 10) : 0);
        var notGoing = ((this.state.notGoing) ? parseInt(this.state.notGoing, 10) : 0);
        if (this.state.total != null && this.state.going != null && this.state.notGoing != null){
            var noResponse = parseInt(this.state.total,10) - (parseInt(this.state.going, 10) + parseInt(this.state.notGoing, 10));
        }
        else {
            var noResponse = 0;
        }
        return(
            <div className='event-list-item'>
                <Collapsible trigger={<div className="w3-row">
                                        <div className="w3-col s9"><h4>{this.props.title}</h4></div>
                                        <div className="w3-col s3" style={{float: 'right', marginTop: '15px'}}>Posted: {this.props.DatePosted}</div>
                                      </div>}>

                    <div className="w3-row">
                        <NoticeEvent
                            key="PrevEvent"
                            eventID=""
                            title={this.props.title}
                            message={this.props.message}
                            eventdate={this.props.eventdate}
                            endTime={this.props.endTime}
                            location={this.props.location}
                            EventURL={this.props.EventURL}
                            DatePosted={this.props.DatePosted}
                            Disabled={true}
                        />
                    </div>
                    <div className="w3-row" id='eventStat' style={{paddingLeft: '8px', marginBottom: '20px'}}>
                        <div><h4>Results:</h4></div>
                        <div className="w3-col s6">
                            <PieChart
                                  data={[
                                    { value: parseInt(noResponse), key: 1, color: '#676d75' },
                                    { value: parseInt(going), key: 2, color: '#2462AB' },
                                    { value: parseInt(notGoing), key: 3, color: '#cb2027' },
                                  ]}
                            />
                        </div>
                        <div className="w3-col s6" style={{marginTop: '15%'}}>
                            <div>
                                <div className="w3-row" style={{marginBottom: '5px'}}>
                                    <div className="w3-col s4"><div className="circle" style={{background: '#676d75'}}></div></div>
                                    <div className="w3-col s8"><span>{noResponse} No Response</span></div>
                                </div>
                                <div className="w3-row" style={{marginBottom: '5px'}}>
                                    <div className="w3-col s4"><div className="circle" style={{background: '#2462AB'}}></div></div>
                                    <div className="w3-col s8"><span>{going} Attending</span></div>
                                </div>
                                <div className="w3-row" style={{marginBottom: '5px'}}>
                                    <div className="w3-col s4"><div className="circle" style={{background: '#cb2027'}}></div></div>
                                    <div className="w3-col s8"><span>{notGoing} Unable to attend</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Collapsible>
            </div>
        );
    }

    get_eventResults(){
        $.ajax({
              url: '/php/get_EventGoing.php',
              type:'POST',
              dataType: "json",
              data:{
                  'EventID': this.props.ID
              },
              success : function(response){
                  this.setState({going: response});
                  //console.log('get_EventGoing Success')
              }.bind(this),
              error: function(xhr, status, err, response){
                  console.log('get_EventGoing Error' + xhr.responseText);
              }.bind(this)
          });
          $.ajax({
                url: '/php/get_EventNotGoing.php',
                type:'POST',
                dataType: "json",
                data:{
                    'EventID': this.props.ID
                },
                success : function(response){
                    this.setState({notGoing: response});
                    //console.log('get_EventNotGoing Success')
                }.bind(this),
                error: function(xhr, status, err, response){
                    console.log('get_EventNotGoing Error' + xhr.responseText);
                }.bind(this)
           });
           $.ajax({
                 url: '/php/get_EventCount.php',
                 type:'POST',
                 dataType: "json",
                 data:{
                     'EventID': this.props.ID
                 },
                 success : function(response){
                     this.setState({total: response});
                     //console.log('get_EventCount Success')
                 }.bind(this),
                 error: function(xhr, status, err, response){
                     console.log('get_EventCount Error' + xhr.responseText);
                 }.bind(this)
             });
    }
};

export default EventStat;
