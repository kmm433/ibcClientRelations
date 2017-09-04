import React from 'react';

class CompleteMemberDetails extends React.Component {

  constructor(props) {
    super(props);
    this.renderUserDetails = this.renderUserDetails.bind(this);
    this.renderBusinessDetails = this.renderBusinessDetails.bind(this);
    this.renderBusinessContactDetails = this.renderBusinessContactDetails.bind(this);
  }

  renderUserDetails() {
    if (this.props.details) {
      return (
        <div className='member-details-complete-block'>
          <h5>Name</h5>
          <p>{this.props.details[0]} {this.props.details[1]}</p>
          <h5>Email</h5>
          <p>{this.props.details[2]}</p>
          {this.props.details[3] ?
            <div>
              <h5>Position</h5>
              <p>{this.props.details[3]}</p>
            </div>
            : null
          }
          {(this.props.details[4] !== 2) ?
            <div>
              <h5>User Type</h5>
              <p>{(this.props.details[4] === 0) ? 'Admin':'Executive'}</p>
            </div>
            : null
          }
          <h5>Member Since</h5>
          <p>{this.props.details[5]}</p>

          {this.props.details[6] ?
            <div>
              <h5>Membership Expires</h5>
              <p>{this.props.details[6]}</p>
            </div>
            : null
          }
        </div>
      );
    }
    else
      return (
        <p>No details found.</p>
      );
  }

  renderBusinessDetails() {
    if(this.props.details) {
      return (
        <div className='member-details-complete-block'>
          {this.props.details[7] ?
            <div>
              <div>
                <h5>Business Name</h5>
                <p>{this.props.details[7]}</p>
              </div>
              <h5>ABN</h5>
              <p>{this.props.details[20]}</p>
              <h5>ANZIC Code</h5>
              {this.props.details[17] ? <p>{this.props.details[17]}</p>:<p><i>No Record</i></p>}
              <h5>Number of Employees</h5>
              {this.props.details[18] ? <p>{this.props.details[18]}</p>:<p><i>No Record</i></p>}
              <h5>Company Established</h5>
              {this.props.details[19] ? <p>{this.props.details[19]}</p>:<p><i>No Record</i></p>}
            </div>
            : null
          }
        </div>
      )
    }
    else {
      return null;
    }
  }

  renderBusinessContactDetails() {
    if(this.props.details) {
      return (
        <div className='member-details-complete-block'>
          {this.props.details[7] ?
            <div>
              <h5>Business Address</h5>
              {this.props.details[8] ?
                  <p>
                    <span>{this.props.details[8]} </span>
                    {this.props.details[9] ? <span><br />{this.props.details[9]}</span>: null}
                    {this.props.details[10] ? <span><br />{this.props.details[10]}</span>: null}
                    {this.props.details[11] ? <span><br />{this.props.details[11]}</span>: null}
                    {this.props.details[12] ? <span><br />{this.props.details[12]}</span>: null}
                    {this.props.details[13] ? <span><br />{this.props.details[13]}</span>: null}
                  </p>
                : <p><i>No Record</i></p>
              }
              <h5>Contact Numbers</h5>
              <p>
                {this.props.details[14] ? <span>Business Phone: {this.props.details[14]}<br /></span>: null}
                {this.props.details[15] ? <span>Phone: {this.props.details[15]}<br /></span>: null}
                {this.props.details[16] ? <span>Mobile Phone: {this.props.details[16]}<br /></span>: null}
                {(!this.props.details[14] && !this.props.details[15] && !this.props.details[16]) ?
                  <i>No Record</i>: null
                }
              </p>
            </div>
            : null
          }
        </div>
      )
    }
    else {
      return null;
    }
  }

  render() {
    if (!this.props.editable) {
      return(
        <div className={this.props.class_name}>
          {this.renderUserDetails()}
          {this.renderBusinessDetails()}
          {this.renderBusinessContactDetails()}
        </div>
      );
    }
    else {
      return (
        <p>Place Holder For Editable Fields.</p>
      );
    }
  }
};

export default CompleteMemberDetails;
