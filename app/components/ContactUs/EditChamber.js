import React from 'react';
import Validator from '../../../signup-app/components/SignupValidator.js';
import {Form, FormGroup, Col, ControlLabel, Checkbox, ButtonGroup, Button} from 'react-bootstrap';
import EditAddress from '../../../signup-app/components/Address/EditAddress.js';
import $ from 'jquery';


class EditChamber extends React.Component{
    constructor(props){
        super(props)

        this.props

        this.state = {
            update: 0,
            line1: this.props.address.line1,
            line2: this.props.address.line2,
            city: this.props.address.city,
            postcode: this.props.address.postcode,
            state: this.props.address.state,
            country: this.props.address.country,
            postalline1: this.props.postal.line1,
            postalline2: this.props.postal.line2,
            postalcity: this.props.postal.city,
            postalpostcode: this.props.postal.postcode,
            postalstate: this.props.postal.state,
            postalcountry: this.props.postal.country,
            name: this.props.chamberData[0].name,
            abn: this.props.chamberData[0].abn,
            businessphone: this.props.chamberData[0].businessphone,
            mobilephone: this.props.chamberData[0].mobilephone,
            anziccode: this.props.chamberData[0].anziccode,
            website: this.props.chamberData[0].website,
            chamberemail: this.props.chamberData[0].chamberemail,
            postal: 0
        }

        this.setChamberData = this.setChamberData.bind(this);
        this.saveAddress = this.saveAddress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkbox = this.checkbox.bind(this);
        this.checkboxAddress = this.checkboxAddress.bind(this);

    }


    checkbox(){
        return(
            <FormGroup>
            <Col sm={3}>
               <ControlLabel>
                   Same as postal address? {'  '}
                </ControlLabel>
            </Col>
                <Col sm={9}>
                    <Checkbox
                        onClick={e => this.checkboxAddress(e.target.checked)}
                    />
                </Col>
            </FormGroup>
        )
    }

    checkboxAddress(checked){
        var check = (this.state.postal + 1)%2;
        this.setState({
            postal: check
        })
    }

    handleSubmit(){
        $.ajax({url: '/php/update_chamber.php', type: 'POST',
            dataType: 'json',
            data: {
                'name': this.state.name,
                'abn': this.state.abn,
                'businessphone': this.state.businessphone,
                'mobilephone': this.state.mobilephone,
                'anziccode': this.state.anziccode,
                'website': this.state.website,
                'chamberemail': this.state.chamberemail
            },
        success: response => {
            console.log("success")
        },
        error: (xhr, status, err) => {
            console.log("error")

        }
        });
        $.ajax({url: '/php/update_address.php', type: 'POST',
            dataType: 'json',
            data: {
                'addressID': this.props.addressid,
                'postalID': this.props.postalid,
                'line1': this.state.line1,
                'line2': this.state.line2,
                'city': this.state.city,
                'postcode': this.state.postcode,
                'state': this.state.state,
                'country': this.state.country,
                'postal': 0,
                'postalline1': this.state.postalline1,
                'postalline2': this.state.postalline2,
                'postalcity': this.state.postalcity,
                'postalpostcode': this.state.postalpostcode,
                'postalstate': this.state.postalstate,
                'postalcountry': this.state.postalcountry

            },
        success: response => {
            console.log("success")
        },
        error: (xhr, status, err) => {
            console.log("error")
        }
        });
    }

//set the state to the value coming in (the index reflects the name of the state, where to save the value)
    setChamberData(value, index){
        var array = ['Name', 'Business Phone', 'Mobile Phone', 'Anzic Code', 'Website', 'Chamber Email', 'ABN'];
        var name = array[index]
        name = name.replace(/\s+/g, "").toLowerCase();
        this.setState({[name]: value})
    }
//save the address to send back to the data handling component
    saveAddress(name, value){
        this.setState({[name]: value})
    }


    render(){
        var name=['Name', 'Business Phone', 'Mobile Phone', 'Anzic Code', 'Website', 'Chamber Email', 'ABN']
        var type=['text', 'number', 'number', 'number', 'text', 'email', 'number']
        var min=[1, 8, 8, 5, 1, 1, 11]
        var max=[255, 12, 12, 5, 320, 320, 11]
        var mand=[1,1,1,0,0,0,0];


        return(
            <Form method='POST' onSubmit={this.handleSubmit}>
                <div style={{'fontSize': 'large', 'marginLeft': '3%'}}>Details</div>
                    <Validator
                        type = {"text"}
                        displayName = {"Name"}
                        minimum = {2}
                        maximum = {255}
                        value = {this.props.chamberData[0].name != null ? this.props.chamberData[0].name : ""}
                        mandatory = {1}
                        userAnswer = {this.setChamberData}
                        index = {0}/>
                    <Validator
                        type = {"number"}
                        displayName = {"Business Phone"}
                        minimum = {8}
                        maximum = {12}
                        value = {this.props.chamberData[0].businessphone != null ? this.props.chamberData[0].businessphone : ""}
                        mandatory = {1}
                        userAnswer = {this.setChamberData}
                        index = {1}/>
                    <Validator
                        type = {"number"}
                        displayName = {"Mobile Phone"}
                        minimum = {8}
                        maximum = {12}
                        value = {this.props.chamberData[0].mobilephone != null ? this.props.chamberData[0].mobilephone : ""}
                        mandatory = {1}
                        userAnswer = {this.setChamberData}
                        index = {2}/>
                    <Validator
                        type = {"number"}
                        displayName = {"Anzic Code"}
                        minimum ={5}
                        maximum = {5}
                        value = {this.props.chamberData[0].anziccode != null ? this.props.chamberData[0].anziccode : ""}
                        mandatory = {0}
                        userAnswer = {this.setChamberData}
                        index = {3}/>
                    <Validator
                        type = {"text"}
                        displayName = {"Website"}
                        minimum = {0}
                        maximum = {320}
                        value = {this.props.chamberData[0].website != null ? this.props.chamberData[0].website : ""}
                        mandatory = {0}
                        userAnswer = {this.setChamberData}
                        index = {4}/>
                    <Validator
                        type = {"email"}
                        displayName = {"Chamber Email"}
                        minimum = {0}
                        maximum = {320}
                        value = {this.props.chamberData[0].chamberemail != null ? this.props.chamberData[0].chamberemail : ""}
                        mandatory = {0}
                        userAnswer = {this.setChamberData}
                        index = {5}/>
                    <Validator
                        type = {"number"}
                        displayName = {"ABN"}
                        minimum = {11}
                        maximum = {11}
                        value = {this.props.chamberData[0].abn != null ? this.props.chamberData[0].abn : ""}
                        mandatory = {0}
                        userAnswer = {this.setChamberData}
                        index = {6}/>
                <div style={{'fontSize': 'large', 'marginLeft': '3%'}}>Address</div>
                <EditAddress
                    type="Business Address"
                    save={this.saveAddress}
                    address={this.props.address}
                    index={0}/>
                {this.checkbox()}
                {this.state.postal == 1 &&
                    <div>
                    <div style={{'fontSize': 'large', 'marginLeft': '3%'}}>Postal Address</div>
                        <EditAddress
                            type="Postal Address"
                            save={this.saveAddress}
                            address={this.props.postal}
                            index={1}/>
                    </div>}
                <Button
                    style={{'marginLeft': '45%'}}
                    type="submit"> Submit
                </Button>
        </Form>
        );
    }

}

export default EditChamber;
