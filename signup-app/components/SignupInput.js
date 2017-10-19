import React from 'react';
import {FormControl, ControlLabel, FormGroup, Col, HelpBlock} from 'react-bootstrap';
import {isEmail, isLength, isAlphanumeric, isUppercase, isInt} from 'validator';

class Input extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            value: this.props.value
        }

        this.handleChange = this.handleChange.bind(this);
        this.renderForm = this.renderForm.bind(this);
    }

    handleChange(event){
        this.setState({value: event.target.value})
        this.props.check(event.target.name, event.target.value);
    }

    renderForm(){
        return(
            <FormGroup
                method='POST'
                validationState={this.props.valid}>
            <Col sm={3}>
                <ControlLabel>
                    {this.props.displayName}
                    {this.props.mandatory == '1' && <a id="asterisk">*</a>}
                </ControlLabel>
            </Col>
                <Col sm={9}>
                    <FormControl
                        type = {this.props.type}
                        name = {this.props.displayName}
                        value = {this.state.value}
                        onChange={this.handleChange} />
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

export default Input;
