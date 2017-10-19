import React from 'react';
import {Button, Col, ControlLabel, FormGroup, FormControl} from 'react-bootstrap';


//component for adding a clientID to set up payments
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
//remove the clientID input
    handleRemove(){
        this.props.remove();
    }
//add the clientID input
    handleAdd(){
        this.props.add(this.state.value);
    }

    handleChange(event){
        this.setState({value: event.target.value})
    }

//display the id of the chamber
    renderShowID(){
        return(
            <div>
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

//if the client does not already have an id then add it
    renderAddID(){
        return(
            <FormGroup
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
//if the token exists then show it otherwise ask the user to add one
    render(){
        return(
            <div>
                {this.props.token ? this.renderShowID() : this.renderAddID()}
            </div>
        )
    }
}

export default AddClientID;
