import React from 'react';
import {FormControl, FormGroup, HelpBlock} from 'react-bootstrap';
import {isEmail, isNumeric, isLength} from 'validator';

class AddressDetails extends React.Component {

  constructor(props) {
    super(props);
    this.updateAddress = this.updateAddress.bind(this);
    this.renderNormal = this.renderNormal.bind(this);
    this.renderEditable = this.renderEditable.bind(this);
  }

  // Updates the business address
  updateAddress(event) {
    this.props.updateAddress(event.value);
  }

  // Renders the uneditable address details.
  renderNormal() {
    const displayNames = {
      line1: 'Line 1', line2: 'Line 2',
      city: 'City', postcode: 'Postcode',
      state: 'State', country: 'Country'
    };
    var elements = [];
    if (this.props.address) {
      for (var key in displayNames) {
        elements.push(
          <div className='detail' key={key}>
            <div className='member-detail'>
              {displayNames[key]}
            </div>
            <div className='member-detail-value'>
              {(this.props.address && this.props.address[0][key] !== null)? this.props.address[0][key]: <i>No Record</i>}
            </div>
          </div>
        );
      }
    }
    else {
      for (var key in displayNames) {
        elements.push(
          <div className='detail' key={key}>
            <div className='member-detail'>
              {displayNames[key]}
            </div>
            <div className='member-detail-value'>
              <i>No Record</i>
            </div>
          </div>
        );
      }
    }
    return elements;
  }

  // Renders the editable view of the address
  renderEditable() {
    console.log(this.props.address);
    const displayNames = {
      line1: 'Line 1', line2: 'Line 2',
      city: 'City', postcode: 'Postcode',
      state: 'State', country: 'Country'
    };
    var elements = [];
    for (var key in displayNames) {
      elements.push(
        <div className='detail' key={key}>
          <div className='member-detail'>
            {displayNames[key]}
          </div>
          <div className='member-detail-value'>
            <FormGroup
              controlId={key}
              validationState={null}
            >
              <FormControl
                type='text'
                value={(this.props.address && this.props.address[0][key]) ? this.props.address[0][key]: ''}
                onChange={console.log('update')}
              />
            </FormGroup>
          </div>
        </div>
      );
    }
    return elements;
  }


  render() {
    if (this.props.editable) {
      return (
        <div className='member-address'>
          <h4>{this.props.type} Address</h4>
          <div className='address-details'>
            {this.renderEditable()}
          </div>
        </div>
      );
    }
    else {
      return (
        <div className='member-address'>
          <h4>{this.props.type} Address</h4>
          <div className='address-details'>
            {this.renderNormal()}
          </div>
        </div>
      );
    }
  }

};

export default AddressDetails;
