import React from 'react';
import {Form, Col, HelpBlock, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import Input from './../SignupInput.js';
import Dropdown from '../../../app/components/Signup/dropdown.js';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


class GoogleAddress extends React.Component {
    constructor(){
        super()

        this.state = ({
            valid: null,
            error: "",
            address: '',
            showDialog: false
        })
        this.checkValid = this.checkValid.bind(this);
        this.selectType = this.selectType.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.confirmAddress = this.confirmAddress.bind(this);
        this.onChange = (address) => this.setState({ address })
    }

    handleFormSubmit(address, placeId){

    console.log("The address is: ", this.state.address)

    geocodeByAddress(this.state.address)
      .then(results =>
        (getLatLng(results[0]),
        this.setState({
            address: results[0].formatted_address,
            showDialog: true
        })
        )
    )
      .then(latLng => console.log('Success', latLng))
      .catch(error =>  console.error('Error', error))
  }

  confirmAddress(){
      console.log("not working")

      const city = <PlacesAutocomplete
          id="google-address-box"
          inputProps={inputProps}
      />

      const inputProps = {
        value: this.state.address,
        onChange: this.onChange,
        onBlur: () => {
            this.confirmAddress();
          },
        type: 'search',
        placeholder: 'Type to find your address'
        //autoFocus: true,
      }
     // var message =
      return(
          <ReactConfirmAlert
            title="Is this the correct Address?"
            message={city}
            confirmLabel = "Yes"
            cancelLabel = "No"
            onConfirm={() => this.setState({showDialog: false})}
            onCancel={() => this.setState({showDialog: false})}
          />
      )
  }

    selectType(type){
        console.log("is this working", type)
        this.props.save(type, state)
    }
    checkValid(){
        console.log("address")
    }

render(){


    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      onBlur: () => {
          this.confirmAddress();
        },
      type: 'search',
      placeholder: 'Type to find your address'
      //autoFocus: true,
    }

    const options = {
        componentRestrictions: {country: 'AU'}
}
    return(
        <div>
            <FormGroup

                method='POST'
                validationState={this.props.valid}>
            <Col sm={3}>
                    <ControlLabel>
                        {this.props.name}
                        {this.props.mandatory && <a id="asterisk">*</a>}
                </ControlLabel>
            </Col>
                <Col sm={9}>
                    <PlacesAutocomplete
                        id="google-address-box"
                        inputProps={inputProps}
                        onSelect={this.handleFormSubmit}
                        options={options}
                    />
                    <HelpBlock>{this.props.error}</HelpBlock>
                </Col>
            </FormGroup>
            {this.state.showDialog && this.confirmAddress()}

            {/*
            <Input
                type = "text"
                displayName = "Line 1"
                mandatory = {1}
                userAnswer = {this.storeUserData}
                valid = {this.state.valid}
                error = {this.state.error}
                check = {this.checkValid}
            />
            <Input
                type = "text"
                displayName = "Line 2"
                mandatory = {0}
                userAnswer = {this.storeUserData}
                valid = {this.state.valid}
                error = {this.state.error}
                check = {this.checkValid}
            />
            <Input
                type = "text"
                displayName = "City"
                mandatory = {0}
                userAnswer = {this.storeUserData}
                valid = {this.state.valid}
                error = {this.state.error}
                check = {this.checkValid}
            />
            <Dropdown
                typeOptions={type}
                selecting = {this.selectType}
                default = {"Select State"}
            />
            <Input
                type = "number"
                displayName = "City"
                mandatory = {1}
                userAnswer = {this.storeUserData}
                valid = {this.state.valid}
                error = {this.state.error}
                check = {this.checkValid}
            />
            <Input
                type = "text"
                displayName = "Country"
                mandatory = {0}
                userAnswer = {this.storeUserData}
                valid = {this.state.valid}
                error = {this.state.error}
                check = {this.checkValid}
            />*/}
        </div>
    )
}
}

export default GoogleAddress;
