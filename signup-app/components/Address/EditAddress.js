import React from 'react';
import {Form, Col, HelpBlock, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import Validator from '../SignupValidator.js'

class EditAddress extends React.Component{
    constructor(props){
        super(props)

        this.storeAddress = this.storeAddress.bind(this);
    }

    storeAddress(value, index){

        var array = ['line1', 'line2', 'city','state', 'postcode', 'country'];

        name = array[index];
        console.log(value, index)
        console.log(index, name, value)

        if(this.props.type === "Postal Address")
            name = "postal" + name

        this.props.save(name, value);
    }

    checkboxAddress(checked){
        var check = (this.state.postal + 1)%2;
        this.props.changePostal(check)
    }

    render(){
        var address = [];
        address.push(this.props.address.line1)
        address.push(this.props.address.line2)
        address.push(this.props.address.city)
        address.push(this.props.address.state)
        address.push(this.props.address.postcode)
        address.push(this.props.address.country)

        var type = ['text', 'text', 'text','text', 'number', 'text'];
        var displayName = ['Line 1', 'Line 2', 'City', 'State', 'Postcode', 'Country'];
        var min = [1, 1, 1, 2, 4, 1];
        var max = [255, 255, 255, 30, 4, 255];
        var mand = ['1', '0', '1', '1', '1', '1'];

        return(
            <div>

                        {type.map((item, i) =>
                                <Validator
                                    key = {i}
                                    type = {name[i]}
                                    displayName = {displayName[i]}
                                    minimum = {min[i]}
                                    maximum = {max[i]}
                                    mandatory = {mand[i]}
                                    value={address[i] != null ? address[i] : ""}
                                    userAnswer = {this.storeAddress}
                                    index = {i}/>
                            )}
            </div>
        );
    }

}
export default EditAddress;
