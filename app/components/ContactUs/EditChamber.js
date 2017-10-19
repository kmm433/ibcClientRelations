import React from 'react';
import Validator from '../../../signup-app/components/SignupValidator.js';
import {Form, FormGroup, Col, ControlLabel, Checkbox, ButtonGroup, Button} from 'react-bootstrap';
import EditAddress from '../../../signup-app/components/Address/EditAddress.js';
import $ from 'jquery';


class EditChamber extends React.Component{
    constructor(props){
        super(props)

        console.log(this.props.address[0].line1, this.props.address[0].line2, this.props.address[0].city, this.props.address[0].postcode, this.props.address[0].state,this.props.address[0].country)
        console.log(this.props.chamberData[0].name, this.props.chamberData[0].abn,this.props.chamberData[0].businessphone, this.props.chamberData[0].mobilephone)
        this.state = {
            update: 0,
            line1: this.props.address[0].line1,
            line2: this.props.address[0].line2,
            city: this.props.address[0].city,
            postcode: this.props.address[0].postcode,
            state: this.props.address[0].state,
            country: this.props.address[0].country,
            postalline1: this.props.address[1].line1,
            postalline2: this.props.address[1].line2,
            postalcity: this.props.address[1].city,
            postalpostcode: this.props.address[1].postcode,
            postalstate: this.props.address[1].state,
            postalcountry: this.props.address[1].country,
            name: this.props.chamberData[0].name,
            abn: this.props.chamberData[0].abn,
            businessphone: this.props.chamberData[0].businessphone,
            mobilephone: this.props.chamberData[0].mobilephone,
            anziccode: this.props.chamberData[0].anziccode,
            website: this.props.chamberData[0].website,
            chamberemail: this.props.chamberData[0].chamberemail,
            postal: 0
        }

        console.log(this.props.chamberlist)
        this.setChamberData = this.setChamberData.bind(this);
        this.saveAddress = this.saveAddress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changePostal = this.changePostal.bind(this);
        this.checkbox = this.checkbox.bind(this);
        this.checkboxAddress = this.checkboxAddress.bind(this);

    }

    changePostal(value){
        this.setState({postal: value})
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
        console.log(this.state.name, this.state.abn, this.state.businessphone, this.state.mobilephone, this.state.anziccode, this.state.website,this.state.chamberemail)
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
            console.log(response)
        },
        error: (xhr, status, err) => {
            console.log("error",xhr.responseText, status, err)

        }
        });
        console.log(this.state.line1, this.state.line2, this.state.city, this.state.postcode, this.state.state)
        //console.log(this.state.postalline1, this.state.postalline2, this.state.postalcity, this.state.postalpostcode, this.state.postalstate)
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
                'postal': 0,/*,
                'postalline1': this.state.postalline1,
                'postalline2': this.state.postalline2,
                'postalcity': this.state.postalcity,
                'postalpostcode': this.state.postalpostcode,
                'postalstate': this.state.postalstate,
                'postalcountry': this.state.postalcountry*/

            },
        success: response => {
            console.log(response)
        },
        error: (xhr, status, err) => {
            console.log("error",xhr.responseText, status, err)
        }
        });
    }


    setChamberData(value, index){
        var array = ['Name', 'Business Phone', 'Mobile Phone', 'Anzic Code', 'Website', 'Chamber Email', 'ABN'];
        var name = array[index]
        name = name.replace(/\s+/g, "").toLowerCase();

        console.log("which one", name, value, index)
        this.setState({[name]: value})
    }

    saveAddress(name, value){
        console.log("address", name, value)
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
                address={this.props.address[0]}
                index={0}/>
            {this.checkbox()}
            {this.state.postal == 1 &&
                <div>
                    <div style={{'fontSize': 'large', 'marginLeft': '3%'}}>Postal Address</div>
                    <EditAddress
                        type="Postal Address"
                        save={this.saveAddress}
                        address={this.props.address[1]}
                        index={1}/>
                </div>}
            <Button
                style={{'marginLeft': '45%'}}
                type="submit">
                    Submit
                </Button>
        </Form>
        );
    }

}

export default EditChamber;
