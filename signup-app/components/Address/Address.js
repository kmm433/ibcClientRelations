import React from 'react';
import {Form, Col, HelpBlock, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import Input from './../SignupInput.js';
import Dropdown from '../../../app/components/Signup/dropdown.js';
import Validator from '../SignupValidator.js'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

/*
class Address extends React.Component {
    constructor(){
        super()

        this.state = ({
            valid: null,
            error: "",
            line1: null,
            line2: null,
            city: null,
            postcode: null,
            area: null,
            country: null,
            showDialog: false
        })
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.selectType = this.selectType.bind(this);
        this.renderMenu = this.renderMenu.bind(this);
        this.prepareAddress = this.prepareAddress.bind(this);
    }
    //save the state selected from the dropdown menu
    selectType(value){
        console.log("selecting from menu", value)
        //this.setState({area: value})
        this.handleFormSubmit('area', value);
    }

    //validate each field before saving
    validate(name, value){
        //make lowercase and remove whitespace so represents the name of state
        name = name.toLowerCase();
        name = name.replace(/\s+/g, '');
        this.setState({[name]: value})
    }

    //make sure all the required fields have input
    checkSubmitReady(){
        console.log("saved address")
        console.log("Is this the adddress",this.state.line1, this.state.area, this.state.postcode, this.state.city, this.state.country)
        if(this.state.line1 === null || this.state.city === null || this.state.postcode === null || this.state.area === null || this.state.country === null){
            return false;
        }
        return true;
    }
    //validate the fields and then send the data if its all filled out appropriately
    handleFormSubmit(name, value){
        this.validate(name, value);
        this.checkSubmitReady() && this.prepareAddress();
    }

    prepareAddress(){
        var address = {
            line1: this.state.line1,
            line2: this.state.line2,
            area: this.state.area,
            city: this.state.city,
            postcode: this.state.postcode,
            country: this.state.country
        }
        console.log(address);
        this.props.save(address);
    }

    renderMenu(){
        const states = ['NSW', 'VIC', 'ACT', 'QLD', 'SA', 'WA', 'NT', 'TAS']
        return(
            <FormGroup
                method='POST'
                validationState={this.props.valid}>
            <Col sm={3}>
                <ControlLabel>
                    State <a id="asterisk">*</a>
                </ControlLabel>
            </Col>
                <Col sm={9}>
                    <Dropdown
                        typeOptions={states}
                        selecting = {this.selectType}
                        default = {"Select State"}
                    />
                </Col>
            </FormGroup>
        )
    }

render(){


    return(
        <div>
            <Input
                type = "text"
                displayName = "Line 1"
                mandatory = {'1'}
                check = {this.handleFormSubmit}
                valid = {this.state.valid}
                error = {this.state.error}
            />
            <Input
                type = "text"
                displayName = "Line 2"
                mandatory = {0}
                check = {this.handleFormSubmit}
                valid = {this.state.valid}
                error = {this.state.error}
            />
            <Input
                type = "text"
                displayName = "City"
                mandatory = {'1'}
                check = {this.handleFormSubmit}
                valid = {this.state.valid}
                error = {this.state.error}
            />
            {this.renderMenu()}
            <Input
                type = "number"
                displayName = "Postcode"
                mandatory = {'1'}
                check = {this.handleFormSubmit}
                valid = {this.state.valid}
                error = {this.state.error}
            />
            <Input
                type = "text"
                displayName = "Country"
                mandatory = {'1'}
                check = {this.handleFormSubmit}
                valid = {this.state.valid}
                error = {this.state.error}
            />
        </div>
    )
}
}*/


class Address extends React.Component{
    constructor(props){
        super(props)

        this.state = ({
            line1: null,
            line2: null,
            city: null,
            postcode: null,
            state: null,
            country: null
        })

        this.storeAddress = this.storeAddress.bind(this);
        this.renderMenu = this.renderMenu.bind(this);
    }

    storeAddress(value, index){
        var array = ['line1', 'line2', 'city','state', 'postcode', 'country'];
        name = array[index];
        console.log(value, index)
        console.log(this.props.name, name, value)
        this.props.save(this.props.name, name, value);
    }


    renderMenu(){
        const states = ['NSW', 'VIC', 'ACT', 'QLD', 'SA', 'WA', 'NT', 'TAS']
        return(
            <div>
            <Col sm={3}>
                <ControlLabel>
                    State <a id="asterisk">*</a>
                </ControlLabel>
            </Col>
                <Col sm={9}>
                    <Dropdown
                        typeOptions={states}
                        selecting = {this.selectType}
                        default = {"Select State"}
                    />
                </Col>
            </div>
        )
    }



    render(){

        var name = ['line1', 'line2', 'city','state', 'postcode', 'country'];
        var displayName = ['Line1', 'Line2', 'City', 'State', 'Postcode', 'Country'];
        var min = [1, 1, 1, 2, 4, 1];
        var max = [255, 255, 320, 30, 4, 255];
        var mand = ['1', '0', '1', '1', '1', '1'];

        return(
            <div>
                    <div id="signup-headings">{this.props.name}</div>

                        {name.map((item, i) =>
                                <Validator
                                    key = {i}
                                    type = {name[i]}
                                    displayName = {displayName[i]}
                                    minimum = {min[i]}
                                    maximum = {max[i]}
                                    mandatory = {mand[i]}
                                    userAnswer = {this.storeAddress}
                                    index = {i}/>
                            )}
            </div>
        );
    }

}
export default Address;
