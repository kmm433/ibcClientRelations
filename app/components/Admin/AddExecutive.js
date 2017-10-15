import React from 'react';
import Validator from '../../../signup-app/components/SignupValidator.js';
import {Form, FormGroup, Col, ControlLabel, Checkbox, ButtonGroup} from 'react-bootstrap';


class AddExecutive extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            update: 0
        }

        console.log(this.props.chamberlist)
        this.storeChamberData = this.storeChamberData.bind(this);
    }


    storeChamberData(value, index){
        var array = ['email', 'confirmemail','password', 'confirmpassword', 'firstname', 'lastname', 'jobtitle'];
        var name = array[index];
        this.props.save(name, value)
    }


    render(){
        var type = ['email', 'email','password', 'password', 'text', 'text','text'];
        var name = ['email', 'confirmemail','password', 'confirmpassword', 'firstname', 'lastname', 'jobtitle'];
        var displayName = ['Email', 'Confirm Email', 'Password', 'Confirm Password', 'First Name', 'Last Name', 'Job Title'];
        var min = [1, 1, 6, 6, 1, 1, 1];
        var max = [320, 320, 30, 30, 255, 255, 255];
        var mand = [1, 1, 1, 1, 1, 1, 0];

        return(
            <div>
                        {name.map((item, i) =>
                            <Validator
                                key = {i}
                                type = {type[i]}
                                displayName = {displayName[i]}
                                minimum = {min[i]}
                                maximum = {max[i]}
                                mandatory = {mand[i]}
                                userAnswer = {this.storeChamberData}
                                index = {i}/>
                        )}
            </div>
        );
    }

}

export default AddExecutive;
