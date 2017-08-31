import React from 'react';

class BusinessInformation extends React.Component {
  render(){
    return(
      <table>
        <tbody>
          <tr>
            <td>Business Owner:</td>
            <td>{this.props.business.owner}</td>
          </tr>
          <tr>
            <td>Contact Number:</td>
            <td>{this.props.business.phone}</td>
          </tr>
          <tr>
            <td>Business address:</td>
            <td>{this.props.business.address}</td>
          </tr>
          <tr>
            <td>Website:</td>
            <td>{this.props.business.website}</td>
          </tr>
          <tr>
            <td>Member Of:</td>
            <td>{this.props.business.chamber}</td>
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
