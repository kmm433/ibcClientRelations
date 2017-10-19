import React from 'react';
import $ from 'jquery';                                     /* For ajax query */
import Collapsible from 'react-collapsible';                /* https://www.npmjs.com/package/react-collapsible */
import PieChart from 'react-minimal-pie-chart';             /* https://github.com/toomuchdesign/react-minimal-pie-chart */
import moment from "moment";                                /* https://momentjs.com/ */
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
            notGoing: 0,
            attendingList: [],
            notgoingList: []
        };
        this.deleteNotice = this.deleteNotice.bind(this);
        this.get_eventResults = this.get_eventResults.bind(this);
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

        var emptyGroup = ""
        var pieChart = ""
        if (this.state.total == 0){
            emptyGroup = <div style={{marginTop: '16%',textAlign: 'center'}}><h4>It appears nobody was invited! This is usually caused by the event only being offered to empty groups</h4></div>
        }else {
            pieChart = <PieChart
                  data={[
                    { value: parseInt(noResponse), key: 1, color: '#676d75' },
                    { value: parseInt(going), key: 2, color: '#2462AB' },
                    { value: parseInt(notGoing), key: 3, color: '#cb2027' },
                  ]}
            />
        }

        return(
            <div className='event-list-item'>
                <Collapsible trigger={<div className="w3-row">
                                        <div className="w3-col s9"><h4>{this.props.title}</h4></div>
                                        <div className="w3-col s3" style={{float: 'right', marginTop: '15px'}}>Posted: {moment(this.props.DatePosted).format('LLL')}</div>
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
                            {emptyGroup}
                            {pieChart}
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
                    <div className="w3-row" id='eventStat' style={{paddingLeft: '8px', marginBottom: '20px'}}>
                        <div><h4>Attending:</h4></div>
                        <div>{this.generateAttendingList()}</div>
                    </div>
                    <div className="w3-row" id='eventStat' style={{paddingLeft: '8px', marginBottom: '20px'}}>
                        <div><h4>Unable to Attend:</h4></div>
                        <div>{this.generateNotGoingList()}</div>
                    </div>
                    <div className="w3-row" id='eventStat' style={{paddingLeft: '8px', marginBottom: '20px', textAlign: 'center'}}>
                        <div><button type="button" className="btn btn-primary" id="btnDeleteEvent" onClick={this.deleteNotice}>Delete Event</button></div>
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
                  this.setState({
                      going: response[0],
                      notGoing: response[1],
                      total: response[2],
                      attendingList: response[3],
                      notgoingList: response[4]
                  });
                  //console.log('get_EventGoing Success')
              }.bind(this),
              error: function(xhr, status, err, response){
                  console.log('get_EventGoing Error' + xhr.responseText);
              }.bind(this)
          });
    }
    deleteNotice(){
        if (confirm("Warning: This will permenantly remove this event from your chamber members and can not be undone! Are you sure?") == true){
            $.ajax({
                url: '/php/delete_Event.php',
                type:'POST',
                dataType: "json",
                data:{
                    'eventID': this.props.ID
                },
                success : function(response){
                    //console.log('delete_Event Success');
                }.bind(this),
                error: function(xhr, status, err){
                    console.log('delete_Event Error' + xhr.responseText);
                }.bind(this)
            });

            // Reload Parent Component
            this.props.reload();
        }
    }
    generateAttendingList() {
      const aList = this.state.attendingList;
      var list = null;
      if (aList) {
        list = aList.map((x, index) => {
          return(
            <Person
              key={index}
              name={x['firstname'] + " " + x['lastname']}
            />
          );
        })
      }
      return list;
    }
    generateNotGoingList() {
      const nList = this.state.notgoingList;
      var list = null;
      if (nList) {
        list = nList.map((x, index) => {
          return(
            <Person
              key={index}
              name={x['firstname'] + " " + x['lastname']}
            />
          );
        })
      }
      return list;
    }

};

export default EventStat;

class Person extends React.Component {
    render(){
    return(
        <div className="w3-row" style={{marginBottom: '5px'}}>
            <div><span>- {this.props.name}</span></div>
        </div>
        );
    }
};
