import React from 'react';
import {Button, Col, ControlLabel, FormGroup, FormControl} from 'react-bootstrap';

class AddClientID extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            edit: false,
            value: ""
        }

        this.renderShowID = this.renderShowID.bind(this);
        this.renderAddID = this.renderAddID.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleRemove(){
        this.props.remove();
    }

    handleAdd(){
        console.log(this.state.value)
        this.props.add(this.state.value);
    }
    handleChange(event){
        console.log(event.target.value)
        this.setState({value: event.target.value})
    }

    submitID(){

    }

    renderShowID(){
        return(
            <div className="w3-panel w3-blue">
                <Col sm={2}>
                    <ControlLabel style={{'paddingTop': '10%'}}>
                        Client ID:
                    </ControlLabel>
                </Col>
                <Col sm={8} style={{'paddingTop': '1.25%'}}>
                    {this.props.token}
                </Col>
                    <Col sm={2}>
                        <Button
                            bsStyle="danger"
                            onClick={this.handleRemove}>
                            Remove
                        </Button>
                    </Col>
            </div>
        )
    }

    renderAddID(){
        return(
            <FormGroup
                className="w3-panel w3-blue"
                method='POST'>
            <Col sm={3}>
                    <ControlLabel style={{'paddingTop': '1%'}}>
                        Please Enter Your Paypal Client ID:
                </ControlLabel>
            </Col>
                <Col sm={7}>
                    <FormControl
                        style={{'paddingTop': '1%'}}
                        type = "text"
                        name = "clientID"
                        onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                {/*<HelpBlock>{this.props.error}</HelpBlock>*/}
                </Col>
                <Col sm={2}>
                    <Button
                        style={{'margin': '0px'}}
                        bsStyle="default"
                        onClick={this.handleAdd}>
                        Add
                    </Button>
                </Col>
            </FormGroup>
        )
    }

    render(){
        return(
            <div>
                {this.props.token ? this.renderShowID() : this.renderAddID()}
            </div>
        )
    }
}

export default AddClientID;
