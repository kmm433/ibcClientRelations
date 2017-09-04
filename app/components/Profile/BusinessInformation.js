import React from 'react';

class BusinessInformation extends React.Component {
  render(){
    return(
      <table className="businessTable">
        <tbody>
          <tr>
            <td>Business Owner:</td>
            <td>{this.props.business.firstname} {this.props.business.lastname}</td>
            <td rowSpan='9'><button onClick={ () => location.href = this.props.profileImg }>
              Profile Logo
            </button></td>
          </tr>
          <tr>
            <td>Contact Number:</td>
            <td>{this.props.business.phone}</td>
          </tr>
          <tr>
            <td>Business address:</td>
            <td>
              {this.props.business.line1}&nbsp;
              {this.props.business.city}&nbsp;
              {this.props.business.postcode}&nbsp;
              {this.props.business.state}&nbsp;
              {this.props.business.country}
            </td>
          </tr>
          <tr>
            <td>Website:</td>
            <td>{this.props.business.website}</td>
          </tr>
          <tr>
            <td>Member Of:</td>
            <td>{this.props.business.name}</td>
          </tr>
          <tr>
            <td>Description:</td>
            <td>{this.props.business.description}</td>
          </tr>
        </tbody>
      </table>
    );
  }
};

export default BusinessInformation;
