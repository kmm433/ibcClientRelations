import React from 'react';
import {FormControl, ControlLabel, FormGroup, Col, HelpBlock} from 'react-bootstrap';
import {isEmail, isLength, isAlphanumeric, isUppercase, isInt} from 'validator';
import Input from './SignupInput.js';
import $ from 'jquery';

class Validator extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            valid: null,
            error: "",
            email: "",
            password: "",
        }

        this.checkValid = this.checkValid.bind(this);
        this.isPassword = this.isPassword.bind(this);
        this.duplicate = this.duplicate.bind(this);

    }

    duplicate(email) {
        var answer;
        $.ajax({url: '/php/user_duplicate.php', type: 'POST', dataType: 'json', async: false,
            data: {'email': email},
            success: response => {
                console.log("exists: ", response)
                answer = response;
            }
        });
        return(answer);
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

checkValid(name, value){

    const length = value.length;
    console.log("email", !isEmail(value))

    if(this.props.type === "email"){
        if(!isEmail(value)){
            this.setState({
                error: "Invalid Email",
                valid: "error"
            })
        }
        else {
             if(this.duplicate(value) == 1){
                 this.setState({
                     error: "This email already exists",
                     valid: "error"
                     })
             }
             else{
                 this.setState({
                     error: "",
                     valid: "success"
                     })

                 console.log("displayname",this.props.displayName, this.props.displayName === "Email")
                 this.props.displayName === "Email" ? this.setState({email: value}) : console.log("not doing it")
                 this.props.userAnswer(value, this.props.index)
             }
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
                valid: "success",
                password: value
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

export default Validator;
