import React from 'react';

class CompleteMemberDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      details: {},
    };
    this.updateStaticField = this.updateStaticField.bind(this);
    this.applyChanges = this.applyChanges.bind(this);
    this.renderDetails = this.renderDetails.bind(this);
    this.viewMapping = this.viewMapping.bind(this);
    this.editMapping = this.editMapping.bind(this);
  }

  componentWillReceiveProps(nextProps){
    var details = nextProps.details;
    for (var property in details) {
      if(details.hasOwnProperty(property)){
        if(details[property] === null)
          details[property] = '';
      }
    }
    this.setState({details: details});
  }

  // Allowes the member's details to be live edited.
  updateStaticField(event, property) {
    var staticDetails = this.state.details;
    staticDetails[property] = event.target.value;
    this.setState({
      details: staticDetails
    });
  }

  // Submits any cahnges made to the member's details
  applyChanges(event) {
    const staticDetails = this.state.details;
    for (var property in staticDetails) {
      if (staticDetails[property] === ''){
        console.log('Converting ', property, 'to null.');
        staticDetails[property] = null;
      }
    }
    event.stopPropagation();
  }

  // Returns ordinary display elements for each property
  viewMapping(property, details) {
    // There is specidic instructions for rendering the correct name for the user type.
    // Otherwise it may continue to render everything else
    if (property !== 'User Type') {
      return (
        <div key={property}>
          <h5>{property}</h5>
          <p>{details[property] ? details[property] : <i>No Record</i>}</p>
        </div>
      );
    }
    // If this is an ordinary user, there is no need to display anything here
    else if (details[property] === 2){
      <div key={property}></div>
    }
    // In any other case the user is either an admin or a chamber exec
    else {
      return (
        <div key={property}>
          <h5>{property}</h5>
          <p>{details[property] === 1? 'Chamber Executive' : 'Admin'}</p>
        </div>
      );
    }
  }

  // Returns editable display elements
  editMapping(property, details) {
    return (
      <div key={property}>
        <h5>{property}</h5>
        <input
          type='input'
          value={details[property]}
          onChange={(e) => this.updateStaticField(e, property)}
        />
      </div>
    );
  }

// Renders the view of a member's details
  renderDetails() {
    // Constructs a list of properties that are valid
    const details = this.state.details;
    if (this.props.details) {
      var properties=[];
      for (var property in details) {
        if(details.hasOwnProperty(property)){
          properties.push(property);
        }
      }
      // This defines the mapping from a paramter to a display item
      // Visual changes can be made here
      var display;
      if(this.props.editable)
        display = properties.map((i) => this.editMapping(i, details));
      else
        display = properties.map((i) => this.viewMapping(i, details));
      // Now break the display sections into chunks of 7 to help with mobile display
      var blocks = [];
      var index = 0;
      while(display.length) {
        blocks[index] = display.splice(0, 7);
        index += 1;
      }
      // Apply a class to the blocks to float them correctly
      var completeDetails = blocks.map((elements, i) => {
        return (
          <div key={i} className='member-details-complete-block'>
            {elements}
          </div>
        );
      });
      return (
        <div>
          {completeDetails}
        </div>
      );
    }
    // If for some reason there is no user detials
    else {
      return (
        <p>No details found.</p>
      );
    }
  }

  render() {
    return (
      <div className={this.props.class_name}>
        {this.renderDetails()}
        {this.props.editable ?
          <input
            type='button'
            className='btn btn-warning'
            value='Apply Changes'
            onClick={(e) => this.applyChanges(e)}
          />
          : null }
      </div>

    );
  }
};

export default CompleteMemberDetails;
