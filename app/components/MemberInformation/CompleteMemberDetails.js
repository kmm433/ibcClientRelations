import React from 'react';
import * as MemberActions from '../../Actions/MemberActions.js';
import $ from 'jquery';
import Detail from './Detail.js';
import UserAddress from '../ContactUs/UserAddressEdit.js'

class CompleteMemberDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      details: null,
      errors: [],
    };
    this.renderDetails = this.renderDetails.bind(this);
    this.updateDetail = this.updateDetail.bind(this);
    this.updateError = this.updateError.bind(this);
    this.handleSaveChanges = this.handleSaveChanges.bind(this);
    this.checkErrors = this.checkErrors.bind(this);
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
  updateDetail(value, targetDetail) {
    var details = this.state.details;
    details.forEach((detail) => {
      if (detail[0] === targetDetail)
        detail[1]['value'] = value;
    });
    this.setState({details: details});
  }

  // Allows a detail to update it's error status
  updateError(detail, errorStatus) {
    var errors = this.state.errors;
    var existing = false;
    errors.forEach((error, index) => {
      if (error.detail === detail) {
        errors[index].status = errorStatus;
        existing = true;
      }
    });
    if (!existing)
      errors.push({detail: detail, status: errorStatus});
    this.setState({errors: errors});
  }

  // Checks if there are any errors in the current inputs
  checkErrors() {
    const errors = this.state.errors;
    for (var index in errors) {
      if (errors[index].status === true){
        return true;
      }
    }
    return false;
  }

  // Allows an updated set of edtails to be submitted to the datbase.
  handleSaveChanges() {
    MemberActions.updateDetails(this.props.memberID, this.state.details);
    this.props.setEditMode();
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
          updateError={this.updateError}
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
            <div>
                <input
                  style={{"marginLeft": '5%'}}
                  type='button'
                  className='btn btn-warning'
                  value='Save Changes'
                  onClick={this.handleSaveChanges}
                  disabled={this.checkErrors()}/>
                <UserAddress userID={this.props.memberID}/>
            </div>
          : null
        }
      </div>
    );
  }
};

export default CompleteMemberDetails;
