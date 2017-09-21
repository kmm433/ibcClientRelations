import React from 'react';
import $ from 'jquery';
import {isEmail} from 'validator';
import {FormControl, ControlLabel, FormGroup, Col, HelpBlock} from 'react-bootstrap';

class Fields extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
          value: "",
          errorMessage: "",
          valid: null,
          compareConfirm: ""
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
            return false;
        }
        else{
            this.setState({
                valid: "success",
                errorMessage: ""
            });
            return true;
        }
    }

    checkValid(variable){

        console.log("Not is is comparing", this.props.compareConfirm)
        if(this.state.compareConfirm === "Do not Match"){
            this.setState({
                valid: "error",
                errorMessage: "Does not Match"
            });
            return false;
        }

        else if(this.props.type === "email" && !isEmail(variable)){
            this.setState({
                valid: "error",
                errorMessage: "Invalid Email"
            });
            return false;
        }
        else if(this.props.type === "email" && isEmail(variable)){
            var isDuplicate=this.duplicate(variable);

            if(isDuplicate==='1'){
                this.setState({
                    valid: "error",
                    errorMessage: "This email already exists"
                });
                return false;
            }
            else if(isDuplicate==='0') {
                this.setState({
                    valid: "success",
                    errorMessage: ""
                });
                return true;
            }
        }
        if(this.props.type === "password"){
            console.log("Checking password", variable)
            return (this.validatePassword(variable));
        }

    }

    handleChange(event){
        var variable = this.checkValid(event.target.value, this.props.type)
        console.log("About to call callback", variable)
        if(variable){
            console.log("Calling callback")
            this.props.userAnswer(event.target.value, this.props.index);
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
