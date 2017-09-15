import React from 'react';
import $ from 'jquery';
import isEmail from 'validator/lib/isEmail';
import {FormControl, ControlLabel, FormGroup, Col, HelpBlock} from 'react-bootstrap';

class Fields extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
          value: "",
          errorMessage: "",
          valid: null
      }

      this.handleChange = this.handleChange.bind(this);
      this.duplicate = this.duplicate.bind(this);
      this.checkValid = this.checkValid.bind(this);
      this.validatePassword = this.validatePassword.bind(this);
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

    validatePassword(password) {
        var options = {min:8, max: 16};

        if(password.length < options.min || password.length > options.max){
            this.setState({
                valid: "error",
                errorMessage: "Password must be 8-16 characters long and contain at least one uppercase and one integer"
            });
        }
        else{
            this.setState({
                valid: "success",
                errorMessage: ""
            });
        }
    }

    checkValid(variable){

        if(this.props.type === "email" && !isEmail(variable)){
            this.setState({
                valid: "error",
                errorMessage: "Invalid Email"
            });
        }
        else if(this.props.type === "email" && isEmail(variable)){
            var isDuplicate=this.duplicate(variable);

            if(isDuplicate==='1'){
                this.setState({
                    valid: "error",
                    errorMessage: "This email already exists"
                });
            }
            else if(isDuplicate==='0') {
                this.setState({
                    valid: "success",
                    errorMessage: ""
                });
            }
        }
        if(this.props.type === "password"){
            console.log("Checking password", variable)
            this.validatePassword(variable);
        }
    }

    handleChange(event){
        this.checkValid(event.target.value, this.props.type)
        if(this.state.valid === "success"){
            this.props.storeUserData(event.target.value, this.props.index);
        }
    }

  render() {
    return (
        <FormGroup validationState={this.state.valid}>
        <Col sm={3}>
                <ControlLabel>{this.props.name}:
                    {this.props.mandatory === '1' ? <a id="asterisk">*</a> : null}
                </ControlLabel>
            </Col>
            <Col sm={9}>
                <FormControl
                    type = {this.props.type}
                    name ={this.props.name}
                    onBlur={this.handleChange} />
                <FormControl.Feedback />
                <HelpBlock>{this.state.errorMessage}</HelpBlock>
            </Col>
        </FormGroup>
    );
  }
}
export default Fields;
