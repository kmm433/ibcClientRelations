import React from 'react';
import {FormControl, ControlLabel, FormGroup, Col, HelpBlock} from 'react-bootstrap';

class GetData extends React.Component{

    constructor(props){
        super(props)

        this.handleChange = this.handleChange.bind(this);
        this.renderForm = this.renderForm.bind(this);
    }

    handleChange(event){
        console.log("The data is: ", event.target.value)
        //this.props.checkValid(event.target.value, this.props.type, "")
        this.props.userAnswer(event.target.value, this.props.index)
    }

    renderForm(){
        return(
            <FormGroup method='POST'>
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
                <HelpBlock></HelpBlock>
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

export default GetData;
