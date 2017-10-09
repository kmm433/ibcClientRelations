import React from 'react';
import {Form, Col, HelpBlock, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import Input from './../SignupInput.js';
import Dropdown from '../../../app/components/Signup/dropdown.js';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class Address extends React.Component {
    constructor(){
        super()

        this.state = ({
            valid: null,
            error: "",
            address: 'Wollongong, NSW'
        })
        this.checkValid = this.checkValid.bind(this);
        this.selectType = this.selectType.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.onChange = (address) => this.setState({ address })
    }

    handleFormSubmit(event){
    event.preventDefault()

    console.log("The address is: ", this.state.address)

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))
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
    }

    const options = {
        location: new google.maps.LatLng(-34.42, 150.89),
        radius: 10000,
        types: ['address']
}

    //const type = ['ACT', 'NSW', 'NT', 'QLD','SA', 'VIC', 'WA'];

    return(
        <div>
            <FormGroup

                method='POST'
                validationState={this.props.valid}>
            <Col sm={3}>
                    <ControlLabel>
                        Address
                        {this.props.mandatory === '1' && <a id="asterisk">*</a>}
                </ControlLabel>
            </Col>
                <Col sm={9}>
                    <PlacesAutocomplete
                        id="google-address-box"
                        inputProps={inputProps}
                        onBlur={this.handleFormSubmit}
                        options={options}/>
                </Col>
            </FormGroup>

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

export default Address;
