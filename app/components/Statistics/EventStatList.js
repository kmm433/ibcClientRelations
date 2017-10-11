import React from 'react';
import EventStat from './EventStat.js'

class EventStatList extends React.Component {

  constructor(props) {
    super(props);
    this.generateEventList = this.generateEventList.bind(this);
  }

  // Maps all retrieved members to a row in the table
  generateEventList() {
    const eventList = this.props.event_list;
    var list = null;
    if (eventList) {
      list = eventList.map((x) => {
        return(
          <EventStat
            key={x['EventID']}
            ID={x['EventID']}
            title={x['EventTitle']}
            message={x['Event']}
            eventdate={x['EventDate']}
            endTime={x['endTime']}
            location={x['Location']}
            EventURL={x['EventURL']}
            DatePosted={x['DatePosted']}
          />
        );
      })
    }
    return list;
  }

  render() {
    return (
        <div>
            {this.generateEventList()}
        </div>
    );
  }
};

export default EventStatList;
