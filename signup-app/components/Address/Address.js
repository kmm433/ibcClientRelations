import React from 'react';
import {Form, Col, HelpBlock, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import Input from './../SignupInput.js';
import Dropdown from '../../../app/components/Signup/dropdown.js';
import Validator from '../SignupValidator.js'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


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
                                    value = ""
                                    mandatory = {mand[i]}
                                    userAnswer = {this.storeAddress}
                                    index = {i}/>
                            )}
            </div>
        );
    }

}
export default Address;
