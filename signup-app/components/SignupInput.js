import React from 'react';
import {FormControl, ControlLabel, FormGroup, Col, HelpBlock} from 'react-bootstrap';
import {isEmail, isLength, isAlphanumeric, isUppercase, isInt} from 'validator';

class Validator extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            valid: null,
            error: ""
        }

        this.checkValid = this.checkValid.bind(this);
        this.isPassword = this.isPassword.bind(this);

    }
isPassword(password){
    var options = {min:8, max: 16};
    if(isLength(password, options)){

        var upperCount = 0;
        var intCount = 0;

        for(var i = 0; i < password.length; i++){
            console.log("Password", password[i])
            if(isInt(password[i])){
                intCount++;
            }
            else if(isUppercase(password[i])){
                upperCount++;
            }
        }
        if(upperCount !== 0 && intCount !== 0){
            console.log(intCount)
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }

}

checkValid(value){
    console.log("Getting back here: ", value)

    const length = value.length;

    if(this.props.type === "email"){
        if(!isEmail(value)){
            this.setState({
                error: "Invalid Email",
                valid: "error"
            })
        }
        else {
            this.setState({
                error: "",
                valid: "success"
            })
            this.props.userAnswer(value, this.props.index)
        }
    }
    else if(this.props.type === "password"){
        if(!this.isPassword(value)){
            this.setState({
                error: "Must be at least 6 characters long and contain at least one number and one upper case letter",
                valid: "error"
            })
        }
        else{
            this.setState({
                error: "",
                valid: "success"
            })
            this.props.userAnswer(value, this.props.index)
        }
    }
    else{
        var options = {min:this.props.minimum, max: this.props.maximum};

        if(isLength(value, options)){
            this.setState({
                error: "",
                valid: "success"
            })
            this.props.userAnswer(value, this.props.index)
        }
        else {
            this.setState({
                error: "Invalid Input",
                valid: "error"
            })
        }
    }


}
    render(){
        return(
            <Input
                type = {this.props.type}
                displayName = {this.props.displayName}
                mandatory = {this.props.mandatory}
                userAnswer = {this.storeUserData}
                valid = {this.state.valid}
                error = {this.state.error}
                index = {this.props.index}
                check = {this.checkValid}
            />
    );
    }
}

class Input extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            value: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.renderForm = this.renderForm.bind(this);
    }

    handleChange(event){
        console.log("handling change: ", event.target.value)
        this.props.check(event.target.value);
    }

    renderForm(){
        return(
            <FormGroup
                method='POST'
                validationState={this.props.valid}>
            <Col sm={3}>
                    <ControlLabel>
                        {this.props.displayName}
                        {this.props.mandatory === '1' && <a id="asterisk">*</a>}
                </ControlLabel>
            </Col>
                <Col sm={9}>
                    <FormControl
                        type = {this.props.type}
                        name = {this.props.displayName}
                        onBlur={this.handleChange} />
                    <FormControl.Feedback />
                <HelpBlock>{this.props.error}</HelpBlock>
                </Col>
            </FormGroup>
        )
    }

render(){
    return(
        this.props.displayName ? this.renderForm() : null
    );
}
}

export default Validator;
