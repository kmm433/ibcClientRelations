import React from 'react';

class CompleteMemberDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      static_details: {},
    };
    this.updateStaticField = this.updateStaticField.bind(this);
    this.applyChanges = this.applyChanges.bind(this);
    this.renderStaticDetails = this.renderStaticDetails.bind(this);
    this.renderEditableStaticDetails = this.renderEditableStaticDetails.bind(this);
  }

  componentWillReceiveProps(nextProps){
    var static_details = nextProps.static_details;
    for (var property in static_details) {
      if(static_details.hasOwnProperty(property)){
        if(static_details[property] === null)
          static_details[property] = '';
      }
    }
    this.setState({static_details: static_details});
  }

  // Allowes the member's details to be live edited.
  updateStaticField(event, property) {
    var staticDetails = this.state.static_details;
    staticDetails[property] = event.target.value;
    this.setState({
      static_details: staticDetails
    });
  }

  // Submits any cahnges made to the member's details
  applyChanges(event) {
    const staticDetails = this.state.static_details;
    for (var property in staticDetails) {
      if (staticDetails[property] === ''){
        console.log('Converting ', property, 'to null.');
        staticDetails[property] = null;
      }
    }
    event.stopPropagation();
  }

  renderStaticDetails() {
    const staticDetails = this.state.static_details;
    if (this.props.static_details) {
      var properties=[];
      for (var property in staticDetails) {
        if(staticDetails.hasOwnProperty(property)){
          properties.push(property);
        }
      }
      var display = properties.map((i) => {
          if (!(properties === 'User Type')) {
            return (
              <div key={i}>
                <h5>{i}</h5>
                <p>{this.state.static_details[i] ? this.state.static_details[i] : <i>No Record</i>}</p>
              </div>
            );
          } else if (this.state.static_details[i] == 2){
            <div key={i}></div>
          } else {
            return (
              <div key={i}>
                <h5>{i}</h5>
                <p>{this.state.static_details[i] === 1? 'Chamber Executive' : 'Admin'}</p>
              </div>
            );
          }
        }
      );
      var memberDetails = display.splice(0, 7);
      var businessDetails = display.splice(0, 5);
      var businessContact = display.splice(0, 9);
      return (
        <div>
          <div className='member-details-complete-block'>
            {memberDetails}
          </div>
          <div className='member-details-complete-block'>
            {businessDetails}
          </div>
          <div className='member-details-complete-block'>
            {businessContact}
          </div>
        </div>
      );
    }
    else
      return (
        <p>No details found.</p>
      );
  }

  renderEditableStaticDetails() {
    const staticDetails = this.state.static_details;
    if (this.props.static_details) {
      var properties=[];
      for (var property in staticDetails) {
        if(staticDetails.hasOwnProperty(property)){
          properties.push(property);
        }
      }
      var display = properties.map((i) =>
        <div key={i}>
          <h5>{i}</h5>
          <input
            type='input'
            value={this.state.static_details[i]}
            onChange={(e) => this.updateStaticField(e, i)}
          />
        </div>
      );
      var memberDetails = display.splice(0, 7);
      var businessDetails = display.splice(0, 5);
      var businessContact = display.splice(0, 9);
      return (
        <div>
          <div className='member-details-complete-block'>
            {memberDetails}
          </div>
          <div className='member-details-complete-block'>
            {businessDetails}
          </div>
          <div className='member-details-complete-block'>
            {businessContact}
          </div>
        </div>
      );
    }
    else
      return (
        <p>No details found.</p>
      );
  }

  render() {
    if (!this.props.editable) {
      return(
        <div className={this.props.class_name}>
          {this.renderStaticDetails()}
        </div>
      );
    }
    else {
      return (
        <div className={this.props.class_name}>
          <div>{this.renderEditableStaticDetails()}</div>
          <input
            type='button'
            className='btn btn-warning'
            value='Apply Changes'
            onClick={(e) => this.applyChanges(e)}
          />
        </div>
      );
    }
  }
};

export default CompleteMemberDetails;
