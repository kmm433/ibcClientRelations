import React from 'react';
import $ from 'jquery';
import Detail from './Detail.js';

class CompleteMemberDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      details: null
    };
    this.renderDetails = this.renderDetails.bind(this);
    this.updateDetail = this.updateDetail.bind(this);
    this.handleSaveChanges = this.handleSaveChanges.bind(this);
  }

  // Update the state fo the details
  componentWillReceiveProps(nextProps) {
    const details = nextProps.details;
    var detailsArray = [];
    if (details) {
      for (var detail in details) {
        detailsArray.push([details[detail]['displayname'], details[detail]]);
      }
      for (var detail in detailsArray) {
        if(detailsArray[detail][1]['value'] === null)
          detailsArray[detail][1]['value'] = '';
      }
      this.setState({details: detailsArray});
    }
  }

  // Allows a detail to update the value of a detail
  updateDetail(event, targetDetail) {
    var details = this.state.details;
    details.forEach((detail) => {
      if (detail[0] === targetDetail)
        detail[1]['value'] = event.target.value;
    });
    this.setState({details: details});
  }

  // Allows an updated set of edtails to be submitted to the datbase.
  handleSaveChanges(event) {
    var updatedDetails = this.state.details;
    for (var detail in updatedDetails) {
      if(updatedDetails[detail][1]['value'] === '') {
        updatedDetails[detail][1]['value'] = null;
      }
    }

    console.log(updatedDetails);
    // Ajax call to submission function then reload details...
    $.ajax({
      url: '/php/update_complete_details.php',
      type: 'POST',
      dataType: 'json',
      data: {
        'memberID': this.props.memberID,
        'details': updatedDetails
      },
      success: response => {
        // Re-request the complete set of details to show the changes
        this.props.getCompleteDetails();
        this.props.getChamberMembers();
        this.props.getNotes();
        this.props.setEditMode(event);
      },
      error: response => {
        console.log(response);
      }
    });
  }

  // Maps each state element to a display component
  renderDetails() {
    const currentDetails = this.state.details;
    if (currentDetails) {
      // Map to display components
      var renderDetails = null;
      renderDetails = currentDetails.map((detail, i) => {
        return(
          <Detail
          key={i}
          displayname={detail[0]}
          details={detail[1]}
          editable={this.props.editable}
          updateDetail={this.updateDetail}
          />
        );
      });
      return (<div className='complete-member-details'>{renderDetails}</div>);
    }
    else
      return null;
  }

  render() {
    return (
      <div>
        {this.renderDetails()}
        {this.props.editable ?
          <input
            type='button'
            className='btn btn-warning'
            value='Save Changes'
            onClick={(e) => this.handleSaveChanges(e)}
          />
          : null
        }
      </div>
    );
  }
};

export default CompleteMemberDetails;
