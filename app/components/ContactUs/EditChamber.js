import React from 'react';
import Validator from '../../../signup-app/components/SignupValidator.js';
import {Form, FormGroup, Col, ControlLabel, Checkbox, ButtonGroup, Button} from 'react-bootstrap';
import EditAddress from '../../../signup-app/components/Address/EditAddress.js';
import $ from 'jquery';


class EditChamber extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            update: 0,
            line1: null,
            line2: "",
            city: null,
            postcode: null,
            state: null,
            country: null,
            postalline1: null,
            postalline2: null,
            postalcity: "",
            postalpostcode: "",
            postalstate: "",
            postalcountry: "",
            name: null,
            abn: null,
            businessphone: null,
            mobilephone: null,
            anziccode: null,
            website: null,
            chamberemail: null,
        }

        console.log(this.props.chamberlist)
        this.setChamberData = this.setChamberData.bind(this);
        this.saveAddress = this.saveAddress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(){
        console.log(this.state.name, this.state.abn, this.state.businessphone)
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
        console.log(this.state.line1, this.state.line2, this.props.addressid, this.props.postalid)
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
                'postalline1': this.state.postalline1,
                'postalline2': this.state.postalline2,
                'postalcity': this.state.postalcity,
                'postalpostcode': this.state.postalpostcode,
                'postalstate': this.state.postalstate,
                'postalcountry': this.state.postalcountry

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
                {name.map((item, i) =>
                    <Validator
                        key = {i}
                        type = {type[i]}
                        displayName = {name[i]}
                        minimum = {min[i]}
                        maximum = {max[i]}
                        value = {this.props.chamberData[i] != null ? this.props.chamberData[i] : ""}
                        mandatory = {mand[i]}
                        userAnswer = {this.setChamberData}
                        index = {i}/>
                    )}
                <div style={{'fontSize': 'large', 'marginLeft': '3%'}}>Address</div>
            <EditAddress type="Business Address" save={this.saveAddress} address={this.props.address[0]} index={0}/>
                <div style={{'fontSize': 'large', 'marginLeft': '3%'}}>Postal Address</div>
            <EditAddress type="Postal Address" save={this.saveAddress} address={this.props.address[1]} index={1}/>
            <Button
                type="submit">
                    Submit
                </Button>
        </Form>
        );
    }

}

export default EditChamber;
